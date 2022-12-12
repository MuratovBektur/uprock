<template>
  <div class="u-input__container">
    <div v-if="label" class="u-input__label">{{ label }}</div>
    <input
      class="u-input__input"
      :value="value"
      @input="handleInput"
      :type="type"
    />
  </div>
</template>

<script>
export default {
  props: {
    label: String,
    value: String,
    type: {
      type: String,
      default: "text",
    },
  },
  methods: {
    handleInput(e) {
      this.$emit("input", e.target.value);
    },
  },
};
</script>

<style lang="scss" scoped>
.u-input {
  &__container {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
  &__label {
    margin-bottom: 10px;
    font-size: 15;
  }
  &__input {
    text-indent: 10px;
    outline: none;
    border: 1px solid #666;
    border-radius: 5px;
    min-height: 27px;
    display: block;
    width: 100%;
  }
}
</style>
