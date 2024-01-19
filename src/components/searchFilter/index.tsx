import { Button, Form, Radio, Space, Tag, Select, message, Input } from 'antd'
// import { ReactNode } from 'react'
import styles from './style.module.scss'
import { theadPropsType } from '@/model/common.model'



export default function SearchFilterPage(props: theadPropsType) {
    // const options: SelectProps['options'] = [];
    const [form] = Form.useForm()
    const renderView = (props:theadPropsType) => {
        const templateTop:any = []
        const templateBottom:any = []
        props.optionList.forEach((item:any, index: number) => {
            if(item.layout === 'top') {
                templateTop.push(renderTopItem(item, 'top_' + index))
            }
            if(item.layout === 'bottom') {
                templateBottom.push(renderBottomItem(item, 'bottom_' + index))
            }
        })
        
        const topdom = renderTop(templateTop)
        const bottomdom = renderBottom(templateBottom)
        return [topdom, bottomdom]

    }
    const renderTopItem = (item:any, key:string) => {
        const templateChildren = (item:any) => {
            switch(item.type) {
                case 'select':
                    return (
                        <Form.Item name={item.params.key}>
                            <Select
                                onChange={(value) => {
                                    item?.callback(value)
                                }}
                                style={{minWidth: 200}}
                                options={item.params.data}
                            /> 
                        </Form.Item>
                        )
                case 'input':
                    return (
                        <Form.Item name={item.params.key} rules={item.params.rules ? item.params.rules : []} validateTrigger={'onChange'}>
                            <Input placeholder={item.params.placeholder} 
                                onChange={(e) => {
                                    item?.callback(e.target.value)
                            }}/>
                        </Form.Item>
                        )
                case 'button': 
                    return (
                        <Form.Item name={item.params.key}>
                            <Button type='primary' onClick={() => {
                                item?.callback()
                            }}>{item.name}</Button> 
                        </Form.Item>
                        )
                default: 
                    return null
            }
        }
        return <div key={key} style={item.params.style ? {...item.params.style} : {}} className={styles.form_item}>{templateChildren(item)}</div>
    
    }

    const renderBottomItem = (item:any, key:string) => {
        const dataList = item?.params?.data
        if(dataList.length > 0) {
            const templateArray:any = []
            dataList.forEach((option:any, index:number) => {
                templateArray.push(<Radio.Button key={index} value={option.value}>{option.name_cn}</Radio.Button>)
            })
            return (
                <Radio.Group key={key} value={item.params.form.type} onChange={(e) => {
                    item?.callback(e.target.value)
                }} style={{}}>
                    {[...templateArray]}
                </Radio.Group>)
        } else {
            return null
        }

    } 

    const renderTop = (template:any) => {
        if (template.length > 0) {
            return (
                <div key={'left'} className={styles.search_form_top}>
                    <Form layout='inline' form={form} initialValues={props.form} name='filterForm'>
                        {template}
                    </Form>
                </div>
            )
        } else {
            return null
        }
    }

    const renderBottom = (template:any) => {
        if (template.length > 0) {
            return (
                <div key={'top'} className={styles.search_form_bottom}>
                    {template}
                </div>
            )
        } else {
            return null
        }
    
    }

  return (
    <div className={props.className} style={{ margin: '20px', ...props.style }}>
      <div className={styles.search_filter_haeder}>
        {renderView(props)}
      </div>
    </div>
  )
}