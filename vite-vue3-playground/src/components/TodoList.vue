<template>  
    <div>
        <h1 @click="add">{{count}}</h1>
        <h2>Things to do: {{taskCount}}</h2>
        <h3>Current score is {{score}}.</h3>
        <Rating v-model="score">
            <img width="14" src="../assets/logo.png">
        </Rating>
        <Rating :value="4" theme="green"></Rating>
        <Rating :value="5" theme="blue"></Rating>
    </div>
</template>

<script setup>
import { ref, computed} from 'vue';
import { useTodos } from '../utils/todos';
import Rating from './Rating.vue'
let count = ref(1);
let color = ref("red");
function add() {
    count.value++;
    color.value = Math.random() > 0.5 ? "red" : "green";
}
let score = ref(3.5);
// function updateRate(num) {
//     score.value = num;
// }


let todoObj = useTodos();
let taskCount = todoObj.all;


</script>

<style scoped>
    h1 {  
        color: v-bind(color);
    }
</style>