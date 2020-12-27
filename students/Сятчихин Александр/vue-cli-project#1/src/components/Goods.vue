<template>
    <main>
        <section class="goods">
            <Item
              v-for="item in goods"
              :key="item.product_name"
              v-bind:element="item"
              v-on:addToBasket="handleAddToBasket"
            />
            <div v-if="!goods.length" class="goods-empty">
                Нет данных
            </div>
        </section>
    </main>
</template>

<script>
import Item from './Item.vue';

export default {
  name: 'Goods',
  props: ['goods'],
  components: {
    Item,
  },
  methods: {
    handleAddToBasket(data) {
      this.$emit('add', data);
    },
  }
}
</script>
