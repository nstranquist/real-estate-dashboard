import React from 'react'
import { connect } from 'react-redux'
import { Switch } from 'react-router-dom'
import { Layout } from 'antd'

import MyHeader from './MyHeader'
import MySider from './MySider'
import PrivateRoute from '../../utils/PrivateRoute'

import Brokers from '../Brokers'
import Investors from '../Investors'
import Properties from '../Properties'
import { RootState } from '../../store/root'

const { Content, Footer } = Layout

interface IProps {
  userName: string
}

const BaseLayout: React.FC<IProps> = ({
  userName
}) => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* Side Drawer */}
      <MySider userName={userName} />
      <Layout>
        {/* Page Header */}
        <MyHeader />
        {/* Content View (TODO: replace with router view) */}
        <Content style={{ margin: '24px 16px 0' }}>
          <Switch>
            <PrivateRoute exact={true} path='/brokers' component={Brokers} />
            <PrivateRoute exact={true} path='/investors' component={Investors} />
            <PrivateRoute exact={true} path='/properties' component={Properties} />
          </Switch>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Jacob's Brokerage Dashboard, 2019</Footer>
      </Layout>
    </Layout>
  )
}

const mapStateToProps = (state: RootState) => ({
  userName: (state.profile.userData.firstName.charAt(0) + ' ' + state.profile.userData.lastName)
})

export default connect(
  mapStateToProps,
)(BaseLayout)