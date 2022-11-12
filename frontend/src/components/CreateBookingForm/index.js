import React from "react"
import {useDispatch, useSelector} from "react-redux"
import BookingForm from "../BookingForm"
import {useParams} from 'react-router-dom'
import { getBookings, getSpotBookings } from "../../store/booking";
import { useEffect } from "react";


const CreateBookingForm = ({spots, date}) => {
  const {spotId} = useParams();
  const dispatch = useDispatch();
  const bookings = useSelector(state=>state.bookings)

  useEffect(()=>{
    dispatch(getSpotBookings(Number(spotId)))
  }, [dispatch])

  const booking = {
    startDate: '',
    endDate: ''
  }
  const spot = spots[spotId]
  // console.log('spot in bookings:', spot)
  // console.log("Bookings:::", bookings)
  return (
    <BookingForm date={date} booking={booking} formType={'Create Booking'} bookings={bookings} spot={spot}/>
  )

}

export default CreateBookingForm
