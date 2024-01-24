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



export interface adminTypeModel {
    id: number
    role: string
    name: string
    active: boolean
    avatar: string
    sort?: number
    description?: string
}

export interface AreaTypeModel {
  id: number
  title_cn: string
  title_en: string
  active: boolean
  image: string
  sort?: number
  area_scope: string
  description?: string
}

export interface trainerTypeModel {
  id: number
  name_cn: string
  name_en: string
  active: boolean
  for_kids: boolean
  f2f_service: boolean
  support_area: string []
  type: string,
  avatar: string
  image: string
  email: string
  phone: number
  score: number
  certificate: string
  gender: 'man'|'woman'
  birthday: string
  address: string
  lnglat: [string, string]
}

export interface customerTypeModel {
  id: number
  name: string
  active: boolean
  type: string
  avatar: string
  email: string
  phone: number
  grade: number
  course: {
    total: number
    already: number
    surplus: number
  }
  trainer: trainerTypeModel[]
  certificate: string
  gender: 'man'|'woman'
  birthday: string
  address: string
}

export interface tagTypeModel {
  id: number
  title_cn: string
  title_en: string
  active: boolean
  image: string
  description?: string
}

export interface sportTypeModel {
  id: number
  title_cn: string
  title_en: string
  sort?: number
  active: boolean
  image: string
  description?: string
}

export interface sortItemTypeModel {
  id: number
  name: string
  sort: number
}
export interface sortTypeModel {
  id: number
  title_cn: string
  title_en: string
  active: boolean
  sort: number
  data: sortItemTypeModel[]
}
  