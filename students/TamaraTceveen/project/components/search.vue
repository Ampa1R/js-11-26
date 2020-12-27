<template>
    <input type="text" 
    v-bind:value="searchValue"
    v-on:input="$emit('input', $event.target.value)" 
    class="search" placeholder="Search..." />
</template>

<script>
export default {
    props: ['searchValue']
}
</script>
