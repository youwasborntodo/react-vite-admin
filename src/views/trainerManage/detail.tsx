import { Button, Space, Form, Input,Select, Switch,Checkbox, DatePicker, Divider, message, Upload, GetProp ,CheckboxProps} from 'antd'
import { PlusOutlined } from "@ant-design/icons"
import PageWrap from '@/components/page'
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {  addTrainer, editTrainer } from '@/api/trainer'
import { trainerTypeModel } from '@/model/common.model'
import styles from './area.module.scss'
import LnglatInput from '@/components/lnglatInput/index'
type CheckboxValueType = GetProp<typeof Checkbox.Group, 'value'>[number];

function trainerDetail() {
  const [messageApi] = message.useMessage();
    const [trainerForm] = Form.useForm();
    const initialValues = {
      support_area: [],
      lnglat: ['123.11', '1.22'], // 经纬度
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
          lnglat: ['123.11', '1.22'], // 经纬度
          for_kids: false,
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

    const normFile = (e: any) => {
      if (Array.isArray(e)) {
        return e;
      }
      return e?.fileList;
    };

    const onGenderChange = (e:any) => {
      console.log(e)
    }
    

    const onTypeChange = (e:any) => {
      console.log(e)
    }
    
    const handleCancel = () => {
      trainerForm.resetFields()
      navigate(-1)
    }

    const checkboxOptions = ['EZD', 'NZD', 'WZD', 'CZD'];
    // const defaultCheckedList = ['Apple', 'Orange'];

    // const [checkedList, setCheckedList] = useState<CheckboxValueType[]>(defaultCheckedList);

    // const checkAll = plainOptions.length === checkedList.length;
    // const indeterminate = trainerForm.support_area.length > 0 && checkedList.length < plainOptions.length;
  
    const onChange = (list: CheckboxValueType[]) => {
      // setCheckedList(list);
      console.log(trainerForm.getFieldValue('support_area'), 'trainerform---', list)
    };

    const onCheckAllChange: CheckboxProps['onChange'] = (e) => {
      // setCheckedList(e.target.checked ? plainOptions : []);
      console.log(trainerForm, 'trainerform--2-')
    };



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
               <Form className='tw-mt-[20px]' initialValues={initialValues} form={trainerForm} name="trainer" labelCol={{ span: 4 }}>
                  {renderId()}
                  <Form.Item name="name_en" label="User Name" rules={[{ required: true }]}>
                    <Input placeholder="name" />
                  </Form.Item>
                  <Form.Item name="name_cn" label="用户名" rules={[{ required: true }]}>
                    <Input placeholder="name" />
                  </Form.Item>
                  <Form.Item label="是否可以给小朋友上课" name='for_kids' valuePropName="for_kids">
                    <Switch />
                  </Form.Item>
                  <Form.Item label="是否支持上门" name='f2f_service' valuePropName="for_kids">
                    <Switch />
                  </Form.Item>
                  <div className={styles.grid_layout}>
                    <div className={styles.grid}>
                      <Form.Item name="address" label="所在地址" rules={[{ required: true }]}>
                        <Input placeholder="所在地址" />
                      </Form.Item>
                    </div>
                    <div className={styles.grid}>
                      <LnglatInput form={trainerForm}></LnglatInput>
                    </div>
                  </div>
                  <Form.Item label='运动类型' name='type' rules={[{ required: true }]}>
                    <Select
                      placeholder="Select a option and change input text above"
                      onChange={onTypeChange}
                    >
                      <Select.Option value="yoga">瑜伽</Select.Option>
                      <Select.Option value="gym">健身</Select.Option>
                      <Select.Option value="tennis">网球</Select.Option>
                    </Select>
                  </Form.Item>    
                  <Form.Item label='服务区域' name='support_area' rules={[{ required: true, message: '请选择服务区域' }]}>
                      <CheckboxGroup options={checkboxOptions} onChange={onChange} />
                  </Form.Item>    
                  <Form.Item name="phone" label="电话"  rules={[{ required: true }]}>
                    <Input placeholder="联系电话" type='number' />
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