import { auth, firestore } from 'firebase'

export const state = () => ({
  loading: true,
  user: null,
})

export const mutations = {
  SET_USER(state, payload) {
    state.loading = false
    if (!payload) {
      state.user = null
    } else {
      state.user = { ...payload }
    }
  },
}

export const getters = {}

let stopSnapshot = null

export const actions = {
  init({ commit, dispatch }) {
    return auth().onAuthStateChanged((user) => {
      if (user) {
        const { displayName, email, photoURL, uid } = user
        commit('SET_USER', { displayName, email, photoURL, uid })
        const userDoc = firestore().collection('users').doc(uid)
        if (stopSnapshot) {
          stopSnapshot()
        }
        stopSnapshot = userDoc.onSnapshot((userSnap) => {
          const userData = userSnap.data()
          let houses = []
          if (!userData || !userData.houses) {
            userDoc.set({
              houses: [],
            })
          } else {
            houses = userData.houses
          }
          dispatch('houses/getList', houses, { root: true })
        })
      } else {
        commit('SET_USER', null)
      }
    })
  },
  async signInWithGoogle() {
    try {
      const googleProvider = new auth.GoogleAuthProvider()
      googleProvider.addScope('https://www.googleapis.com/auth/userinfo.email')
      const res = await auth().signInWithPopup(googleProvider)
      return res
    } catch (err) {
      return null
    }
  },
  async logout() {
    await auth().signOut()
  },
}
