import React from 'react'
import { Table, Divider } from 'antd'
import { Property } from '../../../types'

const data: Property[] = [
  {
    id: '1',
    address: '1238 Tamm Ave.',
    price: 310000, // TODO: format prices from number to string
    capRate: 18,
    noi: 30000, // TODO: format this too
    propertyType: 'Multi-Family',
    yearBuilt: 1896
  },
  {
    id: '2',
    address: '2111 White Lane Dr.',
    price: 580000,
    capRate: 12,
    noi: 25000,
    propertyType: 'Retail',
    yearBuilt: 1980
  },
  {
    id: '3',
    address: '13001 King Arthur Ln.',
    price: 240000,
    capRate: 8,
    noi: 10000,
    propertyType: 'Retail',
    yearBuilt: 1986
  },
]

interface IProps {
  handleEdit(property: Property, listType: string): void
  handleDelete(id: string, listType: string): void
}

export const InvestorsTable: React.FC<IProps> = ({
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
          <a onClick={() => handleEdit(record, 'investor')}>Edit</a> {/*  {record.address} */}
          <Divider type="vertical" />
          <a onClick={() => handleDelete(record.id, 'investor')}>Delete</a>
        </span>
      ),
    },
  ]

  return (
    <Table
      columns={columns}
      dataSource={data}
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