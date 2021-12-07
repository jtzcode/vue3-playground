
<template>
  <div>
    <router-link to="/">首页</router-link> | 
    <router-link to="/about">关于</router-link>
  </div>
  <router-view v-slot="{ Component }">
    <transition name="route" mode="out-in">
      <div><component :is="Component" /></div>
    </transition>
  </router-view>
</template>
