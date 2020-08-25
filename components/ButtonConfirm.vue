<template>
  <v-dialog v-model="dialog" width="500">
    <template v-slot:activator="{ on }">
      <v-btn :color="color" :disabled="disabled" :loading="loading" v-on="on">
        {{ label }}
      </v-btn>
    </template>

    <v-card>
      <v-card-title v-if="title">
        {{ title }}
      </v-card-title>

      <v-card-text v-if="description">
        {{ description }}
      </v-card-text>

      <v-card-actions>
        <v-btn color="primary" text @click="dialog = false">
          Cancel
        </v-btn>
        <v-spacer />
        <v-btn :color="color" @click="handleClick">
          {{ label }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      default: null,
    },
    description: {
      type: String,
      default: null,
    },
    color: {
      type: String,
      default: 'primary',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      dialog: false,
    }
  },
  methods: {
    handleClick() {
      this.dialog = false
      this.$emit('click')
    },
  },
}
</script>
