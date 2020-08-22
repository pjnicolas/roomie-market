<template>
  <v-card>
    <v-card-title>
      Market
      <v-spacer />
      <v-btn nuxt to="market/new" color="primary">
        + New task
      </v-btn>
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
        @click:row="handleClickRow"
      >
        <template v-slot:item.color="{ item }">
          <div
            :style="{ backgroundColor: getTaskColor(item) }"
            class="color-circle-indicator"
          />
        </template>
        <template v-slot:item.score="{ item }">
          <RealTimeScore
            :effort="item.effort"
            :frequency="item.frequency"
            :last-time-done="item.lastTimeDone"
          />
        </template>
      </v-data-table>
    </v-card-text>
    <DialogTaskDetail
      :task="selectedTask"
      @exit="selectedTask = null"
    />
  </v-card>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { getScoreFromTask } from '@/lib/helpers'

export default {
  data() {
    return {
      selectedTask: null,
      headers: [
        { text: '', value: 'color', width: '0%', divider: true },
        { text: 'Name', value: 'name', width: '100%' },
        { text: 'Score', value: 'score', width: '0%' },
      ],
    }
  },

  computed: {
    ...mapState('market', ['list']),

    sortedList() {
      if (!this.list) { return null }
      return this.list.slice().sort((a, b) => {
        const now = Date.now()
        const aScore = getScoreFromTask(a, now)
        const bScore = getScoreFromTask(b, now)
        if (aScore < bScore) { return 1 }
        if (aScore > bScore) { return -1 }
        return 0
      })
    },
  },

  created() {
    const { idHouse } = this.$route.params
    this.watchList(idHouse)
  },

  methods: {
    ...mapActions('market', ['watchList']),

    handleClickRow(task) {
      this.selectedTask = task
    },

    getTaskColor(task) {
      const score = getScoreFromTask(task, Date.now())
      const scorePerDay = task.effort / task.frequency
      const delayedInDays = task.frequency - (score / scorePerDay)
      if (delayedInDays < -0.5) {
        return 'green'
      } else if (delayedInDays < 0.5) {
        return 'yellow'
      } else {
        return 'red'
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.color-circle-indicator {
  width: 24px;
  height: 24px;
  border-radius: 24px;
  background-color: white;
}
</style>
