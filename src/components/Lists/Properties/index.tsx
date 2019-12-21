import React from 'react'
import { connect } from 'react-redux'
// import components
import { Row, Col, Button, Modal, Form, Input, Radio, Icon, Upload } from 'antd';
// import Upload from '../../_shared/Upload'
import { PropertiesTable } from '../../Home/tables';
import { Property } from '../../../types'
// import redux
import { RootState } from '../../../store/root'
import { addProperty, updateProperty, deleteProperty, uploadProperties } from '../../../store/properties/actions'


interface IProps {
  loading: boolean
  properties: Property[]
  addProperty(property: Property): void
  editProperty(property: Property): void
  deleteProperty(id: string): void
  uploadProperties(data: any): void
}

const CollectionCreateForm: any = Form.create({ name: 'form_in_modal' })(
  // eslint-disable-next-line
  class extends React.Component<any, any> {
    render() {
      const { visible, onCancel, onCreate, form } = this.props;
      const { getFieldDecorator } = form;
      return (
        <Modal
          visible={visible}
          title="Add a property"
          okText="Add"
          onCancel={onCancel}
          onOk={onCreate}
        >
          <Form layout="vertical">
            <Form.Item label="Title">
              {getFieldDecorator('title', {
                rules: [{ required: true, message: 'Please input the title of collection!' }],
              })(<Input />)}
            </Form.Item>
            <Form.Item label="Description">
              {getFieldDecorator('description')(<Input type="textarea" />)}
            </Form.Item>
            <Form.Item className="collection-create-form_last-form-item">
              {getFieldDecorator('modifier', {
                initialValue: 'public',
              })(
                <Radio.Group>
                  <Radio value="multi-family">Multi Family</Radio>
                  <Radio value="retail">Retail</Radio>
                </Radio.Group>,
              )}
            </Form.Item>
          </Form>
        </Modal>
      );
    }
  },
);



class Properties extends React.Component<IProps, any> {
  formRef: any
  state = {
    visible: false,
  };

  showModal = () => {
    this.setState({ visible: true });
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };

  handleCreate = () => {
    const { form } = this.formRef.props;
    form.validateFields((err: any, values: any) => {
      if (err) return

      console.log('Received values of form: ', values);
      form.resetFields();
      this.setState({ visible: false });
    });
  };

  saveFormRef = (formRef: any) => {
    this.formRef = formRef;
  };

  render() {
    const { loading, properties } = this.props

    return (
      <>
        <Row type="flex" justify="center" gutter={[16,24]}>
          {/* Toolbar Row */}
          <Col>
            <Button type="primary" onClick={this.showModal}>
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
        <CollectionCreateForm
          wrappedComponentRef={this.saveFormRef}
          visible={this.state.visible}
          onCancel={this.handleCancel}
          onCreate={this.handleCreate}
        />
      </>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  properties: state.properties.properties,
  loading: state.properties.loading,
  errors: state.properties.errors,
  filter: state.properties.filter
})

export default connect(
  mapStateToProps,
  { addProperty, updateProperty, deleteProperty,
    uploadProperties }
)(Properties)


// interface IProps {
//   visible: boolean
//   form: any
//   onCancel(): void
//   onCreate(): void
// }