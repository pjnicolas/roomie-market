<template>
  <v-card>
    <v-card-title>
      New house
    </v-card-title>
    <v-card-text>
      <v-form v-model="isValid">
        <v-row>
          <v-col cols="12">
            <v-text-field
              v-model="house"
              label="The name of the house"
              :rules="[$rules.notEmpty]"
              outlined
              required
            />
          </v-col>
          <v-col cols="12">
            <v-text-field
              v-model="user"
              label="Your name in the house"
              :rules="[$rules.notEmpty]"
              outlined
              required
            />
          </v-col>
        </v-row>
        <v-btn
          color="primary"
          :loading="loading"
          :disabled="!isValid"
          @click="handleCreate"
        >
          Create
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
      house: null,
      user: null,
      loading: false,
      isValid: false,
    }
  },
  methods: {
    ...mapActions('houses', ['create']),
    async handleCreate() {
      this.loading = true
      try {
        await this.create({ house: this.house, user: this.user })
        this.$router.push('/houses')
      } catch (err) {
        console.error(err)
        this.loading = false
      }
    },
  },
}
</script>
