import {CSSProperties} from 'react'

export interface paramsTypeModel {
  key: string
  data: any [] | string
  form?: any
  style?: CSSProperties
  placeholder?:string
  rules?: any []
}


export interface optionTypeModel {
  type: string
  name: string
  layout: 'left' | 'right' | 'top' | 'bottom'
  params: paramsTypeModel
  callback: any
}

export interface theadPropsType {
  style?: CSSProperties
  className?: string
  optionList: optionTypeModel[]
  form?:any
}

export interface AreaTypeModel {
    id: number
    title_cn: string
    title_en: string
    active: boolean
    image: string
    area_scope: string
    description?: string
  }
  