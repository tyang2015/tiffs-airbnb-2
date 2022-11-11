import {useDispatch, useSelector} from 'react-redux'
import {useState, useEffect} from 'react'
import {useHistory, Redirect, NavLink} from 'react-router-dom'
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

    const displayDates = (dateStr) => {
      let dateObj = new Date(dateStr)
      dateObj.setDate(dateObj.getDate()+1)
      return dateObj.toLocaleString('en-US', {
        month: "numeric",
        day: 'numeric' ,
        year: "numeric",
      })
    }

    return (
        <>
            <div className="user-bookings-main-container">
                <h2> Your bookings </h2>
                <div className={`user-bookings-grid-container`}>
                    {allBookings.map(booking => (
                      <div key={booking.id} className={`user-booking-card`}>
                            <div className={`user-bookings`}>
                                <img className={`user-booking-img`} src={`${booking.Spot.previewImage}`}/>
                            </div>
                            <div className='user-bookings-right-pane-container'>
                              <NavLink key={booking.id} to={`/spots/${booking.Spot.id}`} className="navlink">
                                <div className={`user-booking-text-container`}>
                                    <h3 className='booking-title-container' key={booking.id}>#{booking.id}: {booking.Spot.name}</h3>
                                    <p className='booking-date-container'> Dates: {displayDates(booking.startDate)} ➣ {displayDates(booking.endDate)}</p>
                                </div>
                              </NavLink>
                              <div className={`user-booking-delete-container`}>
                                <button className= "user-booking-delete-button" onClick={e=>handleDelete(e,booking.id)}>
                                    <i class="fa-solid fa-trash-can"></i>
                                </button>
                                <div>
                                  <NavLink to={`/spots/${booking.Spot.id}/bookings/${booking.id}`}>
                                    <button className= "user-booking-update-button">
                                      <i class="fa-sharp fa-solid fa-pencil"></i>
                                    </button>
                                  </NavLink>
                                </div>
                              </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default UserBookings
