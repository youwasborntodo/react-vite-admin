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
const areas: any = {
  "index0": {
    id: 10,
    title_en: "NZD",
    title_cn: "北区",
    image: avatar,
    active: true,
    area_scope: "拥有系统内所有菜单和路由权限",
  },
  "index1": {
    id: 11,
    title_en: "EZD",
    title_cn: "东区",
    active: true,
    image: avatar0,
    area_scope:"可以看到除户管理页面之外的所有页面",
  },
  "index2": {
    id: 12,
    title_en: "WED",
    title_cn: "西区",
    active: false,
    image: avatar1,
    area_scope:"仅能看到首页、权限测试页面",
  }
};



export const getAreaList = () => {
  const arr = Object.values(areas)
  const response = {
    code: 0,
    message: 'success',
    data: arr
  }
  return [200, response]
}


export const addArea = (config: any) => {
  const { data } = config;
  console.log('data===',data);
  const { id, name, role, description } = qs.parse(data)
  const userArr = Object.values(areas)
  const fitem = userArr.find((item: any) => item.id === id)
  if(!fitem) { // 新增
    const lastUser = {
      id: id,
      role: role,
      name: name,
      avatar: avatar1,
      description: description
    }
    const token = `${id}-token`
    tokens[id as string] = token
    areas[token] = lastUser
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

export const editArea = (config: any) => {
  const { data } = config;
  const { id, name, role, description } = qs.parse(data)
  const userArr = Object.values(areas)
  const fitem = userArr.find((item: any) => item.id === id)
  if(fitem) {
    const token = `${id}-token`
    areas[token] = {
      ...areas[token],
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

export const deleteArea = (config: any) => {
  const { data } = config;
  const { id } = data
  delete areas[`${id}-token`]
  delete tokens[id as string]
  const response = {
    code: 0,
    message: 'success'
  }
  return [200, response]
}

