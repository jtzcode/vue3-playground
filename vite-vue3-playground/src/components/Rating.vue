<template>
    <div :style="fontStyle">
        <slot></slot>
        <div class="rate" @mouseout="onMouseout">
            <span @mouseover="onMouseover(num)" v-for='num in 5' :key='num'>☆</span>
            <span class="hover" :style="fontWidth">
                <span @click="onRating(num)" @mouseover="onMouseover(num)" v-for='num in 5' :key='num'>★</span>
            </span>
        </div>
    </div>
</template>

<script setup>
import {ref, computed} from 'vue';

let props = defineProps({
    //value: Number,
    modelValue: Number,
    theme: { type: String, default: 'Orange'}
});

// let rate = computed(()=>{
//     return "★★★★★☆☆☆☆☆".slice(5 - props.value, 10 - props.value);
// });

// let emits = defineEmits("update-rate");
function onRating(num) {
    emits("update:modelValue", num);
}
let emits = defineEmits(["update:modelValue"]);

const themeObj = { 'black': '#00', 'white': '#fff', 'red': '#f5222d', 'orange': '#fa541c', 'yellow': '#fadb14', 'green': '#73d13d', 'blue': '#40a9ff',};

const fontStyle = computed(()=> {
    return `color:${themeObj[props.theme]};`;
})

let width = ref(props.modelValue);
function onMouseout() {
    width.value = props.modelValue;
}
function onMouseover(v) {
    width.value = v;
}
const fontWidth = computed(()=>`width:${width.value}em;`);
</script>

<style scoped>
.rate{ 
    position:relative; 
    display: inline-block;
}
.rate > span.hover {
     position:absolute; 
     display: inline-block; 
     top:0; 
     left:0; 
     width:0; 
     overflow:hidden;
}
</style>