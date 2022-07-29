import React,{useState, useEffect} from "react"
import {useHistory} from 'react-router-dom'
import { createSpot, editSpot } from '../../store/spot'
// import
import {useDispatch, useSelector} from "react-redux"
import {useParams} from 'react-router-dom'

import './SpotForm.css'


const SpotForm = ({spot, formType, spots}) => {
  // spots is just used to test CREATE
  // console.log('spot on edit form:', spot)
  const dispatch = useDispatch();
  const history = useHistory();
  // for checking to see if you are valid user
  const sessionUser = useSelector(state => state.session.user);
  const {spotId} = useParams();

  const [address, setAddress] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [country, setCountry ] = useState('')
  const [lat, setLat] = useState('')
  const [lng, setLng] = useState('')
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [validationErrors, setValidationErrors] = useState([])
  const [hasSubmitted, setHasSubmitted] = useState(false)

  const allSpots = Object.values(spots)

  useEffect(()=>{
    const errs= []
    if (!name) errs.push("Please enter a valid name")
    if (!address) errs.push("Please enter a valid address")
    if (!city) errs.push("Please enter a valid city")
    if (!state) errs.push("Please enter a valid state")
    if (!country) errs.push("Please enter a valid country")
    if (!lat || Number(lat)>90 || Number(lat)<-90) errs.push("Please enter a valid latitude value")
    if (!lng || Number(lng)>180 || Number(lng)<-180) errs.push("Please enter a valid longitude value")
    if (!description) errs.push("Please enter a valid description")
    if (!price || typeof Number(price)!='number') errs.push("Please enter a valid price")
    setValidationErrors(errs)

  }, [address, city, state, country,lat, lng, description, price])

  const handleSubmit = async (e)=>{
    e.preventDefault();

    setHasSubmitted(true)

    if (validationErrors.length>0){
      alert('Cannot submit data')
      return
    }

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
        await dispatch(createSpot(spot))
        alert('New Spot Added!')
        // console.log('sucesssfully create spot!', spot)
        setHasSubmitted(false)
    }
    if (formType==='Update Spot' && sessionUser.id=== spot.ownerId) {
        await dispatch(editSpot(spot.id, spot))
        alert('Spot changes have been updated!')
        setHasSubmitted(false)
    }
    if (formType==='Update Spot' && sessionUser.id!= spot.ownerId){
      // if you dont own it you cant edit it
      alert ('Sorry! You must be authorized as the spot owner to have permission to update')
      return
    }
  }

    return (
      <>
      {validationErrors.length>0 && hasSubmitted && (
        <div>
          The following errors were found:
          <ul>
            {validationErrors.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        </div>
      )}
        <form onSubmit={handleSubmit} >
          <fieldset>
            <h2> {formType} </h2>
              <div className="form-group first">
                <input
                  id="address"
                  type="text"
                  value={address}
                  onChange={e => setAddress(e.target.value)}
                  className='form-control'
                  placeholder='Address'
                />
              </div>
              <div className='form-group'>
                {/* <label for="city">  </label> */}
                <input
                  id="city"
                  type="text"
                  value={city}
                  onChange={e => setCity(e.target.value)}
                  placeholder="City"
                  className="form-control"
                />
              </div>
              <div className='form-group'>
                <input
                  type="text"
                  value={state}
                  onChange={e => setState(e.target.value)}
                  placeholder='State'
                  className="form-control"
                />
              </div>
              <div className='form-group'>
                <input
                  type="text"
                  value={country}
                  onChange={e => setCountry(e.target.value)}
                  placeholder='Country'
                  className="form-control"
                />
              </div>
              <div className='form-group'>
                <input
                  type="text"
                  value={lat}
                  onChange={e => setLat(e.target.value)}
                  placeholder='Latitude'
                  className="form-control"
                />
              </div>
              <div className='form-group'>
                <input
                  type="text"
                  value={lng}
                  onChange={e => setLng(e.target.value)}
                  placeholder='Longitude'
                  className="form-control"
                />
              </div>
              <div className='form-group'>
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder='Name'
                  className='form-control'
                />
              </div>
              <div className='form-group'>
                <input
                  type="text"
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  placeholder='Description'
                  className='form-control'
                />
              </div>
              <div className='form-group last'>
                <input
                  type="text"
                  value={price}
                  onChange={e => setPrice(e.target.value)}
                  placeholder='Price'
                  className='form-control'
                />
              </div>
            <input type="submit" value={formType} className='submit-button'/>
          </fieldset>
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
