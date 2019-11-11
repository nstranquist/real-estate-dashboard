import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Input from "../../shared-components/input";
import Button from "../../shared-components/button";
import SignInStyleWrapper from "../../styles/signin.style";
import Spin from "../../styles/spin.style";

import { attemptLogin } from '../../store/profileContainer/auth/actions'
import { RootState } from "../../store/root";

interface IProps {
  isAuth: boolean
  loadingAuth: boolean
  loginError: any
  attemptLogin(email: string, password: string): void
}

const SignIn: React.FC<IProps> = ({
  isAuth,
  loadingAuth,
  loginError,
  attemptLogin
}) => {
  //const [redirectToReferrer, setRedirectToReferrer] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    console.log('called useEffect')
  }, [])

  //if(isAuth === true) {
  //  setRedirectToReferrer(true)
  //}

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
              <div className="isoSignInForm">
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

                <div className="isoInputWrapper isoLeftRightComponent">
                  <Button type="primary" onClick={(e: any) => handleLogin(e)}>
                    Sign In
                    {/* <IntlMessages id="page.signInButton" /> */}
                  </Button>
                </div>

                <div className="isoCenterComponent isoHelperWrapper">
                  {/* <Link to="/forgotpassword" className="isoForgotPass">
                    <IntlMessages id="page.signInForgotPass" />
                  </Link> */}
                  <Link to="/signup">
                    No Account? Create an Account
                    {/* <IntlMessages id="page.signInCreateAccount" /> */}
                  </Link>
                </div>
              </div>
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
  { attemptLogin }
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
