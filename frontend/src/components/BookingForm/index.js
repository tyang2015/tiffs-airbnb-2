import React from "react"
import {useParams, useHistory} from "react-router-dom"
import {useState, useEffect} from "react"
import {useDispatch} from "react-redux"
import { createBooking, editBooking } from "../../store/booking"
import './BookingForm.css'


const BookingForm = ({bookings, formType, booking})=> {
  // it will be valid or undefined bc edit form does not have spotId in url
  // that is ok
    const {spotId} = useParams();

    const history = useHistory();
    const dispatch = useDispatch();
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('');
    // const [hasSubmitted, setHasSubmitted] = useState(false)
    const allBookings = Object.values(bookings)
    let bookingUpdated;
    let bookingCreated;
    let renderedBookings;

    const handleSubmit = async (e)=>{
        e.preventDefault();
        // booking will have id already for Edit
        booking = {
          ...booking,
          startDate,
          endDate
        }

        if (formType==='Create Booking'){
          bookingCreated = await dispatch(createBooking(spotId, booking))
          alert('Thanks for booking!')
          history.push('/users/bookings')
        } else{
          bookingUpdated = await dispatch(editBooking(booking.id, booking))
          alert('Your booking has been rescheduled!')
          history.push('/users/bookings')
          // console.log('/users/bookings')
        }
    }
    // if its EDIT FORM or CREATE FORM and we got back the data already
    if (bookingUpdated || bookingCreated){
      renderedBookings = (
        <div>
          {allBookings.map(booking =>(
            <div key={booking.id}>
              <h3>Booking {booking.id}: {booking.Spot.name}</h3>
              <p> Dates: {booking.startDate}  TO  {booking.endDate}</p>
            </div>
          ))}
        </div>
      )
    }

    return (
      <>
        <form onSubmit={handleSubmit} >
          <h2> {formType} </h2>
          <label>
            StartDate
            <input
              type="text"
              value={startDate}
              onChange={e => setStartDate(e.target.value)}
              placeholder= 'start date'
            />
          </label>
          <label>
            endDate
            <textarea
              value={endDate}
              onChange={e => setEndDate(e.target.value)}
              placeholder='end date'
            />
          </label>

          <input type="submit" value={formType} />
        </form>
        <h2> All Bookings You Created: </h2>
        <div>
          {allBookings && renderedBookings}
        </div>
      </>
    )
}

export default BookingForm
