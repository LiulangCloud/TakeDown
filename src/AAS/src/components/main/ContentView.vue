<script setup lang='ts'>
import StudentMsg from "@/views/StudentMsg.vue"
import AboutView from "@/views/AboutView.vue";
import { ref, nextTick, provide } from 'vue'
import { useCounterStore as useStore } from '@/stores/counter'

const pathName = window.location.pathname
console.log(pathName);

const isRoutrtAlive = ref(true)
const reload = () => {
  isRoutrtAlive.value = false
  nextTick(() => {
    isRoutrtAlive.value = true
  })
}
provide("reload", reload)
</script>

<template>
  <div class="content">
    <!-- <el-table-v2 :columns="columns" :data="data" :width="700" :height="400" fixed /> -->
    <AboutView v-if="pathName === '/'" />
    <RouterView v-if="isRoutrtAlive">
      <StudentMsg  />
    </RouterView>
  </div>
</template>

<style lang='less' scoped>
.content {
  // height: 100%;
  width: 85vw;
  background-color: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>