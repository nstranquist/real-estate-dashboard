import React, {useState} from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
// import compnents
import { Row, Col, Card, Typography, Tabs } from 'antd'
import { PropertiesTable, InvestorsTable, BrokersTable } from './tables'
// import redux
import { RootState } from '../../store/root'
import { updateProperty, deleteProperty } from '../../store/properties/actions'
import { updateInvestor, deleteInvestor } from '../../store/investors/actions'
import { updateBroker, deleteBroker } from '../../store/brokers/actions'
import { Property, Investor, Broker } from '../../types'


interface IProps {
  properties: Property[]
  investors: Investor[]
  brokers: Broker[]
  propertiesLoading: boolean
  investorsLoading: boolean
  brokersLoading: boolean
  propertyErrors: any
  investorErrors: any
  brokerErrors: any
  updateProperty(property: Property): void
  updateInvestor(investor: Investor): void
  updateBroker(broker: Broker): void
  deleteProperty(id: string): void
  deleteInvestor(id: string): void
  deleteBroker(id: string): void
}

const StyledTabs = styled(Tabs)`
  .ant-tabs-bar {
    margin-bottom: 0;
  }
`
const StyledFlatCard = styled(Card)`
  padding: 8px;
  margin: 0;
  text-align: center;

  .ant-card-body {
    padding: 5px;
    padding-top: 12px;

    h4.ant-typography {
      align-self: center;
      margin: auto;
      padding: 5px;

      &.card-title {
        margin-bottom:10px;
        padding: 3px;
      }
    }

    .styled-card-item {
      align-self: center;
      margin: auto;
      padding: 5px;
      width: 33%;
      display: inline-block;
    }
  }
`

// TODO: clean up all of these prop imports (after testing is done)
const Home: React.FC<IProps> = ({
  // data
  properties,
  investors,
  brokers,
  // loading flags
  propertiesLoading,
  investorsLoading,
  brokersLoading,
  // error objects
  propertyErrors,
  investorErrors,
  brokerErrors,
  // redux actions (CRUD)
  updateProperty,
  updateInvestor,
  updateBroker,
  deleteProperty,
  deleteInvestor,
  deleteBroker,
}) => {
  const [keyActive, setKeyActive] = useState<string>('properties')

  const handleTabChange = (key: string) => {
    setKeyActive(key)
  }

  const handleEditProperty = (property: Property) => {
    updateProperty(property)
  }
  const handleEditInvestor = (investor: Investor) => {
    updateInvestor(investor)
  }
  const handleEditBroker = (broker: Broker) => {
    updateBroker(broker)
  }


  const handleDeleteItem = (id: string, listType: string) => {
    console.log('key active:', keyActive)
    switch(listType) {
      case 'property':
        deleteProperty(id)
        break;
      case 'investor':
        deleteInvestor(id)
        break;
      case 'broker':
        deleteBroker(id)
        break;
      default:
        break;
    }
  }

  return (
    <div>
      {propertyErrors && <div style={{color:'red'}}>Error: {propertyErrors.message}</div>}
      {investorErrors && <div style={{color:'red'}}>Error: {investorErrors.message}</div>}
      {brokerErrors && <div style={{color:'red'}}>Error: {brokerErrors.message}</div>}
      
      {/* Row with 3 cards, 1 for each of the lists */}
      <Row gutter={[16, 48]}>
        <Col xs={0} sm={8}>
          <Card
            title="Properties"
            extra={<Link to='/home/properties'>View All</Link>}
          >
            <Typography.Title style={{textAlign:'center'}}>{properties.length}</Typography.Title>
          </Card>
        </Col>
        <Col xs={0} sm={8}>
          <Card
            title="Investors"
            extra={<Link to='/home/investors'>View All</Link>}
          >
            <Typography.Title style={{textAlign:'center'}}>{investors.length}</Typography.Title>
          </Card>
        </Col>
        <Col xs={0} sm={8}>
          <Card
            title="Brokers"
            extra={<Link to='/home/brokers'>View All</Link>}
          >
            <Typography.Title style={{textAlign:'center'}}>{brokers.length}</Typography.Title>
          </Card>
        </Col>
        <Col xs={24} sm={0}>
          <StyledFlatCard>
            {/* <Typography.Title level={4} className='card-title'>Overview</Typography.Title> */}
            <div className='styled-card-item'>
              <Typography.Text>Properties</Typography.Text>
              <Typography.Title level={4}>{properties.length}</Typography.Title>
            </div>
            <div className='styled-card-item'>
              <Typography.Text>Investors</Typography.Text>
              <Typography.Title level={4}>{investors.length}</Typography.Title>
            </div>
            <div className='styled-card-item'>
              <Typography.Text>Brokers</Typography.Text>
              <Typography.Title level={4}>{brokers.length}</Typography.Title>
            </div>
          </StyledFlatCard>
        </Col>
      </Row>

      {/* Row with Tabs for the 3 list types, each type containing Full-Width Table */}
      <Row>
        <Col span={24} style={{background:'white'}}>
          <StyledTabs type="card" onChange={handleTabChange} style={{background:'#F0F2F5'}}>
            <Tabs.TabPane tab="Properties" key="properties">
              <div style={{background:'white'}}>
                <PropertiesTable
                  loading={propertiesLoading}
                  propertiesData={properties}
                  handleEdit={handleEditProperty}
                  handleDelete={handleDeleteItem}
                />
              </div>
            </Tabs.TabPane>
            <Tabs.TabPane tab="Investors" key="investors">
              <div style={{background:'white'}}>
                <InvestorsTable
                  loading={investorsLoading}
                  investorsData={investors}
                  handleEdit={handleEditInvestor}
                  handleDelete={handleDeleteItem}
                />
              </div>
            </Tabs.TabPane>
            <Tabs.TabPane tab="Brokers" key="brokers">
              <div style={{background:'white'}}>
                <BrokersTable
                  loading={brokersLoading}
                  brokersData={brokers}
                  handleEdit={handleEditBroker}
                  handleDelete={handleDeleteItem}
                />
              </div>
            </Tabs.TabPane>
          </StyledTabs>
        </Col>
      </Row>
    </div>
  )
}

const mapStateToProps = (state: RootState) => ({
  properties: state.properties.properties,
  investors: state.investors.investors,
  brokers: state.brokers.brokers,
  // TODO: merge the loading and error properties from the 3 listTypes together
  propertiesLoading: state.properties.loading,
  investorsLoading: state.investors.loading,
  brokersLoading: state.brokers.loading,
  // errors
  propertyErrors: state.properties.errors,
  investorErrors: state.investors.errors,
  brokerErrors: state.brokers.errors,
})

export default connect(
  mapStateToProps,
  { updateProperty, deleteProperty,
    updateInvestor, deleteInvestor,
    updateBroker, deleteBroker }
)(Home)