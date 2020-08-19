<template>
  <v-card>
    <v-card-title>
      New task
    </v-card-title>
    <v-card-text>
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
          @click="handleCreateTask"
        >
          Create task
        </v-btn>
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
      name: null,
      frequency: null,
      effort: null,
    }
  },

  methods: {
    ...mapActions('market', ['create']),

    async handleCreateTask() {
      this.loading = true
      try {
        await this.create({
          name: this.name,
          frequency: Number(this.frequency),
          effort: Number(this.effort),
          lastTimeDone: Date.now(),
        })
        this.$router.push('../market')
      } catch (err) {
        // TODO: toast
        this.loading = false
      }
    },
  },
}
</script>
