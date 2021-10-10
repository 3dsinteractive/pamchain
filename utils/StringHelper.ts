import urlJoin from 'url-join'

export class StringHelper {

  static getSlugFromText = (str: string): string => {
    const regexpSpacialLetter: RegExp = /[\_|\`|\~|\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\+|\=|\[|\{|\]|\}|\||\\|\'|\<|\,|\.|\>|\?|\/|\""|\;|\:|\s]+/g
    return str.toLowerCase().replace(/\s+/g, '-').replace(/\-\-+/g, '-').replace(/^-+/, '').replace(/-+$/, '').replace(regexpSpacialLetter, '')
  }

  static getAliasFromText = (str: string): string => {
    const regexpSpacialLetter: RegExp = /[\_|\`|\~|\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\+|\=|\[|\{|\]|\}|\||\\|\'|\<|\,|\.|\>|\?|\/|\""|\;|\:|\s]+/g
    return str.toLowerCase().replace(/\s+/g, '-').replace(/\-\-+/g, '-').replace(/^-+/, '').replace(/-+$/, '').replace(/[ก-๙]/g, '').replace(regexpSpacialLetter, '')
  }

  static genString = (length: number = 5) => {
    let result = ''
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    const charactersLength = characters.length
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength))
    }
    return result
  }

  static copyToClipBoard = (value: string = '') => {
    const textArea: any = window.document.createElement('textarea')
    textArea.value = value
    window.document.body.appendChild(textArea)
    textArea.select()
    window.document.execCommand('Copy')
    textArea.remove()
  }

  static toPascalCase = (str: string): string => {
    return `${str}`.replace(new RegExp(/[-_]+/, 'g'), ' ').replace(new RegExp(/[^\w\s]/, 'g'), '').replace(new RegExp(/\s+(.)(\w+)/, 'g'),
      ($1, $2, $3) => `${$2.toUpperCase() + $3.toLowerCase()}`).replace(new RegExp(/\s/, 'g'), '').replace(new RegExp(/\w/), s => s.toUpperCase())
  }

  static capitalize = (str: string): string => {
    return `${str}`.replace(new RegExp(/[^\w\s]/, 'g'), '').replace(new RegExp(/[-_]+/, 'g'), ' ').replace(new RegExp(/\s+(.)(\w+)/, 'g'),
      ($1, $2, $3) => `${' ' + $2.toUpperCase() + $3.toLowerCase()}`).replace(new RegExp(/\w/), s => s.toUpperCase())
  }

  static toSnakeCase = (str: string): string => {
    return `${str}`.replace(new RegExp(/[\s]/, 'g'), '_').toLowerCase()
  }

  static split = (str: string | null | undefined, separator: string | RegExp): string[] => {
    return `${str || ''}`.split(separator).filter((item: string) => item).map((item: string) => item.trim())
  }

  static joinURL = (value: any, value2: any): string => {
    return urlJoin(value, value2)
  }

  static toString = (value: any): string => {
    return value || ''
  }

  static truncate = (str: any, num = 300) => {
    str = str || ''
    if (str.length > num) {
      return str.slice(0, num) + '...'
    } else {
      return str
    }
  }
}
