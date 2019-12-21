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
import { Property } from '../../types'

// NOTE: perhaps, a way to combine all 3 fields, at least for the loading flag.
// perhaps a home shortcut...??

interface IProps {
  properties: any[] // TODO: make type of 'property'
  investors: any[]
  brokers: any[]
  loading: boolean
  errors: any
  updateProperty(property: Property): void
  deleteProperty(id: string): void
}

const StyledTabs = styled(Tabs)`
  .ant-tabs-bar {
    margin-bottom: 0;
  }
`

const Home: React.FC<IProps> = ({
  properties,
  investors,
  brokers,
  loading,
  errors,
  updateProperty,
  deleteProperty,
}) => {
  const [keyActive, setKeyActive] = useState<string>('properties')

  const handleTabChange = (key: string) => {
    setKeyActive(key)
  }

  const handleEditItem = (property: Property, listType: string) => {
    console.log('key active:', keyActive)
    switch(listType) {
      case 'property':
        updateProperty(property)
        break;
      case 'investor':

        break;
      case 'broker':

        break;
      default:
        break;
    }
  }
  const handleDeleteItem = (id: string, listType: string) => {
    console.log('key active:', keyActive)
    switch(listType) {
      case 'property':
        deleteProperty(id)
        break;
      case 'investor':

        break;
      case 'broker':

        break;
      default:
        break;
    }
  }

  return (
    <div>
      {/* Row with 3 cards, 1 for each of the lists */}
      {loading && <div>Loading...</div>}
      {errors && <div style={{color:'red'}}>Error: {errors.message}</div>}
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
                  handleEdit={handleEditItem}
                  handleDelete={handleDeleteItem}
                />
              </div>
            </Tabs.TabPane>
            <Tabs.TabPane tab="Investors" key="investors">
              <div style={{background:'white'}}>
                <InvestorsTable
                  handleEdit={handleEditItem}
                  handleDelete={handleDeleteItem}
                />
              </div>
            </Tabs.TabPane>
            <Tabs.TabPane tab="Brokers" key="brokers">
              <div style={{background:'white'}}>
                <BrokersTable
                  handleEdit={handleEditItem}
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
  investors: state.investors.properties,
  brokers: state.brokers.properties,
  // TODO: merge the loading and error properties from the 3 listTypes together
  loading: state.properties.loading,
  errors: state.properties.errors,
})

export default connect(
  mapStateToProps,
  { updateProperty, deleteProperty }
)(Home)