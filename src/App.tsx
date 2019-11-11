import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'

// import components
import BaseLayout from './components/core'
import Signup from './components/Auth/Signup'
import Login from './components/Auth/Login'
import PrivateRoute from './utils/PrivateRoute'

const App: React.FC = () => (
  <Router>
    <Switch>
      <Route exact path='/signup' component={Signup} />
      <Route exact path='/login' component={Login} />
      <PrivateRoute exact={true} path='/home' component={BaseLayout} />
      <Route path='/' render={() => <Redirect to='/login' />} />
    </Switch>
  </Router>
)

export default App

// const contentStyle = {
//   padding: 24,
//   background: '#fff',
//   minHeight: 360,
//   height: '100%'
// }