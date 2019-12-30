import React, { useState } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { Row, Col, Card, Typography, Checkbox, Button } from 'antd'
import { updateParams } from '../../store/matching/matching'
// import { QueryList } from './QueryList'
import { RootState } from '../../store/root'
import { getMatchedProperties, getMatchedInvestors, MatchedProperty, MatchedInvestor } from '../../store/selectors'
import { Property, Investor } from '../../types'

interface IProps {
  params: string[]
  matchedProperties: MatchedProperty[]
  matchedInvestors: MatchedInvestor[]
  updateParams(params: string[]): void
}

const StyledCheckboxGroup = styled(Checkbox.Group)`
  width: 100%;

  @media (min-width: 768px) {
    .ant-checkbox-group-item {
      display: block;
      width: 100%;

      span:not(.ant-checkbox) {
        display: inline-block;
        // width: calc(100% - 24px);
      }
    }
  }
`
const StyledCheckbox = styled(Checkbox)`
  @media (min-width: 768px) {
    width: 100%;
  }
`

const HomeView: React.FC<IProps> = ({
  params,
  matchedProperties,
  matchedInvestors,
  updateParams,
}) => {
  // const [matchParams, setMatchParams] = useState<string[]>(params)
  const [indeterminate, setIndeterminate] = useState<boolean>(true)
  const [checkAll, setCheckAll] = useState<boolean>(false)
  // possible match parameters: price, noi, 

  const handleQueryChange = (checkedValues: any[]) => {
    updateParams(checkedValues)
    setIndeterminate(!!checkedValues.length && checkedValues.length < allParams.length)
    setCheckAll(checkedValues.length === allParams.length)
  }

  const handleCheckAllChange = (e: any) => {
    setIndeterminate(false)
    setCheckAll(e.target.checked)
    updateParams(e.target.checked ? allParams : [])
  }

  const allParams = ['price', 'noi', 'location']
  const queryOptions = [
    { label: 'Price', value: 'price' },
    { label: 'NOI', value: 'noi' },
    { label: 'Location', value: 'location' }, // "location" includes city, state, region, zip
    { label: 'Property Type', value: 'propertyType'},
  ]

  return (
    <div>
      <Row gutter={[16, 16]}>
        {/* Checkbox options to match by (can also go in header, optionally) */}
        <Col sm={24} md={6}>
          <Card>
            <Typography.Title level={4} style={{textAlign:'center', marginBottom:15}}>
              Query by:</Typography.Title>
            <div style={{borderBottom:'1px solid rgba(0,0,0,.2)', paddingBottom:5, marginBottom:10}}>
              <StyledCheckbox
                indeterminate={indeterminate}
                checked={checkAll}
                onChange={handleCheckAllChange}
                >
                Check all</StyledCheckbox>
            </div>

            <div style={{borderBottom:'1px solid rgba(0,0,0,.2)', paddingBottom:10, marginBottom:10}}>
              <StyledCheckboxGroup
                options={queryOptions}
                value={params}
                onChange={handleQueryChange}
              />
            </div>

            <Button type="primary" style={{margin:"20px auto 0 auto", display:'block', width:'66%'}}>
              Search</Button>
          </Card>
        </Col>
        <Col sm={24} md={18}>
          <Card>
            <Typography.Title level={3} style={{textAlign:'center'}}>
              Matches</Typography.Title>
            {/* Matches Table (or list) Here */}
            <Row gutter={[8,8]}>
              <Col sm={12}>
                <Typography.Title level={4} style={{textAlign:'center', marginBottom:15}}>
                  Properties</Typography.Title>
                {matchedProperties.length < 1 ? (
                  <p>No matching properties</p>
                ) : (
                  <>
                    {matchedProperties.map((matchedProperty, index) => {
                      if(matchedProperty.investors.length < 1) return
                      return (
                        <div key={index}>
                          <p>no. of investors: {matchedProperty.investors.length}</p>
                        </div>
                      )
                    })}
                  </>
                )}
              </Col>
              <Col sm={12}>
                <Typography.Title level={4} style={{textAlign:'center', marginBottom:15}}>
                  Investors</Typography.Title>
                {matchedInvestors.length < 1 ? (
                  <p>No matching investors</p>
                ) : (
                  <>
                    {matchedInvestors.map((matchedInvestor, index) => (
                      <div key={index}>
                        <p>{matchedInvestor.properties[0]}</p>
                      </div>
                    ))}
                  </>
                )}
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

const mapStateToProps = (state: RootState) => ({
  params: state.matching.params,
  matchedProperties: getMatchedProperties(state),
  matchedInvestors: getMatchedInvestors(state)
})

export const Home = connect(
  mapStateToProps,
  { updateParams }
)(HomeView)

// old code

// old onchange
// if(e.target.checked) {
//   // add to match params
//   setMatchParams([...matchParams, e.target.name])
// }
// else {
//   // remove from match params
//   let paramIndex = matchParams.findIndex(param => param === e.target.name)
//   setMatchParams(matchParams.splice(paramIndex, 1))
// }
// <Checkbox onChange={handleQueryChange} name="price" checked={matchParams.includes('price')} style={{display:'block'}}>
//     Price</Checkbox>