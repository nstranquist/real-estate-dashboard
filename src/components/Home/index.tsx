import React from 'react'
import { connect } from 'react-redux'
import { auth } from '../../utils/firebaseHelper'
import { getUserData } from '../../store/profileContainer/userData/actions'
import { RootState } from '../../store/root'


interface IProps {
  getUserData(): void
}

const Home: React.FC<IProps> = ({
  //getUserData
}) => {

  auth.onAuthStateChanged((user) => {
    if(user) {
      console.log('state changed')
      getUserData()
    }
  })

  return (
    <div>
      Home
    </div>
  )
}

const mapStateToProps = (state: RootState) => ({

})

export default connect(
  mapStateToProps,
  { getUserData }
)(Home)