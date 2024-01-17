import {CSSProperties} from 'react'

export interface paramsTypeModel {
  data: any []
}


export interface menuTypeModel {
  type: string
  name: string
  layout: 'left' | 'right'
  params: paramsTypeModel
  callback: any
}

export interface theadPropsType {
  style?: CSSProperties
  className?: string
  menuList: menuTypeModel[]
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
  