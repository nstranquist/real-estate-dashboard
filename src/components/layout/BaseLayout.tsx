import React from 'react'
import { connect } from 'react-redux'
import { Switch, Route, Redirect } from 'react-router-dom'
import { Layout } from 'antd'

import MyHeader from './MyHeader'
import MySider from './MySider'
import PrivateRoute from '../../utils/PrivateRoute'

import Home from '../Home'
import Brokers from '../Brokers'
import Investors from '../Investors'
import Properties from '../Properties'
import Matches from '../Matches'
import Favorites from '../Favorites'
import Profile from '../Profile/Profile'
import { RootState } from '../../store/root'

const { Content, Footer } = Layout

interface IProps {
  userName: string
  screenName: string
}

const MyBaseLayout: React.FC<IProps> = ({
  userName,
  screenName,
}) => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* Side Drawer */}
      <MySider userName={userName} />
      <Layout>
        {/* Page Header */}
        <MyHeader screenName={screenName} />
        {/* Content View (TODO: replace with router view) */}
        <Content style={{ margin: '24px 16px 0' }}>
          <Switch>
            <PrivateRoute exact path='/home/brokers' component={Brokers} />
            <PrivateRoute exact path='/home/investors' component={Investors} />
            <PrivateRoute exact path='/home/properties' component={Properties} />
            <PrivateRoute exact path='/home/matches' component={Matches} />
            <PrivateRoute exact path='/home/favorites' component={Favorites} />
            <PrivateRoute exact path='/home/profile' component={Profile} />
            <PrivateRoute exact path='/home' component={Home} />
            <Route path='/' render={() => <Redirect to='/home' />} />
          </Switch>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Jacob's Brokerage Dashboard, 2019</Footer>
      </Layout>
    </Layout>
  )
}

const mapStateToProps = (state: RootState) => ({
  userName: (state.profile.userData.firstName.charAt(0) + ' ' + state.profile.userData.lastName),
  screenName: state.ui.screenName,
})

export const BaseLayout = connect(
  mapStateToProps,
)(MyBaseLayout)
