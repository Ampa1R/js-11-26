<template>
    <div class="item">
      <h4>{{element.title}}</h4>
      <p>{{element.price}}</p>
      <button type="button" v-on:click="addToBasket">Add to basket</button>
    </div>
</template>

<script>
export default {
    props: ['element'],
    methods: {
    addToBasket() {
      this.$emit('addToBasket', this.element);
    }
  },
}
</script>