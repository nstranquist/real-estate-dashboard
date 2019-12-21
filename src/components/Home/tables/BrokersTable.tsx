import React from 'react'
import { Table, Divider } from 'antd'
import { Broker } from '../../../types'

// const data: Property[] = [
//   {
//     id: '1',
//     address: '1238 Tamm Ave.',
//     price: 310000, // TODO: format prices from number to string
//     capRate: 18,
//     noi: 30000, // TODO: format this too
//     propertyType: 'Retail',
//     yearBuilt: 1896
//   },
//   {
//     id: '2',
//     address: '2111 White Lane Dr.',
//     price: 580000,
//     capRate: 12,
//     noi: 25000,
//     propertyType: 'Retail',
//     yearBuilt: 1980
//   },
//   {
//     id: '3',
//     address: '13001 King Arthur Ln.',
//     price: 240000,
//     capRate: 8,
//     noi: 10000,
//     propertyType: 'Multi-Family',
//     yearBuilt: 1986
//   },
// ]

interface IProps {
  loading: boolean
  brokersData: Broker[]
  handleEdit(broker: Broker, listType: string): void
  handleDelete(id: string, listType: string): void
}

export const BrokersTable: React.FC<IProps> = ({
  loading,
  brokersData,
  handleEdit,
  handleDelete
}) => {
  const columns = [
    {
      title: 'First Name',
      dataIndex:'firstName',
      key:'firstName',
    },
    {
      title: 'Last Name',
      dataIndex:'lastName',
      key:'lastName',
    },
    {
      title: 'Email',
      dataIndex:'email',
      key:'email',
      render: (email: string) => <a>{email}</a>
    },
    {
      title: 'Office Phone',
      dataIndex:'officePhone',
      key:'officePhone',
    },
    {
      title: 'Cell Phone',
      dataIndex:'cellPhone',
      key:'cellPhone',
    },
    {
      title: 'Company Name',
      dataIndex:'companyName',
      key:'companyName',
    },
    {
      title: 'Property Type',
      dataIndex:'propertyType',
      key:'propertyType',
    },
    {
      title: 'City',
      dataIndex:'city',
      key:'city',
    },
    {
      title: 'State',
      dataIndex:'state',
      key:'state',
    },
    {
      title: 'Type',
      dataIndex:'type',
      key:'type',
      // TODO: add <select> render
      render: (text: string) => (
        <select value={text}>
          <option value="Sales">Sales</option>
          <option value="Leasing">Leasing</option>
          <option value="Both">Both</option>
        </select>
      )
    },
    {
      title: 'Action',
      key: 'action',
      render: (text: string, record: any) => (
        <span>
          <a onClick={() => handleEdit(record, 'broker')}>Edit</a> {/*  {record.address} */}
          <Divider type="vertical" />
          <a onClick={() => handleDelete(record.id, 'broker')}>Delete</a>
        </span>
      ),
    },
  ]

  return (
    <Table
      loading={loading}
      columns={columns}
      dataSource={brokersData}
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