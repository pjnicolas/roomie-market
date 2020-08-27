<template>
  <div class="RealTimeScore">
    {{ score.toFixed(5) }}
  </div>
</template>

<script>
import { getScoreFromTask } from '@/lib/helpers'

export default {
  props: {
    effort: {
      type: Number,
      required: true,
    },
    frequency: {
      type: Number,
      default: null,
    },
    lastTimeDone: {
      type: Number,
      required: true,
    },
  },

  data() {
    return {
      now: Date.now(),
    }
  },

  computed: {
    score() {
      return getScoreFromTask({
        effort: this.effort,
        frequency: this.frequency,
        lastTimeDone: this.lastTimeDone,
      }, this.now)
    },
  },

  created() {
    this.intervalId = setInterval(() => {
      this.now = Date.now()
    }, 100)
  },

  beforeDestroy() {
    clearInterval(this.intervalId)
  },
}
</script>

<style lang="scss">
.RealTimeScore {
  text-align: right;
}
</style>
