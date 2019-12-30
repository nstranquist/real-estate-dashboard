import { auth, firestore } from '../../utils/firebaseHelper'
import { Dispatch } from 'redux'
import { Property } from '../../types'

export const getProperties = () => (dispatch: Dispatch,  getState: any) => {
  console.log('dispatching getProperties')
  dispatch({ type: 'LOADING_PROPERTIES' })
  firestore
    .collection(`profiles/${auth.currentUser!.uid}/properties`)
    //.orderBy('index')
    .limit(20)  // TODO: break up into 'sneakpeak' and 'fullProperties', (home for sneak, /properties for full)
    .get()
    .then((snap) => {
      let properties: Property[] = snap.docs.map(property => ({
        id: property.id,
        address: property.data()!.address,
        price: property.data()!.price,
        capRate: property.data()!.capRate,
        noi: property.data()!.noi,
        propertyType: property.data()!.propertyType,
        yearBuilt: property.data()!.yearBuilt,
      }))
      
      dispatch({
        type: 'GET_PROPERTIES',
        properties
      })
    })
    .catch(err => dispatch({ type: 'SET_PROPERTIES_ERROR', err}))
}

export const addProperty = (property: Property) => (dispatch: Dispatch) => {
  console.log('property to add:', property)
  // will have to not require id for 'Property' type
}

export const updateProperty = (property: Property) => (dispatch: Dispatch) => {
  console.log('property to update:', property)
  firestore
    .doc(`profiles/${auth.currentUser!.uid}/properties/${property.id}`)
    .update({
      ...property
    })
    .then(() => {
      console.log('update successful!')
      // update from store
      dispatch({
        type: 'UPDATE_PROPERTY',
        property
      })
    })
}

export const deleteProperty = (id: string) => (dispatch: Dispatch) => {
  console.log('property id to delete:', id)
  firestore
    .doc(`profiles/${auth.currentUser!.uid}/properties/${id}`)
    .delete()
    .then(() => {
      console.log('delete successful')
      dispatch({ type: 'DELETE_PROPERTY', id})
    })
    .catch(err => dispatch({ type: 'SET_PROPERTY_ERROR', err}))
}

export const uploadProperties = (data: any) => (dispatch: Dispatch) => {
  console.log('upload properties with data:', data)
}

export const setPropertiesFilter = (filter: string) => ({
  type: 'SET_PROPERTIES_FILTER',
  filter
})

// old code:

// old favorite property code:
// then add isFavorite flag to the scholarships from userData if signedin
// if(getState().profile.auth.isAuthenticated) { // can probably verify here in better ways
//   let favoriteProperty = getState().profile.userData.myProperties
//   if(favoriteProperty) {
//     response.map(property => {
//       property.isFavorite = favoriteProperty.includes(property.index) ? true : false
//     })
//   } else console.log('your favorited scholarships were null')
// 