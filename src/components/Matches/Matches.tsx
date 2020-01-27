import React, {useState} from 'react'
import { connect } from 'react-redux'
import { Row, Typography, Button, Checkbox } from 'antd'
import { RootState } from '../../store/root'
import { MatchItem } from './MatchItem'
import { Property, Investor } from '../../types'
import { MatchedItem } from '../../store/selectors'

interface IProps {
  properties: Property[]
  investors: Investor[]
  // matches: any[]
}

interface IMatchItem {
  id: string
  name: string
  investors: MatchedItem[]
}

const MatchesView: React.FC<IProps> = ({
  properties,
  investors,
  // matches
}) => {
  const [matches, setMatches] = useState<any>([])
  const [params, setParams] = useState<string[]>(["price"]) // must be spelled exactly
  const [hideUnmatched, setHideUnmatched] = useState<boolean>(false)
  const [matchesActive, setMatchesActive] = useState<boolean>(false) // false only at startup

  let matchCount: number = 0

  const handleCheckChange = (e: any) => {
    // e.target.checked
    setHideUnmatched(e.target.checked)
  }

  const handleParamsChange = (e: any) => {
    if(e.target.name==='price'){
      if(params.includes("price")) {
        // remove value from array
        setParams(params.filter((param: string) => param!=="price"))
      }
      else {
        // add value to array
        let newParams = [...params]
        newParams.push("price")
        setParams(newParams)
      }
    }
  }

  const getMatches = () => {
    if(!matchesActive) setMatchesActive(true)
    // for each property (map),
    let propertyMatches = properties.map((property, index) => {
      // check all investors for given parameters (filter), attach to property
      let matchedInvestors : MatchedItem[] = [] // id, name
      for(let i=0; i<params.length; i++) {
        let param = params[i]
        console.log('adding with param:', param)
        // filter through investors for param, concat to matchedInvestors
        let tempInvestors = findInvestorsWithParam(param, property)
        console.log(param, ' returned investors array:', tempInvestors)
        if(tempInvestors.length > 0)
          //@ts-ignore
          matchedInvestors.concat(tempInvestors)
      }
        
      console.log('matched investors:', matchedInvestors)
      // create new match object with just the property id and name
      let newProperty = {
        id: property.id!,
        name: property.name,
        investors: matchedInvestors
      }

      // return object
      return newProperty
    })

    console.log('propertyMatches:', propertyMatches)
    setMatches(propertyMatches)
  }

  const findInvestorsWithParam = (param: string, property: Property) => {
    switch(param) {
      case 'price':
        console.log('property price:', property.price)
        return investors.map(investor => {
          if(investor.priceMin < property.price && investor.priceMax > property.price) {
            return {
              id: investor.id!,
              name: `${investor.firstName} ${investor.lastName}`
            }
          }
        })
        // console.log('investorsMatched:', investorsMatched)
      default:
        return []
    }
  }

  return (
    <div>
      <Typography.Title level={3} style={{textAlign:'center'}}>
        Matches</Typography.Title>
      <Typography.Paragraph style={{textAlign:'center'}}>
        <span>Showing matches for: </span>
        <div>Price: <Checkbox checked={params.includes('price')} onChange={handleParamsChange} name="price" /></div>
      </Typography.Paragraph>
      <Button type="primary" onClick={getMatches}>Get Matches</Button>
      <div style={{margin:5}}>
        {/* <Typography.Paragraph> */}
          <span onClick={() => setHideUnmatched(!hideUnmatched)}>Hide Unmatched Properties? </span>
          <Checkbox checked={hideUnmatched} onChange={handleCheckChange} />
        {/* </Typography.Paragraph> */}
      </div>
      {matchesActive ? (
        <Typography.Paragraph>
          Showing {hideUnmatched ? matchCount : matches.length} matched properties
        </Typography.Paragraph>
      ) : (
        <Typography.Paragraph>Click "Get Matches" to see all property matches</Typography.Paragraph>
      )}
      <Row gutter={[16,16]}>
        {matches.map((matchItem: IMatchItem, index: number) => {
          if(!hideUnmatched || matchItem.investors.length > 0) {
            matchCount++
            return (
              <MatchItem 
                key={index}
                id={matchItem.id}
                name={matchItem.name}
                investors={matchItem.investors}
              />
            )
          }
        })}
      </Row>
    </div>
  )
}

const mapStateToProps = (state: RootState) => ({
  properties: state.properties.properties,
  investors: state.investors.investors,
  // matches: getMatches() // selector
})

export const Matches = connect(
  mapStateToProps,
  {  }
)(MatchesView)