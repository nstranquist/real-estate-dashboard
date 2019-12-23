import React from 'react'
import { Tabs, Button } from 'antd'; // Row, Col   // for grid layout / more complex header
import { StyledPageHeader } from './layout.style'


interface IProps {
  screenName?: string
}

export const MyHeader: React.FC<IProps> = ({
  screenName='Title',
}) => {
  
  return (
    <StyledPageHeader
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
          <Tabs.TabPane tab="Details" key="1" />
          <Tabs.TabPane tab="Rule" key="2" />
        </Tabs>
      }
    >
    </StyledPageHeader>
  )
}

// old code:
  
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