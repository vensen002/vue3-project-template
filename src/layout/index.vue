<template>
<div>
  <Header></Header>
  <div>
    <Menu></Menu>
    <div>
      <Tabs></Tabs>
      content
      <Footer></Footer>
    </div>
  </div>


</div>
</template>

<script setup lang="ts">
import Header from './header/index.vue'
import Tabs from './tabs/index.vue'
import Menu from './menu/index.vue'
import Footer from  './footer/index.vue'

</script>

<style scoped lang="less">

</style>