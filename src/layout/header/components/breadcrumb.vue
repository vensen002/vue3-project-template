<template>
  <el-breadcrumb separator="/">
    <el-breadcrumb-item v-for="(item, index) in breadcrumbList">
      <span class="root" v-if="parentName && index > 0">{{ parentName }} &nbsp;&nbsp;/</span>

      <span v-if="index === breadcrumbList.length-1"> &nbsp;&nbsp;{{ item.name }}</span>
      <span class="root" v-else> &nbsp;&nbsp;{{ item.name }}</span>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script setup>
import {ref, watch} from "vue";
import {useRoute} from "vue-router";

const route = useRoute();
const breadcrumbList = ref([]);
const parentName = ref("");

const initBreadcrumbList = ()=> {
  breadcrumbList.value = route.matched;
  parentName.value = route.meta.parentName;
}

watch(route, () => {
  initBreadcrumbList();
},{deep: true, immediate: true})
</script>

<style lang="less" scoped>
.root{
  color:#666;
  font-weight:600;
}
</style>