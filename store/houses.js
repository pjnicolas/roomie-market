import { firestore } from 'firebase'

const DEFAULT_SCALE = 32

export const state = () => ({
  list: null,
})

export const mutations = {
  SET_LIST(state, payload) {
    state.list = payload
  },
}

export const getters = {}

export const actions = {
  async getList({ commit }, houses) {
    const housesData = await Promise.all(
      houses.map((h) => firestore().collection('houses').doc(h).get()
        .then((houseSnap) => ({ id: houseSnap.id, ...houseSnap.data() })),
      ),
    )

    commit('SET_LIST', housesData)
  },

  async create({ rootState }, { house, user }) {
    const colHouses = firestore().collection('houses')
    const newHouse = await colHouses.add({
      name: house,
      scale: DEFAULT_SCALE,
    })
    const { uid } = rootState.auth.user
    await newHouse.collection('users').doc(uid).set({
      name: user,
      score: 0,
    })
    await firestore().collection('users').doc(uid).update({
      houses: firestore.FieldValue.arrayUnion(newHouse.id),
    })
  },
}
