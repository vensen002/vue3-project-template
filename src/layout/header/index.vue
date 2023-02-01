<template>
  <div class="w-full h-full flex items-center">
    <!--  折叠按钮  -->
    <el-tooltip
        class="box-item"
        effect="dark"
        :content="systemStore.isCollapse ? '展开' : '折叠'"
        placement="right"
    >
      <div class="w-10 h-full flex items-center justify-center cursor-pointer"
           @click="systemStore.isCollapse = !systemStore.isCollapse"
      >
        <el-icon>
          <component :is="systemStore.isCollapse ? 'Expand' : 'Fold'"/>
        </el-icon>
      </div>
    </el-tooltip>
  </div>
</template>

<script setup lang="ts">
import {useSystemStore} from "@/stores/system";

const systemStore = useSystemStore();

</script>

<style scoped lang="less">

</style>