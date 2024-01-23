import qs from 'qs'
import avatar from '@/assets/head.png'
import avatar0 from '@/assets/avatar/0.jpg'
import avatar1 from '@/assets/avatar/1.jpg'
// import Mock from 'mockjs'
const tokens: any = {
  index0: "index0",
  index1: "index1",
  index2: "index2"
}
const trainers: any = {
  "index0": {
    id: 103,
    name_en: "Max",
    name_cn: "马克斯",
    image: avatar,
    active: true,
    for_kids: false,
    f2f_service: false,
    type: 'tennis',
    avatar: avatar,
    email: 'test@tt.com',
    phone: 98651235,
    score: 5,
    certificate: 'SG3123-2131',
    gender: 'man',
    birthday: '1989-12-12',
    address: 'EZD'
  },
  "index1": {
    id: 121,
    name_en: "Tony",
    name_cn: "拖尼",
    active: true,
    image: avatar0,
    for_kids: false,
    f2f_service: false,
    type: 'tennis',
    avatar: avatar,
    email: 'test@tt.com',
    phone: 98651235,
    score: 5,
    certificate: 'SG3123-2131',
    gender: 'man',
    birthday: '1989-12-12',
    address: 'EZD'
  },
  "index2": {
    id: 112,
    name_en: "Ellen",
    name_cn: "艾伦",
    active: false,
    image: avatar1,
    for_kids: false,
    f2f_service: false,
    type: 'tennis',
    avatar: avatar,
    email: 'test@tt.com',
    phone: 98651235,
    score: 5,
    certificate: 'SG3123-2131',
    gender: 'man',
    birthday: '1989-12-12',
    address: 'EZD'
  }
};



export const getTrainerList = () => {
  const arr = Object.values(trainers)
  const response = {
    code: 0,
    message: 'success',
    data: arr
  }
  return [200, response]
}


export const addTrainer = (config: any) => {
  const { data } = config;
  console.log('data===',data);
  const { id, name_en, name_cn } = qs.parse(data)
  const userArr = Object.values(trainers)
  const fitem = userArr.find((item: any) => item.id === id)
  if(!fitem) { // 新增
    const lastUser = {
      id: id,
      name_en: name_en,
      name_cn: name_cn,
      avatar: avatar1,
    }
    const token = `${id}-token`
    tokens[id as string] = token
    trainers[token] = lastUser
    const response = {
      code: 0,
      message: 'success'
    }
    return [200, response]
  } else {
    const response = {
      code: 1,
      message: 'error'
    }
    return [200, response]
  }
}

export const editTrainer = (config: any) => {
  const { data } = config;
  const { id, name, role, description } = qs.parse(data)
  const userArr = Object.values(trainers)
  const fitem = userArr.find((item: any) => item.id === id)
  if(fitem) {
    const token = `${id}-token`
    trainers[token] = {
      ...trainers[token],
      id: id,
      role: role,
      name: name,
      avatar: avatar1,
      description: description
    }
    const response = {
      code: 0,
      message: 'success'
    }
    return [200, response]
  } else {
    const response = {
      code: 1,
      message: 'error'
    }
    return [200, response]
  }
}

export const deleteTrainer = (config: any) => {
  const { data } = config;
  const { id } = data
  delete trainers[`${id}-token`]
  delete tokens[id as string]
  const response = {
    code: 0,
    message: 'success'
  }
  return [200, response]
}

