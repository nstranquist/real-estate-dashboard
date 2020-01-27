import { RootState } from "./root";
import { Property, Investor } from "../types";

// Types for MatchedItems (TODO: move to 'types.ts')
export interface MatchedItem {
  id: string
  name: string
}
export interface MatchedProperty extends Property {
  investors: MatchedItem[]  // array of investor ids with name snippet
}
export interface MatchedInvestor extends Investor {
  properties: MatchedItem[]
}

// Selectors
export const selectInvestorsByFilter = (state: RootState) => {
  // use state in rootstate for this
  
}

export const getMatchedProperties = (state: RootState) => {
  console.log('called getMatchedProperties with params:', state.matching.params)
  let matchedProperties: MatchedProperty[] = []

  // start by price. map through each of the properties, check for investor matches
  state.properties.properties.map(property => {
    let newProperty: MatchedProperty = Object.assign({}, {...property, investors: []})

    // get all ids (and maybe shortcut info) of each matching investor
    state.investors.investors.forEach(investor => {
      if(property.price >= investor.priceMin && property.price <= investor.priceMax) {
        // then investor matches property on price, we want to attach investor id and name to property
        newProperty.investors.push({id: investor.id!, name: `${investor.firstName} ${investor.lastName}`})
        console.log('new property:', newProperty)
      }
    })
    if(newProperty.investors.length > 0)
      matchedProperties.push(newProperty)
  })

  return matchedProperties
}

export const getMatchedInvestors = (state: RootState) => {
  console.log('called getMatchedInvestors with params:', state.matching.params)
  let matchedInvestors: MatchedInvestor[] = []
  return matchedInvestors
}