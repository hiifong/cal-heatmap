<script setup lang="ts">
import CalHeatmap from './CalHeatmap.vue'
</script>

<template>
  <div class="main">
    <div id="cal-heatmap">
      <CalHeatmap view="cal-heatmap" />
    </div>
  </div>
</template>

<style scoped>
.main {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
#cal-heatmap {
  width: 90%;
  height: 90%;
  background-color: gainsboro;
}
</style>
