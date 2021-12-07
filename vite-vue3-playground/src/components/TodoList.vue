<template>  
    <div>
        <h1 @click="add">{{count}}</h1>
        <h2>Things to do: {{all}}</h2>
        <h3>Current score is {{score}}.</h3>
        <Rating v-model="score">
            <img width="14" src="../assets/logo.png">
        </Rating>
        <Rating :value="4" theme="green"></Rating>
        <Rating :value="5" theme="blue"></Rating>
    </div>
    <span class="dustbin">
            🗑    
    </span>
    <div class="animate-wrap">    
        <transition @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">        
            <div class="animate" v-show="animate.show">            📋        </div>    
        </transition>
    </div>
    <div>
        <input type="text" v-model="title" @keydown.enter="addTodo" />
        <button v-if="active < all" @click="clear">Clear</button>
        <div v-if="todos.length">
            <transition-group name="flip-list" tag="ul">
                <li v-for="(todo,i) in todos" :key="todo.title">
                    <input type="checkbox" v-model="todo.done" />
                    <span :class="{ done: todo.done }">{{ todo.title }}</span>
                    <span class="remove-btn" @click="removeTodo($event, i)">❌</span>
                </li>
            </transition-group>
        </div>
        <div v-else>暂无数据</div>
        <div>
            全选
            <input type="checkbox" v-model="allDone" />
            <span>{{ active }} / {{ all }}</span>
        </div>
    </div>
    <div class="info-wrapper" v-if="showModal">
        <div class="info">
            Bro, you have input nothing.
        </div>
    </div>
</template>

<script setup>
import { ref, computed, reactive} from 'vue';
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

let title = ref("");
let todoObj = useTodos();
let all = todoObj.all;
let active = todoObj.active;
let allDone = todoObj.allDone;
let todos = todoObj.todos;
let animate = reactive({
  show: false,
  el: null
});

function addTodo() {
    if(!title.value) {
        showModal.value = true;
        setTimeout(() => {
            showModal.value = false;
        }, 1500);
        return;
    }
    todos.value.push({
        title: title.value,
        done: false
    });
    title.value = "";
}

function removeTodo(e, i) {
    animate.el = e.target;
    animate.show = true;
    todos.value.splice(i, 1);
}

function clear() {
    todoObj.clear();
}

let showModal = ref(false);

function beforeEnter(el){      
    let dom = animate.el      
    let rect = dom.getBoundingClientRect()      
    let x = window.innerWidth - rect.left - 60      
    let y = rect.top - 10      
    el.style.transform = `translate(-${x}px, ${y}px)`
}

function enter(el,done){      
    document.body.offsetHeight      
    el.style.transform = `translate(0,0)`      
    el.addEventListener('transitionend', done)
}

function afterEnter(el){      
    animate.show = false      
    el.style.display = 'none'
}

</script>

<style scoped>
h1 {  
    color: v-bind(color);
}
.info-wrapper {
    position: fixed;
    top: 20px;
    width: 200px;
}
.info {
    padding: 20px;
    color: white;
    background: #d88986;
}
.flip-list-move {
    transition: transform 0.8s ease;
}
.flip-list-enter-active,.flip-list-leave-active {  
    transition: all 1s ease;
}
.flip-list-enter-from,.flip-list-leave-to {  
    opacity: 0;  transform: translateX(30px);
}
.dustbin {
  font-size: 20px;
  position: fixed;
  right: 10px;
  top: 10px;
}
.animate-wrap .animate {
  position: fixed;
  right: 10px;
  top: 11px;
  z-index: 100;
  transition: all 0.5s linear;
}
</style>