import React from 'react'
import { Switch } from 'react-router-dom'
import { Layout } from 'antd'
import MyHeader from './MyHeader'
import MySider from './MySider'
import PrivateRoute from '../../utils/PrivateRoute'

import Brokers from '../Brokers'
import Investors from '../Investors'
import Properties from '../Properties'

const { Content, Footer } = Layout

const BaseLayout = () => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* Side Drawer */}
      <MySider />
      <Layout>
        {/* Page Header */}
        <MyHeader />
        {/* Content View (TODO: replace with router view) */}
        <Content style={{ margin: '24px 16px 0' }}>
          <Switch>
            <PrivateRoute path='/brokers' component={Brokers} />
            <PrivateRoute path='/investors' component={Investors} />
            <PrivateRoute path='/properties' component={Properties} />
          </Switch>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Jacob's Brokerage Dashboard, 2019</Footer>
      </Layout>
    </Layout>
  )
}

export default BaseLayout