import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Input from "../_shared/input";
import Button from "../_shared/button";

import SignUpStyleWrapper from "../../styles/signup.style";
import Spin from "../../styles/spin.style";

import { attemptSignup, clearAuthErrors } from '../../store/profileContainer/auth/actions'
import { RootState } from "../../store/root";


interface IProps {
  isAuth: boolean
  loadingAuth: boolean
  signupError: any
  attemptSignup(firstName: string, lastName: string, email: string, password: string): void
  clearAuthErrors(): void
}

const SignUp: React.FC<IProps> = ({
  isAuth,
  loadingAuth,
  signupError,
  attemptSignup,
  clearAuthErrors,
}) => {
  //const [redirectToReferrer, setRedirectToReferrer] = useState(false)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confPassword, setConfPassword] = useState('')

  useEffect(() => {
    console.log('called useEffect')
    clearAuthErrors()
  }, [])

  const handleSignup = (e: any) => {
    e.preventDefault()
    console.log('signing up')
    if(password === confPassword) {
      attemptSignup(firstName, lastName, email, password)
      clearForm()
    } else {
      setPassword('')
      setConfPassword('')
      console.log('error! passwords do not match')
      alert('passwords must match')
    }
  };
  const clearForm = () => { // is this needed? can test...
    setFirstName('')
    setLastName('')
    setEmail('')
    setPassword('')
    setConfPassword('')
    //setRedirectToReferrer(false)
  }
  const onKeyPress = (e: any) => { 
    if (e.which === 13) // 13 is the 'enter' key
      handleSignup(e);
  };

  //redirectToReferrer = this.state;
  const onEmailChange = (event: any) => {
    const value = event.target.value;
    setEmail(value)
  };
  const onPassChange = (event: any) => {
    const value = event.target.value;
    setPassword(value)
  };
  const onConfPassChange = (event: any) => {
    const value = event.target.value;
    setConfPassword(value)
  };
  // TODO: optimize this, use 1 function for all text updates
  //  will need to pass in some sort of prop to define / identify it
  const onFirstNameChange = (event: any) => {
    const value = event.target.value;
    setFirstName(value)
  };
  const onLastNameChange = (event: any) => {
    const value = event.target.value;
    setLastName(value)
  };
    
  //const from = { pathname: "/dashboard" };
  if (isAuth) {
    return <Redirect to={'/home'} />;
  }

    return (
      <SignUpStyleWrapper className="isoSignUpPage">
        <div className="isoSignUpContentWrapper">
          <div className="isoSignUpContent">
            <div className="isoLogoWrapper">
              <Link to="/dashboard" style={{color:'black'}}>
                Create an Account
                {/* <IntlMessages id="EDURain Sign In" /> */}
              </Link>
            </div>
            {signupError && (<div style={{color: 'red'}}>
                <p>Error: Could not signup</p>
                <p>{signupError.message}</p>
              </div>)}
            <Spin spinning={loadingAuth} size="large">
              <div className="isoSignUpForm">
                <div className="isoInputWrapper">
                  <Input
                    size="large"
                    placeholder="First name"
                    value={firstName}
                    onChange={onFirstNameChange}/>
                </div>

                <div className="isoInputWrapper">
                  <Input 
                    size="large"
                    placeholder="Last name"
                    value={lastName}
                    onChange={onLastNameChange}/>
                </div>

                <div className="isoInputWrapper">
                  <Input
                    size="large"
                    placeholder="Email"
                    value={email}
                    onChange={onEmailChange}
                    autoFocus
                  />
                </div>

                <div className="isoInputWrapper">
                  <Input
                    size="large"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={onPassChange}
                    onKeyPress={onKeyPress}
                  />
                </div>
                <div className="isoInputWrapper">
                  <Input
                    size="large"
                    type="password"
                    placeholder="Confirm Password"
                    value={confPassword}
                    onChange={onConfPassChange}
                    onKeyPress={onKeyPress}
                  />
                </div>

                <div className="isoInputWrapper isoLeftRightComponent">
                  <Button type="primary" onClick={handleSignup}>
                    Sign Up
                    {/* <IntlMessages id="page.signUpButton" /> */}
                  </Button>
                </div>

                <div className="isoCenterComponent isoHelperWrapper">
                  {/* <Link to="/forgotpassword" className="isoForgotPass">
                    <IntlMessages id="page.signUpForgotPass" />
                  </Link> */}
                  <Link to="/login">
                    Already have an account? Log in
                    {/* <IntlMessages id="page.signUpCreateAccount" /> */}
                  </Link>
                </div>
              </div>
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


// OLD CODE:
  //componentWillReceiveProps(nextProps) {
  //  if (
  //    this.props.isAuth !== nextProps.isLoggedIn &&
  //    nextProps.isLoggedIn === true
  //  ) {
  //    this.setState({ redirectToReferrer: true });
  //  }
  //}
