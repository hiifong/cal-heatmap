export interface IConfig {
  view?: string
  startDate?: Date
  endDate?: Date
  locale?: ILocale
  formatter?: (() => string) | undefined
}

export interface IDataItem {
  date: Date | number | string
  count: number | string
}

export type IData = Array<IDataItem>

export interface ILocale {
  months: Array<string>
  weekDay: Array<string>
  less: string
  more: string
}
