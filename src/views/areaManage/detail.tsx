import { Button, Space, Form, Input, message} from 'antd'
import PageWrap from '@/components/page'
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {  addArea, editArea } from '@/api/area'
import { AreaTypeModel } from '@/model/common.model'
import styles from './area.module.scss'

function areaDetail() {
  const [messageApi] = message.useMessage();
    const [form] = Form.useForm();
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const params = useParams()

    const navigate = useNavigate()
    const handleOk = () => {
      console.log(form)
      form.validateFields().then(res => {
        // setLoad(true)
        const { id, name, role, description } = res
        const params: AreaTypeModel = {
          id: id ,
          title_en: name,
          title_cn: name,
          active: false,
          image: '',
          area_scope: description
        }
        if(isEdit) {
          editArea(params).then((data: any) => {
            // setLoad(false)
            if(data.code === 0) {
              messageApi.success('修改成功')
              // setIsModalOpen(false)
              navigate(-1)
            }
          }).catch(() => {
            // setLoad(false)
          })
        } else {
          addArea(params).then((data: any) => {
            if(data.code === 0) {
              messageApi.success('新增成功')
              navigate(-1)
            }
          }).catch(() => {
            // setLoad(false)
          })
        }
      })
    }
    const handleCancel = () => {
      form.resetFields()
      navigate(-1)
    }
    useEffect(() => {
        console.log(params, 'params----')
        if(params.type && params.type === 'create') {
          setIsEdit(false)
        } else {
          setIsEdit(true)
        }
    }, [])
    return (<PageWrap className={styles.area_manage_detail}>
               <Form className='tw-mt-[20px]' form={form} name="user-form" labelCol={{ span: 4 }}>
                <Form.Item name="id" label="用户ID" rules={[{ required: true }]}>
                  <Input placeholder="id" disabled={isEdit} />
                </Form.Item>
                <Form.Item name="name" label="用户名称" rules={[{ required: true }]}>
                  <Input placeholder="name" />
                </Form.Item>
                <Form.Item name="description" label="描述">
                  <Input.TextArea placeholder="description" />
                </Form.Item>
                <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
                  <Space>
                    <Button onClick={handleOk} type="primary" htmlType="submit">
                      Submit
                    </Button>
                    <Button onClick={handleCancel} htmlType="reset">Cancel</Button>
                  </Space>
                </Form.Item>
                </Form>
            </PageWrap>)
}
export default areaDetail