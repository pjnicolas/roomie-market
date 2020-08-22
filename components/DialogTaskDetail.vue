<template>
  <v-dialog :value="!!task" width="90%" max-width="500px" @click:outside="handleExit">
    <v-card v-if="lastTask">
      <v-card-title>
        {{ lastTask.name }}
        <v-spacer />
        <v-btn color="primary" nuxt :to="`market/${lastTask.id}`">
          <v-icon left>
            mdi-pencil
          </v-icon>
          Edit
        </v-btn>
      </v-card-title>
      <v-card-subtitle>
        {{ `Score: ${score.toFixed(5)}` }}
      </v-card-subtitle>
      <v-card-text class="d-flex">
        <v-btn color="primary" @click="handleConfirm">
          DONE
        </v-btn>
        <v-spacer />
        <v-btn color="error" @click="handleCancel">
          Cancel
        </v-btn>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions } from 'vuex'
import { getScoreFromTask } from '@/lib/helpers'

export default {
  props: {
    task: {
      type: Object,
      default: null,
    },
  },

  data() {
    return {
      lastTask: null,
      score: 0,
    }
  },

  watch: {
    task(task) {
      if (task) {
        this.score = getScoreFromTask(task, Date.now())
        this.lastTask = task
      }
    },
  },

  methods: {
    ...mapActions('market', ['complete']),

    handleConfirm() {
      this.complete({
        idHouse: this.$route.params.idHouse,
        idTask: this.task.id,
        deltaScore: this.score,
      })
        .then(() => {
          this.handleExit()
        })
    },

    handleCancel() {
      this.handleExit()
    },

    handleExit() {
      this.$emit('exit')
    },
  },
}
</script>
