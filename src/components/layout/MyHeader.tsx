import React from 'react'
import { Row, PageHeader, Tabs, Button } from 'antd';

const { TabPane } = Tabs;


interface IProps {
  screenName?: string
}

const MyHeader: React.FC<IProps> = ({
  screenName='Title',
}) => {
  
  // const routes = [
  //   {
  //     path: '',
  //     breadcrumbName: 'Home',
  //   },
  //   {
  //     path: 'brokers',
  //     breadcrumbName: 'Brokers',
  //   },
  //   {
  //     path: 'investors',
  //     breadcrumbName: 'Investors',
  //   },
  //   {
  //     path: 'properties',
  //     breadcrumbName: 'Properties',
  //   },
  // ]
  
  return (
    <PageHeader
      style={{
        border: '1px solid rgb(235, 237, 240)',
        background: 'white'
      }}
      onBack={() => window.history.back()}
      title={screenName}
      // subTitle={subtitle}
      // breadcrumb={{ routes }}
      extra={[
        <Button key="3">Operation</Button>,
        <Button key="2">Operation</Button>,
        <Button key="1" type="primary">
          Primary
        </Button>,
      ]}
      footer={
        <Tabs defaultActiveKey="1">
          <TabPane tab="Details" key="1" />
          <TabPane tab="Rule" key="2" />
        </Tabs>
      }
    >
    </PageHeader>
  )
}

export default MyHeader