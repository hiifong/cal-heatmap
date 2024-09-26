import { App, PointerEvent } from 'leafer-ui'
import { Flow } from '@leafer-in/flow'
import { Cell } from './Cell'
import { ScrollBar } from '@leafer-in/scroll'
import dayjs from 'dayjs'
import type { IConfig, IData, ILocale } from './Interface'
import { defaultConfig, defaultLevelColor, defaultLocale } from './Config'

export class CalHeatmap {
  private readonly config: IConfig
  public data?: IData
  private readonly levelColor: Array<string> = defaultLevelColor
  private readonly locale: ILocale = defaultLocale

  constructor(config: IConfig = defaultConfig, data?: IData, locale?: ILocale) {
    this.config = config
    if (data) {
      this.data = data
    }
    if (locale) {
      this.locale = locale
    }
    console.log('======> config: ', this.config.view)
    this.init()
  }

  private init() {
    const app = new App({
      view: this.config.view,
      start: false,
      type: 'document',
      zoom: {
        disabled: true
      },
      tree: {},
      sky: {}
    })

    new ScrollBar(app)

    console.log(
      '----> day:',
      Math.ceil(dayjs().diff(dayjs().subtract(1, 'year').startOf('week').toDate(), 'day', true))
    )
    console.log('----> day: ', dayjs().subtract(1, 'year').startOf('week').toDate())

    const rects: Array<Cell> = []
    for (let i = 0; i < Math.ceil(dayjs().diff(dayjs().subtract(1, 'year').startOf('week'), 'day', true)); i++) {
      const color = this.levelColor[i % 5]
      rects.push(
        new Cell({
          date: 2024,
          value: i,
          width: 20,
          height: 20,
          fill: color,
          cornerRadius: 5,
          draggable: true,
          event: {
            [PointerEvent.ENTER]: function (e: PointerEvent) {
              const cell = e.current as Cell
              cell.fill = '#22ffaa'
              // console.log('=========> in{ date: ', cell.date, ', value: ', cell.value, ' }')
            },
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
      flow: 'y',
      flowWrap: true,
      gap: 5,
      padding: 20,
      children: rects,
      width: 760,
      height: 220
    })

    app.tree.add(flow)
    app.start()
  }
}
