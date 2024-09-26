import { Rect, RectData, registerUI, dataProcessor, dataType } from 'leafer-ui'
import type { IRectInputData, IRectData } from '@leafer-ui/interface'

// 定义数据接口
export interface IHeatmapInputData extends IRectInputData {
  // 输入数据接口，需定义为可选项，比如: width?: number | string
  date?: number
  value?: number
}

export interface IHeatmapData extends IRectData {
  // 数据处理（计算数据）接口, 需定义为可选项，比如: width?: number
}

// 定义数据处理类
export class HeatmapData extends RectData implements IHeatmapData {
  // 元素数据类，负责元素的数据处理， 没有特殊处理逻辑的情况，定义一个空类就行
  _date?: number
  _value?: number

  //会自动转为 width 的 setter函数 并移除掉，所以不要调用super.setWidth(value)
  setDate(value: number): void {
    if (value < 0) {
      value = 0
    }
    this._date = value
    // 通过 this.__leaf 可访问元素自身
  }

  setValue(value: number): void {
    if (value < 0) {
      value = 0
    }
    this._value = value
  }
}

// 注册自定义元素
@registerUI()
export class Heatmap extends Rect {
  // 定义全局唯一的tag名称
  public get __tag() {
    return 'Heatmap'
  }

  // 注册数据处理类，防止污染被继承元素的数据
  @dataProcessor(HeatmapData)
  public declare __: IHeatmapData

  // 4定义初始化输入数据
  constructor(data: IHeatmapInputData) {
    super(data)
    // ...
  }

  @dataType(0)
  public declare date: number

  @dataType(0)
  public declare value: number
}
