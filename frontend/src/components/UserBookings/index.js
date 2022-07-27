import {useDispatch, useSelector} from 'react-redux'
import {useState, useEffect} from 'react'
import {useHistory, Redirect} from 'react-router-dom'
import { getBookings, deleteBooking } from '../../store/booking'
import React from 'react'
import './Bookings.css'


const UserBookings = ({bookings}) => {
    // when you run a dispatch it runs all of the reducers (thats why you get the errors in console for spot(multiple fetch calls))
    const dispatch = useDispatch();
    const history = useHistory();
    const allBookings = Object.values(bookings)
    // console.log("bookings data in component:", bookings)

    useEffect(()=>{
        dispatch(getBookings())
      }, [dispatch])

    //   <Redirect to="/users/bookings" />
    const handleDelete = (e, bookingId) => {
        dispatch(deleteBooking(bookingId))
        alert('Successfully deleted!')
        history.push('/users/bookings')
    }

    return (
        <>
            <h2> your bookings: </h2>
            <div>
                {allBookings.map(booking => (
                    <div key={booking.id}>
                        <h3 key={booking.id}>Booking {booking.id}: {booking.Spot.name}</h3>
                        <p> Dates: {booking.startDate} - {booking.endDate}</p>
                        <button onClick={e=>handleDelete(e,booking.id)}> Delete Booking </button>
                    </div>
                ))}
            </div>
        </>
    )
}

export default UserBookings
