// import { CSSProperties, ReactNode, useEffect } from "react"
import { Button, Table, Card, Space, Tag, Divider, message, Popconfirm } from 'antd'
import styles from './style.module.scss'
import { theadPropsType } from '@/model/common.model'



export default function TheadPage(props: theadPropsType) {
    const renderView = (props:theadPropsType) => {
        const templateLeft:any = []
        const templateRight:any = []
        console.log(props.menuList, 'menuList')
        props.menuList.forEach((item:any, index: number) => {
            console.log(item)
            if(item.layout === 'left') {
                templateLeft.push(renderLeftItem(item, 'left_' + index))
            }
            if(item.layout === 'right') {
                templateRight.push(renderRightItem(item, 'right_' + index))
            }
        })
        
        const leftdom = renderLeft(templateLeft)
        const rightdom = renderRight(templateRight)
        return [leftdom, rightdom]

    }
    const renderLeftItem = (item:any, key:string) => {
        return (<Button type="primary" key={key} disabled={item.params.data.length <= 0} onClick={() => {item.callback()}}>{item.name}</Button> )
    }

    const renderRightItem = (item:any, key:string) => {
        return ( <Button type="primary" key={key} onClick={() => {item.callback()}}>{item.name}</Button>  )
    } 

    const renderLeft = (template:any) => {
        if (template.length > 0) {
            return (
                <div key={'left'} className={styles.area_manage_head_left}>
                    {template}
                </div>
            )
        } else {
            return null
        }
    
    }
    const renderRight = (template:any) => {
        if (template.length > 0) {
            return (
                <div key={'right'} className={styles.area_manage_head_right}>
                    {template}
                </div>
            )
        } else {
            return null
        }
    
    }

  return (
    <div className={props.className} style={{ margin: '20px', ...props.style }}>
      <div className={styles.area_manage_haed}>
        {renderView(props)}
      </div>
    </div>
  )
}