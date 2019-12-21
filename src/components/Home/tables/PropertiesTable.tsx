import React from 'react'
import { Table, Divider } from 'antd'
import { Property } from '../../../types'

interface IProps {
  loading: boolean
  propertiesData: Property[]
  handleEdit(property: Property, listType: string): void
  handleDelete(id: string, listType: string): void
}

export const PropertiesTable: React.FC<IProps> = ({
  loading,
  propertiesData,
  handleEdit,
  handleDelete
}) => {
  const columns = [
    {
      title: 'Address',
      dataIndex:'address',
      key:'address',
      render: (text: string) => <a>{text}</a>,
    },
    {
      title: 'Price',
      dataIndex:'price',
      key:'price',
    },
    {
      title: 'Cap Rate',
      dataIndex:'capRate',
      key:'capRate',
      render: (value: number) => <span>{`${value}%`}</span>
    },
    {
      title: 'NOI',
      dataIndex:'noi',
      key:'noi',
      render: (value: number) => <span>{`$${value}`}</span>
    },
    {
      title: 'Property Type',
      dataIndex:'propertyType',
      key:'propertyType',
    },
    {
      title: 'Year Built',
      dataIndex:'yearBuilt',
      key:'yearBuilt',
    },
    {
      title: 'Action',
      key: 'action',
      render: (text: string, record: any) => (
        <span>
          <a onClick={() => handleEdit(record, 'property')}>Edit</a> {/*  {record.address} */}
          <Divider type="vertical" />
          <a onClick={() => handleDelete(record.id, 'property')}>Delete</a>
        </span>
      ),
    },
  ]

  return (
    <Table
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