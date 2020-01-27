import React from 'react'
import { connect } from 'react-redux'
// import components
import { Row, Col, Typography, Button, Icon, Upload } from 'antd';
import CollectionCreateForm from './AddModal'
import { InvestorsTable } from '../../Stats/tables'
import { Investor } from '../../../types'
// import redux
import { addInvestor, updateInvestor, deleteInvestor, uploadInvestors } from '../../../store/investors'
import { RootState } from '../../../store/root';

interface IProps {
  investors: Investor[]
  loading: boolean
  errors: any
  filter: string
  addInvestor(investor: Investor): void
  editInvestor(investor: Investor): void
  deleteInvestor(id: string): void
  uploadInvestors(data: any): void
}

interface IState {
  visible: boolean
}

class InvestorsView extends React.Component<IProps, IState> {
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
    const { loading, investors } = this.props


    return (
      <>
        <Typography.Title level={2} style={{textAlign:'center'}}>
          Investors</Typography.Title>

        {/* Toolbar Row */}
        <Row type="flex" justify="center" gutter={[16,24]}>
          {/* Toolbar Row */}
          <Col>
            <Button type="primary" onClick={this.showModal}>
              Add Investor</Button>
          </Col>
          <Col>
            <Upload
              name='file'
              onChange={(info: any) => console.log('upload value changed:', info.file.status, 'all of it:', info)}
              multiple={false}
              accept=".csv"
              // accept=".json, .csv, .txt"
              //action='www.something.com/upload'
              //headers: { authorization: 'authorization-text' }
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
            <InvestorsTable
              loading={loading}
              investorsData={investors}
              handleEdit={updateInvestor}
              handleDelete={deleteInvestor}
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
  investors: state.investors.investors,
  loading: state.investors.loading,
  errors: state.investors.errors,
  filter: state.properties.filter,
})

export const Investors = connect(
  mapStateToProps,
  { addInvestor, updateInvestor, deleteInvestor, uploadInvestors }
)(InvestorsView)
