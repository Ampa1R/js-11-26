<template>
    <header class="header center">
      <span class="logo">E-shop</span>
      <slot />
      <button @click="handleClick" type="button" class="cart-button">Корзина</button>
      <slot name="basket" />
    </header>
</template>

<script>
export default {
    methods: {
    handleClick() {
      this.$emit('change-is-cart-visible');
    }
  }
}
</script>