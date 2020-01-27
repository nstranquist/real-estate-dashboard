import React, {useState} from 'react'
import { connect } from 'react-redux'
// import components
import { Row, Col, Button, Modal, Form, Input, InputNumber, Radio, Icon, Upload, Typography } from 'antd';
// import Upload from '../../_shared/Upload'
import { InvestorsTable } from '../Stats/tables';
import { Investor } from '../../types'
// import redux
import { RootState } from '../../store/root'
import { addInvestor, updateInvestor, deleteInvestor, uploadInvestors } from '../../store/investors'


interface IProps {
  investors: Investor[]
  filter: string
  loading: boolean
  errors: any
  addInvestor(property: Investor): void
  editInvestor(property: Investor): void
  deleteInvestor(id: string): void
  uploadInvestors(data: any): void
}

const emptyForm = {
  firstName: '',
  lastName: '',
  company: '',
  email: '',
  phone: '',
  propertyTypes: '', // default to 'Retail'?
  statePreferred: "",
  sfMin: 0,
  dollarPerSF: 0, // note: should calculate unless specified
  noiMin: 0,
  noiMax: 100,
  priceMin: 0,
  priceMax: 100000000,
  builtBefore: 1800,
  builtAfter: 2100,
  occupancyMin: 0,
}

const InvestorsUI: React.FC<IProps> = ({
  investors,
  filter,
  loading,
  errors,
  addInvestor,
  editInvestor,
  deleteInvestor,
  uploadInvestors
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
    const newInvestor: Investor = { // type "Investor" without the "id"
      firstName: formData.firstName,
      lastName: formData.lastName,
      companyName: formData.companyName,
      email: formData.email,
      phone: formData.phone,
      propertyTypes: formData.propertyTypes,
      statePreferred: formData.statePreferred,
      sfMin: formData.sfMin,
      dollarPerSF: formData.dollarPerSF > 0 ? formData.dollarPerSF : (Math.floor(formData.price / formData.SqFt)),
      noiMin: formData.noiMin,
      noiMax: formData.noiMax,
      priceMin: formData.priceMin,
      priceMax: formData.priceMax,
      builtBefore: formData.yearBuilt,
      builtAfter: formData.builtAfter,
      occupancyMin: formData.occupancyMin,
    }
    // check that priceMin <= priceMax
    if(newInvestor.priceMin > newInvestor.priceMax) {
      setFormErrors('priceMin cannot be greater than priceMax')
      return;
    }
    // check that noiMin <= noiMax
    if(newInvestor.noiMin > newInvestor.noiMax) {
      setFormErrors('noiMin cannot be greater than noiMax')
      return;
    }
    // check that builtBefore <= builtAfter
    if(newInvestor.builtBefore > newInvestor.builtAfter) {
      setFormErrors('builtBefore cannot be greater than builtAfter')
      return;
    }

    addInvestor(newInvestor)
    console.log('new property:', newInvestor)
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

  const handleUpdateInvestor = (data: any) => {
    console.log('updating investor with id:', data.id)
    // either set editing or make the table row become editable
  }
  const handleDeleteInvestor = (id: string) => {
    console.log('deleting investor with id:', id)
    deleteInvestor(id)
  }

  return (
    <>
      <Typography.Title level={2} style={{textAlign:'center'}}>
        Investors</Typography.Title>

      {/* Toolbar Row */}
      <Row type="flex" justify="center" gutter={[16,24]}>
        {/* Toolbar Row */}
        <Col>
          <Button type="primary" onClick={showModal}>
            Add Investor</Button>
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
      {/* Investors Table View Row */}
      <Row gutter={[16,24]}>
        <Col span={24}>
          <Typography.Paragraph>
            Showing 10 of {investors.length} investor results</Typography.Paragraph>
        </Col>
        <Col span={24}>
          <InvestorsTable
            loading={loading}
            investorsData={investors}
            handleEdit={handleUpdateInvestor}
            handleDelete={handleDeleteInvestor}
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
        title="Add an investor"
        okText="Add"
        onCancel={handleCancel}
        onOk={handleCreate}
      >
        <Form layout="vertical" onSubmit={handleSubmit}>
          <Form.Item label="First Name">
            <Input type="text" name="firstName" required autoFocus value={formData.firstName} onChange={handleChange} />
          </Form.Item>
          <Form.Item label="Last Name">
            <Input type="text" name="lastName" required value={formData.lastName} onChange={handleChange} />
          </Form.Item>
          <Form.Item label="Company">
            <Input type="text" name="companyName" value={formData.companyName} onChange={handleChange} />
          </Form.Item>
          <Form.Item label="Property Types">
            <Input type="text" name="propertyTypes" value={formData.propertyTypes} onChange={handleChange} />
          </Form.Item>
          <Form.Item label="email">
            <Input type="text" name="email" value={formData.email} onChange={handleChange} />
          </Form.Item>
          <Form.Item label="phone">
            <Input type="text" name="phone" value={formData.phone} onChange={handleChange} />
          </Form.Item>
          <Form.Item label="statePreferred">
            <Input type="text" name="statePreferred" value={formData.statePreferred} onChange={handleChange} />
          </Form.Item>
          <Form.Item label="sfMin">
            <InputNumber name="sfMin" value={formData.sfMin} onChange={(value: any) => handleNumberChange(value, "sfMin")} />
          </Form.Item>
          <Form.Item label="noiMin">
            <InputNumber name="noiMin" value={formData.noiMin} onChange={(value: any) => handleNumberChange(value, "noiMin")} />
          </Form.Item>
          <Form.Item label="noiMax">
            <InputNumber name="noiMax" value={formData.noiMax} onChange={(value: any) => handleNumberChange(value, "noiMax")} />
          </Form.Item>
          <Form.Item label="priceMin">
            <InputNumber name="priceMin" value={formData.priceMin} onChange={(value: any) => handleNumberChange(value, "priceMin")} />
          </Form.Item>
          <Form.Item label="priceMax">
            <InputNumber name="priceMax" value={formData.priceMax} onChange={(value: any) => handleNumberChange(value, "priceMax")} />
          </Form.Item>
          <Form.Item label="builtBefore">
            <Input type="number" name="builtBefore" value={formData.builtBefore} onChange={handleChange} />
          </Form.Item>
          <Form.Item label="builtAfter">
            <Input type="number" name="builtAfter" value={formData.builtAfter} onChange={handleChange} />
          </Form.Item>
          <Form.Item label="occupancyMin">
            <InputNumber name="occupancyMin" value={formData.occupancyMin} onChange={(value: any) => handleNumberChange(value, "occupancyMin")} />
          </Form.Item>
          {/* <Form.Item label="Tenancy" className="collection-create-form_last-form-item">
            <Radio.Group name="tenancy" onChange={handleChange} value={formData.tenancy}>
              <Radio value="Multi">Multi</Radio>
              <Radio value="Single">Single</Radio>
            </Radio.Group>,
          </Form.Item> */}
        </Form>
      </Modal>
    </>
  );
}

const mapStateToProps = (state: RootState) => ({
  investors: state.investors.investors,
  loading: state.investors.loading,
  errors: state.investors.errors,
  filter: state.investors.filter
})

export const InvestorsList = connect(
  mapStateToProps,
  { addInvestor, updateInvestor, deleteInvestor, uploadInvestors, }
)(InvestorsUI)
