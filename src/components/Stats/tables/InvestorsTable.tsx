import React from 'react'
import { Link } from 'react-router-dom'
import { Table, Divider } from 'antd'
import { Investor } from '../../../types'

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
      title: 'Action',
      key: 'action',
      width: 130,
      render: (text: string, record: any) => (
        <span>
          <a onClick={() => handleEdit(record)}>Edit</a> {/*  {record.address} */}
          <Divider type="vertical" />
          <a onClick={() => handleDelete(record.id, 'investor')}>Delete</a>
        </span>
      ),
    },
    {
      title: 'First Name',
      dataIndex:'firstName',
      key:'firstName',
      width: 115,
      render: (text: string, record:any) => <Link to={`/home/investors/${record.id}`}>{text}</Link>
    },
    {
      title: 'Last Name',
      dataIndex:'lastName',
      key:'lastName',
      width: 115,
      render: (text: string, record:any) => <Link to={`/home/investors/${record.id}`}>{text}</Link>
    },
    {
      title: 'Company',
      dataIndex:'companyName',
      key:'companyName',
      width: 115,
      render: (value: any) => <span>{value && value.length > 0 ? value : '(no-data)'}</span>
    },
    {
      title: 'Email',
      dataIndex:'email',
      key:'email',
      width: 100,
      ellipse: true,
      render: (text: string, record:any) => <Link to={`/home/investors/${record.id}`}>{text && text.length > 0 ? text : '(no data)'}</Link>
    },
    {
      title: 'phone',
      dataIndex:'phone',
      key:'phone',
      width: 140,
      render: (text: string, record:any) => <Link to={`/home/investors/${record.id}`}>{text && text.length > 0 ? text : '(no-data)'}</Link>
    },
    {
      title: 'statePreferred',
      dataIndex:'statePreferred',
      key:'statePreferred',
      width: 100,
      ellipse: true,
      render: (value: any) => <span>{value && value.length > 0 ? value : '(no-data)'}</span>
    },
    {
      title: 'sfMin',
      dataIndex:'sfMin',
      key:'sfMin',
      width: 115,
      render: (value: any) => <span>{value && value.length > 0 ? value : '(no-data)'}</span>
    },
    {
      title: '$/SF',
      dataIndex:'dollarPerSF',
      key:'dollarPerSF',
      width: 115,
      ellipse: true,
      render: (value: any) => <span>{value && value.length > 0 ? value : '(no-data)'}</span>
    },
    {
      title: 'Price Min',
      dataIndex:'priceMin',
      key:'priceMin',
      width: 120,
      render: (value: any) => <span>{value && value.length > 0 ? value : '(no-data)'}</span>
    },
    {
      title: 'Price Max',
      dataIndex:'priceMax',
      key:'priceMax',
      width: 130,
      render: (value: any) => <span>{value && value.length > 0 ? value : '(no-data)'}</span>
    },
    {
      title: 'NOI Min',
      dataIndex:'noiMin',
      key:'noiMin',
      width: 100,
      ellipse: true,
      render: (value: any) => <span>{value && value.length > 0 ? value : '(no-data)'}</span>
    },
    {
      title: 'NOI Max',
      dataIndex:'noiMax',
      key:'noiMax',
      width: 100,
      ellipse: true,
      render: (value: any) => <span>{value && value.length > 0 ? value : '(no-data)'}</span>
    },
    {
      title: 'Built Before',
      dataIndex:'builtBefore',
      key:'builtBefore',
      width: 100,
      render: (value: any) => <span>{value && value.length > 0 ? value : '(no-data)'}</span>
    },
    {
      title: 'Built After',
      dataIndex:'builtAfter',
      key:'builtAfter',
      width: 100,
      render: (value: any) => <span>{value && value.length > 0 ? value : '(no-data)'}</span>
    },
    {
      title: 'Property Types',
      dataIndex:'propertyTypes',
      key:'propertyTypes',
      width: 200,
      ellipse: true,
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
      title: 'occupancyMin',
      dataIndex:'occupancyMin',
      key:'occupancyMin',
      width: 115,
      render: (value: any) => <span>{value && value.length > 0 ? value : '(no-data)'}</span>
    },
  ]

  //const rowSelection = { onChange: () => {  }, getCheckboxProps: () => {  } }

  return (
    <Table
      //rowSelection={rowSelection}
      rowKey='id'
      scroll={{x:'800px'}}
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