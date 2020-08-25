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
          v-if="!idTask"
          color="primary"
          :disabled="!isValid"
          :loading="loading"
          @click="handleClickButton"
        >
          Create task
        </v-btn>

        <div v-else class="d-flex">
          <ButtonConfirm
            title="Edit task"
            description="Are you sure you want to edit the task? The task name will be replaced in the history, and the current score may change. Reset the task afterward if you want to set the score to zero."
            color="primary"
            label="Edit task"
            :disabled="!isValid || loading || loadingDelete"
            :loading="loading"
            @click="handleClickButton"
          />

          <v-spacer />

          <ButtonConfirm
            title="Delete task"
            description="Are you sure you want to delete this task? You can not undone this action. The task will still be visible in the history."
            color="error"
            label="Delete permanently"
            :loading="loading || loadingDelete"
            @click="handleClickDelete"
          />
        </div>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data() {
    return {
      isValid: false,
      loading: false,
      loadingDelete: false,
      loadingTask: true,
      name: null,
      frequency: null,
      effort: null,
    }
  },

  computed: {
    idHouse() {
      return this.$route.params.idHouse
    },
    idTask() {
      return this.$route.params.idTask
    },
  },

  created() {
    if (this.idTask) {
      this.getItem({ idHouse: this.idHouse, idTask: this.idTask })
        .then((task) => {
          this.loadingTask = false
          this.name = task.name
          this.frequency = task.frequency
          this.effort = task.effort
        })
    }
  },

  methods: {
    ...mapActions('market', ['create', 'update', 'getItem', 'delete']),

    async handleClickButton() {
      this.loading = true
      if (!this.idTask) {
        try {
          await this.create({
            idHouse: this.idHouse,
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
            idHouse: this.idHouse,
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

    handleClickDelete() {
      this.loadingDelete = true
      this.delete({
        idHouse: this.idHouse,
        idTask: this.idTask,
      })
        .then(() => {
          this.$router.push('../market')
        })
        .finally(() => {
          this.loadingDelete = false
        })
    },
  },
}
</script>
