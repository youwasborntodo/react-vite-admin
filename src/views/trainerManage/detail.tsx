import { Button, Space, Form, Input,Select, Switch, DatePicker, message, Upload } from 'antd'
import { PlusOutlined } from "@ant-design/icons"
import PageWrap from '@/components/page'
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {  addArea, editArea } from '@/api/area'
import { trainerTypeModel } from '@/model/common.model'
import styles from './area.module.scss'

function trainerDetail() {
  const [messageApi] = message.useMessage();
    const [trainerForm] = Form.useForm();
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const params = useParams()

    const navigate = useNavigate()
    const handleOk = () => {
      console.log(trainerForm)
      trainerForm.validateFields().then(res => {
        // setLoad(true)
        const { id, name, description } = res
        const params: trainerTypeModel = {
          id: id ,
          name_en: name,
          name_cn: name,
          active: false,
          image: '',
          address: description,
          for_kids: false,
          avatar: '',
          email: '',
          phone: 0,
          score: 0,
          certificate: '',
          gender: 'man',
          birthday: '',
          description: ''
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

    const normFile = (e: any) => {
      if (Array.isArray(e)) {
        return e;
      }
      return e?.fileList;
    };

    const onGenderChange = (e:any) => {
      console.log(e)
    }
    
    const handleCancel = () => {
      trainerForm.resetFields()
      navigate(-1)
    }

    const renderId = () => {
      if(isEdit) {
        return (
          <Form.Item id="id" label="用户ID" rules={[{ required: true }]}>
          <Input placeholder="id"  disabled={isEdit} />
        </Form.Item>
          )
      }

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
               <Form className='tw-mt-[20px]' form={trainerForm} name="trainer" labelCol={{ span: 4 }}>
                  {renderId()}
                  <Form.Item name="name" label="用户名" rules={[{ required: true }]}>
                    <Input placeholder="name" />
                  </Form.Item>
                  <Form.Item label="是否可以给小朋友上课" name='for_kids' valuePropName="for_kids">
                    <Switch />
                  </Form.Item>
                  <Form.Item name="address" label="场馆地址" rules={[{ required: true }]}>
                    <Input placeholder="场馆地址" />
                  </Form.Item>
                  <Form.Item name="phone" label="电话" rules={[{ required: true }]}>
                    <Input placeholder="联系电话" />
                  </Form.Item>
                  <Form.Item name="email" label="邮箱" rules={[{ required: true }]}>
                    <Input placeholder="邮箱地址" />
                  </Form.Item>
                  <Form.Item
                    label="生日"
                    name="birthday"
                    rules={[{ required: true, message: 'Please input!' }]}
                  >
                    <DatePicker />
                  </Form.Item>
                  <Form.Item name="gender" label="性别" rules={[{ required: true }]}>
                  <Select
                    placeholder="Select a option and change input text above"
                    onChange={onGenderChange}
                  >
                    <Select.Option value="male">male</Select.Option>
                    <Select.Option value="female">female</Select.Option>
                  </Select>
                </Form.Item>              

                  <Form.Item label="图片" valuePropName="image" getValueFromEvent={normFile}>
                    <Upload action="/upload.do" listType="picture-card">
                      <button style={{ border: 0, background: 'none' }} type="button">
                        <PlusOutlined />
                        <div style={{ marginTop: 8 }}>Upload</div>
                      </button>
                    </Upload>
                  </Form.Item>
               
                  <Form.Item label="资质" valuePropName="certificate" getValueFromEvent={normFile}>
                    <Upload action="/upload.do" listType="picture-card">
                      <button style={{ border: 0, background: 'none' }} type="button">
                        <PlusOutlined />
                        <div style={{ marginTop: 8 }}>Upload</div>
                      </button>
                    </Upload>
                  </Form.Item>
                  <Form.Item name="description" label="描述">
                    <Input.TextArea placeholder="description" />
                  </Form.Item>
      
                  <Form.Item name='operation' wrapperCol={{ span: 12, offset: 6 }}>
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
export default trainerDetail