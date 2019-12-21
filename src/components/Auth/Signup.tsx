import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
// import components
import { SignUpForm } from './SignUpForm'
// import { ProfileForm } from './ProfileForm'
import SignUpStyleWrapper from "../../styles/signup.style";
import Spin from "../../styles/spin.style";
// import redux
import { attemptSignup, clearAuthErrors } from '../../store/profileContainer/auth/actions'  // attemptCreateProfile
import { RootState } from "../../store/root";
// import types
import { ISignUpForm } from '../../types'  // CreateProfileForm


interface IProps {
  isAuth: boolean
  loadingAuth: boolean
  signupError: any
  attemptSignup(userSignUp: ISignUpForm): void
  clearAuthErrors(): void
  // attemptCreateProfile(userProfile: CreateProfileForm): void
}

const SignUp: React.FC<IProps> = ({
  isAuth,
  loadingAuth,
  signupError,
  attemptSignup,
  clearAuthErrors,
}) => {
  //const [redirectToReferrer, setRedirectToReferrer] = useState(false)
  // const [formStep, setFormStep] = useState<1 | 2>(1)
  const [formErrors, setFormErrors] = useState<string | null>(null)

  useEffect(() => {
    clearAuthErrors() // clears errors on mount
    // setFormStep(1)
  }, [])

  const handleSignup = (signUpForm: ISignUpForm) => {

    setFormErrors(null)

    const { firstName, lastName, email, companyName, phone, role, password } = signUpForm

    attemptSignup({
      firstName,
      lastName,
      email,
      companyName,
      phone,
      role,
      password
    })
  }

  // const handleCreateProfile = (profileForm: CreateProfileForm) => {}

  if (isAuth)
    return <Redirect to='/home' />

  return (
    <SignUpStyleWrapper className="isoSignUpPage">
      <div className="isoSignUpContentWrapper">
        <div className="isoSignUpContent">
          <div className="isoLogoWrapper">
            <Link to="/login" style={{color:'black'}}>
              Create an Account</Link>
          </div>
          {/* show errors from backend and/or UI */}
          {signupError && (<div style={{color: 'red'}}>
              <p>Data Error: {signupError.message}</p>
            </div>)}
          {formErrors && <div style={{color:'red'}}>UI Error: {formErrors}</div>}
          <Spin spinning={loadingAuth} size="large">
            <SignUpForm
              submitForm={handleSignup}
              setErrors={setFormErrors}
            />
            {/* {formStep === 1 ? (
              <SignUpForm
                submitForm={handleSignup}
                setErrors={setFormErrors} // could make these errors into separate errors per form
              />
            ) : (
              <ProfileForm
                submitForm={handleCreateProfile}
                setErrors={setFormErrors}
              />
            )} */}
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
  { attemptSignup, clearAuthErrors } // attemptCreateProfile
)(SignUp);
