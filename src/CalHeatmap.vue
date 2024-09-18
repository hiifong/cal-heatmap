<script setup lang="ts">
import { onMounted } from 'vue'
import { Leafer } from 'leafer-ui'
import { Flow } from '@leafer-in/flow'
import { Cell } from './CalHeatmap'
const props = defineProps({
  view: {
    type: String,
    required: true
  }
})

onMounted(() => {
  const leafer = new Leafer({ view: props.view })

  const rects: Array<Cell> = []
  for (let i = 0; i < 100; i++) {
    rects.push(
      new Cell({
        date: 2024,
        value: i,
        width: 20,
        height: 20,
        fill: '#32cd79',
        cornerRadius: [5, 5, 5, 5],
        draggable: true
      })
    )
  }
  const flow = new Flow({
    flow: true,
    flowWrap: true,
    gap: 5,
    padding: 20,
    children: rects,
    width: 500,
    height: 500
  })
  leafer.add(flow)
  console.log('==========> date: ', rects[20].getAttr('date'))
  console.log('==========> value: ', rects[20].getAttr('value'))
})
</script>

<style scoped></style>
