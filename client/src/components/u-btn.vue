<template>
  <button
    class="u-btn"
    @click="onClick"
    :class="{
      'u-btn_disabled': loading,
    }"
    :style="{
      background,
    }"
  >
    <div v-if="loading" class="u-btn__spinner"></div>
    <span v-else class="u-btn__text">
      <slot />
    </span>
  </button>
</template>

<script>
export default {
  props: {
    loading: Boolean,
    background: String,
  },
  methods: {
    onClick() {
      if (this.loading) return;
      this.$emit("click");
    },
    handleInput(e) {
      this.$emit("input", e.target.value);
    },
  },
};
</script>

<style lang="scss" scoped>
.u-btn {
  background-color: #67c23a;
  color: white;
  min-width: 210px !important;
  padding: 10px 0;
  border-radius: 10px;
  min-height: 39px;
  outline: none;
  border: none;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    box-shadow: inset 0 0 100px 100px rgba(255, 255, 255, 0.1);
    transition: all 0.3s;
  }
  &_disabled {
    cursor: wait;
  }
  &__spinner {
    width: 15px;
    height: 15px;
    border-radius: 50%;
    border: 2px solid rgba(255, 255, 255, 0.5);
    border-right-color: rgba(255, 255, 255, 1);
    animation: spin 0.9s infinite linear;
  }
  @keyframes spin {
    to {
      transform: rotate(358deg);
    }
  }
}
</style>
