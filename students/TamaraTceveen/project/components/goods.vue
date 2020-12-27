<template>
  <main class="center">
    <section class="goods">
      <v-item
        v-for="item in goods"
        v-bind:element="item"
        v-on:addToBasket="handleAddToBasket"
        :key="item.id"
      />
      <div v-if="!goods.length" class="goods-empty">Нет данных</div>
    </section>
  </main>
</template>

<script>
import ItemInComponent from './item.vue';
export default {
  props: ["goods"],
    components: {
        'v-item': ItemInComponent
    },
    methods: {
    handleAddToBasket(data) {
      this.$emit("add", data);
    },
  },
};
</script>