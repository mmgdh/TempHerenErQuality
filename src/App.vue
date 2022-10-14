<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import QualityIndex from './components/QualityControl/Index/Index.vue'
</script>

<template>
  <router-view class="ContainerCSS"></router-view>

  <!-- <QualityIndex/> -->
</template>

<style scoped>
.ContainerCSS {
  height: 100vh;
  width: 100%;
}
</style>
