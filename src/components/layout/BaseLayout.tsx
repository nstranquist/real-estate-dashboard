import React, {useState} from 'react'
import { connect } from 'react-redux'
import { Switch, Route, Redirect } from 'react-router-dom'
import styled from 'styled-components'
// import comopnents
import { Layout, Icon } from 'antd'
// import {MyHeader} from './MyHeader'
import {MySider} from './MySider'
import PrivateRoute from '../../utils/PrivateRoute'
// import page components
import {Home} from '../Home'
import Brokers from '../Lists/Brokers'
import { InvestorsList } from '../Lists/InvestorsList'
import { PropertiesList } from '../Lists/PropertiesList'
import { PropertyDetail } from '../Details'
import { InvestorDetail } from '../Details'
import { Matches } from '../Matches'
import { MatchDetail } from '../Matches'
import Profile from '../Profile/Profile'

import { RootState } from '../../store/root'
import { Stats } from '../Stats'


interface IProps {
  userName: string
  // screenName: string
}

// const StyledLayout = styled(Layout)`
//   margin-left: 200px;
//   transition: .15s ease-in-out;

//   @media(max-width: 992px) {
//     margin-left: 0;
//     transition: .15s ease-in-out;
//   }
// `
const StyledTrigger = styled(Icon)`
  &.trigger {
    font-size: 18px;
    line-height: 64px;
    padding: 0 0;
    cursor: pointer;
    transition: color 0.3s;

    &:hover {
      color: #1890ff;
    }

    @media(max-width: 992px) {
      font-size: 20px;
    }
  }

  
`

const MyBaseLayout: React.FC<IProps> = ({
  userName,
  // screenName,
}) => {
  const [collapsed, setCollapsed] = useState<boolean>(true)

  const toggleCollapse = () => setCollapsed(!collapsed)

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* Side Drawer */}
      <MySider userName={userName} trigger={null} collapsible collapsed={collapsed} toggleCollapse={toggleCollapse} />
      {/* <MySider trigger={null} collapsible collapsed={collapsed} userName={userName} /> */}
      <Layout>
        {/* Page Header */}
        <Layout.Header style={{background:'#fff'}}>
          <StyledTrigger
            className="trigger"
            type={collapsed ? 'menu-unfold' : 'menu-fold'}
            onClick={toggleCollapse}
          />
        </Layout.Header>
        {/* <MyHeader screenName={screenName} /> */}
        {/* Page Content View */}
        <Layout.Content style={{ margin: '24px 16px 0' }}>
          <Switch>
            <PrivateRoute exact path='/home/properties' component={PropertiesList} />
            <PrivateRoute exact path='/home/properties/:id' component={PropertyDetail} />
            <PrivateRoute exact path='/home/investors' component={InvestorsList} />
            <PrivateRoute exact path='/home/investors/:id' component={InvestorDetail} />
            <PrivateRoute exact path='/home/matches' component={Matches} />
            <PrivateRoute exact path='/home/matches/:id' component={MatchDetail} />
            <PrivateRoute exact path='/home/profile' component={Profile} />
            <PrivateRoute exact path='/home/stats' component={Stats} />
            <PrivateRoute exact path='/home/brokers' component={Brokers} />
            <PrivateRoute exact path='/home' component={Home} />
            <Route path='/home' render={() => <Redirect to='/home' />} />
          </Switch>
        </Layout.Content>
        {/* Page Footer */}
        <Layout.Footer style={{ textAlign: 'center' }}>
          Jacob's Brokerage Dashboard, 2019</Layout.Footer>
      </Layout>
    </Layout>
  )
}

const mapStateToProps = (state: RootState) => ({
  // TODO: create selector for this... getUserName()
  userName: (state.profile.userData.firstName.charAt(0) + ' ' + state.profile.userData.lastName),
  // screenName: state.ui.screenName,
})

export const BaseLayout = connect(
  mapStateToProps,
)(MyBaseLayout)
