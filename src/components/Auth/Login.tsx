import React, { useState, useEffect } from "react";
import styled from 'styled-components'
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { Form, Input, Button, Icon } from 'antd'

//import Input from "../_shared/input";
//import Button from "../_shared/button";
import SignInStyleWrapper from "../../styles/signin.style";
import Spin from "../../styles/spin.style";

import { attemptLogin, clearAuthErrors } from '../../store/profileContainer/auth/actions'
import { RootState } from "../../store/root";


interface IProps {
  isAuth: boolean
  loadingAuth: boolean
  loginError: any
  attemptLogin(email: string, password: string): void
  clearAuthErrors(): void
}

const SignIn: React.FC<IProps> = ({
  isAuth,
  loadingAuth,
  loginError,
  attemptLogin,
  clearAuthErrors,
}) => {
  //const [redirectToReferrer, setRedirectToReferrer] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    console.log('called useEffect')
    clearAuthErrors()
  }, [])

  const handleLogin = (e: any) => {
    e.preventDefault()
    console.log('signing in')
    attemptLogin(email, password)
    clearForm()
  };
  const clearForm = () => { // is this needed? can test...
    setEmail('')
    setPassword('')
    //setRedirectToReferrer(false)
  }
  const onKeyPress = (e: any) => {
    if (e.which === 13)
      handleLogin(e);
  };

  const onEmailChange = (event: any) => {
    const value = event.target.value;
    setEmail(value)
  };
  const onPassChange = (event: any) => {
    const value = event.target.value;
    setPassword(value)
  };
    
  //const from = { pathname: "/home" };
  if (isAuth) {
    return <Redirect to='/home' />
  }

    return (
      <SignInStyleWrapper className="isoSignInPage">
        <div className="isoLoginContentWrapper">
          <div className="isoLoginContent">
            <div className="isoLogoWrapper">
              <Link to="/dashboard" style={{color: 'black'}}>
                Sign in to Brokerage Dashboard
                {/* <IntlMessages id="EDURain Sign In" /> */}
              </Link>
            </div>
            {loginError && (<div style={{color: 'red'}}>
                <p>Error: Could not sign in</p>
                <p>{loginError.message}</p>
              </div>)}
            <Spin spinning={loadingAuth} size="large">
              <Form className="isoSignInForm">
                <Form.Item className="isoInputWrapper">
                  <Input
                    autoFocus
                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.45)' }} />}
                    size="large"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={onEmailChange}
                  />
                </Form.Item>

                <Form.Item className="isoInputWrapper">
                  <Input
                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.45)' }} />}
                    size="large"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={onPassChange}
                    onKeyPress={onKeyPress}
                  />
                </Form.Item>

                <Form.Item className="isoInputWrapper isoLeftRightComponent">
                  <Button type="primary" onClick={(e: any) => handleLogin(e)}>
                    Sign In
                    {/* <IntlMessages id="page.signInButton" /> */}
                  </Button>
                </Form.Item>

                <Form.Item className="isoCenterComponent isoHelperWrapper">
                  {/* <Link to="/forgotpassword" className="isoForgotPass">
                    <IntlMessages id="page.signInForgotPass" />
                  </Link> */}
                  <Link to="/signup">
                    No Account? Create an Account
                    {/* <IntlMessages id="page.signInCreateAccount" /> */}
                  </Link>
                </Form.Item>
              </Form>
            </Spin>
          </div>
        </div>
      </SignInStyleWrapper>
    );
}

const mapStateToProps = (state: RootState) => ({
  isAuth: state.profile.auth.isAuthenticated,
  loadingAuth: state.profile.auth.loadingAuth,
  loginError: state.profile.auth.errors,
})

export default connect(
  mapStateToProps,
  { attemptLogin, clearAuthErrors }
)(SignIn);


// OLD CODE:
  //componentWillReceiveProps(nextProps) {
  //  if (
  //    this.props.isAuth !== nextProps.isLoggedIn &&
  //    nextProps.isLoggedIn === true
  //  ) {
  //    this.setState({ redirectToReferrer: true });
  //  }
  //}
