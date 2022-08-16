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
    // console.log('name:', name)
    // console.log('name length:', name.length)

    if (!name) errs.push("Please enter a valid name")
    if (name.length>50) errs.push("Name must be less than 50 characters")
    if (!address) errs.push("Please enter a valid address")
    if (!city) errs.push("Please enter a valid city")
    if (!state) errs.push("Please enter a valid state")
    if (!country) errs.push("Please enter a valid country")
    if (!lat || typeof Number(lat)!== 'number' || Number(lat)>90 || Number(lat)< -90) errs.push("Please enter a valid latitude value")
    if (!lng || typeof Number(lat)!== 'number' || Number(lng)>180 || Number(lng)<-180) errs.push("Please enter a valid longitude value")
    if (!description) errs.push("Please enter a valid description")
    if (!price || typeof Number(price)!=='number') errs.push("Please enter a valid price")
    setValidationErrors(errs)

  }, [address, city, state, name, country,lat, lng, description, price])

  const handleSubmit = async (e)=>{
    e.preventDefault();

    setHasSubmitted(true)
    console.log('validation errors for spot form:', validationErrors)

    if (validationErrors.length>0){
      alert('Cannot submit data')
      // setHasSubmitted(false)
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
        dispatch(createSpot(spot))
        alert('New Spot Added!')
        // console.log('sucesssfully create spot!', spot)
        setHasSubmitted(false)
    }
    if (formType==='Update Spot' && sessionUser.id=== spot.ownerId) {
        dispatch(editSpot(spot.id, spot))
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
          <ul className='validation-errors'>
            {validationErrors.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        </div>
      )}
        <form onSubmit={handleSubmit} >
          <fieldset className={`spot-fieldset-container`}>
            <h2> {formType} </h2>
              <div className="form-group first spot">
                <input
                  id="address"
                  type="text"
                  value={address}
                  onChange={e => setAddress(e.target.value)}
                  className='form-control spot'
                  placeholder='Address'
                  required="required"
                />
              </div>
              <div className='form-group spot'>
                {/* <label for="city">  </label> */}
                <input
                  id="city"
                  type="text"
                  value={city}
                  onChange={e => setCity(e.target.value)}
                  placeholder="City"
                  className="form-control spot"
                  required="required"
                />
              </div>
              <div className='form-group spot'>
                <input
                  type="text"
                  value={state}
                  onChange={e => setState(e.target.value)}
                  placeholder='State'
                  className="form-control spot"
                  required="required"
                />
              </div>
              <div className='form-group spot'>
                <input
                  type="text"
                  value={country}
                  onChange={e => setCountry(e.target.value)}
                  placeholder='Country'
                  className="form-control spot"
                  required="required"
                />
              </div>
              <div className='form-group spot'>
                <input
                  type="number"
                  value={lat}
                  onChange={e => setLat(e.target.value)}
                  placeholder='Latitude'
                  className="form-control spot"
                  required="required"
                />
              </div>
              <div className='form-group spot'>
                <input
                  type="number"
                  value={lng}
                  onChange={e => setLng(e.target.value)}
                  placeholder='Longitude'
                  className="form-control spot"
                  required="required"
                />
              </div>
              <div className='form-group spot'>
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder='Name'
                  className='form-control spot'
                  required="required"
                />
              </div>
              <div className='form-group spot'>
                <input
                  type="text"
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  placeholder='Description'
                  className='form-control spot'
                  required="required"
                />
              </div>
              <div className='form-group last spot'>
                <input
                  type="number"
                  value={price}
                  onChange={e => setPrice(e.target.value)}
                  placeholder='Price'
                  step='0.01'
                  className='form-control spot'
                  required="required"
                  min="0.00"
                />
              </div>
            <input type="submit" value={formType} className='submit-button'/>
          </fieldset>
        </form>
        {/* <h2> All Spots</h2>
        <div>
          {
            allSpots.map(spot => (
              <p key={spot.id}> {spot.name} </p>
            ))
          }
        </div> */}
      </>
    )
}

export default SpotForm
