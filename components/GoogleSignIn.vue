<template>
  <button type="button" class="button" @click="$emit('click')" />
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.button {
  height: 46px;
  width: 191px;
  background-image: url('~assets/google/google_dark_normal.png');
  outline: none;

  &:focus {
    background-image: url('~assets/google/google_dark_focus.png');
  }

  &:active {
    background-image: url('~assets/google/google_dark_pressed.png');
  }

  &:disabled {
    background-image: url('~assets/google/google_dark_disabled.png');
  }
}
</style>
