<script setup lang="ts">
import { onMounted } from 'vue'
import { App, Box, Text, PointerEvent } from 'leafer-ui'
import { Flow } from '@leafer-in/flow'
import { Cell } from './Cell'
import { ScrollBar } from '@leafer-in/scroll'
import dayjs from 'dayjs'

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
    tree: {},
    sky: {}
  })

  new ScrollBar(app)

  console.log('----> day:', Math.ceil(dayjs().diff(dayjs().subtract(1, 'year').startOf('week').toDate(), 'day', true)))
  console.log('----> day: ', dayjs().subtract(1, 'year').startOf('week').toDate())

  const rects: Array<Cell> = []
  for (let i = 0; i < Math.ceil(dayjs().diff(dayjs().subtract(1, 'year').startOf('week'), 'day', true)); i++) {
    rects.push(
      new Cell({
        date: 2024,
        value: i,
        width: 20,
        height: 20,
        fill: '#32cd79',
        cornerRadius: 5,
        draggable: true,
        event: {
          [PointerEvent.ENTER]: function (e: PointerEvent) {
            let cell = e.current as Cell
            cell.fill = '#22ffaa'
            // console.log('=========> in{ date: ', cell.date, ', value: ', cell.value, ' }')
          },
          [PointerEvent.LEAVE]: function (e: PointerEvent) {
            let cell = e.current as Cell
            cell.fill = '#32cd79'
          },
          [PointerEvent.CLICK]: function (e: PointerEvent) {
            let cell = e.current as Cell
            console.log('=========> cell: ', cell)
          }
        }
      })
    )
  }
  const flow = new Flow({
    flow: 'y',
    flowWrap: true,
    gap: 5,
    padding: 20,
    children: rects,
    width: 760,
    height: 220
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
