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

  getItem({ commit }, { idHouse, idTask }) {
    return firestore().collection('houses').doc(idHouse).collection('market').doc(idTask).get()
      .then((taskSnap) => {
        const item = { ...taskSnap.data(), id: taskSnap.id }
        commit('SET_ITEM', item)
        return item
      })
  },

  create(_, { idHouse, task }) {
    const addTaskPromise = firestore()
      .collection('houses')
      .doc(idHouse)
      .collection('market')
      .add(task)

    // TODO: Add CREATE history

    return Promise.all([addTaskPromise])
  },

  update(_, { idHouse, idTask, task }) {
    const houseDoc = firestore().collection('houses').doc(idHouse)
    const updateTaskPromise = houseDoc.collection('market').doc(idTask).update(task)

    // TODO: Add EDIT history

    return Promise.all([updateTaskPromise])
  },

  complete({ rootState }, { idHouse, task, deltaScore }) {
    const { uid } = rootState.auth.user
    const houseDoc = firestore().collection('houses').doc(idHouse)
    const addTaskPromise = houseDoc.collection('market').doc(task.id).update({
      // TODO: Do this in the server! The date could be wrong in the client side
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

    // TODO: Add DONE history

    const addHistoryPromise = houseDoc.collection('history').add({
      type: 'done',
      user: uid,
      task,
      deltaScore,
    })

    return Promise.all([addTaskPromise, addScoreToUserPromise, addHistoryPromise])
  },

  delete(_, { idHouse, idTask }) {
    const houseDoc = firestore().collection('houses').doc(idHouse)
    // TODO: Update reference in history
    return houseDoc.collection('market').doc(idTask).delete()
  },
}
