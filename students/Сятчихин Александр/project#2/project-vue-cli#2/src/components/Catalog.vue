<template>
    <div>
        <div id="catalog">
            <Item 
                v-for="el of items" 
                :key="el.productId"
                :item="el"
            />
        </div>
        <div class="featured-items__undertitle">
            <a href="#">Browse All Product <i class="fas fa-long-arrow-alt-right"></i></a>
        </div>
    </div>
</template>

<script>
import { get } from '@/core/requests'
import Item from './Item.vue'

export default {
    components: { Item },
    data() {
        return {
            items: [],
            // url: 'https://raw.githubusercontent.com/kellolo/static/master/JSON/catalog.json',
            url: '/api/catalog',
        }
    },
    async mounted() {
        try {
            this.items = await get(this.url);
        }
        catch(err) {
            console.log(err);
        }
    }
}
</script>

<style>

</style>