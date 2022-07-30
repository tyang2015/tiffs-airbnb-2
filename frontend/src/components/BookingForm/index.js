import React from "react"
import {useParams, useHistory} from "react-router-dom"
import {useState, useEffect} from "react"
import {useDispatch} from "react-redux"
import { createBooking, editBooking } from "../../store/booking"
import './BookingForm.css'


const BookingForm = ({bookings, formType, booking, spots})=> {
  // it will be valid or undefined bc edit form does not have spotId in url
  // that is ok
    console.log('bookings in edit form:', bookings)
    const {spotId, bookingId} = useParams();

    const dispatch = useDispatch();
    // number strings can be compared
    const [startDate, setStartDate] = useState(new Date())
    const [endDate, setEndDate] = useState(new Date());
    const [validationErrors, setValidationErrors] = useState('');
    const [hasSubmitted, setHasSubmitted] = useState(false)
    // this belongs to a user
    const allBookings = Object.values(bookings)
    let spotBookings;
    // let spotBookingsForEdit;
    if (formType==='Create Booking'){
      spotBookings = allBookings.filter(booking=> booking.spotId === Number(spotId))
    } else {
      spotBookings = allBookings.filter(booking=> booking.spotId === Number(bookingId))
    }
    console.log('spot bookings for current spot:', spotBookings)
    const firstSpotBooking = spotBookings[0]
    // console.log('first spot booking:', firstSpotBooking)


    let existingStartDates = allBookings.map(booking=> {
      if (booking.spotId === Number(spotId)) return booking.startDate
    })
    let existingEndDates = allBookings.map(booking=>{
      if (booking.spotId=== Number(spotId)) return booking.endDate
    })

    // console.log('allBookings in booking form:', allBookings)
    // console.log('spot booking:', spotBooking)

    useEffect(()=>{
      let errs=[]
      if (!startDate) errs.push("Please enter valid start date")
      if (!endDate) errs.push("Please enter valid end date")
      if (endDate< startDate) errs.push("End date must come after start date")
      if (existingStartDates.includes(startDate)) errs.push("Start date already exists for spot")
      if (existingEndDates.includes(endDate)) errs.push("End date already exists for spot")
      setValidationErrors(errs)

    }, [startDate, endDate])


    const handleSubmit = async (e)=>{
        e.preventDefault();
        setHasSubmitted(true)
        console.log('starting dates in db:', existingStartDates)
        // booking will have id already for Edit
        if (validationErrors.length>0){
          alert("Cannot submit bookings form")
          return
        }

        booking = {
          ...booking,
          startDate,
          endDate
        }

        if (formType==='Create Booking'){
          let bookingCreated = await dispatch(createBooking(spotId, booking))
          alert('Thanks for booking!')
          setHasSubmitted(false)
        } else{
          let bookingUpdated = await dispatch(editBooking(booking.id, booking))
          alert('Your booking has been rescheduled!')
          setHasSubmitted(false)
        }
    }
    // if its EDIT FORM or CREATE FORM and we got back the data already
    // if (bookingUpdated || bookingCreated){
    //   renderedBookings = (
    //     <div>
    //       {allBookings.map(booking =>(
    //         <div key={booking.id}>
    //           <h3>Booking {booking.id}: {booking.Spot.name}</h3>
    //           <p> Dates: {booking.startDate}  TO  {booking.endDate}</p>
    //         </div>
    //       ))}
    //     </div>
    //   )
    // }

    return (
      <>
      {hasSubmitted && validationErrors.length>0 && (
        <div>
          The following errors were found:
          <ul className='validation-errors'>
            {validationErrors.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        </div>
      )}
      <div className='spot-bookings-main-container'>
        <div className='images-container'>
          <div className="top-row-image-container">
            {firstSpotBooking && <img src={`${firstSpotBooking.Spot.previewImage}`} style={{borderRadius:'0'}}/>}
          </div>
          <div className="bottom-row-image-container">
            {firstSpotBooking && <img className={`bottom-image`} src={`${firstSpotBooking.Spot.previewImage}`}/>}
            {firstSpotBooking && <img className={`bottom-image`} src={`${firstSpotBooking.Spot.previewImage}`}/>}
          </div>
        </div>
        <div>
          <form onSubmit={handleSubmit} >
            <fieldset>
              <h2> {formType} </h2>
                <div className= 'booking-input-container'>
                  <div className="form-group first booking">
                    <input
                      type="date"
                      value={startDate}
                      onChange={e => setStartDate(e.target.value)}
                      placeholder= 'start date'
                      className='form-control booking'
                    style={{width: '150px'}}
                    />
                  </div>
                  <div className="form-group last booking">
                      <input
                        type="date"
                        value={endDate}
                        onChange={e => setEndDate(e.target.value)}
                        placeholder='end date'
                        className='form-control booking'
                        style={{width: '150px'}}
                      />
                  </div>
                </div>
              <input type="submit" value={formType} className='submit-button'/>
            </fieldset>
          </form>
        </div>

      </div>

        {/* <h2> All Bookings You Created: </h2>
        <div>
          {allBookings && allBookings.map(booking =>(
            <div key={booking.id}>
               <h3>Booking {booking.id}: {booking.Spot.name}</h3>
               <p> Dates: {booking.startDate}  TO  {booking.endDate}</p>
            </div>
           ))}
        </div> */}
      </>
    )
}

export default BookingForm
