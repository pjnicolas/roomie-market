import { firestore } from 'firebase'

export const state = () => ({
  list: null,
})

export const mutations = {
  SET_LIST(state, payload) {
    state.list = payload
  },
}

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
      stopSnapshot = firestore().collection('houses').doc(idHouse).collection('history')
        .orderBy('timestamp', 'desc')
        .onSnapshot((historySnapshot) => {
          const list = historySnapshot.docs.map((historyDocument) => {
            const data = historyDocument.data()
            return { ...data, id: historyDocument.id }
          })

          commit('SET_LIST', list)
        })
    }
  },
}
