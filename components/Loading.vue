<template>
  <div class="loading">
    Roomie Market
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
@keyframes loading-opacity {
  from {
    opacity: 1;
  }
  to {
    opacity: 0.3;
  }
}

.loading {
  color: #fff;
  animation: loading-opacity 500ms infinite;
  animation-direction: alternate;
  font-family: 'Roboto', Arial, Helvetica, sans-serif;
  font-size: 52px;
  font-weight: 100;
}
</style>
