// import BookingForm from "../BookingForm";
import { useParams } from "react-router-dom";
import React, {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux"
import { getSpotBookings } from "../../store/booking";
import { getSpots } from "../../store/spot";
import UpdateBookingForm from "./UpdateBookingForm";

const EditBookingForm = () => {
    // bookings is an object
    const {spotId, bookingId} = useParams();
    const dispatch = useDispatch();
    const bookings = useSelector(state=> state.bookings);
    const booking = bookings[bookingId]
    const allBookings = Object.values(bookings)
    const spots = useSelector(state => state.spots)
    const spot = spots[spotId]

    useEffect(()=> {
      dispatch(getSpots())
    }, [dispatch])

    useEffect(()=>{
        dispatch(getSpotBookings(spotId))
    }, [dispatch])

    // const spotObj = useSelector(state=>state.spots)
    // let spot = spotObj[spotId]
    // you will have spotID from spot prop here
    // it is not used for CREATE
    return (
        <UpdateBookingForm booking={booking} formType={'Edit Booking'} bookings={allBookings} spot={spot}/>
    )
}

export default EditBookingForm
