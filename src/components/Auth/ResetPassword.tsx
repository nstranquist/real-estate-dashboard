import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
// import components
import { Form, Input, Button, Icon } from 'antd'
import SignInStyleWrapper from "../../styles/signin.style";
import Spin from "../../styles/spin.style";

interface IProps {
  isAuth: boolean
}

const emptyForm = {
  email: '',
}

export const ResetPassword: React.FC<IProps> = ({
  isAuth,
}) => {
  //const [redirectToReferrer, setRedirectToReferrer] = useState(false)
  const [email, setEmail] = useState<string>('')
  const [formErrors, setFormErrors] = useState<string | null>(null)

  useEffect(() => {
    setFormErrors(null)
  }, [])

  const handleReset = (e: any) => {
    e.preventDefault()
    setFormErrors(null)
    console.log('reset email:',email)
    //attemptReset(email)
    setEmail('')
  }

  const handleEmailInput = (e: any) => {
    setEmail(e.target.value)
  }

  const onKeyPress = (e: any) => {
    if (e.which === 13)
      handleReset(e)
  }

  if (isAuth)
    return <Redirect to='/home' />

  return (
    <SignInStyleWrapper className="isoSignInPage">
      <div className="isoLoginContentWrapper">
        <div className="isoLoginContent">
          <div className="isoLogoWrapper">
            <Link to="/login" style={{color: 'black'}}>
              Reset Password</Link>
          </div>
          {formErrors && <div style={{color: 'red'}}>Error: {formErrors}</div>}
          <Form className="isoSignInForm">
            <Form.Item className="isoInputWrapper">
              <Input
                autoFocus
                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.45)' }} />}
                size="large"
                type="email"
                name="email"
                placeholder="Email"
                value={email}
                onChange={handleEmailInput}
                onKeyPress={onKeyPress}
              />
            </Form.Item>

            <Form.Item className="isoInputWrapper isoLeftRightComponent">
              <Button type="primary" onClick={handleReset} style={{display:'block', width:'100%', marginTop:5}}>
                Sign In</Button>
            </Form.Item>

            <Form.Item className="isoCenterComponent" style={{textAlign:'center'}}>
              <Link to="/login">
                Back to Login</Link>
            </Form.Item>
          </Form>
        </div>
      </div>
    </SignInStyleWrapper>
  );
}
