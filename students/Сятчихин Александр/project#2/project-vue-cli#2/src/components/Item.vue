<template>
    <div>
        <template v-if="type == 'catalog'">
            <div class="hot-offer">
                <div class="hot-offer__shadow">
                    <img :src="item.productImg" alt="t-shirt">
                    <div class="hot-offer__hover">
                        <div class="hot-offer__square">
                            <button 
                                name="add"
                                @click="add(item)"
                            ><img src="@/assets/img/kart_white.png" alt="order">Add to Cart</button>
                        </div>
                    </div>
                </div>
                <a>{{ item.productName }}</a>
                <h3>
                    ${{ item.productPrice }}
                </h3>
            </div>
        </template>

        <template v-if="type == 'basket'">
            <div 
                class="drop-cart__product" 
                :key="item.productId"
            >
                <a href="product.html" class="drop-cart__product-link">
                    <img :src="item.productImg"
                        alt="product" class="drop-cart__product-img">
                </a>
                <div class="drop-cart__product-info">
                    <a href="product.html" class="drop-cart__product-name">{{ item.productName }}</a>
                    
                    <div class="drop-cart__product-price">
                        <span class="drop-cart__product-count">{{ item.amount }} </span> x {{ item.productPrice }}
                        <span class="drop-cart__product-sum"> = ${{ item.productPrice * item.amount }}</span>
                    </div>
                </div>
                <!--a 
                    @click.prevent="$parent.remove(item.productId)"
                    href="#" 
                    name="remove" 
                    class="drop-cart__product-close far fa-times-circle"
                ></a-->
                <a 
                    @click.prevent="$emit('del', item.productId)"
                    href="#" 
                    name="remove" 
                    class="drop-cart__product-close far fa-times-circle"
                ></a>
            </div>
        </template>
    </div>
</template>

<script>
export default {
    props: {
        type: {
            default: 'catalog'
        },
        item: { type: Object, default: () => ({}) }
    },
    methods: {
        add(item) {
            // this.$parent.$parent.$refs.bask.add(item);
            this.$store.dispatch('changeBasketItems', { item, action: undefined });
        }
    }
}
</script>

<style>

</style>