<template>
  <v-card>
    <v-card-title>
      History
    </v-card-title>
    <v-card-text>
      <v-data-table
        :items="formattedList || []"
        :loading="!formattedList"
        :headers="headers"
        hide-default-footer
        disable-sort
        disable-pagination
        disable-filtering
        dense
      >
        <template v-slot:item.type="{ item }">
          <v-icon :color="item.iconColor">
            {{ item.icon }}
          </v-icon>
        </template>
        <template v-slot:item.idTask="{ item }">
          {{ item.displayName }}
        </template>
        <template v-slot:item.user="{ item }">
          {{ item.userName }}
        </template>
        <template v-slot:item.timestamp="{ item }">
          {{ item.timestamp | toLocalDate }}
        </template>
        <template v-slot:item.deltaScore="{ item }">
          {{ item.deltaScore && item.deltaScore.toFixed(4) }}
        </template>
      </v-data-table>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  data() {
    return {
      headers: [
        { text: 'Type', value: 'type', width: 1 },
        { text: 'Task', value: 'idTask' },
        { text: 'User', value: 'user' },
        { text: 'Date', value: 'timestamp' },
        { text: 'Score', value: 'deltaScore' },
      ],
    }
  },

  computed: {
    ...mapState('history', { listHistory: 'list' }),
    ...mapState('market', { listMarket: 'list' }),
    ...mapState('users', { listUsers: 'list' }),

    idHouse() {
      return this.$route.params.idHouse
    },

    formattedList() {
      if (!this.listHistory || !this.listUsers || !this.listMarket) {
        return null
      }

      return this.listHistory.map((h) => {
        let extra = {}
        switch (h.type) {
          case 'create':
            extra = {
              ...h,
              icon: 'mdi-plus-circle',
              iconColor: 'green',
            }
            break
          case 'update':
            extra = {
              ...h,
              icon: 'mdi-pencil-circle',
              iconColor: 'blue',
            }
            break
          case 'done':
            extra = {
              ...h,
              icon: 'mdi-check-circle',
              iconColor: 'lime',
            }
            break
          case 'delete':
            extra = {
              ...h,
              icon: 'mdi-delete-circle',
              iconColor: 'red',
            }
            // mdi-arrow-left-circle
            break
          case 'reset':
            extra = {
              ...h,
              icon: 'mdi-arrow-left-circle',
              iconColor: 'orange',
            }
            break
        }

        const user = this.listUsers.find((u) => u.id === h.user)
        extra.userName = user ? user.name : 'Unknown'

        const task = this.listMarket.find((t) => t.id === h.idTask)
        if (task) {
          extra.displayName = task.name
        } else {
          extra.displayName = h.fallback
        }

        return {
          ...h,
          ...extra,
        }
      })
    },
  },

  created() {
    this.watchHistory(this.idHouse)
    this.watchMarket(this.idHouse)
    this.watchUsers(this.idHouse)
  },

  methods: {
    ...mapActions('history', { watchHistory: 'watchList' }),
    ...mapActions('market', { watchMarket: 'watchList' }),
    ...mapActions('users', { watchUsers: 'watchList' }),
  },
}
</script>
