<template>
  <div>
    <div v-if="loading" class="loading-wrapper">
      <LoadingIndicator />
    </div>
    <v-app v-else dark>
      <v-navigation-drawer
        v-model="drawer"
        :mini-variant="false"
        :clipped="true"
        fixed
        app
      >
        <v-list>
          <template v-for="(item, i) in items">
            <v-divider v-if="!item" :key="i" class="my-2" />
            <v-list-item v-else :key="i" :to="item.to" router exact>
              <v-list-item-action>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title v-text="item.title" />
              </v-list-item-content>
            </v-list-item>
          </template>
        </v-list>
      </v-navigation-drawer>
      <v-app-bar :clipped-left="true" fixed app>
        <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
        <v-toolbar-title v-text="title" />
        <v-spacer />
        <v-btn color="primary" @click="handleLogout">
          Log out
        </v-btn>
      </v-app-bar>
      <v-main>
        <v-container>
          <nuxt />
        </v-container>
      </v-main>

      <Toast />

      <v-footer fixed app>
        <span>
          &copy; {{ new Date().getFullYear() }} — Created and designed by Pedro
          Javier Nicolás Zamora
        </span>
      </v-footer>
    </v-app>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

import LoadingIndicator from '@/components/Loading'

export default {
  components: {
    LoadingIndicator,
  },

  data() {
    return {
      drawer: true,
      title: 'Roomie Market',
    }
  },

  computed: {
    ...mapState('auth', ['loading', 'user']),

    idHouse() {
      return this.$route.params.idHouse
    },

    items() {
      let items = [
        {
          icon: 'mdi-home',
          title: 'Houses',
          to: '/houses',
        },
      ]

      if (this.idHouse) {
        items = [
          ...items,
          null,
          {
            icon: 'mdi-cog',
            title: 'House settings',
            to: `/houses/${this.idHouse}/settings`,
          },
          null,
          {
            icon: 'mdi-store',
            title: 'Market',
            to: `/houses/${this.idHouse}/market`,
          },
          {
            icon: 'mdi-history',
            title: 'History',
            to: `/houses/${this.idHouse}/history`,
          },
          {
            icon: 'mdi-scale-balance',
            title: 'Balance',
            to: `/houses/${this.idHouse}/balance`,
          },
        ]
      }

      return items
    },
  },

  watch: {
    loading(value) {
      if (!value && !this.user) {
        this.$router.push('/login')
      }
    },
  },

  methods: {
    ...mapActions('auth', ['logout']),
    async handleLogout() {
      await this.logout()
      this.$router.push('/login')
    },
  },
}
</script>

<style scoped>
.loading-wrapper {
  background-color: #272727;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
