import React, {useState} from 'react'
import { connect } from 'react-redux'
// import components
import { Row, Col, Button, Modal, Form, Input, InputNumber, Radio, Icon, Upload, Typography } from 'antd';
// import Upload from '../../_shared/Upload'
import { PropertiesTable } from '../Stats/tables';
import { Property } from '../../types'
// import redux
import { RootState } from '../../store/root'
import { addProperty, updateProperty, deleteProperty, uploadProperties } from '../../store/properties'


interface IProps {
  properties: Property[]
  filter: string
  loading: boolean
  errors: any
  addProperty(property: Property): void
  editProperty(property: Property): void
  deleteProperty(id: string): void
  uploadProperties(data: any): void
}

const emptyForm = {
  name: '',
  address: '',
  propertyType: 'Retail', // default to 'Retail'?
  city: "",
  state: "Illinois",
  tenancy: 'Single',
  leaseTerm: 24,
  termRemaining: 24,
  SqFt: 4000,
  dollarPerSF: 0, // note: should calculate unless specified
  noi: 5,
  capRate: 10,
  price: 300000,
  yearBuilt: 1980,
  occupancy: 50,
}

const PropertiesUI: React.FC<IProps> = ({
  properties,
  filter,
  loading,
  errors,
  addProperty,
  editProperty,
  deleteProperty,
  uploadProperties
}) => {
  const [visible, setVisible] = useState<boolean>(false)
  const [formData, setFormData] = useState<any>(emptyForm)
  const [formErrors, setFormErrors] = useState<any>(null)

  const showModal = () => {
    setVisible(true)
  }

  const handleCancel = () => {
    setVisible(false)
  };

  const handleCreate = () => {
    handleCancel()
    console.log('modal data to submit:', formData)
    const newProperty: Property = { // type "Property" without the "id"
      name: formData.name,
      address: formData.address,
      propertyType: formData.propertyType,
      city: formData.city,
      state: formData.state,
      tenancy: formData.tenancy,
      leaseTerm: formData.leaseTerm,
      termRemaining: formData.termRemaining,
      SqFt: formData.SqFt,
      dollarPerSF: formData.dollarPerSF > 0 ? formData.dollarPerSF : (Math.floor(formData.price / formData.SqFt)),
      noi: formData.noi,
      capRate: formData.capRate,
      price: formData.price,
      yearBuilt: formData.yearBuilt,
      occupancy: formData.occupancy,
    }
    // TODO: check that termRemaining < leaseTerm
    if(newProperty.termRemaining > newProperty.leaseTerm) {
      setFormErrors('term remaining cannot be greater than total lease term')
      return;
    }
    addProperty(newProperty)
    console.log('new property:', newProperty)
    handleCancel()
    resetForm()
  };

  const handleChange = (e: any) => {
    if(e.target.name==='tenancy') console.log('tenancy value:', e.target.value)
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleNumberChange = (value: any, name: string) => {
    console.log('number change value:', value)
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()
    handleCreate()
  }

  const resetForm = () => setFormData(emptyForm)

  return (
    <>
      <Typography.Title level={2} style={{textAlign:'center'}}>
        Properties</Typography.Title>

      {/* Toolbar Row */}
      <Row type="flex" justify="center" gutter={[16,24]}>
        {/* Toolbar Row */}
        <Col>
          <Button type="primary" onClick={showModal}>
            Add Property</Button>
        </Col>
        <Col>
          <Upload
            name='file'
            //action='www.something.com/upload'
            //headers: { authorization: 'authorization-text' }
            onChange={(info: any) => console.log('upload value changed:', info.file.status, 'all of it:', info)}
            multiple={false}
            accept=".json, .csv, .txt"
          >
            <Button>
              <Icon type="upload" /> 
              Click to Upload
            </Button>
          </Upload>
        </Col>
      </Row>
      {/* Properties Table View Row */}
      <Row gutter={[16,24]}>
        <Col span={24}>
          <PropertiesTable
            loading={loading}
            propertiesData={properties}
            handleEdit={updateProperty}
            handleDelete={deleteProperty}
          />
        </Col>
      </Row>
      {/* <CollectionCreateForm
        wrappedComponentRef={this.saveFormRef}
        visible={this.state.visible}
        onCancel={this.handleCancel}
        onCreate={this.handleCreate}
      /> */}
      <Modal
        visible={visible}
        title="Add a property"
        okText="Add"
        onCancel={handleCancel}
        onOk={handleCreate}
      >
        <Form layout="vertical" onSubmit={handleSubmit}>
          <Form.Item label="Name">
            <Input type="text" name="name" required autoFocus value={formData.name} onChange={handleChange} />
          </Form.Item>
          <Form.Item label="Address">
            <Input type="text" name="address" value={formData.address} onChange={handleChange} />
          </Form.Item>
          <Form.Item label="Property Type">
            <Input type="text" name="propertyType" value={formData.propertyType} onChange={handleChange} />
          </Form.Item>
          <Form.Item label="City">
            <Input type="text" name="city" value={formData.city} onChange={handleChange} />
          </Form.Item>
          <Form.Item label="State">
            <Input type="text" name="state" value={formData.state} onChange={handleChange} />
          </Form.Item>
          <Form.Item label="leaseTerm">
            <InputNumber name="leaseTerm" value={formData.leaseTerm} onChange={(value: any) => handleNumberChange(value, "leaseTerm")} />
          </Form.Item>
          <Form.Item label="termRemaining">
            <InputNumber name="termRemaining" value={formData.termRemaining} onChange={(value: any) => handleNumberChange(value, "termRemaining")} />
          </Form.Item>
          <Form.Item label="SqFt">
            <InputNumber name="SqFt" value={formData.SqFt} onChange={(value: any) => handleNumberChange(value, "SqFt")} />
          </Form.Item>
          <Form.Item label="noi">
            <InputNumber name="noi" value={formData.noi} onChange={(value: any) => handleNumberChange(value, "noi")} />
          </Form.Item>
          <Form.Item label="capRate">
            <InputNumber name="capRate" value={formData.capRate} onChange={(value: any) => handleNumberChange(value, "capRate")} />
          </Form.Item>
          <Form.Item label="price">
            <InputNumber name="price" value={formData.price} onChange={(value: any) => handleNumberChange(value, "price")} />
          </Form.Item>
          <Form.Item label="yearBuilt">
            <InputNumber name="yearBuilt" value={formData.yearBuilt} onChange={(value: any) => handleNumberChange(value, "yearBuilt")} />
          </Form.Item>
          <Form.Item label="occupancy">
            <InputNumber name="occupancy" value={formData.occupancy} onChange={(value: any) => handleNumberChange(value, "occupancy")} />
          </Form.Item>
          <Form.Item label="Tenancy" className="collection-create-form_last-form-item">
            <Radio.Group name="tenancy" onChange={handleChange} value={formData.tenancy}>
              <Radio value="Multi">Multi</Radio>
              <Radio value="Single">Single</Radio>
            </Radio.Group>,
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

const mapStateToProps = (state: RootState) => ({
  properties: state.properties.properties,
  loading: state.properties.loading,
  errors: state.properties.errors,
  filter: state.properties.filter
})

export const PropertiesList = connect(
  mapStateToProps,
  { addProperty, updateProperty, deleteProperty, uploadProperties, }
)(PropertiesUI)
