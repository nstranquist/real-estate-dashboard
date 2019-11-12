import React from 'react'
import { connect } from 'react-redux'
import { RootState } from '../../store/root'


interface IProps {

}

const Home: React.FC<IProps> = ({

}) => {

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
  {  }
)(Home)