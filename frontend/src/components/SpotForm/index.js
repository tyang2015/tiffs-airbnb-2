import React,{useState, useEffect} from "react"
import {useHistory, useSelector} from 'react-redux'
import { createSpot } from '../../store/spot'
// import
import {useDispatch} from "react-redux"

const SpotForm = ({spot, formType, spots}) => {
  // spot argument will only be used for Edit Form
  // spots is just used to test CREATE
  const dispatch = useDispatch();
  const allSpots = Object.values(spots)
  // console.log('all spots:', allSpots)

  const [address, setAddress] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [country, setCountry ] = useState('')
  const [lat, setLat] = useState(1)
  const [lng, setLng] = useState(1)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState(1)

  const handleSubmit = async (e)=>{
    e.preventDefault();
    spot = {
      ...spot,
      address,
      city,
      state,
      country,
      lat,
      lng,
      name,
      description,
      price
    }

    if (formType==='Create Spot'){
      const spotCreated= await dispatch(createSpot(spot))
      console.log('sucesssfully create spot!', spot)
    }
    if (formType ==='Edit Spot'){
      console.log('TODO: edit form')
    }
  }

    return (
      <>
          <form onSubmit={handleSubmit} >
          <h2> Create a Spot </h2>
          <label>
            Address
            <input
              type="text"
              value={address}
              onChange={e => setAddress(e.target.value)}
            />
          </label>
          <label>
            City
            <textarea
              value={city}
              onChange={e => setCity(e.target.value)}
            />
          </label>
          <label>
            state
            <textarea
              value={state}
              onChange={e => setState(e.target.value)}
            />
          </label>
          <label>
            country
            <textarea
              value={country}
              onChange={e => setCountry(e.target.value)}
            />
          </label>
          <label>
            latitude
            <textarea
              value={lat}
              onChange={e => setLat(e.target.value)}
            />
          </label>
          <label>
            longitude
            <textarea
              value={lng}
              onChange={e => setLng(e.target.value)}
            />
          </label>
          <label>
            Name
            <textarea
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </label>
          <label>
            description
            <textarea
              value={description}
              onChange={e => setDescription(e.target.value)}
            />
          </label>
          <label>
            price
            <textarea
              placeholder="Enter price here"
              value={price}
              onChange={e => setPrice(e.target.value)}
            />
          </label>
          <input type="submit" value={formType} />
        </form>
        <h2> All Spots</h2>
        <div>
          {
            allSpots.map(spot => (
              <p key={spot.id}> {spot.name} </p>
            ))
          }
        </div>
      </>


    )
}

export default SpotForm
