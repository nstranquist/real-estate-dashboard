import React, {useState} from 'react'
import styled from 'styled-components'
import { Table, Divider } from 'antd'
import { Property } from '../../../types'

interface IProps {
  loading: boolean
  propertiesData: Property[]
  handleEdit(property: Property): void
  handleDelete(id: string, listType: string): void
}

// const StyledTable = styled(Table)`

// `

export const PropertiesTable: React.FC<IProps> = ({
  loading,
  propertiesData,
  handleEdit,
  handleDelete
}) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([])

  const handleSelect = (selectedKeys: any) => {
    console.log('selected keys changed:', selectedKeys)
    //setSelectedKeys(selectedKeys)
  }

  const columns = [
    {
      title: 'Address',
      dataIndex:'address',
      key:'address',
      width: 190,
      render: (text: string) => <a>{text}</a>,
    },
    {
      title: 'Price',
      dataIndex:'price',
      key:'price',
      width: 85,
    },
    {
      title: 'Cap Rate',
      dataIndex:'capRate',
      key:'capRate',
      width: 95,
      render: (value: number) => <span>{`${value}%`}</span>
    },
    {
      title: 'NOI',
      dataIndex:'noi',
      key:'noi',
      width: 85,
      render: (value: number) => <span>{`$${value}`}</span>
    },
    {
      title: 'Property Type',
      dataIndex:'propertyType',
      key:'propertyType',
      width: 125,
    },
    {
      title: 'Year Built',
      dataIndex:'yearBuilt',
      key:'yearBuilt',
      width: 95,
    },
  ]

  const rowSelection = {
    onChange: (selectedRowKeys: string[] | number[], selectedRows: any[]) => {
      console.log('selectedRowKeys type:', typeof selectedRowKeys, 'selectedRows:', selectedRows)
    },
    getCheckboxProps: (record: any) => ({
      id: record.id
    })
  }

  return (
    <Table
      rowSelection={rowSelection}
      rowKey='id'
      scroll={{x: '675px'}}
      loading={loading}
      columns={columns}
      dataSource={propertiesData}
    />
  )
}


  // {
  //   title: 'operation',
  //   dataIndex: 'operation',
  //   render: (text, record) =>
  //     this.state.dataSource.length >= 1 ? (
  //       <Popconfirm title="Sure to delete?" onConfirm={() => this.handleDelete(record.key)}>
  //         <a>Delete</a>
  //       </Popconfirm>
  //     ) : null,
  // },

  // {
  //   title: 'Action',
  //   key: 'action',
  //   render: (text: string, record: any) => (
  //     <span>
  //       <a onClick={() => handleEdit(record)}>Edit</a> {/*  {record.address} */}
  //       <Divider type="vertical" />
  //       <a onClick={() => handleDelete(record.id, 'property')}>Delete</a>
  //     </span>
  //   ),
  // },