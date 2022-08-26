import React from "react"
// import {useDispatch} from "react-redux"
import SpotForm from "../SpotForm"


const CreateSpotForm = ({spots}) => {
  // spot argument will only be used for Edit Form
  // spots is just used to test CREATE
  // NOTE this spot does not have an id, which is fine
  // bc it only needs to submit the body and the thunk will recieve the id from db
  const spot = {
    address: '',
    city: '',
    state: '',
    country: '',
    lat: '',
    lng: '',
    name: '',
    description:'',
    price: ''
  }

  return (
    <SpotForm spot={spot} formType={'Create Spot'} spots={spots}/>
  )

}

export default CreateSpotForm
