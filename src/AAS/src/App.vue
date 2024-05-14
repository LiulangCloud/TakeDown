<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import MenuLeft from './components/main/MenuLeft.vue';
import ContentView from './components/main/ContentView.vue';
import { ref } from 'vue';

const msg: string = '这是父传子'
let msg3: any = ref('')
const getmsg = (i?: { name: string }) => {
  msg3.value = i?.name
}

</script>

<template>
  <header>
    <div class="school_name">
      <img src="./assets/logo.svg" alt="">
      <title>流浪世界大学{{ msg3 }}</title>
    </div>
    <div class="search">
      
    </div>
  </header>

  <main>
    <MenuLeft :fatherMsg="msg" @msg2="getmsg" />
    <ContentView>
      <RouterView></RouterView>
    </ContentView>
  </main>
  <!-- <RouterView /> -->
</template>

<style lang="less" scoped>
header {
  height: 12vh;
  display: flex;
  background-color: aquamarine;

  .school_name {
    width: 15vw;
    background-color: white;
    display: flex;
    align-items: center;
    justify-content: center;

    img {
      width: 2rem;
    }

    title {
      font-size: large;
      font-weight: bold;
      color: #34495e;
      display: block;
    }
  }

  .search {
    width: 85vw;
    background-color: #0081dc;
  }
}

main {
  height: 85vh;
  display: flex;
  background-color: aqua;
}
</style>
