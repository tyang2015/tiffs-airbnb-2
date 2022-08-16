import React from "react"
import {useDispatch, useSelector} from "react-redux"
import BookingForm from "../BookingForm"
import {useParams} from 'react-router-dom'
import { getBookings } from "../../store/booking";
import { useEffect } from "react";


const CreateBookingForm = ({spots}) => {
  const {spotId} = useParams();
  const dispatch = useDispatch();
  const bookings = useSelector(state=>state.bookings)

  useEffect(()=>{
  dispatch(getBookings())
  }, [dispatch])

  const booking = {
    startDate: '',
    endDate: ''
  }
  const spot = spots[spotId]

  return (
    <BookingForm booking={booking} spots={spots} formType={'Create Booking'} bookings={bookings} spot={spot}/>
  )

}

export default CreateBookingForm
