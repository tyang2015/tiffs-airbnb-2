import { useParams, useHistory, NavLink } from "react-router-dom"
import React,{useState, useEffect} from "react"
import { useDispatch, useSelector } from "react-redux";
import {deleteSpot } from "../../store/spot";
import './GetSpot.css'
import SpotBookings from "../SpotBookings";

// you can key in spots, no need for reducer
const GetSpot = ({spots, bookings}) => {
    const {spotId} = useParams();
    const dispatch = useDispatch();
    // const history = useHistory();

    let numReviews;
    const sessionUser = useSelector(state => state.session.user);
    const [showLngMenu, setShowLngMenu] = useState(false)

    const spot = spots[spotId]
    // console.log('spot on get spot id page: ',spot)
    // console.log("spot reviews:",spot.Reviews)
    if (spot && spot.Reviews){
        console.log('spot.Reviews does exist!')
        numReviews= spot.Reviews.length
        console.log("number of reviews:", numReviews)
    }
    // // for including reviews in redux in object form
    // if (spot && spot.reviews){
    //     let reviews = Object.values(spot.reviews)
    //     numReviews= reviews.length
    //     console.log("number of reviews:", numReviews)
    // }
    else {
        numReviews = 1
    }
    // console.log('current reviews for spot', spot.reviews)

    const deleteHandle = async (e) => {
        if (!sessionUser){
            alert('please login to delete spot')
        }
        else if (sessionUser.id!== spot.ownerId){
            alert('You do not have permission to delete spot')
        } else {
            await dispatch(deleteSpot(spotId))
            alert('successfully deleted!')
            // history.push('/spots')
        }
    }

    const ToggleLngMenu= (e) => {
        if (!sessionUser) {
            alert('Please login to view')
            return
        }
        if (sessionUser.id!==spot.ownerId){
            alert('Only the authorized owner can view longitude & latitude coordinates')
            return
        }
        showLngMenu === true? setShowLngMenu(false): setShowLngMenu(true)
        // setShowLngMenu(true)
    }
    // useEffect(()=>{
    //     set
    // }, [showLngMenu])

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
                                <div className='star-rating-container-top spot-detail-item-top'>
                                    <i class="fa-solid fa-star"></i>
                                    <p>{spot.avgStarRating} •</p>
                                </div>
                                <div className='reviews-container-top spot-detail-item-top'>
                                    <p> {numReviews} reviews •</p>
                                </div>
                                <div className= 'city-state-country-container-top spot-detail-item-top'>
                                    <p>{spot.city}, {spot.state}, {spot.country}</p>
                                </div>
                            </div>
                        </>
                    )}
                </div>
                {spot && (
                    <>
                        <div className='spot-detail-card'>
                            <div className="spot-images-container">
                                <img className='spot-preview-image-large' src={`${spot.previewImage}`} alt={`${spot.name} picture`}/>
                                <div className='spot-preview-image-right-container'>
                                    {/* refactor to do this in a for loop for i=4 images */}
                                    <img className='spot-preview-image-small top' src={`${spot.previewImage}`} alt={`${spot.name} picture`}></img>
                                    <img className='spot-preview-image-small top' src={`${spot.previewImage}`} alt={`${spot.name} picture`}></img>
                                    <img className='spot-preview-image-small bottom' src={`${spot.previewImage}`} alt={`${spot.name} picture`}></img>
                                    <img className='spot-preview-image-small bottom' src={`${spot.previewImage}`} alt={`${spot.name} picture`}></img>
                                </div>
                            </div>
                            <div className="spot-bottom-half-info-container">
                                <div className="spot-left-text-container">
                                    {/* <div className='spot-detail' >
                                        <div className= 'spot-detail-icon-container'>
                                            <i class="fa-solid fa-house"></i>
                                        </div>
                                        <p className='spot-detail-item-description'> Name: {spot.name}</p>
                                    </div> */}
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
                                    <div>
                                        <p> Show longitude and latitude coordinates</p>
                                        <input
                                            type='button'
                                            onClick={ToggleLngMenu}
                                            value={showLngMenu? "⮛": "⮙"}
                                            style={{border:'none', backgroundColor:'white'}}
                                        />
                                    </div>
                                    {showLngMenu && (
                                        <div className='spot-detail'>
                                            <div className= 'spot-detail-icon-container'>
                                                <i class="fa-solid fa-location-dot"></i>                            </div>
                                                <p className='spot-detail-item-description'> Longitude: {spot.lng} Latitude: {spot.lat}</p>
                                        </div>
                                    )}
                                </div>
                                <div className="spot-right-text-container">
                                    <div className="spot-detail-container-2">
                                        <h3> FOR DISPLAY ONLY: Will redo later</h3>
                                        <div className="top-third-container">
                                            <p> <b style={{fontSize: '24px'}}>${spot.price}</b> night</p>
                                            <div className="star-rating-reviews-container">
                                                <div className="star-rating-container">
                                                    <i class="fa-solid fa-star"></i>
                                                    <p> {spot.avgStarRating} •</p>
                                                </div>
                                                <div className='reviews-container'>
                                                    <p> {numReviews} reviews </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="second-third-container">
                                            <div className="spot-middle-container-top-row">
                                                <div className='spot-booking-input'>
                                                    check in
                                                </div>
                                                <div className='spot-booking-input' >
                                                    check out
                                                </div>
                                            </div>
                                            <div className="spot-middle-container-bottom-row">
                                                {/* replace p with button tag later */}
                                                <p>guests</p>
                                            </div>
                                        </div>
                                        <div className="'last-third-container">
                                            <div className="reserve-submit-button">
                                                Reserve
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='spot-footer-container'>
                                <button onClick={deleteHandle} className="spot-footer-button navlink"> Delete Spot </button>
                                <button className="spot-footer-button" >
                                    <NavLink className="navlink" exact to={`/spots/${spotId}/bookings/new`}>
                                        Click here to book
                                    </NavLink>
                                </button>
                                <button className="spot-footer-button">
                                    <NavLink className="navlink" exact to={`/spots/${spotId}/bookings`}>
                                        Check bookings for spot
                                    </NavLink>
                                </button>
                                {sessionUser && (
                                    <button className="spot-footer-button">
                                        <NavLink className="navlink" exact to={`/spots/${spotId}/edit`}>
                                            Edit spot
                                        </NavLink>
                                    </button>
                                )}
                            </div>
                        </div>
                    </>
                )}
            </div>
        </>
    )
}

export default GetSpot
