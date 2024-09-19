<script setup lang="ts">
import { onMounted } from 'vue'
import { App, Box, Text, PointerEvent } from 'leafer-ui'
import { Flow } from '@leafer-in/flow'
import { Cell } from './CalHeatmap'
const props = defineProps({
  view: {
    type: String,
    required: true
  }
})

onMounted(() => {
  const app = new App({
    view: props.view,
    start: false,
    type: 'document',
    zoom: {
      disabled: true
    },
    tree: {}
  })

  const rects: Array<Cell> = []
  for (let i = 0; i < 100; i++) {
    rects.push(
      new Cell({
        date: 2024,
        value: i,
        width: 20,
        height: 20,
        fill: '#32cd79',
        stroke: 'black',
        strokeWidth: 0.5,
        cornerRadius: 5,
        hoverStyle: { fill: 'rgba(255,205,121, 0.8)' },
        pressStyle: { fill: 'rgba(50,205,121, 1)' },
        draggable: true,
        event: {
          [PointerEvent.ENTER]: function (e: PointerEvent) {
            let cell = e.current as Cell
            // cell.fill = '#32cd79'
            console.log('=========> cell: ', cell)
            console.log('=========> in{ date: ', cell.date, ', value: ', cell.value, ' }')
          },
          [PointerEvent.LEAVE]: function (e: PointerEvent) {
            let cell = e.current as Cell
            // cell.fill = '#32cd79'
            console.log('=========> out{ date: ', cell.date, ', value: ', cell.value, ' }')
          }
        }
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

  const box = new Box({
    x: 200,
    y: 200,
    fill: '#FF4B4B',
    cornerRadius: 20,
    children: [
      new Text({
        text: 'Welcome to LeaferJS',
        fill: 'black',
        padding: [10, 20],
        textAlign: 'left',
        verticalAlign: 'top'
      })
    ]
  })

  app.tree.add(flow)
  app.tree.add(box)
  app.start()
})
</script>

<style scoped></style>
