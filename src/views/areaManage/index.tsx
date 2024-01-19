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

interface RowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  'data-row-key': string;
}

function areaManage() {
  const { formatMessage, locale  } = useIntl()
  const navigate = useNavigate()
  useTitle(formatMessage({ id: 'menu.areaManage' }))
  const [messageApi, contextHolder] = message.useMessage();
  // const cardContent = `在这里，你可以对系统中的用户进行管理，例如添加一个新用户，或者修改系统中已经存在的用户。`
  const { userinfo } = useSelector((store: GlobalConfigState) => store.userReducer)
  const dispatch = useDispatch()
  const [ areaList, setAreaList ] = useState<AreaTypeModel[]>([])
  const [ areaSelectedList, setSelectedList ] = useState<AreaTypeModel[]>([])
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
      navigate('/areaManage/edit?id=' + id)
    } else {
      navigate('/areaManage/create')
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
  const dynamicItem = locale === 'en' ?     {
    title: '地区名称',
    key: 'title_en',
    dataIndex: 'title_en'
  } :     {
    title: '地区名称',
    key: 'title_cn',
    dataIndex: 'title_cn'
  }
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
      name: '新建地区',
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
    <PageWrap className="areaManage">
      {contextHolder}
      {/* <TypingCard title='用户管理' source={cardContent}/> */}
      <Card className='tw-mt-[20px]' title={<TheadPage optionList={tableHeaderOptions}/>}>
      
        <DndContext sensors={sensors}  onDragEnd={onDragEnd}>
          <SortableContext
            // rowKey array
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

export default areaManage