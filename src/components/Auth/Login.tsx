import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
// import components
import { Form, Input, Button, Icon } from 'antd'
import SignInStyleWrapper from "../../styles/signin.style";
import Spin from "../../styles/spin.style";
// import redux
import { attemptLogin, clearAuthErrors } from '../../store/profileContainer/auth/actions'
import { RootState } from "../../store/root";
// import types
import { SignInForm } from "../../types";


interface IProps {
  isAuth: boolean
  loadingAuth: boolean
  loginError: any
  attemptLogin(email: string, password: string): void
  clearAuthErrors(): void
}

const emptyForm: SignInForm = {
  email: '',
  password: '',
  rememberMe: false
}

const SignIn: React.FC<IProps> = ({
  isAuth,
  loadingAuth,
  loginError,
  attemptLogin,
  clearAuthErrors,
}) => {
  //const [redirectToReferrer, setRedirectToReferrer] = useState(false)
  const [formData, setFormData] = useState<SignInForm>(emptyForm)
  const [formErrors, setFormErrors] = useState<string | null>(null)

  useEffect(() => {
    clearAuthErrors()
  }, [])

  const handleLogin = (e: any) => {
    e.preventDefault()
    setFormErrors(null)

    const {email, password, rememberMe} = formData

    attemptLogin(email, password)
    clearForm()
  }

  const handleInput = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const onKeyPress = (e: any) => {
    if (e.which === 13)
      handleLogin(e)
  }

  const clearForm = () => {
    setFormData(emptyForm)
    //setRedirectToReferrer(false)
  }
    
  if (isAuth)
    return <Redirect to='/home' />

  return (
    <SignInStyleWrapper className="isoSignInPage">
      <div className="isoLoginContentWrapper">
        <div className="isoLoginContent">
          <div className="isoLogoWrapper">
            <Link to="/login" style={{color: 'black'}}>
              Sign in to Brokerage Dashboard</Link>
          </div>
          {loginError && (<div style={{color: 'red'}}>
              <p>Error: {loginError.message}</p>
            </div>)}
          {formErrors && <div style={{color: 'red'}}>Error: {formErrors}</div>}
          <Spin spinning={loadingAuth} size="large">
            <Form className="isoSignInForm">
              <Form.Item className="isoInputWrapper">
                <Input
                  autoFocus
                  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.45)' }} />}
                  size="large"
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleInput}
                />
              </Form.Item>

              <Form.Item className="isoInputWrapper">
                <Input
                  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.45)' }} />}
                  size="large"
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleInput}
                  onKeyPress={onKeyPress}
                />
              </Form.Item>

              {/* TODO: add 'rememberMe' toggle here */}

              <Form.Item className="isoInputWrapper isoLeftRightComponent">
                <Button type="primary" onClick={handleLogin} style={{display:'block', width:'100%', marginTop:5}}>
                  Sign In</Button>
              </Form.Item>

              <Form.Item className="isoCenterComponent" style={{textAlign:'center'}}>
                <Link to="/reset-password">
                  Forgot Password</Link>
                <br />
                <Link to="/signup">
                  No Account? Create an Account</Link>
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
