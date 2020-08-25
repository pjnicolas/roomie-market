export const state = () => ({
  toast: null,
})

export const mutations = {
  SET_TOAST(state, message) {
    state.toast = { message }
  },
}
