import React from 'react'
import { connect } from 'react-redux'
import { Route, Redirect } from 'react-router-dom';
import { RootState } from '../store/root'

interface IProps {
  component: any
  isAuth: boolean
  path: string
  exact?: boolean
}

const GuestRoute: React.FC<IProps> = ({
  component: Component,
  isAuth,
  exact,
  ...rest
}) => (
  <Route
    {...rest}
    render={props =>
      !isAuth ? (
        <Component exact={exact} {...props} />
      ) : (
        <Redirect to='/home' />
      )}
  />
)

const mapStateToProps = (state: RootState) => ({
  isAuth: state.profile.auth.isAuthenticated
})

export default connect(
  mapStateToProps
)(GuestRoute)
