import {useDispatch, useSelector} from 'react-redux'
import {useState, useEffect} from 'react'
import {useHistory, Redirect} from 'react-router-dom'
import { getBookings, deleteBooking } from '../../store/booking'
import React from 'react'
import './Bookings.css'


const UserBookings = () => {
    // when you run a dispatch it runs all of the reducers (thats why you get the errors in console for spot(multiple fetch calls))
    const dispatch = useDispatch();
    const history = useHistory();
    const bookings = useSelector(state=> state.bookings)
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
            <h2> Your bookings </h2>
            <div className={`user-bookings-grid-container`}>
                {allBookings.map(booking => (
                    <div key={booking.id} className={`user-booking-card`}>
                        <div className={`user-bookings`}>
                            <img className={`user-booking-img`} src={`${booking.Spot.previewImage}`}/>
                        </div>
                        <div className={`user-booking-text-container`}>
                            <h3 key={booking.id}>Booking {booking.id}: {booking.Spot.name}</h3>
                            <p> Dates: {booking.startDate} ➣ {booking.endDate}</p>
                        </div>
                        <div className={`user-booking-delete-container`}>
                            <button onClick={e=>handleDelete(e,booking.id)}>
                                <i class="fa-solid fa-trash-can"></i>
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}

export default UserBookings
