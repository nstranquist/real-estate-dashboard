import React, {useState} from 'react'
import { connect } from 'react-redux'
import { Row, Col, Card, Form, Input, Select, Typography, Button, Divider, } from 'antd'
import { RootState } from '../../store/root'
import { attemptUpdateProfile } from '../../store/profileContainer/userData/actions'
import { ProfileData } from '../../types'

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
    md: { span: 5, push:2 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 14 },
    md: { span: 11, push:2 },
  },
}

interface IProps {
  profile: ProfileData
  profileError: any
  attemptUpdateProfile(profileData: ProfileData): void
}

// can view, edit profile
const Profile: React.FC<IProps> = ({
  profile: {
    firstName,
    lastName,
    email,
    companyName,
    phone,
    role
  },
  profileError,
  attemptUpdateProfile
}) => {
  const [formData, setFormData] = useState<ProfileData>({
    firstName, lastName, email, companyName, phone, role
  })
  const [formErrors, setFormErrors] = useState<string | null>(null)


  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }
  const handleCustomChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handleSubmit = () => {
    console.log('submit data:', formData)
    setFormErrors(null)

    // can add error checking if desired
    attemptUpdateProfile(formData)
  }

  return (
    <Row>
      <Col sm={{span:16,push:4}}>
        <Card>
          <Typography.Title level={2} style={{textAlign:'center'}}>
            Your Profile</Typography.Title>
          <Form {...formItemLayout} style={{background:'white'}}>
            {/* TODO: make 'formErrors' component to reuse */}
            {formErrors && <div style={{color:'red'}}>{formErrors}</div>}
            {profileError && <div style={{color:'red'}}>{profileError.message}</div>}
            <Form.Item label='Email:'>
              <Input required name='email' value={formData.email + " (cannot change)"} />
            </Form.Item>
            <Form.Item label='First Name:'>
              <Input required name='firstName' value={formData.firstName} onChange={handleChange} />
            </Form.Item>
            <Form.Item label='Last Name:'>
              <Input required name='lastName' value={formData.lastName} onChange={handleChange} />
            </Form.Item>
            {/* TODO: use cloud function to update 'Auth' email with this one */}
            <Form.Item label='Company Name:'>
              <Input required name='companyName' value={formData.companyName} onChange={handleChange} />
            </Form.Item>
            <Form.Item label='Phone:'>
              <Input required name='phone' type="tel" pattern='[0-9]{3}-[0-9]{3}-[0-9]{4}'
                value={formData.phone} onChange={handleChange} />
            </Form.Item>
            <Form.Item label='Role:'>
              <Select defaultValue={formData.role} onChange={(value: string) => handleCustomChange('role', value)}>
                <Select.Option value='Broker'>Broker</Select.Option>
                <Select.Option value='Principal'>Principal</Select.Option>
              </Select>
            </Form.Item>
            {/* TODO: allow to change password */}
            <Divider />
            <Form.Item label='Old Password:'>
              <Input name='oldPassword' placeholder='Old Password' />
              
              <Input name='newPassword' placeholder='New Password' />
              <Input name='confirmNewPassword' placeholder='Confirm New Password' />
            </Form.Item>
          </Form>
          
          {/* TODO: make reusable styled-component 'ButtonWrapper' */}
          <div style={{display:'block', textAlign:'center'}}>
            <Button type='primary' onClick={handleSubmit}>
              Update</Button>
          </div>
        </Card>
      </Col>
    </Row>
    
  )
}

const mapStateToProps = (state: RootState) => ({
  profile: state.profile.userData, // TODO: add 'profile' object to 'userData' section of store, and add selector
  profileError: state.profile.userData.errors
})

export default connect(
  mapStateToProps,
  { attemptUpdateProfile }
)(Profile)
