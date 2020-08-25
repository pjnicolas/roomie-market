<template>
  <v-card>
    <v-card-title>
      {{ idHouse ? 'Edit house settings' : 'New house' }}
    </v-card-title>
    <v-card-text v-if="idHouse && loadingHouse">
      Loading...
    </v-card-text>
    <v-card-text v-else>
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
          @click="handleSubmit"
        >
          {{ idHouse ? 'Save changes' : 'Create' }}
        </v-btn>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapActions, mapMutations } from 'vuex'

export default {
  data() {
    return {
      house: null,
      user: null,
      loading: false,
      loadingHouse: false,
      isValid: false,
    }
  },

  computed: {
    idHouse() {
      return this.$route.params.idHouse
    },
  },

  created() {
    if (this.idHouse) {
      this.loadingHouse = true
      this.getItem({ idHouse: this.idHouse, idTask: this.idTask })
        .then((item) => {
          this.house = item.house
          this.user = item.user
        })
        .finally((item) => {
          this.loadingHouse = false
        })
    }
  },

  methods: {
    ...mapActions('houses', ['create', 'edit', 'getItem']),
    ...mapMutations(['SET_TOAST']),

    async handleSubmit() {
      this.loading = true
      try {
        if (this.idHouse) {
          await this.edit({ idHouse: this.idHouse, house: this.house, user: this.user })
          this.loading = false
          this.SET_TOAST('House saved')
          // TODO: Toast message
        } else {
          await this.create({ house: this.house, user: this.user })
          this.$router.push('/houses')
        }
      } catch (err) {
        console.error(err)
        this.loading = false
      }
    },
  },
}
</script>
