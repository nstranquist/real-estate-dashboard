import React from 'react'
import styled from 'styled-components'
import { Form, Radio, Modal, Input } from 'antd'

const StyledFormItem = styled(Form.Item)`
  margin: 0;
  margin-bottom: 5px !important;
`

interface IProps {
  visible: boolean
  form: any
  onCancel(): void
  onCreate(): void
}


const CollectionCreateForm: any = Form.create({ name: 'form_in_modal' })(
  // eslint-disable-next-line
  class extends React.Component<IProps> {
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
            <StyledFormItem label="Title">
              {getFieldDecorator('title', {
                rules: [{ required: true, message: 'Please input the title of collection!' }],
              })(<Input />)}
            </StyledFormItem>
            <StyledFormItem label="Description">
              {getFieldDecorator('description')(<Input type="textarea" />)}
            </StyledFormItem>
            <StyledFormItem>
              {getFieldDecorator('modifier', {
                initialValue: 'public',
              })(
                <Radio.Group>
                  <Radio value="multi-family">Multi Family</Radio>
                  <Radio value="retail">Retail</Radio>
                </Radio.Group>,
              )}
            </StyledFormItem>
            {/* <StyledFormItem>
              {getFieldDecorator()}
            </StyledFormItem> */}
          </Form>
        </Modal>
      );
    }
  },
);

export default CollectionCreateForm