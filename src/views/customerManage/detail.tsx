import { Button, Space, Form, Input,Select, Switch,Checkbox, Card, Divider, message, Upload, GetProp ,CheckboxProps} from 'antd'
import { PlusOutlined } from "@ant-design/icons"
import PageWrap from '@/components/page'
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {  addTrainer, editTrainer } from '@/api/trainer'
import { trainerTypeModel } from '@/model/common.model'
import styles from './customer.module.scss'
type CheckboxValueType = GetProp<typeof Checkbox.Group, 'value'>[number];

function trainerDetail() {
  const [messageApi] = message.useMessage();
    const [trainerForm] = Form.useForm();
    const initialValues = {
      support_area: [],
    }
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const params = useParams()
    const CheckboxGroup = Checkbox.Group;
    const navigate = useNavigate()
    const handleOk = () => {
      console.log(trainerForm)
      trainerForm.validateFields().then(res => {
        // setLoad(true)
        const { id, name } = res
        const params: trainerTypeModel = {
          id,
          name_en: name,
          name_cn: name,
          active: false,
          image: '',
          address: '',
          for_kids: false,
          lnglat: ['', ''],
          f2f_service: false,
          support_area: ['EZD'],
          type: '',
          avatar: '',
          email: '',
          phone: 0,
          score: 0,
          certificate: '',
          gender: 'man',
          birthday: '',
        }
        if(isEdit) {
          editTrainer(params).then((data: any) => {
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
          addTrainer(params).then((data: any) => {
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
              <div className="basicInfo">
                <h2>基本信息</h2>
                <Form className='tw-mt-[20px]' initialValues={initialValues} form={trainerForm} name="trainer" labelCol={{ span: 4 }}>
                  {renderId()}
                  <Form.Item name="name_cn" label="用户名" rules={[{ required: true }]}>
                    <Input placeholder="name" />
                  </Form.Item>
                  <Form.Item name="address" label="所在地址" rules={[{ required: true }]}>
                    <Input placeholder="所在地址" />
                  </Form.Item>
        
                  <Form.Item name="phone" label="电话"  rules={[{ required: true }]}>
                    <Input placeholder="联系电话" type='number' />
                  </Form.Item>
                  <Form.Item name="email" label="邮箱" rules={[{ required: true }]}>
                    <Input placeholder="邮箱地址" />
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

                </Form>
              </div>
              <h2>课程</h2>
              <div className={styles.courseContent}>
              <Card title="Card title" className={styles.course_card} bordered={false} style={{ width: 300 }}>
                <p>Card content</p>
                <p>Card content</p>
                <p>Card content</p>
              </Card>
              <Card title="Card title" className={styles.course_card} bordered={false} style={{ width: 300 }}>
                <p>Card content</p>
                <p>Card content</p>
                <p>Card content</p>
              </Card>
              </div>
              <div className={styles.operation}>
                <Space>
                      <Button onClick={handleOk} type="primary" danger htmlType="submit">
                        封禁
                      </Button>
                      <Button onClick={handleCancel} htmlType="reset">返回</Button>
                    </Space>
              </div>
            </PageWrap>)
}
export default trainerDetail