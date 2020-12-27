<template>
    <div class="cart">
      <div class="cart-item" v-for="item in goods" :key="item.id">
        <p>{{item.title}}</p>
        <p>{{item.quantity}} x {{item.price}}</p>
        <button @click="$emit('delete', item.id)">Удалить</button>
      </div>
    </div>
</template>

<script>
export default {
    props: ['goods']
}
</script>