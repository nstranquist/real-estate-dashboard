import React from 'react';
import { connect } from 'react-redux'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'

// import components
import BaseLayout from './components/core'
import Signup from './components/Auth/Signup'
import Login from './components/Auth/Login'
import PrivateRoute from './utils/PrivateRoute'

import { getUserData, getUserPrivateData } from './store/profileContainer/userData/actions'
import { authenticateUser, logout } from './store/profileContainer/auth/actions'
import { auth } from './utils/firebaseHelper'
import { RootState } from './store/root';


interface IProps {
  isAuth: boolean
  getUserData(): void
  getUserPrivateData(): void
  authenticateUser(): void
  logout(): void
}

const App: React.FC<IProps> = ({
  isAuth,
  getUserData,
  getUserPrivateData,
  authenticateUser,
  logout
}) => {

  // TODO: clean up this logic
  auth.onAuthStateChanged((user) => {
    if(user) {
      if(isAuth) {
        console.log('user is authenticated')
        getUserData()
        getUserPrivateData()
      }
      else {
        console.log('not authenticated. wut')
        authenticateUser()
        getUserData()
        getUserPrivateData()
      }
      console.log('state changed. user:', user)
    } else {
      if(isAuth) {
        console.log('user logged out')
        logout()
      }
    }
  })
  
  return (
    <Router>
      <Switch>
        <Route exact path='/signup' component={Signup} />
        <Route exact path='/login' component={Login} />
        <PrivateRoute exact={true} path='/home' component={BaseLayout}/>
        <Route path='/' render={() => <Redirect to='/login' />} />
      </Switch>
    </Router>
  )
}

const mapStateToProps = (state: RootState) => ({
  isAuth: state.profile.auth.isAuthenticated,
})

export default connect(
  mapStateToProps,
  { getUserData, getUserPrivateData, authenticateUser, logout }
)(App)

// const contentStyle = {
//   padding: 24,
//   background: '#fff',
//   minHeight: 360,
//   height: '100%'
// }