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
    const history = useHistory();

    let numReviews;
    const sessionUser = useSelector(state => state.session.user);
    const [showLngMenu, setShowLngMenu] = useState(false)

    const spot = spots[spotId]
    console.log('spots: ',spots)
    if (spot){
        let reviews = Object.values(spot.reviews)
        numReviews= reviews.length
        console.log(spot.reviews)
    }
    // console.log('current reviews for spot', spot.reviews)
    // const numReviews = Object.values(spot?.reviews).length
    // console.log(num)

    // display error msg?
    const deleteHandle = async (e) => {
        if (sessionUser.id!== spot.ownerId){
            alert('You do not have permission to delete spot')
        } else {
            await dispatch(deleteSpot(spotId))
            alert('successfully deleted!')
            history.push('/spots')
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
            <h2> spot details for {spotId}</h2>
            {spot && (
                <>
                    <div className='spot-detail-card'>
                        <img className='spot-preview-image' src={`${spot.previewImage}`} alt={`${spot.name} picture`}/>
                        <div className='spot-detail' >
                            <div className= 'spot-detail-icon-container'>
                                <i class="fa-solid fa-house"></i>
                            </div>
                            <p className='spot-detail-item-description'> Name: {spot.name}</p>
                        </div>
                        <div className='spot-detail'>
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
                        <div className='spot-detail'>
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
                    <div className="spot-detail-container-2">
                            <div className="top-third-container">
                                <p> <b>${spot.price}</b> night</p>
                                <div className="star-rating-reviews-container">
                                    <div className="star-rating-container">
                                        <i class="fa-solid fa-star"></i>
                                        <p> {spot.avgStarRating}</p>
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
                                    guests
                                </div>
                            </div>
                            <div className="'last-third-container">
                                <div className="reserve-submit-button">
                                    Reserve
                                </div>
                            </div>
                    </div>
                </>
            )}

            <button onClick={deleteHandle}> Delete Spot </button>
            <button >
                <NavLink className="navlink" exact to={`/spots/${spotId}/bookings/new`}>
                    Click here to book
                </NavLink>
            </button>
            <button>
                <NavLink exact to={`/spots/${spotId}/bookings`}>
                    Check bookings for spot
                </NavLink>
            </button>
        </>
    )
}

export default GetSpot
