import { get, post } from '../utils/fetch'


export const getAreaInfo = (params: any = {}, config: any = {}) => {
  return get('/api/areaInfo', params, config)
}

export const getAreasList = (params: any = {}, config: any = {}) => {
  return get('/api/getAreaList', params, config)
}

export const addArea = (params: any = {}, config: any = {}) => {
  return post('/api/addArea', params, config)
}

export const editArea = (params: any = {}, config: any = {}) => {
  return post('/api/editArea', params, config)
}

export const deleteArea = (params: any = {}, config: any = {}) => {
  return post('/api/deleteArea', params, config)
}
