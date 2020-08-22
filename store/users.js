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
      stopSnapshot = firestore().collection('houses').doc(houseId).collection('users')
        .onSnapshot((usersSnapshot) => {
          const list = usersSnapshot.docs.map((userDocument) => {
            const data = userDocument.data()
            return { ...data, id: userDocument.id }
          })

          commit('SET_LIST', list)
        })
    }
  },

  edit({ state }, user) {
    return firestore()
      .collection('houses').doc(state.houseId)
      .collection('users').doc(user.id)
      .update(user)
  },
}
