import type { IConfig, ILocale } from './Interface'

export const defaultConfig: IConfig = {
  view: 'cal-heatmap',
  formatter: undefined
}

export const defaultLevelColor: Array<string> = ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39']

export const deafultWeekDay: Array<string> = ['', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

export const defaultMonths: Array<string> = [
  '',
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec'
]

export const defaultLocale: ILocale = {
  months: defaultMonths,
  weekDay: deafultWeekDay,
  less: 'Less',
  more: 'More'
}
