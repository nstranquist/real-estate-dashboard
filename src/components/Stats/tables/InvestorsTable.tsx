import React from 'react'
import { Table, Divider } from 'antd'
import { Investor } from '../../../types'

// const data: Investor[] = [
//   {
//     id: '1',
//     address: '1238 Tamm Ave.',
//     price: 310000, // TODO: format prices from number to string
//     capRate: 18,
//     noi: 30000, // TODO: format this too
//     propertyType: 'Multi-Family',
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
//     propertyType: 'Retail',
//     yearBuilt: 1986
//   },
// ]

interface IProps {
  loading: boolean
  investorsData: Investor[]
  handleEdit(investor: Investor): void
  handleDelete(id: string, listType: string): void
}

export const InvestorsTable: React.FC<IProps> = ({
  loading,
  investorsData,
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
      title: 'Company Name',
      dataIndex:'companyName',
      key:'companyName',
    },
    // {
    //   title: 'Cell Phone',
    //   dataIndex:'cellPhone',
    //   key:'cellPhone',
    // },
    // {
    //   title: 'Address',
    //   dataIndex:'address',
    //   key:'address',
    // },
    {
      title: 'Price Min',
      dataIndex:'priceMin',
      key:'priceMin',
      // render: (price: number) => 
    },
    {
      title: 'Price Max',
      dataIndex:'priceMax',
      key:'priceMax',
    },
    {
      title: 'Property Types',
      dataIndex:'propertyTypes',
      key:'propertyTypes',
      render: (text: string) => (
        <select value={text}>
          <option value="Hospitality">Hospitality</option>
          <option value="Industrial">Industrial</option>
          <option value="Land">Land</option>
          <option value="Medical">Medical</option>
          <option value="Multi-Family">Multi-Family</option>
          <option value="Office">Office</option>
          <option value="Other">Other</option>
          <option value="Retail">Retail</option>
        </select>
      )
    },
    {
      title: 'Cities',
      dataIndex:'cities',
      key:'cities',
      // render: (text: string) => (
      //   <select value={text}>
      //     <option value="Midwest">Midwest</option>
      //     <option value="Northeast">Northeast</option>
      //     <option value="Southeast">Southeast</option>
      //     <option value="Southwest">Southwest</option>
      //     <option value="West">West</option>
      //   </select>
      // )
    },
    {
      title: 'Action',
      key: 'action',
      render: (text: string, record: any) => (
        <span>
          <a onClick={() => handleEdit(record)}>Edit</a> {/*  {record.address} */}
          <Divider type="vertical" />
          <a onClick={() => handleDelete(record.id, 'investor')}>Delete</a>
        </span>
      ),
    },
  ]

  return (
    <Table
      rowKey='id'
      scroll={{x:'1500px'}}
      loading={loading}
      columns={columns}
      dataSource={investorsData}
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

// old columns:
// const columns = [
//   {
//     title: 'First Name',
//     dataIndex:'firstName',
//     key:'firstName',
//   },
//   {
//     title: 'Last Name',
//     dataIndex:'lastName',
//     key:'lastName',
//   },
//   {
//     title: 'Email',
//     dataIndex:'email',
//     key:'email',
//     render: (email: string) => <a>{email}</a>
//   },
//   {
//     title: 'Company Name',
//     dataIndex:'companyName',
//     key:'companyName',
//   },
//   {
//     title: 'Office Phone',
//     dataIndex:'officePhone',
//     key:'officePhone',
//   },
//   {
//     title: 'Cell Phone',
//     dataIndex:'cellPhone',
//     key:'cellPhone',
//   },
//   {
//     title: 'Address',
//     dataIndex:'address',
//     key:'address',
//   },
//   {
//     title: 'City',
//     dataIndex:'city',
//     key:'city',
//   },
//   {
//     title: 'State',
//     dataIndex:'state',
//     key:'state',
//   },
//   {
//     title: 'Zip Code',
//     dataIndex:'zipcode',
//     key:'zipcode',
//   },
//   {
//     title: 'Role',
//     dataIndex:'role',
//     key:'role',
//     render: (text: string) => (
//       <select value={text}>
//         <option value="Broker">Broker</option>
//         <option value="Principal">Principal</option>
//       </select>
//     )
//   },
//   {
//     title: 'Price Min',
//     dataIndex:'priceMin',
//     key:'priceMin',
//     // render: (price: number) => 
//   },
//   {
//     title: 'Price Max',
//     dataIndex:'priceMax',
//     key:'priceMax',
//   },
//   {
//     title: 'Property Type',
//     dataIndex:'propertyType',
//     key:'propertyType',
//     render: (text: string) => (
//       <select value={text}>
//         <option value="Hospitality">Hospitality</option>
//         <option value="Industrial">Industrial</option>
//         <option value="Land">Land</option>
//         <option value="Medical">Medical</option>
//         <option value="Multi-Family">Multi-Family</option>
//         <option value="Office">Office</option>
//         <option value="Other">Other</option>
//         <option value="Retail">Retail</option>
//       </select>
//     )
//   },
//   {
//     title: 'Region',
//     dataIndex:'region',
//     key:'region',
//     render: (text: string) => (
//       <select value={text}>
//         <option value="Midwest">Midwest</option>
//         <option value="Northeast">Northeast</option>
//         <option value="Southeast">Southeast</option>
//         <option value="Southwest">Southwest</option>
//         <option value="West">West</option>
//       </select>
//     )
//   },
//   {
//     title: 'Lease Type',
//     dataIndex:'leaseType',
//     key:'leaseType',
//     render: (text: string) => (
//       <select value={text}>
//         <option value="Ground">Ground</option>
//         <option value="Net">Net</option>
//         <option value="Absoluet Net">Absoluet Net</option>
//       </select>
//     )
//   },
//   {
//     title: 'Property Status',
//     dataIndex:'propertyStatus',
//     key:'propertyStatus',
//     render: (text: string) => (
//       <select value={text}>
//         <option value="Stabilized">Stabilized</option>
//         <option value="Value-Add">Value-Add</option>
//       </select>
//     )
//   },
//   {
//     title: '1031?',
//     dataIndex:'is1031',
//     key:'is1031',
//     render: (is1031: boolean) => is1031 ? <span>yes</span> : <span>no</span>
//   },
//   {
//     title: 'Action',
//     key: 'action',
//     render: (text: string, record: any) => (
//       <span>
//         <a onClick={() => handleEdit(record)}>Edit</a> {/*  {record.address} */}
//         <Divider type="vertical" />
//         <a onClick={() => handleDelete(record.id, 'investor')}>Delete</a>
//       </span>
//     ),
//   },
// ]