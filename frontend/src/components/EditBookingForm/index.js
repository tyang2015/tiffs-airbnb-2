import BookingForm from "../BookingForm";
import { useParams } from "react-router-dom";
import React from "react"

const EditBookingForm = ({bookings}) => {
    // bookings is an object
    const {bookingId} = useParams();
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
