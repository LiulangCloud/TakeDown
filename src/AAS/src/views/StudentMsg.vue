<script setup lang='ts'>
import { generateColumns, generateData } from '@/directives/table'

const columns = generateColumns(3)
const data = generateData(columns, 20)
console.log(data);

</script>

<template>
  <!-- <RouterView> -->
    <div class="student_msg">
      <el-table :data="data" style="width: 80vw;" height="80vh">
        <el-table-column prop="column-0" label="Date" width="180" />
        <el-table-column prop="column-1" label="Name" width="180" />
        <el-table-column prop="column-2" label="Address" />
      </el-table>
    </div>
  <!-- </RouterView> -->
</template>

<style lang='less' scoped></style>