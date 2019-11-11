import React from 'react'
import { Row, PageHeader, Tabs, Button } from 'antd';

const { TabPane } = Tabs;

const MyHeader = () => (
  <div>
    <PageHeader
      style={{
        border: '1px solid rgb(235, 237, 240)',
        background: 'white'
      }}
      onBack={() => window.history.back()}
      title="Title"
      subTitle="This is a subtitle"
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
  </div>
)

export default MyHeader