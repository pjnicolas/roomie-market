<template>
  <WrapperCenter :title="title">
    <v-card-text>
      <GoogleSignIn @click="handleSignInWithGoogle" />
    </v-card-text>
  </WrapperCenter>
</template>

<script>
import { mapActions } from 'vuex'

import WrapperCenter from '@/components/WrapperCenter'
import GoogleSignIn from '@/components/GoogleSignIn'

export default {
  middleware: 'notAuthenticated',
  layout: 'blank',
  components: {
    WrapperCenter,
    GoogleSignIn,
  },
  data() {
    return {
      title: 'Roomie Market - Login',
    }
  },
  methods: {
    ...mapActions('auth', ['signInWithGoogle']),

    handleSignInWithGoogle() {
      this.signInWithGoogle()
        .then(() => {
          this.$router.push('/')
        })
    },
  },
  head() {
    return {
      title: this.title,
    }
  },
}
</script>
