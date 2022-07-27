import {useDispatch, useSelector} from 'react-redux'
import {useState, useEffect} from 'react'
import { getBookings } from '../../store/booking'
import { useParams } from 'react-router-dom'
import React from 'react'
import './SpotBookings.css'

const SpotBookings = ({bookings})=>{
    let {spotId} = useParams();
    const allBookings = Object.values(bookings)
    const bookingsForSpot = allBookings.filter(booking=> booking.spotId === Number(spotId))
    console.log('bookings for spot:', bookingsForSpot)
    return (
        <>
            <h2> Spot bookings for Spot </h2>
            <div>
                {bookingsForSpot.map(booking=> (
                    <div key={booking.id}>
                        <h2> Booking {booking.id}: {booking.Spot.name}</h2>
                        <p> From: {booking.startDate}</p>
                        <p> To: {booking.endDate}</p>
                    </div>
                ))}
            </div>
        </>
    )
}

export default SpotBookings
