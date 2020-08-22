<template>
  <v-card>
    <v-card-title>
      {{ idTask ? 'Edit task' : 'New task' }}
    </v-card-title>
    <v-card-text v-if="idTask && loadingTask">
      Loading...
    </v-card-text>
    <v-card-text v-else>
      <v-form v-model="isValid">
        <v-row>
          <v-col cols="12">
            <v-text-field
              v-model="name"
              label="Task name"
              outlined
              :rules="[$rules.notEmpty]"
              required
            />
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="frequency"
              label="Frequency of the task in days"
              type="number"
              outlined
              :rules="[$rules.notEmpty, $rules.positive]"
              required
            />
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="effort"
              label="Effort to complete the task in minutes"
              type="number"
              outlined
              :rules="[$rules.notEmpty, $rules.positive]"
              required
            />
          </v-col>
        </v-row>
        <v-btn
          color="primary"
          :disabled="!isValid"
          :loading="loading"
          @click="handleClickButton"
        >
          {{ idTask ? 'Edit task' : 'Create task' }}
        </v-btn>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data() {
    const { idTask } = this.$route.params
    return {
      idTask,
      isValid: false,
      loading: false,
      loadingTask: true,
      name: null,
      frequency: null,
      effort: null,
    }
  },

  created() {
    const { idHouse } = this.$route.params
    if (this.idTask) {
      this.getItem({ idHouse, idTask: this.idTask })
        .then((task) => {
          this.loadingTask = false
          this.name = task.name
          this.frequency = task.frequency
          this.effort = task.effort
        })
    }
  },

  methods: {
    ...mapActions('market', ['create', 'update', 'getItem']),

    async handleClickButton() {
      this.loading = true
      if (!this.idTask) {
        try {
          await this.create({
            idHouse: this.$route.params.idHouse,
            task: {
              name: this.name,
              frequency: Number(this.frequency),
              effort: Number(this.effort),
              lastTimeDone: Date.now(),
            },
          })
          this.$router.push('../market')
        } catch (err) {
        // TODO: toast
          this.loading = false
        }
      } else {
        try {
          await this.update({
            idHouse: this.$route.params.idHouse,
            idTask: this.idTask,
            task: {
              name: this.name,
              frequency: Number(this.frequency),
              effort: Number(this.effort),
            },
          })
          this.$router.push('../market')
        } finally {
        // TODO: toast
          this.loading = false
        }
      }
    },
  },
}
</script>
