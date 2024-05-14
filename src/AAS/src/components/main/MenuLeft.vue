<script setup lang='ts'>
import { inject } from "vue"
import { RouterLink, useRouter } from 'vue-router'
import { useCounterStore as useStore } from '@/stores/counter'
import { storeToRefs } from 'pinia'

const store = useStore()

const msg: any = defineProps({
  fatherMsg: {
    type: String,
  }
})

let msg2: string = '这是子传父'

const emit: any = defineEmits([])

const sub = () => {
  store.lableName = '基础设置'
  console.log('sub');


  //子传父
  emit('msg2', msg2)
  window.location.reload()
}

const reloadView = () => {

  inject('reload')
  console.log(inject('reload')
  );

}

const handleOpen = (key: string, keyPath: string[]) => {
  // console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  // console.log(key, keyPath)
}
</script>

<template>
  <div class="menu_left">
    <el-scrollbar>
      <el-row class="tac">
        <el-col>
          <el-menu active-text-color="#ffd04b" background-color="#262b2f" class="el-menu-vertical-demo" default-active="2"
            text-color="#fff" @open="handleOpen" @close="handleClose">
            <el-sub-menu index="1">
              <template #title>
                <RouterLink to="/" @click="sub">
                  <el-icon>
                    <CircleCheck />
                  </el-icon>
                  <span>基础设置</span>
                </RouterLink>
              </template>
              <el-menu-item index="1-1">
                <template #title>
                  <el-icon>
                    <CircleCheck />
                  </el-icon>
                  <span>{{ msg.fatherMsg }}{{ store.userName }}</span>
                </template>
              </el-menu-item>
            </el-sub-menu>
            <el-sub-menu index="2">
              <template #title>
                <el-icon>
                  <FolderOpened />
                </el-icon>
                <span>学籍管理</span>
              </template>
              <el-menu-item index="2-1">
                <template #title>
                  <el-icon>
                    <CircleCheck />
                  </el-icon>
                  <span @click="reloadView">
                    新生注册
                  </span>
                </template>
              </el-menu-item>
              <el-menu-item index="2-2">
                <template #title>
                  <el-icon>
                    <CircleCheck />
                  </el-icon>
                  <span>新生学籍上报</span>
                </template>
              </el-menu-item>
              <el-menu-item index="2-3">
                <template #title>
                  <el-icon>
                    <CircleCheck />
                  </el-icon>
                  <span>欠费停学管理</span>
                </template>
              </el-menu-item>
              <el-menu-item index="2-4">
                <template #title>
                  <el-icon>
                    <CircleCheck />
                  </el-icon>
                  <span>超期退学管理</span>
                </template>
              </el-menu-item>
            </el-sub-menu>
            <el-sub-menu index="3">
              <template #title>
                <el-icon>
                  <TrendCharts />
                </el-icon>
                <span>查询统计</span>
              </template>
              <el-menu-item index="3-1">
                <template #title>
                  <el-icon>
                    <CircleCheck />
                  </el-icon>
                  <span>item One</span>
                </template>
              </el-menu-item>
            </el-sub-menu>
          </el-menu>
        </el-col>
      </el-row>
    </el-scrollbar>
  </div>
</template>

<style lang='less' scoped>
.menu_left {
  // height: 100%;
  width: 15vw;
  background-color: #262b2f;
}
</style>