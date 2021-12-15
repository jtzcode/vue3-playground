<template>
    <div class="test" @click="add">{{count}}</div>
</template>

<script setup>
import {computed} from 'vue';
import {useStore} from '../store/gvuex';

let store = useStore();
let count = computed(()=>store.state.count);
function add(){
    store.commit('add');
}
</script>
<style>
.test {
    height:100px;
    font-size:16px;
    width:20px;
}
</style>