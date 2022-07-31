import {useDispatch, useSelector} from 'react-redux'
import {useState, useEffect} from 'react'
import { getBookings } from '../../store/booking'
import { useParams } from 'react-router-dom'
import React from 'react'
import {NavLink} from 'react-router-dom'
import './SpotBookings.css'

// TODO: change backend to do a joined table with users and get the firstName of user to be rendered on page
const SpotBookings = ({bookings})=>{
    let {spotId} = useParams();
    let allBookings;
    let bookingsForSpot;
    let firstBooking;
    if (bookings){
        allBookings = Object.values(bookings)
        bookingsForSpot = allBookings.filter(booking=> booking.spotId === Number(spotId))
        firstBooking = bookingsForSpot[0]
    }
    // console.log('first booking:',firstBooking)
    return (
        <>
            {firstBooking? (
                <>
                    <div className= 'spot-bookings-title-container'>
                        <i class="fa-solid fa-house"></i>
                        <h2> Bookings for: {firstBooking.Spot.name} </h2>
                    </div>
                    <div>
                        <div className={`spot-bookings-images-container`}>
                            {firstBooking && (<img src={`${firstBooking.Spot.previewImage}`} />)}
                            {firstBooking && (<img src={`${firstBooking.Spot.previewImage}`} />)}
                            {firstBooking && (<img src={`${firstBooking.Spot.previewImage}`} />)}
                        </div>
                        <div className='spot-bookings-grid-container'>
                            {bookings && (bookingsForSpot.map(booking=> (
                                <div className={`booking-detail-card`} key={booking.id} >
                                    <h2> Booking #{booking.id}</h2>
                                    <p> Hosted by Owner {booking.Spot.ownerId}</p>
                                    <p> {booking.startDate} ➣ {booking.endDate}</p>
                                    {/* <p> To: {booking.endDate}</p> */}
                                </div>
                            )))}
                        </div>
                    </div>
                </>) : (
                    <>
                        <h2> This spot has not been booked yet </h2>
                        <NavLink exact to={`/spots/${spotId}/bookings/new`}> Click here to book </NavLink>
                    </>
                    )
            }
        </>
    )
}

export default SpotBookings
