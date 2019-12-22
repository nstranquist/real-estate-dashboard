import React, {useState} from 'react'
import styled from 'styled-components'
import { Table, Divider } from 'antd'
import { Broker } from '../../../types'

const StyledTable = styled(Table)`
  overflow-wrap: normal;
  word-break: normal;

  .ant-table-row-cell-break-word {
    overflow-wrap: normal;
    word-break: normal;
  }
  .ant-table-thead > tr > th {
    padding: 16px 8px;
    overflow-wrap: normal;
    break-word: normal;
  }
  .ant-table-tbody > tr > td {
    padding: 16px 8px;
    // overflow-wrap: normal;
    // break-word: normal;
  }
`
// word-break: break-all;
interface IProps {
  loading: boolean
  brokersData: Broker[]
  handleEdit(broker: Broker): void
  handleDelete(id: string, listType: string): void
}

export const BrokersTable: React.FC<IProps> = ({
  loading,
  brokersData,
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
      title: 'First Name',
      dataIndex:'firstName',
      key:'firstName',
      width: 100,
    },
    {
      title: 'Last Name',
      dataIndex:'lastName',
      key:'lastName',
      width: 100,
    },
    {
      title: 'Email',
      dataIndex:'email',
      key:'email',
      width: 200,
      render: (email: string) => <a>{email}</a>
    },
    {
      title: 'Office Phone',
      dataIndex:'officePhone',
      key:'officePhone',
      width: 100,
    },
    {
      title: 'Cell Phone',
      dataIndex:'cellPhone',
      key:'cellPhone',
      width: 100,
    },
    {
      title: 'Company Name',
      dataIndex:'companyName',
      key:'companyName',
      width: 100,
    },
    {
      title: 'Property Type',
      dataIndex:'propertyType',
      key:'propertyType',
      width: 100,
    },
    {
      title: 'City',
      dataIndex:'city',
      key:'city',
      width: 100,
    },
    {
      title: 'State',
      dataIndex:'state',
      key:'state',
      width: 60,
    },
    {
      title: 'Type',
      dataIndex:'type',
      key:'type',
      width: 100,
      render: (text: string) => (
        <select value={text}>
          <option value="Sales">Sales</option>
          <option value="Leasing">Leasing</option>
          <option value="Both">Both</option>
        </select>
      )
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
    <StyledTable
      rowKey='id'
      scroll={{x: '1000px'}}
      loading={loading}
      rowSelection={rowSelection}
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

  //{
    //   title: 'Action',
    //   key: 'action',
    //   width: 70,
    //   render: (text: string, record: any) => (
    //     <span>
    //       <a onClick={() => handleEdit(record)}>Edit</a> {/*  {record.address} */}
    //       <Divider type="vertical" />
    //       <a onClick={() => handleDelete(record.id, 'broker')}>Delete</a>
    //     </span>
    //   ),
    // },