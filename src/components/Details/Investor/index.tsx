import React, {useState, useEffect} from 'react'
import { connect } from 'react-redux'
import { Row, Col, Card, Typography } from 'antd'
import { RootState } from '../../../store/root'
import { Investor } from '../../../types'

interface IProps {
  match: any
  investors: Investor[]
}

interface InvestorTemp {
  id?: string
  firstName: string
  lastName: string
  companyName: string
  email?: string
  phone?: string
  priceMin: number
  priceMax: number
  noiMin: number
  noiMax: number
  propertyTypes: string[] //'Industrial' | 'Retail' | 'Restaurant' | 'Shopping Center' | 'Multi-Family' | 'Specialty Office' | 'Healthcare' | 'Hospitality' | 'Sports & Entertainment' | 'Land' | 'Other'
  builtBefore: number // aka yearMin
  builtAfter: number // aka yearMax
  statePreferred: string // 'AK' | 'AZ' | ...
  occupancyMin: number
  sfMin: number
  dollarPerSF: number
}

const InvestorDetailUI: React.FC<IProps> = ({
  match,
  investors,
}) => {
  const [investor, setInvestor] = useState<Investor | null>(null)

  useEffect(() => {
    if(match.params.id) {
      let newInvestor = investors.find(investor => investor.id === match.params.id)
      setInvestor(newInvestor!)
    }
  }, [])

  return (
    <div>
      {investor ? (
        <>
          <Typography.Title level={3} style={{textAlign:'center'}}>
            {investor.firstName && investor.firstName.length > 0 ? investor.firstName : '(no first name data)'} {investor.lastName && investor.lastName.length > 0 ? investor.lastName : '(no last name data)'}</Typography.Title>
          <Typography.Title level={4} style={{textAlign:'center'}}>
            {(investor.companyName && investor.companyName.length > 0) ? investor.companyName : '(no company data)'}</Typography.Title>
          {/* Dump Details */}
          <Card>
            <Row>
              <Col sm={{span:4}}>
                <Typography.Paragraph strong>
                  First Name:</Typography.Paragraph>
                <Typography.Paragraph strong>
                  Last Name:</Typography.Paragraph>
                <Typography.Paragraph strong>
                  Company:</Typography.Paragraph>
                <Typography.Paragraph strong>
                  Email:</Typography.Paragraph>
                <Typography.Paragraph strong>
                  Phone:</Typography.Paragraph>
                <Typography.Paragraph strong>
                  Price Range:</Typography.Paragraph>
                <Typography.Paragraph strong>
                  NOI Range:</Typography.Paragraph>
                <Typography.Paragraph strong>
                  Property Type(s):</Typography.Paragraph>
                <Typography.Paragraph strong>
                  Built Before:</Typography.Paragraph>
                <Typography.Paragraph strong>
                  Built After:</Typography.Paragraph>
                <Typography.Paragraph strong>
                  State(s) Preferred:</Typography.Paragraph>
                <Typography.Paragraph strong>
                  Min. Occupancy:</Typography.Paragraph>
                <Typography.Paragraph strong>
                  Min. SqFt:</Typography.Paragraph>
                <Typography.Paragraph strong>
                  $ / SqFt:</Typography.Paragraph>
              </Col>
              <Col sm={{span:18, push:2}}>
                <Typography.Paragraph>
                  {investor.firstName && investor.firstName.length > 0 ? investor.firstName : '(no first name)'}</Typography.Paragraph>
                <Typography.Paragraph>
                  {investor.lastName && investor.lastName.length > 0 ? investor.lastName : '(no last name)'}</Typography.Paragraph>
                <Typography.Paragraph>
                  {investor.companyName && investor.companyName.length > 0 ? investor.companyName : '(no company)'}</Typography.Paragraph>
                <Typography.Paragraph>
                  {investor.email && investor.email!.length > 0 ? investor.email : '(no email)'}</Typography.Paragraph>
                <Typography.Paragraph>
                  {investor.phone && investor.phone!.length > 0 ? investor.phone : '(no phone)'}</Typography.Paragraph>
                <Typography.Paragraph>
                  {investor.priceMin && investor.priceMin.toString().length > 0 ? investor.priceMin : '(no data)'} - {investor.priceMax && investor.priceMax.toString().length > 0 ? investor.priceMax : '(no data)'}</Typography.Paragraph>
                <Typography.Paragraph>
                  {investor.noiMin && investor.noiMin.toString().length > 0 ? investor.noiMin : '(no data)'} - {investor.noiMax && investor.noiMax.toString().length > 0 ? investor.noiMax : '(no data)'}</Typography.Paragraph>
                <Typography.Paragraph>
                  {investor.propertyTypes && investor.propertyTypes.toString().length > 0 ? investor.propertyTypes : '(no data)'}</Typography.Paragraph>
                <Typography.Paragraph>
                  {investor.builtBefore && investor.builtBefore.toString().length > 0 ? investor.builtBefore : '(no data)'}</Typography.Paragraph>
                <Typography.Paragraph>
                  {investor.builtAfter && investor.builtAfter.toString().length > 0 ? investor.builtAfter : '(no data)'}</Typography.Paragraph>
                <Typography.Paragraph>
                  {investor.statePreferred && investor.statePreferred.toString().length > 0 ? investor.statePreferred : '(no data)'}</Typography.Paragraph>
                <Typography.Paragraph>
                  {investor.sfMin && investor.sfMin.toString().length > 0 ? investor.sfMin : '(no data)'}</Typography.Paragraph>
                <Typography.Paragraph>
                  {investor.occupancyMin && investor.occupancyMin.toString().length > 0 ? investor.occupancyMin : '(no data)'}</Typography.Paragraph>
                <Typography.Paragraph>
                  {investor.dollarPerSF && investor.dollarPerSF.toString().length > 0 ? investor.dollarPerSF : '(no data)'}</Typography.Paragraph>
              </Col>
            </Row>
          </Card>

          {/* Investor Options (delete, update, etc) Here */}

        </>
      ) : (
        <div>
          <p>Investor Loading or non-existent</p>
        </div>
      )}
    </div>
  )
}

const mapStateToProps = (state: RootState) => ({
  investors: state.investors.investors
})

export const InvestorDetail = connect(
  mapStateToProps,
  {  }
)(InvestorDetailUI)