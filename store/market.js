import { firestore } from 'firebase'

export const state = () => ({
  list: null,
  houseId: null,
})

export const mutations = {
  SET_LIST(state, payload) {
    state.list = payload
  },
  SET_HOUSE_ID(state, payload) {
    state.houseId = payload
  },
}

export const getters = {}

let stopSnapshot = null

export const actions = {
  watchList({ commit, state }, houseId) {
    if (state.houseId !== houseId) {
      commit('SET_HOUSE_ID', houseId)
      commit('SET_LIST', null)
      if (stopSnapshot) {
        stopSnapshot()
      }
      stopSnapshot = firestore().collection('houses').doc(houseId).collection('market')
        .onSnapshot((marketSnapshot) => {
          const list = marketSnapshot.docs.map((marketDocument) => {
            const data = marketDocument.data()
            return { ...data, id: marketDocument.id }
          })

          commit('SET_LIST', list)
        })
    }
  },

  create({ state }, task) {
    const addTaskPromise = firestore()
      .collection('houses')
      .doc(state.houseId)
      .collection('market')
      .add(task)

    // TODO: Add CREATE history

    return Promise.all([addTaskPromise])
  },

  complete({ state, rootState }, { task, deltaScore }) {
    const { uid } = rootState.auth.user
    const houseDoc = firestore().collection('houses').doc(state.houseId)
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

    return Promise.all([addTaskPromise, addScoreToUserPromise])
  },

  edit({ state }, { task }) {
    const houseDoc = firestore().collection('houses').doc(state.houseId)
    const updateTaskPromise = houseDoc.collection('market').doc(task.id).update(task)

    // TODO: Add EDIT history

    return Promise.all([updateTaskPromise])
  },
}
