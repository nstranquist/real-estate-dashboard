import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Form, Input, Select, Button, Icon } from "antd";
import { ISignUpForm } from '../../types'

interface IProps {
  submitForm(authData: ISignUpForm): void
  setErrors(errorMessage: string | null): void
}

const emptyForm: ISignUpForm = {
  firstName: '',
  lastName: '',
  email: '',
  companyName: '',
  phone: '',
  role: 'Broker',
  password: '',
  confPassword: ''
}

export const SignUpForm: React.FC<IProps> = ({
  submitForm,
  setErrors
}) => {
  const [formData, setFormData] = useState<ISignUpForm>(emptyForm)

  const handleInput = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleCustomInput = (name: string, value: any) => {
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const onKeyPress = (e: any) => { 
    if (e.which === 13) // 13 is the 'enter' key
      handleSignup(e);
  }

  const handleSignup = (e: any) => {
    e.preventDefault()

    setErrors(null)

    const { firstName, lastName, email, companyName, phone, role, password, confPassword } = formData

    if(password === confPassword) {
      submitForm({
        firstName,
        lastName,
        email,
        companyName,
        phone,
        role,
        password
      })
      setFormData(emptyForm)
    } else {
      setFormData({
        ...formData,
        password: '',
        confPassword: ''
      })
      setErrors('passwords must match')
    }
  };

  return (
    <Form className="isoSignUpForm">
      <Form.Item className="isoInputWrapper">
        <Input
          required
          size="default"
          placeholder="First Name"
          name='firstName'
          value={formData.firstName}
          onChange={handleInput}
          autoFocus
        />
      </Form.Item>

      <Form.Item className="isoInputWrapper">
        <Input 
          required
          size="default"
          placeholder="Last Name"
          name='lastName'
          value={formData.lastName}
          onChange={handleInput}/>
      </Form.Item>

      <Form.Item className="isoInputWrapper">
        <Input
          required
          size="default"
          placeholder="Email"
          type="email"
          name='email'
          value={formData.email}
          onChange={handleInput}
        />
      </Form.Item>

      <Form.Item className="isoInputWrapper">
        <Input 
          required
          size="default"
          placeholder="Company Name"
          name='companyName'
          value={formData.companyName}
          onChange={handleInput}/>
      </Form.Item>

      <Form.Item className="isoInputWrapper">
        <Input
          required
          size="default"
          type='tel'
          pattern='[0-9]{3}-[0-9]{3}-[0-9]{4}'
          placeholder="Phone (i.e. 123-456-7890)"
          name='phone'
          value={formData.phone}
          onChange={handleInput}
        />
      </Form.Item>

      <Form.Item>
        <Select
          defaultValue={'Broker'}
          onChange={(value: string) => handleCustomInput('role', value)}
        >
          <Select.Option value="Broker">Broker</Select.Option>
          <Select.Option value="Principal">Principal</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item className="isoInputWrapper">
        <Input
          required
          size="default"
          type="password"
          placeholder="Password (min. 8 characters)"
          name='password'
          value={formData.password}
          onChange={handleInput}
          onKeyPress={onKeyPress}
        />
      </Form.Item>

      <Form.Item className="isoInputWrapper">
        <Input
          required
          size="default"
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

      <Form.Item className="isoCenterComponent " style={{textAlign:'center'}}>
        <Link to="/login">
          Already have an account? Log in</Link>
      </Form.Item>
    </Form>
  )
}
