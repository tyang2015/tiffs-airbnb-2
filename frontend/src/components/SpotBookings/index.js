import {useDispatch, useSelector} from 'react-redux'
import {useState, useEffect} from 'react'
import { getBookings, resetBookings } from '../../store/booking'
import { useParams } from 'react-router-dom'
import React from 'react'
import {NavLink} from 'react-router-dom'
import './SpotBookings.css'
import chocoboPic from "./images/chocobo1.jpg"
import { getSpotBookings } from '../../store/booking'

// TODO: change backend to do a joined table with users and get the firstName of user to be rendered on page
const SpotBookings = ()=>{
    let {spotId} = useParams();
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const spot = useSelector(state=> state.spots[spotId])
    const bookings = useSelector(state => Object.values(state.bookings))
    const firstBooking = bookings[0]

    useEffect(()=>{
        dispatch(getSpotBookings(Number(spotId)))
        return ()=> dispatch(resetBookings())
    }, [dispatch])

    const convertDate= (date) => {
      if (date.split(" ").length>2){
        return `${date.split(" ")[0]}`
      }
      else return date
    }
    return (
        <>
                {!sessionUser && (
                    <h2>Please login to see spot booking information</h2>
                )}
                {bookings.length>0 && (
                    <div className='spot-bookings-main-container2'>
                        <div className= 'spot-bookings-title-container'>
                            <i class="fa-solid fa-house"></i>
                            <h2> Bookings for: {firstBooking && (firstBooking.Spot.name)} </h2>
                        </div>
                        <div className='spot-bookings-content-container'>
                            <div className={`spot-bookings-images-outer-container`}>
                                {!firstBooking? (
                                    <div className='spot-bookings-images-container'>
                                        <img className="spot-bookings-image" alt='new-spot-image'/>
                                        <img className="spot-bookings-image" alt='new-spot-image'/>
                                        <img className="spot-bookings-image" alt='new-spot-image'/>
                                    </div>
                                ):(
                                    <div className='spot-bookings-images-container'>
                                    <img className="spot-bookings-image" src={`${firstBooking.Spot.previewImage}`} />
                                        {/* <img className="spot-bookings-image" src={`${firstBooking.Spot.previewImage}`} />
                                        <img className="spot-bookings-image" src={`${firstBooking.Spot.previewImage}`} /> */}
                                    </div>

                                )}
                            </div>
                            {bookings.length>0 && (
                              <div className='spot-bookings-grid-container'>
                                {bookings.length>0 && (bookings.map((booking,i)=> (
                                  <div className={`booking-detail-card`} key={booking.id} >
                                      <h2> Booking #{i+1}</h2>
                                      <p> Hosted by Owner {booking.Spot.ownerId}</p>
                                      <p> {convertDate(booking.startDate)} ➣ {convertDate(booking.endDate)}</p>
                                      {/* <p> To: {booking.endDate}</p> */}
                                  </div>
                                )))}
                              </div>
                            )}
                        </div>
                    </div>
                )}
                {bookings.length==0 && sessionUser &&
                  (<>
                    <div className='spot-bookings-no-bookings-main-container'>
                      <img style={{height: "160px", width: "120px"}} src={chocoboPic}/>
                      <div style={{marginleft: "100px"}}> This spot has not been booked yet </div>
                      {sessionUser && spot && sessionUser.id!=spot.ownerId && (
                          <NavLink exact to={`/spots/${spotId}/bookings/new`}> Click here to book </NavLink>
                      )}
                    </div>
                  </>)
                }
        </>
    )
}

export default SpotBookings
