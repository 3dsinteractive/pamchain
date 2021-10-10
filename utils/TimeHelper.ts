import moment from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import utc from 'dayjs/plugin/utc'

moment.extend(relativeTime)
moment.extend(utc)

export const DATETIMEFORMAT = 'YYYY-MM-DD HH:mm'
export const DATEFORMAT = 'YYYY-MM-DD'
export const TIMEFORMAT = 'HH:mm:ss'
const isTimeInValid = (time: any) => time === 'Invalid Date'

export class TimeHelper {

  static toUTC = (time: string): string => {
    if (!time) {
      return ''
    }
    try {
      const newTime = moment(time)
        .subtract(7, 'hour')
        .format('YYYY-MM-DD HH:mm:ss')
      return isTimeInValid(newTime) ? time : newTime
    } catch (e) {
      return time.toString()
    }
  }

  static toLocal = (time: string, format: string = 'YYYY-MM-DD HH:mm:ss'): string => {
    if (!time) {
      return ''
    }
    try {
      const newTime = moment(time).add(7, 'hour').format(format)
      return isTimeInValid(newTime) ? time : newTime
    } catch (e) {
      return time
    }
  }

  static getDay = (time: string): number => {
    if (!time) {
      return 1
    }
    try {
      return +moment(time, 'YYYY-MM-DD HH:mm:ss').format('D')
    } catch (e) {
      return 1
    }
  }

  static getMonth = (time: string): number => {
    if (!time) {
      return 1
    }
    try {
      return +moment(time, 'YYYY-MM-DD HH:mm:ss').format('M')
    } catch (e) {
      return 1
    }
  }

  static getYear = (time: string): number => {
    if (!time) {
      return 1
    }
    try {
      return +moment(time, 'YYYY-MM-DD HH:mm:ss').format('YYYY')
    } catch (e) {
      return 2563
    }
  }

  static getShortTimeForTable = (time: string): string => {
    if (!time) {
      return ''
    }
    try {
      const newTime = moment(time).fromNow()
      return isTimeInValid(newTime) ? time : newTime
    } catch (e) {
      return time
    }
  }

  static getFullTextFormatDate = (time: string): string => {
    if (!time) {
      return ''
    }
    try {
      const newTime = moment(time).format('MMMM D, YYYY')
      return isTimeInValid(newTime) ? time : newTime
    } catch (e) {
      return time
    }
  }

  static getCurrentDate = (): string => {
    const newTime = moment().format('YYYY-MM-DD')
    return isTimeInValid(newTime) ? '' : newTime
  }

  static getCurrentDateTime = (): string => {
    const newTime = moment().format('YYYY-MM-DD HH:mm:ss')
    return isTimeInValid(newTime) ? '' : newTime
  }

  static getDateFromTime = (time: string, format: string = 'DD/MM/YYYY'): string => {
    if (!time) {
      return ''
    }
    const newTime = moment(time).format(format)
    return isTimeInValid(newTime) ? time : newTime
  }

  static isBefore = (date: string, date2: string): boolean =>
    moment(date).isBefore(date2, 'minute')

  static isAfter = (date: string, date2: string): boolean =>
    moment(date).isAfter(date2, 'minute')
}
