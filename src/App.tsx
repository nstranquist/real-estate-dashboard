import React from 'react';
import { connect } from 'react-redux'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'

// import components
import GuestRoute from './utils/GuestRoute'
import { BaseLayout } from './components/layout'
import Signup from './components/Auth/Signup'
import Login from './components/Auth/Login'
import { ResetPassword } from './components/Auth/ResetPassword';

import { getUserData, getUserProfileData } from './store/profileContainer/userData/actions'
import { getProperties } from './store/properties/actions'
import { getInvestors } from './store/investors/actions'
import { getBrokers } from './store/brokers/actions'
import { authenticateUser, logout } from './store/profileContainer/auth/actions'
import { auth } from './utils/firebaseHelper'
import { RootState } from './store/root';


interface IProps {
  isAuth: boolean
  getUserData(): void
  getUserProfileData(): void
  getProperties(): void
  getInvestors(): void
  getBrokers(): void
  authenticateUser(): void
  logout(): void
}

const App: React.FC<IProps> = ({
  isAuth,
  getUserData,
  getUserProfileData,
  getProperties,
  getInvestors,
  getBrokers,
  authenticateUser,
  logout
}) => {

  // TODO: clean up this logic
  auth.onAuthStateChanged((user) => {
    if(user) {
      if(isAuth) {
        console.log('user is authenticated')
        getUserData()
        getUserProfileData()
      }
      else {
        console.log('not authenticated')
        authenticateUser()
        // getUserData()
        getUserProfileData()
        // NOTE: in future, can just get the 'sneakPeak' of the listTypes data. For now, getting all
        getProperties()
        getInvestors()
        getBrokers()
      }
    } else {
      if(isAuth) {
        console.log('user logged out')
        logout()
      }
    }
  })
  
  return (
    <Router>
      {/* Guest Routes */}
      <Switch>
        <GuestRoute exact path='/signup' component={Signup} />
        <GuestRoute exact path='/login' component={Login} />
        <GuestRoute exact path='/reset-password' component={ResetPassword} />
        {/* Private Route: */}
        <Route path='/home' component={BaseLayout}/>
        <Route path='/' render={() => {
          if(isAuth) return <Redirect to='/home' />
          return <Redirect to='/login' />
        }} />
      </Switch>
    </Router>
  )
}

const mapStateToProps = (state: RootState) => ({
  isAuth: state.profile.auth.isAuthenticated,
})

export default connect(
  mapStateToProps,
  {
    getUserData,
    getUserProfileData,
    authenticateUser,
    logout,
    getProperties,
    getInvestors,
    getBrokers,
  }
)(App)

// const contentStyle = {
//   padding: 24,
//   background: '#fff',
//   minHeight: 360,
//   height: '100%'
// }