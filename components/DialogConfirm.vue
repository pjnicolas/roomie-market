<template>
  <v-dialog v-model="dialog">
    <v-card>
      <v-card-title>
        {{ title }}
      </v-card-title>
      <v-card-text>
        {{ text }}
        <v-btn color="primary" @click="handleConfirm">
          Confirm task
        </v-btn>
        <v-btn color="error" @click="handleCancel">
          Cancel
        </v-btn>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
    }
  },

  methods: {
    handleConfirm() {
      this.$emit('confirm')
      this.dialog = false
    },

    handleCancel() {
      this.$emit('cancel')
      this.dialog = false
    },
  },
}
</script>
