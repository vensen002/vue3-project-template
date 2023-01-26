<template>
  <header>
    <div>
      <router-view></router-view>
    </div>
  </header>

</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'

console.log(import.meta.env.VITE_API)
</script>

<style scoped lang="less">

</style>
