import React, {useState, useEffect} from 'react'
import { connect } from 'react-redux'
import { Row, Col, Card, Typography } from 'antd'
import { RootState } from '../../../store/root'
import { Property } from '../../../types'

interface IProps {
  match: any
  properties: Property[]
}

const PropertyDetailUI: React.FC<IProps> = ({
  match,
  properties,
}) => {
  const [property, setProperty] = useState<Property | null>(null)

  useEffect(() => {
    if(match.params.id) {
      let newProperty = properties.find(property => property.id === match.params.id)
      setProperty(newProperty!)
    }
  }, [])

  return (
    <div>
      {property ? (
        <>
          <Typography.Title level={3} style={{textAlign:'center'}}>
            {property.name.length > 0 ? property.name : '(no name)'}</Typography.Title>
          <Typography.Title level={4} style={{textAlign:'center'}}>
            {property.price.toString().length > 0 ? property.price : '(no price)'}</Typography.Title>
          {/* Dump Details */}
          <Card>
            <Row>
              <Col sm={{span:4}}>
                <Typography.Paragraph strong>
                  Address:</Typography.Paragraph>
                <Typography.Paragraph strong>
                  Property Type:</Typography.Paragraph>
                <Typography.Paragraph strong>
                  City:</Typography.Paragraph>
                <Typography.Paragraph strong>
                  State:</Typography.Paragraph>
                <Typography.Paragraph strong>
                  Tenancy:</Typography.Paragraph>
                <Typography.Paragraph strong>
                  Lease Term:</Typography.Paragraph>
                <Typography.Paragraph strong>
                  Term Remaining:</Typography.Paragraph>
                <Typography.Paragraph strong>
                  SqFt:</Typography.Paragraph>
                <Typography.Paragraph strong>
                  $ / SqFt:</Typography.Paragraph>
                <Typography.Paragraph strong>
                  NOI:</Typography.Paragraph>
                <Typography.Paragraph strong>
                  Cap Rate:</Typography.Paragraph>
              </Col>
              <Col sm={{span:18, push:2}}>
                <Typography.Paragraph>
                  {property.address.length > 0 ? property.address : '(no address)'}</Typography.Paragraph>
                <Typography.Paragraph>
                  {property.propertyType.length > 0 ? property.propertyType : '(no property type)'}</Typography.Paragraph>
                <Typography.Paragraph>
                  {property.city.length > 0 ? property.city : '(no city)'}</Typography.Paragraph>
                <Typography.Paragraph>
                  {property.state.length > 0 ? property.state : '(no state)'}</Typography.Paragraph>
                <Typography.Paragraph>
                  {property.tenancy.length > 0 ? property.tenancy : '(no tenancy)'}</Typography.Paragraph>
                <Typography.Paragraph>
                  {property.leaseTerm.toString().length > 0 ? property.leaseTerm : '(no data)'}</Typography.Paragraph>
                <Typography.Paragraph>
                  {property.termRemaining.toString().length > 0 ? property.termRemaining : '(no data)'}</Typography.Paragraph>
                <Typography.Paragraph>
                  {property.SqFt.toString().length > 0 ? property.SqFt : '(no data)'}</Typography.Paragraph>
                <Typography.Paragraph>
                  {property.dollarPerSF.toString().length > 0 ? property.dollarPerSF : '(no data)'}</Typography.Paragraph>
                <Typography.Paragraph>
                  {property.noi.toString().length > 0 ? property.noi : '(no data)'}</Typography.Paragraph>
                <Typography.Paragraph>
                  {property.capRate.toString().length > 0 ? property.capRate : '(no data)'}</Typography.Paragraph>
              </Col>
            </Row>
          </Card>

          {/* Property Options (delete, update, etc) Here */}

        </>
      ) : (
        <div>
          <p>Property Loading or non-existent</p>
        </div>
      )}
    </div>
  )
}

const mapStateToProps = (state: RootState) => ({
  properties: state.properties.properties
})

export const PropertyDetail = connect(
  mapStateToProps,
  {  }
)(PropertyDetailUI)