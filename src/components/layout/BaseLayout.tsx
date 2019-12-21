import React from 'react'
import { connect } from 'react-redux'
import { Switch, Route, Redirect } from 'react-router-dom'
import styled from 'styled-components'
// import comopnents
import { Layout } from 'antd'
import MyHeader from './MyHeader'
import MySider from './MySider'
import PrivateRoute from '../../utils/PrivateRoute'
// import page components
import {Home} from '../Home'
import Brokers from '../Lists/Brokers'
import Investors from '../Lists/Investors'
import Properties from '../Lists/Properties'
import Matches from '../Matches'
import Favorites from '../Favorites'
import Profile from '../Profile/Profile'

import { RootState } from '../../store/root'


interface IProps {
  userName: string
  screenName: string
}

const StyledLayout = styled(Layout)`
  margin-left: 200px;
  transition: .25s ease;

  @media(max-width: 992px) {
    margin-left: 0;
    transition: .25s ease;
  }
  
`
// @media(min-width: 576px) {
//   marginLeft: 200px;
// }
const MyBaseLayout: React.FC<IProps> = ({
  userName,
  screenName,
}) => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* Side Drawer */}
      <MySider width={200} userName={userName} />
      <StyledLayout>
        {/* Page Header */}
        {/* TODO: either connect router to redux, or move this to inside the page component */}
        <MyHeader screenName={screenName} />
        {/* Page Content View */}
        <Layout.Content style={{ margin: '24px 16px 0' }}>
          <Switch>
            <PrivateRoute exact path='/home/brokers' component={Brokers} />
            <PrivateRoute exact path='/home/investors' component={Investors} />
            <PrivateRoute exact path='/home/properties' component={Properties} />
            <PrivateRoute exact path='/home/matches' component={Matches} />
            <PrivateRoute exact path='/home/favorites' component={Favorites} />
            <PrivateRoute exact path='/home/profile' component={Profile} />
            <PrivateRoute exact path='/home' component={Home} />
            <Route path='/home' render={() => <Redirect to='/home' />} />
          </Switch>
        </Layout.Content>
        {/* Page Footer */}
        <Layout.Footer style={{ textAlign: 'center' }}>
          Jacob's Brokerage Dashboard, 2019</Layout.Footer>
      </StyledLayout>
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
