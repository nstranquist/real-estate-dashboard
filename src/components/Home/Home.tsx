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

// NOTE: perhaps, a way to combine all 3 fields, at least for the loading flag.
// perhaps a home shortcut...??

interface IProps {
  properties: Property[] // TODO: make type of 'property'
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

// TODO: clean up all of these prop imports (after testing is done)
const Home: React.FC<IProps> = ({
  properties,
  investors,
  brokers,
  propertiesLoading,
  investorsLoading,
  brokersLoading,
  propertyErrors,
  investorErrors,
  brokerErrors,
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

  const handleEditProperty = (property: Property, listType: string) => {
    updateProperty(property)
  }
  const handleEditInvestor = (investor: Investor, listType: string) => {
    updateInvestor(investor)
  }
  const handleEditBroker = (broker: Broker, listType: string) => {
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
      {/* Row with 3 cards, 1 for each of the lists */}
      {propertyErrors && <div style={{color:'red'}}>Error: {propertyErrors.message}</div>}
      {investorErrors && <div style={{color:'red'}}>Error: {investorErrors.message}</div>}
      {brokerErrors && <div style={{color:'red'}}>Error: {brokerErrors.message}</div>}
      <Row gutter={[16, 48]}>
        <Col span={8}>
          <Card
            title="Properties"
            extra={<Link to='/home/properties'>View All</Link>}
          >
            <Typography.Title style={{textAlign:'center'}}>{properties.length}</Typography.Title>
          </Card>
        </Col>
        <Col span={8}>
          <Card
            title="Investors"
            extra={<Link to='/home/investors'>View All</Link>}
          >
            <Typography.Title style={{textAlign:'center'}}>{investors.length}</Typography.Title>
          </Card>
        </Col>
        <Col span={8}>
          <Card
            title="Brokers"
            extra={<Link to='/home/brokers'>View All</Link>}
          >
            <Typography.Title style={{textAlign:'center'}}>{brokers.length}</Typography.Title>
          </Card>
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