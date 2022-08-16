import React from "react"
import {useParams, useHistory} from "react-router-dom"
import {useState, useEffect} from "react"
import {useDispatch, useSelector} from "react-redux"
import { createBooking, editBooking } from "../../store/booking"
import './BookingForm.css'


const BookingForm = ({bookings, formType, booking})=> {
  // it will be valid or undefined bc edit form does not have spotId in url
  // that is ok
    const {spotId, bookingId} = useParams();
    const sessionUser = useSelector(state => state.session.user);

    const dispatch = useDispatch();
    // number strings can be compared
    // CHANGE HERE
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [validationErrors, setValidationErrors] = useState([]);
    const [hasSubmitted, setHasSubmitted] = useState(false)
    const allBookings = Object.values(bookings)

    let spotBookings;
    if (formType==='Create Booking'){
      spotBookings = allBookings.filter(booking=> booking.spotId === Number(spotId))
    } else {
      spotBookings = allBookings.filter(booking=> booking.spotId === Number(bookingId))
    }
    const firstSpotBooking = spotBookings[0]

    let existingStartDates = []
    let existingEndDates = []
    allBookings.forEach(booking=>{
      if (booking.spotId == Number(spotId)){
        // manipulate start date here
        let startDate = new Date(booking.startDate)
        let endDate = new Date(booking.endDate)

        // let startDateString = new Date(startDate.getTime()-(startDate.getTimezoneOffset()*60000)).toISOString().split("T")[0]
        // let endDateString = new Date(endDate.getTime()-(endDate.getTimezoneOffset()*60000)).toISOString().split("T")[0]

        let startDateObj = new Date(startDate.getTime()-(startDate.getTimezoneOffset()*60000))

        let endDateObj = new Date(endDate.getTime()-(endDate.getTimezoneOffset()*60000))

        startDateObj.setDate(startDateObj.getDate()+1)
        endDateObj.setDate(endDateObj.getDate()+1)

        let finalStart = startDateObj.toISOString().split("T")[0]
        let finalEnd = endDateObj.toISOString().split("T")[0]

        // existingStartDates.push(startDateString)
        // existingEndDates.push(endDateString)
        existingStartDates.push(finalStart)
        existingEndDates.push(finalEnd)
      }
    })

    // let existingStartDates = allBookings.map(booking=> {
    //   if (booking.spotId === Number(spotId)) return booking.startDate
    // })
    // let existingEndDates = allBookings.map(booking=>{
    //   if (booking.spotId=== Number(spotId)) return booking.endDate
    // })
    console.log("start dates before submit:", existingStartDates)
    console.log("end dates before submit:", existingEndDates)

    useEffect(()=>{
      let errs=[]
      if (!startDate) errs.push("Please enter valid start date")
      if (!endDate) errs.push("Please enter valid end date")
      if (endDate< startDate) errs.push("endDate cannot come before startDate")
      if (existingStartDates.includes(startDate)) errs.push("Start date conflicts with an existing booking")
      if (existingEndDates.includes(endDate)) errs.push("End date conflicts with an existing booking")
      setValidationErrors(errs)

    }, [startDate, endDate])


    const handleSubmit = async (e)=>{
        e.preventDefault();
        setHasSubmitted(true)

        // if (sessionUser.id ===spot.ownerId){
        //   alert("Cannot book if you are the owner")
        //   return
        // }
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
          let bookingCreated = dispatch(createBooking(spotId, booking))
          // existingStartDates.push(startDate)
          // existingEndDates.push(endDate)
          // console.log('start date after successful create:', existingStartDates)
          // console.log('end date after successful create:', existingEndDates)
          setStartDate('')
          setEndDate('')
          alert('Thanks for booking!')
          setHasSubmitted(false)
          return
        } else{
          let bookingUpdated = dispatch(editBooking(booking.id, booking))
          alert('Your booking has been rescheduled!')
          setHasSubmitted(false)
          return
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
