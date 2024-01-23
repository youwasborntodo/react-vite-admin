import { get, post } from '../utils/fetch'


export const getTrainerInfo = (params: any = {}, config: any = {}) => {
  return get('/api/trainerInfo', params, config)
}

export const getTrainerList = (params: any = {}, config: any = {}) => {
  return get('/api/getTrainerList', params, config)
}

export const addTrainer = (params: any = {}, config: any = {}) => {
  return post('/api/addTrainer', params, config)
}

export const editTrainer = (params: any = {}, config: any = {}) => {
  return post('/api/editTrainer', params, config)
}

export const deleteTrainer = (params: any = {}, config: any = {}) => {
  return post('/api/deleteTrainer', params, config)
}
