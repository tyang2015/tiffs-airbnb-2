import React,{useState, useEffect} from "react"
import {useHistory} from 'react-router-dom'
import { createSpot, editSpot } from '../../store/spot'
// import
import {useDispatch, useSelector} from "react-redux"
import {useParams} from 'react-router-dom'

import './CreateSpotModal.css'


const SpotForm = ({spot, formType, setSpotModal}) => {
  // console.log("SPOT IN UPDATE FORM:", spot)
  // spots is just used to test CREATE
  const dispatch = useDispatch();
  const history = useHistory();
  // for checking to see if you are valid user
  const sessionUser = useSelector(state => state.session.user);
  const {spotId} = useParams();

  const [address, setAddress] = useState(spot? spot.address : '')
  const [city, setCity] = useState(spot? spot.city : '')
  const [state, setState] = useState(spot? spot.state : '')
  const [country, setCountry ] = useState(spot? spot.country : '')
  const [lat, setLat] = useState(spot? spot.lat : '')
  const [lng, setLng] = useState(spot? spot.lng : '')
  const [name, setName] = useState(spot? spot.name : '')
  const [description, setDescription] = useState(spot? spot.description :'')
  const [price, setPrice] = useState(spot? spot.price :'')
  // adde here
  const [previewImage, setPreviewImage] = useState(spot? spot.previewImage : '')
  const [validationErrors, setValidationErrors] = useState([])
  const [hasSubmitted, setHasSubmitted] = useState(false)


  function isImage(url) {
    let imageExtensions= ['jpg', 'jpeg', 'png', 'svg', 'gif', 'webp']
    for (let i = 0; i< imageExtensions.length; i++){
      let ext = imageExtensions[i]
      if (url.toLowerCase().includes(ext)){
        return true
      }
    }
    return false
  }

  useEffect(()=>{
    const errs= []
    // console.log('name:', name)
    // console.log('name length:', name.length)
    if (!isImage(previewImage)) errs.push("Please enter a valid image url")
    if (!name) errs.push("Please enter a valid name")
    if (name.length>50) errs.push("Name must be less than 50 characters")
    if (!address) errs.push("Please enter a valid address")
    if (!city) errs.push("Please enter a valid city")
    if (state.length!=2) errs.push("State must be a 2-digit acronym")
    if (country.toLowerCase()!="us" && country.toLowerCase()!="usa" && country.toLowerCase()!="united states") errs.push("Our market currently is only domestic. Please type 'US'.")
    if (!country) errs.push("Please enter a valid country")
    if (!lat || typeof Number(lat)!== 'number' || Number(lat)>90 || Number(lat)< -90) errs.push("Please enter a valid latitude value")
    if (!lng || typeof Number(lat)!== 'number' || Number(lng)>180 || Number(lng)<-180) errs.push("Please enter a valid longitude value")
    if (!description) errs.push("Please enter a valid description")
    if (description.length>350) errs.push("Description must be less than 350")
    if (!price || typeof Number(price)!=='number') errs.push("Please enter a valid price")
    setValidationErrors(errs)

  }, [address, city, state, name, country,lat, lng, description, price, previewImage])

  const handleSubmit = async (e)=>{
    e.preventDefault();

    setHasSubmitted(true)
    // console.log('validation errors for spot form:', validationErrors)

    if (validationErrors.length>0){
      alert('Cannot submit data')
      // setHasSubmitted(false)
      return
    }
    // added here
    let imageUrl= previewImage

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
      price,
      previewImage
    }

    if (formType==='Create a Spot'){
        dispatch(createSpot(spot))
        alert('New Spot Added!')
        setSpotModal(false)
        setHasSubmitted(false)
        history.push('/')
    }
    if (formType==='Edit a Spot') {
        dispatch(editSpot(spot.id, spot))
        alert('Spot changes have been updated!')
        setHasSubmitted(false)
        history.push('/')

    }
  }

    return (
      <div className="spot-form-outer-container">
        <div className="validation-errors-outer-container">
          {validationErrors.length>0 && hasSubmitted && (
              <div className='validation-errors create-update-spot-form'>
                {validationErrors.map((error) => (
                  <div key={error}>{error}</div>
                ))}
              </div>
          )}
        </div>
        <form onSubmit={handleSubmit} className='create-spot-form-container' >
          {/* <fieldset className={`spot-fieldset-container`}> */}
          <div className="create-spot-form-content-container">
            <h2> {formType} </h2>
              <div className="form-group first spot">
                <input
                  id="address"
                  type="text"
                  value={address}
                  onChange={e => setAddress(e.target.value)}
                  className='form-control spot'
                  placeholder='Address'
                  required={true}
                />
              </div>
              <div className='form-group spot'>
                <input
                  id="city"
                  type="text"
                  value={city}
                  onChange={e => setCity(e.target.value)}
                  placeholder="City"
                  className="form-control spot"
                  required={true}
                />
              </div>
              <div className='form-group spot'>
                <input
                  type="text"
                  value={state}
                  onChange={e => setState(e.target.value)}
                  placeholder='State'
                  className="form-control spot"
                  required={true}
                />
              </div>
              <div className='form-group spot'>
                <input
                  type="text"
                  value={country}
                  onChange={e => setCountry(e.target.value)}
                  placeholder='Country'
                  className="form-control spot"
                  required={true}
                />
              </div>
              <div className='form-group spot'>
                <input
                  type="number"
                  value={lat}
                  onChange={e => setLat(e.target.value)}
                  placeholder='Latitude (-90 to 90)'
                  className="form-control spot"
                  required={true}
                />
              </div>
              <div className='form-group spot'>
                <input
                  type="number"
                  value={lng}
                  onChange={e => setLng(e.target.value)}
                  placeholder='Longitude (-180 to 180)'
                  className="form-control spot"
                  required={true}
                />
              </div>
              <div className='form-group spot'>
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder='Name'
                  className='form-control spot'
                  required={true}
                />
              </div>
              <div className='form-group spot'>
                <input
                  type="text"
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  placeholder='Description'
                  className='form-control spot'
                />
              </div>
              <div className='form-group spot'>
                <input
                  type="text"
                  value={previewImage}
                  onChange={e => setPreviewImage(e.target.value)}
                  placeholder='Image Url'
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
            <input type="submit" value={formType} className='create-spot submit-button'/>
          </div>
          {/* </fieldset> */}
        </form>
      </div>
    )
}

export default SpotForm
