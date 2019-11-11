import { firestore } from '../../utils/firebaseHelper'
import { Dispatch } from 'redux'
import { Property } from '../root'

export const getProperties = () => (dispatch: Dispatch,  getState: any) => {
  console.log('dispatching getProperties')
  dispatch({ type: 'LOADING_PROPERTIES' })
  firestore
    .collection('properties')
    //.orderBy('index')
    .limit(20)
    .get()
    .then((snap) => {
      let response: Property[] = []
      snap.docs.map(property => {
        response.push({
          index: property.data().index,
          name: property.data().name,
          description: property.data().description,
          school: property.data().school,
          amount: property.data().amount,
          requirements: property.data().requirements,
        })
      })
      // then add isFavorite flag to the scholarships from userData if signedin
      if(getState().profile.auth.isAuthenticated) { // can probably verify here in better ways
        let favoriteProperty = getState().profile.userData.myProperties
        if(favoriteProperty) {
          response.map(property => {
            property.isFavorite = favoriteProperty.includes(property.index) ? true : false
          })
        } else console.log('your favorited scholarships were null')
      }
      dispatch({
        type: 'GET_PROPERTIES',
        properties: response
      })
    })
    .catch(err => {
      console.log(err)
      dispatch({ type: 'SET_PROPERTIES_ERROR', err})
    })
}

export const setPropertiesFilter = (filter: string) => ({
  type: 'SET_PROPERTIES_FILTER',
  filter
})