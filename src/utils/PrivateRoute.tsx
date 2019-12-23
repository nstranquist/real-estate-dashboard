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

const PrivateRoute: React.FC<IProps> = ({
  component: Component,
  isAuth,
  exact,
  ...rest
}) => (
  <Route
    {...rest}
    render={routeProps =>
      isAuth ? (
        <Component exact={exact} {...routeProps} />
      ) : (
        <Redirect to='/login' />
      )}
  />
)

// NOTE: is this okay?
export default connect(
  (state: RootState) => ({isAuth: state.profile.auth.isAuthenticated })
)(PrivateRoute)

// import * as React from "react"
// import { connect } from 'react-redux'
// import { Redirect, Route, RouteComponentProps, RouteProps } from "react-router-dom"
// import { RootState } from '../store/root'

// interface IProps extends RouteProps {
//   isAuth: boolean
// }

// type RouteComponent = React.StatelessComponent<RouteComponentProps<{}>> | React.ComponentClass<any>

// export const PrivateRoute: React.StatelessComponent<IProps> = ({isAuth, component, ...rest}) => {
//   const renderFn = (Component?: RouteComponent) => (props: RouteProps) => {
//     if (!Component)
//       return null

//     if (isAuth)
//       return <Component {...props} />

//     const redirectProps = {
//       to: {
//         pathname: "/auth/sign-in",
//         state: {from: props.location},
//       },
//     }

//     return <Redirect {...redirectProps} />
//   }

//   return <Route {...rest} render={renderFn(component)} />
// }

// export default connect(
//   (state: RootState) => ({isAuth: state.profile.auth.isAuthenticated })
// )(PrivateRoute)

// import * as H from 'history';
// import * as React from 'react';
// import { connect, MapStateToPropsParam } from 'react-redux';
// import { Redirect, Route, RouteComponentProps, RouteProps } from 'react-router';

// export interface ConditionalRouteProps extends RouteProps {
//   routeCondition: boolean;
//   redirectTo: H.LocationDescriptor;
// }

// export class ConditionalRoute extends React.Component<ConditionalRouteProps> {
//   public render() {
//     // Extract RouteProps without component property to rest.
//     const { component: Component, routeCondition, redirectTo, ...rest } = this.props;
//     return <Route {...rest} render={this.renderFn} />
//   }

//   private renderFn = (renderProps: RouteComponentProps<any>) => {
//     if (this.props.routeCondition) {
//       const { component: Component } = this.props; // JSX accepts only upprcase.
//       if (!Component) {
//         return null;
//       }
//       return <Component {...renderProps} />
//     }

//     return <Redirect to={this.props.redirectTo} />;
//   };
// }

// export function connectConditionalRoute<S>(mapStateToProps: MapStateToPropsParam<ConditionalRouteProps, RouteProps, S>) {
//   return connect<ConditionalRouteProps, {}, RouteProps, S>(mapStateToProps)(ConditionalRoute);
// }
