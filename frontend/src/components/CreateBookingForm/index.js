import React from "react"
import {useDispatch} from "react-redux"
import BookingForm from "../BookingForm"
import {useParams} from 'react-router-dom'



const CreateBookingForm = ({bookings, spots}) => {
  const {spotId} = useParams();
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
  const spot = spots[spotId]

  return (
    <BookingForm booking={booking} spots={spots} formType={'Create Booking'} bookings={bookings} spot={spot}/>
  )

}

export default CreateBookingForm
