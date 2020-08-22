<template>
  <v-card>
    <v-card-title>
      Balance
    </v-card-title>
    <v-card-text>
      <v-data-table
        :items="sortedList || []"
        :mobile-breakpoint="0"
        :loading="!list"
        :headers="headers"
        hide-default-footer
        disable-sort
        disable-pagination
        disable-filtering
      >
        <template v-slot:item.relativeScore="{ item }">
          <div
            :style="{
              color: item.colorScore,
              fontWeight: 'bold',
            }"
          >
            {{ item.relativeScore }}
          </div>
        </template>
        <template v-slot:item.score="{ item }">
          {{ item.score.toFixed(2) }}
        </template>
      </v-data-table>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { getMiddleScoreFromUsers } from '@/lib/helpers'

export default {
  data() {
    return {
      headers: [
        { text: 'Name', value: 'name', width: '100%' },
        { text: 'Score', value: 'score', width: '0%' },
        { text: 'Relative', value: 'relativeScore', width: '100px' },
      ],
    }
  },

  computed: {
    ...mapState('users', ['list']),

    sortedList() {
      if (!this.list) { return [] }
      const middle = getMiddleScoreFromUsers(this.list)

      const result = this.list.slice()
        .sort((a, b) => {
          if (a.score > b.score) { return 1 }
          if (a.score < b.score) { return -1 }
          return 0
        })
        .map((u) => {
          const relativeScore = u.score - middle
          let colorScore = 'white'
          if (relativeScore > 0) {
            colorScore = 'green'
          } else if (relativeScore < 0) {
            colorScore = 'red'
          }
          return {
            ...u,
            relativeScore: `${relativeScore > 0 ? '+' : ''}${relativeScore.toFixed(2)}`,
            colorScore,
          }
        })

      return result
    },
  },

  created() {
    const { idHouse } = this.$route.params
    this.watchList(idHouse)
  },

  methods: {
    ...mapActions('users', ['watchList']),
  },
}
</script>
