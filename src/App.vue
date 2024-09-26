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
    <div id="cal-heatmap">
      <h1>Calendar Heatmap</h1>
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
  height: 40%;
  border: 2px solid black;
  border-radius: 15px;
}

h1 {
  margin-top: -50px;
  text-align: center;
}
</style>
