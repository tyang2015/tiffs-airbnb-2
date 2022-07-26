import {useDispatch, useSelector} from 'react-redux'
import {useState, useEffect} from 'react'
import { getBookings } from '../../store/booking'
import React from 'react'
import './Bookings.css'


const UserBookings = ({bookings}) => {
    // when you run a dispatch it runs all of the reducers (thats why you get the errors in console for spot(multiple fetch calls))
    const dispatch = useDispatch();
    const allBookings = Object.values(bookings)
    // console.log("bookings data in component:", bookings)
    useEffect(()=>{
        dispatch(getBookings())
      }, [dispatch])

    return (
        <>
            <h2> your bookings: </h2>
            <div>
                {allBookings.map(booking => (
                    <h3 key={booking.id}>Booking {booking.id}: {booking.Spot.name}</h3>
                ))}
            </div>
        </>
    )
}

export default UserBookings
