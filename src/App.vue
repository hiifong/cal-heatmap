<script setup lang="ts">
import { onMounted } from 'vue'
import { CalHeatmap } from './CalHeatmap'
import type { IConfig } from './Interface'

const config: IConfig = {
  view: 'cal-heatmap'
}
onMounted(() => new CalHeatmap(config))
</script>

<template>
  <div class="main">
    <div id="cal-heatmap"></div>
  </div>
</template>

<style scoped>
.main {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
#cal-heatmap {
  width: 800px;
  height: 260px;
  border: 2px solid black;
  border-radius: 15px;
}

h1 {
  margin-top: -50px;
  text-align: center;
}
</style>
