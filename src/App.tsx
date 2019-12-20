import React from 'react';
import { connect } from 'react-redux'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'

// import components
import BaseLayout from './components/layout'
import Signup from './components/Auth/Signup'
import Login from './components/Auth/Login'

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
        {/* {isAuth && (
          <Route exact path='/home' component={BaseLayout} />
        )} */}
        <Route path='/home' component={BaseLayout}/>
        {/* <PrivateRoute exact path='/brokers' component={Brokers}/>
        <PrivateRoute exact path='/investors' component={Investors}/>
        <PrivateRoute exact path='/properties' component={Properties}/>
        <PrivateRoute exact path='/matches' component={Matches}/>
        <PrivateRoute exact path='/favorites' component={Favorites}/>
        <PrivateRoute exact path='/profile' component={Profile}/> */}
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