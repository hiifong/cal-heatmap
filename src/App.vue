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
#cal-heatmap {
  width: 500px;
  height: 500px;
  background-color: gainsboro;
}
</style>
