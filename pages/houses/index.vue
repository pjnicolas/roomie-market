<template>
  <v-card>
    <v-card-title>
      Houses
      <v-spacer />
      <v-btn nuxt to="/houses/new" color="primary">
        + New house
      </v-btn>
    </v-card-title>
    <v-card-text>
      <v-data-table
        :headers="headers"
        :items="list || []"
        :mobile-breakpoint="0"
        :loading="!list"
        hide-default-footer
        disable-sort
        @click:row="handleClickRow"
      >
        <template v-slot:item.name="{ item }">
          <div class="cursor-pointer">
            {{ item.name }}
          </div>
        </template>
      </v-data-table>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data() {
    return {
      headers: [
        { text: '', value: 'star', width: '0%', divider: true },
        { text: 'Name', value: 'name', width: '100%' },
      ],
    }
  },
  computed: {
    ...mapState('houses', ['list']),
  },
  methods: {
    handleClickRow({ id }) {
      this.$router.push(`/houses/${id}/market`)
    },
  },
}
</script>

<style lang="scss" scoped>
.cursor-pointer {
  cursor: pointer;
}
</style>
