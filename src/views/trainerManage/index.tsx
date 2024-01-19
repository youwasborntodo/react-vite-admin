import { Button, Table, Card, Space, Tag, Divider, message, Popconfirm } from 'antd'
// import TypingCard from '@/components/typingCard'
import PageWrap from '@/components/page'
import type { ColumnsType } from 'antd/es/table';
import type { DragEndEvent } from '@dnd-kit/core';
import { DndContext, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import {
  SortableContext,
  arrayMove,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { AreaTypeModel, optionTypeModel } from '@/model/common.model'
import { FormOutlined, DeleteOutlined } from '@ant-design/icons';
import { getAreasList, deleteArea } from '@/api/area'
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { GlobalConfigState } from '@/types/reducer';
import { updateUserinfo } from '@/reducers/userReducer'
import { useIntl } from 'react-intl'
import { useTitle } from 'ahooks'
import { useNavigate } from 'react-router-dom';
import TheadPage from '@/components/tableHeader';
import SearchFilterPage from '@/components/searchFilter';

interface RowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  'data-row-key': string;
}

function trainerManage() {
  const { formatMessage, locale  } = useIntl()
  const navigate = useNavigate()
  useTitle(formatMessage({ id: 'menu.trainerManage' }))
  const [messageApi, contextHolder] = message.useMessage();
  const { userinfo } = useSelector((store: GlobalConfigState) => store.userReducer)
  const dispatch = useDispatch()
  const [ areaList, setAreaList ] = useState<AreaTypeModel[]>([])
  const [ areaSelectedList, setSelectedList ] = useState<AreaTypeModel[]>([])
  const [ filterForm, setFilterForm ] = useState<any>({
    area: 'all',
    name: '',
    phone: '',
    type: 'all'
  })
  const [load, setLoad] = useState<boolean>(false);
  const getList = (updateUser: boolean = false) => {
    setLoad(true)
    getAreasList().then((res: any) => {
      if(res.code === 0) {
        setAreaList(res.data.map((item: any, index: number) => {
          return {
            key: String(index),
            ...item
          }
        }))
        if(updateUser) {
          const fitem = res.data.find((item: any) => item.id === userinfo.id)
          if(fitem) {
            dispatch(updateUserinfo(fitem))
          }
        }
      }
      setLoad(false)
    })
  }

  const goToDetail = (isEditMode: boolean = false, rowData?: AreaTypeModel | undefined) => {
    if(rowData) {
      const { id } = rowData
      navigate('/trainerManage/edit?id=' + id)
    } else {
      navigate('/trainerManage/create')
    }
  }

  const handleDelete = (row: AreaTypeModel) => {
    deleteArea({ id: row.id }).then((res: any) => {
      if(res.code === 0) {
        messageApi.success('删除成功')
        getList()
      }
    })
  }

  const handleDeleteSelected = () => {
    console.log(areaSelectedList, 'areaSelectedList')
  }

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        // https://docs.dndkit.com/api-documentation/sensors/pointer#activation-constraints
        distance: 1,
      },
    }),
  );

  const rowSelection: any = {
    type: 'checkbox',
    onChange: (selectedRowKeys: React.Key[], selectedRows: AreaTypeModel[]) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      setSelectedList(selectedRows)
    },
    getCheckboxProps: (record: AreaTypeModel) => ({
      disabled: false, // Column configuration not to be checked
      name: record.id,
    }),
  };

  const onDragEnd = ({ active, over }: DragEndEvent) => {
    console.log(active, over)
    if (active.id !== over?.id) {
      setAreaList((prev) => {
        const activeIndex = prev.findIndex((i) => i.id === active.id);
        const overIndex = prev.findIndex((i) => i.id === over?.id);
        return arrayMove(prev, activeIndex, overIndex);
      });
    }
  };


  const DropRow = (props: RowProps) => {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
      id: props['data-row-key'],
    });
  
    const style: React.CSSProperties = {
      ...props.style,
      transform: CSS.Transform.toString(transform && { ...transform, scaleY: 1 }),
      transition,
      cursor: 'move',
      ...(isDragging ? { position: 'relative', zIndex: 9999 } : {}),
    };
  
    return <tr {...props} ref={setNodeRef} style={style} {...attributes} {...listeners} />;
  };


  useEffect(() => {
    getList()
  }, [])
  useEffect(() => {

      console.log('filterForm--useEffect--->', filterForm)

  }, [filterForm])
  const dynamicItem = locale === 'en' ?     {
    title: '地区名称',
    key: 'title_en',
    dataIndex: 'title_en'
  } :     {
    title: '地区名称',
    key: 'title_cn',
    dataIndex: 'title_cn'
  }
  const searchFilterOptions:optionTypeModel[] = [
    {
      type: 'select',
      name: '选择地区',
      layout: 'top',
      params: {
        key: 'area',
        placeholder: '选择地区',
        data: [
          {
          value: 'all',
          label: 'All',
          name_en: 'All',
          name_cn: '全部',
        },
        {
          value: 'ezd',
          label: 'EZD',
          name_en: 'EZD',
          name_cn: '东区',
        },
        {
          value: 'wzd',
          label: 'WZD',
          name_en: 'WZD',
          name_cn: '西区',
        },
      ],
        form: filterForm,
      },
      callback:function(value:string) {
        const newFilterForm = Object.assign({}, filterForm)
        newFilterForm[this.params.key] = value
        setFilterForm(newFilterForm)
      }
    },
    {
      type: 'input',
      name: '根据名字搜索',
      layout: 'top',
      params: {
        key: 'name',
        data: 'name',
        placeholder: '根据名字搜索',
        style: {width: '300px'},
        form: filterForm
      },
      callback:function(value:string) {
        const newFilterForm = Object.assign({}, filterForm)
        newFilterForm[this.params.key] = value
        setFilterForm(newFilterForm)
      }
    },
    {
      type: 'input',
      name: '根据手机号搜索',
      layout: 'top',
      params: {
        key: 'phone',
        data: 'phone',
        placeholder: '根据手机号搜索',
        style: {width: '300px'},
        form: filterForm,
        rules: [{require: false, pattern:/^[8|9]\d{7}$/, message: '请输入正确的手机号'}]
      },
      callback:function(value:string) {
        const newFilterForm = Object.assign({}, filterForm)
        newFilterForm[this.params.key] = value
        setFilterForm(newFilterForm)
      }
    },
    {
      type: 'button',
      name: '搜索',
      layout: 'top',
      params: {
        key: 'search',
        data: '',
        form: filterForm
      },
      callback:function() {
        console.log(this.params, '--search--')
      }
    },
    {
      type: 'group',
      name: 'group',
      layout: 'bottom',
      params: {
        key: 'type',
        data: [{
          value: 'all',
          name_en: 'all',
          name_cn: '全部'
        },
        {
          value: 'checking',
          name_en: 'checking',
          name_cn: '待审'
        },
        {
          value: 'normal',
          name_en: 'normal',
          name_cn: '正常'
        },
        {
          value: 'disabled',
          name_en: 'disabled',
          name_cn: '封禁'
        },
        {
          value: 'filed',
          name_en: 'filed',
          name_cn: '归档'
        }
      ],
        form: filterForm
      },
      callback:function(value:string) {
        const newFilterForm = Object.assign({}, filterForm)
        newFilterForm[this.params.key] = value
        setFilterForm(newFilterForm)
      }
    }
  ]

  const tableHeaderOptions:optionTypeModel[] = [
    {
      type: 'button',
      name: '删除',
      layout: 'left',
      params: {
        key: 'delete',
        data: areaSelectedList
      },
      callback:function() {
        console.log(this.params, 'list--params-left')
        handleDeleteSelected()
      }
    },
    {
      type: 'button',
      name: '新增教练',
      layout: 'right',
      params: {
        key: 'add',
        data:[]
      },
      callback:function() {
        console.log(this.params, 'new--')
        goToDetail()
      }
    }
  ]

  const columns: ColumnsType<AreaTypeModel> = [
    {
      title: '用户ID',
      key: 'id',
      dataIndex: 'id'
    },
    dynamicItem,
    {
      title: '状态',
      key: 'active',
      render: (_, { id, active }) => (
        <Tag color={ active ? 'green' : 'volcano' } key={ id }>
          { active ? 'available' : 'disable'  }
        </Tag>
      )
    },
    {
      title: '范围',
      dataIndex: 'area_scope',
      key: 'area_scope'
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space>
          <Button type="primary" shape="circle" icon={<FormOutlined />} onClick={() =>goToDetail(true, record)} />
          <Divider type="vertical" />
          <Popconfirm
            title="提示"
            description="确定删除？"
            onConfirm={() =>handleDelete(record)}
            okText="是"
            cancelText="否"
            disabled={userinfo.role === 'admin'}
          >
            <Button type="primary" shape="circle" icon={<DeleteOutlined />} disabled={userinfo.role === 'admin'} />
          </Popconfirm>
        </Space>
      )
    }
  ]
  return ( 
    <PageWrap className="trainerManage">
      {contextHolder}
      {/* <TypingCard title='用户管理' source={cardContent}/> */}
      <SearchFilterPage style={{background: '#fff', borderRadius: 6, padding: '20px', width: '100%', margin: 0}} form={filterForm} optionList={searchFilterOptions}/>
      <Card className='tw-mt-[20px]' title={<TheadPage optionList={tableHeaderOptions}/>}>
      
        <DndContext sensors={sensors}  onDragEnd={onDragEnd}>
          <SortableContext
            // rowKey array
            disabled={true}
            items={areaList.map((i) => i.id)}
            strategy={verticalListSortingStrategy}
          >
            <Table
              rowSelection={{
                ...rowSelection,
              }}
              columns={columns}
              components={{
                body: {
                  row: DropRow,
                },
              }}
              rowKey="id" 
              dataSource={areaList} 
              pagination={{ pageSize: 10 }} />
          </SortableContext>
        </DndContext>
      </Card>
    </PageWrap>
  );
}

export default trainerManage