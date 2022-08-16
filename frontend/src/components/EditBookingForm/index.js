import BookingForm from "../BookingForm";
import { useParams } from "react-router-dom";
import React from "react";
import {useDispatch, useSelector} from "react-redux"

const EditBookingForm = () => {
    // bookings is an object
    const {bookingId} = useParams();
    const dispatch = useDispatch();
    const bookings = useSelector(state=> state.bookings);
    const booking = bookings[bookingId]

    // const spotObj = useSelector(state=>state.spots)
    // let spot = spotObj[spotId]
    // you will have spotID from spot prop here
    // it is not used for CREATE
    return (
        <BookingForm booking={booking} formType={'Edit Booking'} bookings={bookings}/>
    )
}

export default EditBookingForm
