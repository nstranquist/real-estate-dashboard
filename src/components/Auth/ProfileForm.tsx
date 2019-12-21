
export const profileform='profileform'


// import React, { useState } from 'react'
// import { Form, Input, Select, Switch, Button, Icon } from "antd";
// import { CreateProfileForm } from '../../types'

// interface IProps {
//   submitForm(profileData: CreateProfileForm): void
//   setErrors(errorMessage: string | null): void
// }

// const emptyForm: CreateProfileForm = {
//   address: '',
//   address2: '',
//   city: '',
//   state: '', //'AL' | 'AK' | 'AZ' | 'AR' | 'CA' | 'CO' | 'CT' | https://www.50states.com/abbreviations.htm
//   zipCode: 0,
//   priceMin: 0, // 'priceRange:', '0 - 2.5mil', '2.5-5', '5-10', '10-20', '20+'
//   priceMax: 2500000,
//   propertyType: 'Retail',
//   tenancy: 'Single',
//   regions: [], //'Midwest', 'Northeast', 'Southeast', 'Southwest', 'West'
//   leaseType: 'Ground', // | 'Net' | 'Absolute Net'
//   locationType: 'Primary MSA', // | 'Tertiary MSA' | 'Urban / Dense / In-fill'
//   propertyStatus: 'Stabilized', // | 'Value-Add'
//   is1031: false
// }

// export const ProfileForm: React.FC<IProps> = ({
//   submitForm,
//   setErrors
// }) => {
//   const [formData, setFormData] = useState<CreateProfileForm>(emptyForm)

//   const handleInput = (e: any) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     })
//   }

//   const handleCustomInput = (name: string, value: any) => {
//     setFormData({
//       ...formData,
//       [name]: value
//     })
//   }


//   const handleSignup = (e: any) => {
//     e.preventDefault()

//     setErrors(null)

//     const newProfile = {
//       address: formData.address,
//       adress2: formData.address2,
//       city: formData.city,
//       state: formData.state,
//       zipCode: formData.zipCode,
//       priceMin: formData.priceMin,
//       priceMax: formData.priceMax,
//       propertyType: formData.propertyType,
//       tenancy: formData.tenancy,
//       regions: formData.regions,
//       leaseType: formData.leaseType,
//       locationType: formData.locationType,
//       propertyStatus: formData.propertyStatus,
//       is1031: formData.is1031
//     }

//     if(formData.priceMin! < formData.priceMax!) {
//       submitForm(newProfile)
//       setFormData(emptyForm)
//     } else {
//       setFormData({
//         ...formData,
//         priceMin: 0,
//         priceMax: 2500000
//       })
//       setErrors('price range invalid')
//     }
//   };

//   return (
//     <Form className="isoSignUpForm">
//       <Form.Item className="isoInputWrapper">
//         <Input
//           size="default"
//           placeholder="Address 1"
//           name='address'
//           value={formData.address}
//           onChange={handleInput}
//           autoFocus
//         />
//       </Form.Item>

//       <Form.Item className="isoInputWrapper">
//         <Input 
//           size="default"
//           placeholder="Address 2"
//           name='address2'
//           value={formData.address2}
//           onChange={handleInput}
//         />
//       </Form.Item>

//       <Form.Item className="isoInputWrapper">
//         <Select
//           defaultValue={'Retail'}
//           onChange={(value: string) => handleCustomInput('propertyType', value)}
//         >
//           <Select.Option value="Retail">Retail</Select.Option>
//           <Select.Option value="Office">Office</Select.Option>
//           <Select.Option value="Multi-Family">Multi-Family</Select.Option>
//           <Select.Option value="Medical">Medical</Select.Option>
//           <Select.Option value="Land">Land</Select.Option>
//           <Select.Option value="Industrial">Industrial</Select.Option>
//           <Select.Option value="Hospitality">Hospitality</Select.Option>
//         </Select>
//       </Form.Item>
        
//       <Form.Item className='isoInputWrapper'>
//         <Select
//           defaultValue={'Single'}
//           onChange={(value: string) => handleCustomInput('tenancy', value)}
//         >
//           <Select.Option value="Single">Single Tenant</Select.Option>
//           <Select.Option value="Multi">Multi Tenant</Select.Option>
//         </Select>
//       </Form.Item>

//       <Form.Item className='isoInputWrapper'>
//         <div style={{display:'inline-block'}}>
//           <Switch
//             style={{height:20}}
//             checkedChildren='Single'
//             unCheckedChildren='Multi'
//             defaultChecked
//             onChange={(value: boolean) => console.log('changed switch:', value)}
//           />
//         </div>
//       </Form.Item>

//       <Form.Item className="isoInputWrapper isoLeftRightComponent">
//         <Button type="primary" onClick={handleSignup}>
//           Create Profile</Button>
//       </Form.Item>

//       <Form.Item className="isoCenterComponent">
//         <Button type="ghost" onClick={handleSignup}>
//           Skip this step</Button>
//       </Form.Item>
//     </Form>
//   )
// }

// /*
// <div style={{display:'inline-block'}}>
//   <Switch
//     style={{height:20}}
//     checkedChildren='Single'
//     unCheckedChildren='Multi'
//     defaultChecked
//     onChange={(value: boolean) => console.log('changed switch:', value)}
//   />
// </div>
// */