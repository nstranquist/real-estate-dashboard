import React from 'react'
import { Route, Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux'
import { RootState } from '../store/root'

interface IProps {
  component: any
  isAuth: boolean
  path: string
  exact?: boolean
}

const PrivateRoute: React.FC<IProps> = ({
  component: Component,
  isAuth,
  exact,
  ...rest
}) => (
  <Route
    {...rest}
    render={props =>
      isAuth ? (
        <Component exact={exact} {...props} />
      ) : (
        <Redirect to='/login' />
      )}
  />
)

export default connect(
  (state: RootState) => ({isAuth: state.profile.auth.isAuthenticated })
)(PrivateRoute)