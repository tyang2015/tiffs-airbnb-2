import { useParams, useHistory, NavLink } from "react-router-dom"
import React,{useState, useEffect} from "react"
import { useDispatch, useSelector } from "react-redux";
import {deleteSpot, getSpots } from "../../store/spot";
import { resetBookings } from "../../store/booking";
import './GetSpot.css'
import GetReviews from "../GetReviews";
import { getSpotImages } from "../../store/image";
import ffErrorPic from "./images/spot-image-error-pic.jpg"
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
// import SpotBookings from "../SpotBookings";
import CreateBookingForm from "../CreateBookingForm";
import {getSpotBookings } from "../../store/booking";
import { getSpotReviews } from "../../store/review";
import chocoboPic from "./images/chocobo1.jpg"
import MapContainer from "../Maps";
import SplashFooter from "../SplashFooter";
// import EditBook
// import SpotBookings from "../SpotBookings";

// you can key in spots, no need for reducersdf
const GetSpot = () => {
    const {spotId} = useParams();
    const dispatch = useDispatch();
    let history= useHistory()

    let numReviews;
    const sessionUser = useSelector(state => state.session.user);
    const spots = useSelector(state=> state.spots)
    const allSpots = Object.values(spots)
    const spotImages = useSelector(state=> Object.values(state.images))
    const bookings = useSelector(state=> Object.values(state.bookings))
    const reviews = useSelector(state=> Object.values(state.reviews))
    const [showAddressMenu, setShowAddressMenu] = useState(false)
    const [date,setDate ] = useState(new Date())
    let allBookings = bookings

    useEffect(()=> {
      dispatch(getSpots())
      dispatch(getSpotImages(Number(spotId)))
      dispatch(getSpotBookings(Number(spotId)))
      dispatch(getSpotReviews(Number(spotId)))
    }, [dispatch])

    const spot = spots[spotId]

    console.log("spot iamges:", spotImages)
    // console.log('number reviews:', numReviews)

    const deleteHandle = async (e) => {
        if (!sessionUser){
            alert('please login to delete spot')
        }
        else if (sessionUser.id!== spot.ownerId){
            alert('You do not have permission to delete spot')
        } else {
            dispatch(deleteSpot(spotId))
            alert('successfully deleted!')
            history.push('/')
        }
    }

    if (date.length>0){
      console.log("newly formatted start date:", date[0])
      console.log("newly formatted start date:", date[1])
    }

    const convertDateToLocal = (dateStr) => {
      let dateObj = new Date(dateStr)
      dateObj.setDate(dateObj.getDate() + 1)
      return dateObj
    }

    const calcNightsBooked = () => {
      if (date.length>0){
        let newStart = new Date(date[0])
        let newEnd = new Date(date[1])
        let timeDiff= Math.ceil(((newStart.getTime() - newEnd.getTime()) / (1000 * 3600 * 24)))
        return Math.abs(timeDiff)
      } else {
        return "0"
      }
    }

    const calcTotalPrice = (spotPrice) => {
      return Math.round(spotPrice * calcNightsBooked(), 2)
    }


    const convertIntoComparableDates = (dateObj) => {
      // const offset = dateObj.getTimezoneOffset()
      // dateObj = new Date(dateObj.getTime() - (offset*60*1000))
      return dateObj.toISOString().split('T')[0]
    }

    const formatDate = (dateStr) => {
      let dateObj = new Date(dateStr)
      dateObj.setDate(dateObj.getDate()+1)
      let finalDate = dateObj.toLocaleString('en-US', {
        month: "long",
        day: 'numeric',
        year: "numeric",
      })
      return finalDate
    }

    return (
        <>
            <div className='spot-main-content-container'>
                <div className="spot-top-container">
                    {spot && (
                        <>
                            <h1 className='spot-top-container-top-half'>
                                Spot details for {spot.name}
                            </h1>
                            <div className='spot-top-container-bottom-half'>
                                <div style={{width: "fit-content"}} className='star-rating-container-top spot-detail-item-top'>
                                    <i class="fa-solid fa-star"></i>
                                    <p>{spot.avgStarRating==='NaN'? "New": spot.avgStarRating} •</p>
                                </div>
                                <div style={{width: "fit-content"}} className='reviews-container-top spot-detail-item-top'>
                                    {numReviews? (
                                        <p> {numReviews} reviews •</p>
                                    ) : (
                                        <p> No reviews •</p>
                                    )}
                                </div>
                                <div className= 'city-state-country-container-top spot-detail-item-top'>
                                    <div>{spot.city}, {spot.state}, {spot.country}</div>
                                </div>
                                {sessionUser && sessionUser.id=== spot.ownerId && (
                                    <button onClick={deleteHandle} className="spot-footer-button navlink"> Delete Spot </button>
                                )}
                                {sessionUser && sessionUser.id!= spot.ownerId && (
                                    <button className="spot-footer-button" >
                                        <NavLink className="navlink" exact to={`/spots/${spotId}/bookings/new`}>
                                            Click here to book
                                        </NavLink>
                                    </button>
                                )}
                                {sessionUser && (
                                    <button className="spot-footer-button">
                                        <NavLink className="navlink" exact to={`/spots/${spotId}/bookings`}>
                                            Check bookings for spot
                                        </NavLink>
                                    </button>
                                )}
                                {sessionUser && sessionUser.id=== spot.ownerId && (
                                    <button className="spot-footer-button">
                                        <NavLink className="navlink" exact to={`/spots/${spotId}/edit`}>
                                            Edit spot
                                        </NavLink>
                                    </button>
                                )}
                                {sessionUser && sessionUser.id=== spot.ownerId && (
                                    <button className="spot-footer-button">
                                        <NavLink className="navlink" exact to={`/spots/${spotId}/images/new`}>
                                            Update Images for Spot
                                        </NavLink>
                                    </button>
                                )}
                            </div>
                        </>
                    )}
                </div>
                {spot && (
                    <>
                        <div className='spot-detail-card'>
                            <div className="spot-images-container">
                                <img style={{borderRadius:"10px 0 0 10px"}} className='spot-preview-image-large' src={`${spot.previewImage}`} alt={`${spot.name} picture`}
                                  onError={e => { e.currentTarget.src = ffErrorPic; }}
                                />
                                {spotImages.length>0 && (
                                  <div className='spot-preview-image-right-container'>
                                      {spotImages.map((image,i) => (
                                        <img src={image.url}  className="spot-image-card"
                                        style={{borderTopRightRadius:i==1? "10px": "0", borderBottomRightRadius: i==3? "10px": "0"}}
                                          onError={e => { e.currentTarget.src = ffErrorPic; }}
                                        />
                                      ))}
                                      {spotImages.length<4 && Array(4 - spotImages.length).fill(1).map( i => (
                                        <div className="spot-image-card blank-image"> No image here </div>
                                      ))}
                                  </div>
                                )}
                                {spotImages.length == 0 && (
                                  <div className="get-spot-no-images-posted-container">
                                    <div style={{fontWeight: '450'}}> No images posted </div>
                                    <img style={{height: "70px", width: '50px', marginLeft: '1em'}} src={chocoboPic} />
                                  </div>
                                )}
                            </div>
                            <div className="spot-bottom-half-info-main-container">
                              <div className="spot-bottom-half-info-container">
                                  <div className="spot-left-text-container">
                                      <h2 className='spot-owner-intro-container'> Entire home hosted by Owner {spot.ownerId}</h2>
                                      <div className='spot-detail first'>
                                          <div className= 'spot-detail-icon-container'>
                                              <i class="fa-solid fa-envelope"></i>
                                          </div>
                                          <p className='spot-detail-item-description'> Description: {spot.description}</p>
                                      </div>
                                      <div className='spot-detail'>
                                          <div className= 'spot-detail-icon-container'>
                                              <i class="fa-solid fa-city"></i>
                                          </div>
                                          <p className='spot-detail-item-description'> City: {spot.city}</p>
                                      </div>
                                      <div className='spot-detail last'>
                                          <div className= 'spot-detail-icon-container'>
                                              <i class="fa-solid fa-dollar-sign"></i>
                                          </div>
                                          <p className='spot-detail-item-description'> Price: ${spot.price}</p>
                                      </div>
                                      {/* <div>
                                          <p> Show address </p>
                                          <input
                                              type='button'
                                              onClick={ToggleAddressMenu}
                                              value={showAddressMenu? "⮛": "⮙"}
                                              style={{border:'none', backgroundColor:'white'}}
                                          />
                                      </div>
                                      {showAddressMenu && (
                                          <div className='spot-detail'>
                                              <div className= 'spot-detail-icon-container'>
                                                  <i class="fa-solid fa-location-dot"></i>
                                              </div>
                                              <p className='spot-detail-item-description'>Address: {spot.address}</p>
                                          </div>
                                      )} */}
                                  </div>
                                  <div style={{width: "44rem"}}>
                                    <div>
                                      <div style={{fontWeight: "550", fontSize: '28px', alignItems:"center"}}>
                                        {calcNightsBooked()} nights at {spot.name}
                                        {date.length && (
                                          <div className="get-spot-formatted-dates-container">
                                            {formatDate(date[0])} - {formatDate(date[1])}
                                          </div>
                                        )}
                                      </div>

                                    </div>
                                    <Calendar
                                      onChange={setDate}
                                      value={date}
                                      selectRange={true}
                                      showDoubleView={true}
                                      view="month"
                                      className="calendar"
                                      minDate={new Date()}
                                      // maxDate={new Date().setFullYear(date.getFullYear()+1)}
                                      tileClassName={({date,view})=>{
                                        // if (view === 'month' && date.getDay() === 3) return 'booked'
                                        for (let i =0; i< allBookings.length; i++) {
                                        let booking = allBookings[i]
                                          let exStartDate = convertIntoComparableDates(new Date(booking.startDate))
                                          let exEndDate = convertIntoComparableDates(new Date(booking.endDate))
                                          let calendarDate = convertIntoComparableDates(new Date(date))
                                          if ((calendarDate>= exStartDate && calendarDate<= exEndDate)){
                                            return "booked-date"
                                          }
                                          // if (chosenStart <= exStartDate && chosenEnd >= exEndDate) {
                                          //   return "booked-date"
                                          // }
                                        }
                                        return "normal-date"
                                      }}
                                      />
                                  </div>

                              </div>
                              <div className="spot-right-text-parent-container">
                                {/* <div className="spot-right-text-container"> */}
                                  <div className="spot-detail-container-2 create-booking">
                                      {/* <h3> FOR DISPLAY ONLY: Will redo later</h3> */}
                                      <div className="top-third-container">
                                          <p> <b style={{fontSize: '24px'}}>${spot.price}</b> night</p>
                                          <div className="star-rating-reviews-container">
                                            <div className="star-rating-container">
                                                <i class="fa-solid fa-star"></i>
                                                <div style={{display:"flex", alignItems: "center", width: '2.8em', flexWrap: "nowrap"}}>
                                                    {spot.avgStarRating==='NaN'? "New": spot.avgStarRating} •

                                                </div>
                                            </div>
                                            <div className='reviews-container'>
                                                <div> {numReviews} reviews </div>
                                            </div>
                                          </div>
                                      </div>
                                        <CreateBookingForm date={date} spots={spots}/>
                                      <div style={{height: "3em", display: "flex", alignItems: 'center', justifyContent: "center"}}>
                                        You won't be charged yet
                                      </div>
                                      <div className="get-spot-price-breakdown-container">
                                        <div className="get-spot-price-breakdown-first-row price-row">
                                          <div className="price-breakdown-label">${spot.price}x {calcNightsBooked()} nights</div>
                                          <div>${calcTotalPrice(spot.price)}</div>
                                        </div>
                                        <div className="get-spot-price-breakdown-second-row price-row">
                                          <div className="price-breakdown-label">Cleaning fee</div>
                                          <div>$90</div>
                                        </div>
                                        <div className="get-spot-price-breakdown-third-row price-row">
                                          <div className="price-breakdown-label">Service fee</div>
                                          <div>$325</div>
                                        </div>
                                      </div>
                                      <div className='get-spot-price-breakdown-total-container'>
                                        <div>Total before taxes</div>
                                        <div>${90 + 325 + calcTotalPrice(spot.price)}</div>
                                      </div>
                                  </div>
                                {/* </div> */}
                              </div>
                            </div>
                            <GetReviews reviews={reviews} spot={spot} />
                            <div style={{marginBottom: "5em", paddingTop: "4em"}}>
                              <div style={{fontSize: "26px", fontWeight: "550", marginBottom: "1.5rem"}}>Where you'll be</div>
                              <div style={{fontSize: "20px", marginBottom: "1.5em"}}>{spot?.city}, {spot.state}, {spot.country}</div>
                              <MapContainer lng={spot? spot.lng: ""} lat={spot? spot.lat:""}/>
                            </div>
                        </div>
                    </>
                )}
            </div>
          {/* <SplashFooter/> */}
        </>
    )
}

export default GetSpot
