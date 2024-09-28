import { App, Box, Text, PointerEvent } from 'leafer-ui'
import { Flow } from '@leafer-in/flow'
import { Cell } from './Cell'
import { ScrollBar } from '@leafer-in/scroll'
import dayjs from 'dayjs'
import advancedFormat from 'dayjs/plugin/advancedFormat'
import type { IConfig, IData, ILocale } from './Interface'
import { defaultConfig, defaultLevelColor, defaultLocale } from './Config'

dayjs.extend(advancedFormat)

const onEnter = (e: PointerEvent) => {
  const cell = e.current as Cell
  cell.fill = '#22ffaa'
  console.log('=========> pos: { x: ', e.x, ', y: ', e.y)
  const box = new Box({
    x: e.x,
    y: e.y,
    fill: '#25292e',
    cornerRadius: 8,
    children: [
      {
        tag: 'Text',
        text: `${cell.value > 0 ? cell.value : 'No'} contributions on ${dayjs(cell.date).format('MMMM Do')}`,
        fill: '#ffffff',
        padding: [5, 5],
        textAlign: 'center',
        verticalAlign: 'middle'
      }
    ]
  })
  console.log('=====> id: ', box.innerId)
  console.log('=====> date: ', cell.date)

  const parent = cell.parent?.parent
  parent?.add(box)
  setTimeout(() => {
    box.destroy()
  }, 500)
}

export class CalHeatmap {
  private readonly config: IConfig
  public data?: IData
  private readonly levelColor: Array<string> = defaultLevelColor
  private readonly locale: ILocale = defaultLocale

  private dayCount: number = 365
  private today: Date = dayjs().toDate()

  private app!: App
  private toolTipId?: number

  constructor(config?: IConfig, data?: IData) {
    this.config = Object.assign({}, defaultConfig, config)
    this.data = data

    this.dayCount = Math.ceil(dayjs().diff(this.config.startDate, 'day', true))
    console.log('======> config: ', this.config)
    this.init()
  }

  private init() {
    this.initApp()
    console.log('----> day count:', this.dayCount)
    console.log('----> start date: ', this.config.startDate)
    console.log('----> end date: ', this.config.endDate)

    const rects: Array<Cell> = []
    for (let i = 0; i < this.dayCount; i++) {
      const color = this.levelColor[i % 5]
      rects.push(
        new Cell({
          date: dayjs(this.config.startDate).add(i, 'day').toDate(),
          value: i,
          width: 20,
          height: 20,
          fill: color,
          cornerRadius: 5,
          draggable: true,
          event: {
            [PointerEvent.ENTER]: onEnter,
            [PointerEvent.LEAVE]: function (e: PointerEvent) {
              const cell = e.current as Cell
              cell.fill = color
            },
            [PointerEvent.CLICK]: function (e: PointerEvent) {
              const cell = e.current as Cell
              console.log('=========> cell: ', cell)
            }
          }
        })
      )
    }
    const flow = new Flow({
      x: 20,
      y: 20,
      flow: 'y',
      flowWrap: true,
      gap: 5,
      padding: 20,
      children: rects,
      width: 760,
      height: 220
    })

    this.app.tree.add(flow)
    this.app.start()

    console.log('=====> flow bounds: ', this.app.tree.getBounds('box', this.app.tree))
  }

  private initApp() {
    this.app = new App({
      view: this.config.view,
      start: false,
      type: 'document',
      zoom: {
        disabled: true
      },
      ground: {},
      tree: {},
      sky: {}
    })

    const mon = new Text({
      x: 5,
      y: 65,
      fill: 'rgb(50,205,121)',
      text: 'Mon'
    })
    const wed = new Text({
      x: 5,
      y: 115,
      fill: 'rgb(50,205,121)',
      text: 'Wed'
    })
    const fri = new Text({
      x: 5,
      y: 165,
      fill: 'rgb(50,205,121)',
      text: 'Fri'
    })
    this.app.tree.add(mon)
    this.app.tree.add(wed)
    this.app.tree.add(fri)

    const less = new Text({
      x: 5,
      y: 165,
      fill: 'rgb(50,205,121)',
      text: 'Less'
    })
    const more = new Text({
      x: 5,
      y: 165,
      fill: 'rgb(50,205,121)',
      text: 'More'
    })

    const legendItems: Array<any> = [less]
    for (let i = 0; i < 5; i++) {
      const color = this.levelColor[i % 5]
      legendItems.push(
        new Cell({
          width: 20,
          height: 20,
          fill: color,
          cornerRadius: 5,
          draggable: true
        })
      )
    }
    legendItems.push(more)

    const legendFlow = new Flow({
      x: 300,
      y: 220,
      height: 20,
      gap: 5,
      children: legendItems
    })
    this.app.ground.add(legendFlow)
    new ScrollBar(this.app)
    console.log('=====> ground bounds: ', this.app.ground.getBounds('box', this.app))
  }
}
