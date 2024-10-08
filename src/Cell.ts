import { Rect, RectData, registerUI, dataProcessor, dataType } from 'leafer-ui'
import type { IRectInputData, IRectData } from '@leafer-ui/interface'

// 定义数据接口
export interface ICellInputData extends IRectInputData {
  // 输入数据接口，需定义为可选项，比如: width?: number | string
  date?: Date
  value?: number | string | undefined
}

export interface ICellData extends IRectData {
  // 数据处理（计算数据）接口, 需定义为可选项，比如: width?: number
}

// 定义数据处理类
export class CellData extends RectData implements ICellData {
  // 元素数据类，负责元素的数据处理， 没有特殊处理逻辑的情况，定义一个空类就行
  _date?: Date
  _value?: number | string

  //会自动转为 width 的 setter函数 并移除掉，所以不要调用super.setWidth(value)
  setDate(value: Date): void {
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
export class Cell extends Rect {
  // 定义全局唯一的tag名称
  public get __tag() {
    return 'Cell'
  }

  // 注册数据处理类，防止污染被继承元素的数据
  @dataProcessor(CellData)
  public declare __: ICellData

  // 4定义初始化输入数据
  constructor(data: ICellInputData) {
    super(data)
    // ...
  }

  @dataType(0)
  public declare date: number

  @dataType(0)
  public declare value: number
}
