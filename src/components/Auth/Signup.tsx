import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
// import components
import { Form } from "antd";
import Input from "../_shared/input";
import Button from "../_shared/button";
// import styled components
import SignUpStyleWrapper from "../../styles/signup.style";
import Spin from "../../styles/spin.style";
// import redux
import { attemptSignup, clearAuthErrors } from '../../store/profileContainer/auth/actions'
import { RootState } from "../../store/root";
// import types
import { SignUpForm } from '../../types'


interface IProps {
  isAuth: boolean
  loadingAuth: boolean
  signupError: any
  attemptSignup(firstName: string, lastName: string, email: string, password: string): void
  clearAuthErrors(): void
}

const emptyForm: SignUpForm = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confPassword: ''
}

const SignUp: React.FC<IProps> = ({
  isAuth,
  loadingAuth,
  signupError,
  attemptSignup,
  clearAuthErrors,
}) => {
  //const [redirectToReferrer, setRedirectToReferrer] = useState(false)
  const [formData, setFormData] = useState<SignUpForm>(emptyForm)
  const [formErrors, setFormErrors] = useState<string | null>(null)

  useEffect(() => {
    clearAuthErrors() // clears errors on mount
  }, [])

  const handleSignup = (e: any) => {
    e.preventDefault()
    // clear form errors
    setFormErrors(null)

    const { firstName, lastName, email, password, confPassword } = formData

    if(password === confPassword) {
      attemptSignup(firstName, lastName, email, password)
      clearForm()
    } else {
      setFormData({
        ...formData,
        password: '',
        confPassword: ''
      })
      setFormErrors('passwords must match')
    }
  };

  const handleInput = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const onKeyPress = (e: any) => { 
    if (e.which === 13) // 13 is the 'enter' key
      handleSignup(e);
  };

  const clearForm = () => {
    setFormData(emptyForm)
    //setRedirectToReferrer(false)
  }
  
  if (isAuth)
    return <Redirect to='/home' />

  return (
    <SignUpStyleWrapper className="isoSignUpPage">
      <div className="isoSignUpContentWrapper">
        <div className="isoSignUpContent">
          <div className="isoLogoWrapper">
            <Link to="/dashboard" style={{color:'black'}}>
              Create an Account</Link>
          </div>
          {/* show errors from backend and/or UI */}
          {signupError && (<div style={{color: 'red'}}>
              <p>Data Error: {signupError.message}</p>
            </div>)}
          {formErrors && <div style={{color:'red'}}>UI Error: {formErrors}</div>}
          <Spin spinning={loadingAuth} size="large">
            <Form className="isoSignUpForm">
              <Form.Item className="isoInputWrapper">
                <Input
                  autoFocus
                  required
                  size="large"
                  placeholder="First name"
                  name='firstName'
                  value={formData.firstName}
                  onChange={handleInput}/>
              </Form.Item>

              <Form.Item className="isoInputWrapper">
                <Input 
                  required
                  size="large"
                  placeholder="Last name"
                  name='lastName'
                  value={formData.lastName}
                  onChange={handleInput}/>
              </Form.Item>

              <Form.Item className="isoInputWrapper">
                <Input
                  required
                  size="large"
                  placeholder="Email"
                  name='email'
                  value={formData.email}
                  onChange={handleInput}
                  autoFocus
                />
              </Form.Item>

              <Form.Item className="isoInputWrapper">
                <Input
                  required
                  size="large"
                  type="password"
                  placeholder="Password"
                  name='password'
                  value={formData.password}
                  onChange={handleInput}
                  onKeyPress={onKeyPress}
                />
              </Form.Item>
              <Form.Item className="isoInputWrapper">
                <Input
                  required
                  size="large"
                  type="password"
                  placeholder="Confirm Password"
                  name='confPassword'
                  value={formData.confPassword}
                  onChange={handleInput}
                  onKeyPress={onKeyPress}
                />
              </Form.Item>

              <Form.Item className="isoInputWrapper isoLeftRightComponent">
                <Button type="primary" onClick={handleSignup}>
                  Sign Up</Button>
              </Form.Item>

              <Form.Item className="isoCenterComponent isoHelperWrapper">
                {/* <Link to="/forgotpassword" className="isoForgotPass">
                  Rest Password</Link> */}
                <Link to="/login">
                  Already have an account? Log in</Link>
              </Form.Item>
            </Form>
          </Spin>
        </div>
      </div>
    </SignUpStyleWrapper>
  );
}

const mapStateToProps = (state: RootState) => ({
  isAuth: state.profile.auth.isAuthenticated,
  loadingAuth: state.profile.auth.loadingAuth,
  signupError: state.profile.auth.errors,
})

export default connect(
  mapStateToProps,
  { attemptSignup, clearAuthErrors }
)(SignUp);
