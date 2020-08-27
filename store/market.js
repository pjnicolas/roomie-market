import { firestore } from 'firebase'

export const state = () => ({
  list: null,
  item: null,
})

export const mutations = {
  SET_LIST(state, payload) {
    state.list = payload
  },
  SET_ITEM(state, payload) {
    state.item = payload
  },
}

export const getters = {}

let stopSnapshot = null
let lastIdHouse = null

export const actions = {
  watchList({ commit }, idHouse) {
    if (lastIdHouse !== idHouse) {
      lastIdHouse = idHouse
      commit('SET_LIST', null)
      if (stopSnapshot) {
        stopSnapshot()
      }
      stopSnapshot = firestore().collection('houses').doc(idHouse).collection('market')
        .onSnapshot((marketSnapshot) => {
          const list = marketSnapshot.docs.map((marketDocument) => {
            const data = marketDocument.data()
            return { ...data, id: marketDocument.id }
          })

          commit('SET_LIST', list)
        })
    }
  },

  async getItem({ commit }, { idHouse, idTask }) {
    const taskSnap = await firestore().collection('houses').doc(idHouse).collection('market').doc(idTask).get()
    const item = { ...taskSnap.data(), id: taskSnap.id }
    commit('SET_ITEM', item)
    return item
  },

  async create({ rootState }, { idHouse, task }) {
    const { uid } = rootState.auth.user

    const docHouse = firestore().collection('houses').doc(idHouse)

    const taskRef = await docHouse.collection('market').add(task)
    return docHouse.collection('history').add({
      type: 'create',
      user: uid,
      timestamp: Date.now(),
      idTask: taskRef.id,
      fallback: task.name,
    })
  },

  async update({ rootState }, { idHouse, idTask, task }) {
    const { uid } = rootState.auth.user
    const docHouse = firestore().collection('houses').doc(idHouse)
    const updateTaskPromise = docHouse.collection('market').doc(idTask).update(task)

    const oldTaskSnap = await docHouse.collection('market').doc(idTask).get()
    const oldTask = oldTaskSnap.data()
    const historyPromise = docHouse.collection('history').add({
      type: 'update',
      user: uid,
      timestamp: Date.now(),
      idTask,
      oldTask,
      newTask: { ...oldTask, ...task },
      fallback: task.name,
    })

    return Promise.all([updateTaskPromise, historyPromise])
  },

  complete({ rootState }, { idHouse, task, deltaScore }) {
    const { uid } = rootState.auth.user
    const houseDoc = firestore().collection('houses').doc(idHouse)
    const addTaskPromise = houseDoc.collection('market').doc(task.id).update({
      lastTimeDone: Date.now(),
    })

    const addScoreToUserPromise = houseDoc.collection('users').doc(uid).get()
      .then((userSnapshot) => {
        const { score } = userSnapshot.data()
        const prevScore = score > 0 ? score : 0
        return houseDoc.collection('users').doc(uid).update({
          score: prevScore + deltaScore,
        })
      })

    const historyPromise = houseDoc.collection('history').add({
      type: 'done',
      user: uid,
      timestamp: Date.now(),
      idTask: task.id,
      fallback: task.name,
      deltaScore,
    })

    return Promise.all([addTaskPromise, addScoreToUserPromise, historyPromise])
  },

  async delete({ rootState }, { idHouse, idTask }) {
    const { uid } = rootState.auth.user

    const houseDoc = firestore().collection('houses').doc(idHouse)

    const task = await houseDoc.collection('market').doc(idTask).get()
    const { name } = task.data()
    const deleteTaskPromise = task.ref.delete()
    const historyCol = houseDoc.collection('history')
    const historyAddPromise = historyCol.add({
      type: 'delete',
      user: uid,
      timestamp: Date.now(),
      idTask,
      fallback: name,
    })
    const historyRelated = await historyCol.where('idTask', '==', idTask).get()
    await Promise.all([
      ...historyRelated.docs.map((h) => h.ref.update({ fallback: name })),
      deleteTaskPromise,
      historyAddPromise,
    ])
  },
}
