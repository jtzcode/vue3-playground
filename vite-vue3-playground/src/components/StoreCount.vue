<template>
    <div class="test" @click="add">{{count}}</div>
    <button class="btn btn-primary" @click="asyncAdd">Async Add</button>
    <div class="test">{{doubleCount}}</div>
</template>

<script setup>
import {computed} from 'vue';
import {useStore} from 'vuex';

let store = useStore();
let count = computed(()=>store.state.count);
let doubleCount = computed(()=>store.getters.double);
function add(){
    store.commit('add');
}
function asyncAdd() {
    store.dispatch('asyncAdd');
}
</script>
<style>
.test {
    height:100px;
    font-size:30px;
    width:20px;
}
</style>