import React from "react"
// import {useDispatch} from "react-redux"
import BookingForm from "../BookingForm"


const CreateBookingForm = ({bookings}) => {
  const booking = {
    // address: '',
    // city: '',
    // state: '',
    // country: '',
    // lat: 1,
    // lng: 1,
    // name: '',
    // description:'',
    // price: 1
    startDate: '',
    endDate: ''
  }

  return (
    <BookingForm booking={booking} formType={'Create Booking'} bookings={bookings}/>
  )

}

export default CreateBookingForm
