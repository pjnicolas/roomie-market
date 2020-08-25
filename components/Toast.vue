<template>
  <v-snackbar
    v-model="open"
    color="secondary"
    bottom
    right
    :timeout="-1"
  >
    {{ toast && toast.message }}
  </v-snackbar>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  data() {
    return {
      open: false,
    }
  },

  computed: {
    ...mapState(['toast']),
    ...mapMutations(['SET_TOAST']),
  },

  watch: {
    toast(value) {
      if (value) {
        this.open = true
        if (this.idTimeout) {
          clearTimeout(this.idTimeout)
        }
        this.idTimeout = setTimeout(() => {
          this.open = false
          this.idTimeout = null
        }, 3000)
      }
    },
  },

  beforeDestroy() {
    if (this.idTimeout) {
      clearInterval(this.idTimeout)
    }
  },

  created() {
    this.idTimeout = null
  },
}
</script>
