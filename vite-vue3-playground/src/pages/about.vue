
<template>
    <h1>这是关于页面</h1>
    <Heading :level="3">Hello Dynamic Heading</Heading>
    <AnimateDiv />
    <StoreCount />
</template>

<script setup>
import AnimateDiv from '../components/AnimateDiv.vue'
import StoreCount from '../components/StoreCount.vue'
import Heading from '../components/Heading.jsx'
</script>