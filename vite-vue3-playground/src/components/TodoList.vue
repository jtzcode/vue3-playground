<template>  
    <div>
        <h1 @click="add">{{count}}</h1>
        <h2>Things to do: {{taskCount}}</h2>
    </div>
</template>

<script setup>
import { ref, computed} from 'vue';
import { useTodos } from '../utils/todos';
let count = ref(1);
let color = ref("red");
function add() {
    count.value++;
    color.value = Math.random() > 0.5 ? "red" : "green";
}

let todoObj = useTodos();
let taskCount = todoObj.all;


</script>

<style scoped>
    h1 {  
        color: v-bind(color);
    }
</style>