<template>
<div class="container-main">
  <el-container class="h-full">
    <el-aside width="auto"> <Menu /> </el-aside>
    <el-container>
    <el-header class="el-header" height="54px"> <Header/> </el-header>
      <Tabs/>
      <el-main>content</el-main>
      <el-footer class="el-footer" height="54px"><Footer/></el-footer>
    </el-container>
  </el-container>
</div>
</template>

<script setup lang="ts">
import Header from './header/index.vue'
import Tabs from './tabs/index.vue'
import Menu from './menu/index.vue'
import Footer from  './footer/index.vue'

import { useSystemStore } from "@/stores/system";
const systemStore = useSystemStore();

</script>

<style scoped lang="less">
.container-main {
  width: 100%;
  height: 100%;
  position: relative;
  .el-header {
    border-bottom: 1px solid #D1D5DB;
    padding: 0;
  }
  .el-footer {
    border-top: 1px solid #D1D5DB;
  }
}
:deep(ul.el-menu){
  border-right-width: 0
}
</style>