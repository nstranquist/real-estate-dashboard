import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { Typography, List, Button } from 'antd'
import { RootState } from '../../store/root'
import { UserDataState } from '../../store/profileContainer/userData/types'

const { Title, Text, Paragraph } = Typography


const ProfileStyleWrapper = styled.div`
  background: white;
  padding: 10px;
  font-size: 1.2rem;
`
const ProfileItemStyle = styled.div`
  display: block;
  margin: 0 auto;
  font-size: 1.2rem;
  color: rgba(0,0,0,.8);
`

interface IProps {
  profile: UserDataState
}

// can view, edit profile
const Profile: React.FC<IProps> = ({
  profile: {
    firstName,
    lastName,
    email,
    company
  }
}) => {

  const handleClickItem = (index: number) => {
    console.log('clicked item', index)
  }

  return (
    <div>
      <Title level={2}>
        Profile
        <Button style={{marginLeft:'10px'}} type="primary">Edit</Button>
      </Title>
      <List
        header={<div>(click to edit)</div>}
        bordered
        style={{background:'white'}}
      >
        <List.Item onClick={() => handleClickItem(1)}>
          <Typography.Text style={{fontSize:'.9rem'}}>First Name: </Typography.Text>
          <ProfileItemStyle>
            <Text editable>{firstName}</Text>
          </ProfileItemStyle>
        </List.Item>
        <List.Item>
          <Typography.Text style={{fontSize:'.9rem'}}>Last Name: </Typography.Text>
          <ProfileItemStyle>
            <Text editable>{lastName}</Text>
          </ProfileItemStyle>
        </List.Item>
        <List.Item>
          <Typography.Text style={{fontSize:'.9rem'}}>Email: </Typography.Text>
          <ProfileItemStyle>
            <Text editable>{email}</Text>
          </ProfileItemStyle>
        </List.Item>
        <List.Item>
          <Typography.Text style={{fontSize:'.9rem'}}>Company: </Typography.Text>
          <ProfileItemStyle>
            <Text editable>{company}</Text>
          </ProfileItemStyle>
        </List.Item>
      </List>
      {/* <ProfileStyleWrapper> */}
        
      {/* </ProfileStyleWrapper> */}
      
    </div>
  )
}

const mapStateToProps = (state: RootState) => ({
  profile: state.profile.userData
})

export default connect(
  mapStateToProps,
  {  },
)(Profile)


// OLD CODE:
/* <Row>
<Col sm={24} md={4} style={{paddingRight:'3%'}}>
  <p>First Name:</p>
  <p>Last Name:</p>
</Col>
<Col sm={24} md={6}>
  <p>{firstName}</p>
  <p>{lastName}</p>
</Col>
</Row> */