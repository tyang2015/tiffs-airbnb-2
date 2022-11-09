import React from "react"
import {useParams, useHistory} from "react-router-dom"
import {useState, useEffect} from "react"
import {useDispatch, useSelector} from "react-redux"
import { createBooking, editBooking } from "../../store/booking"
import './BookingForm.css'


const BookingForm = ({ date, bookings, formType, booking, spot})=> {
  // it will be valid or undefined bc edit form does not have spotId in url
  // that is ok
  // console.log('spot:', spot)
    const history = useHistory()
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
        let startDateObj = new Date(startDate.getTime()-(startDate.getTimezoneOffset()*60000))
        let endDateObj = new Date(endDate.getTime()-(endDate.getTimezoneOffset()*60000))

        startDateObj.setDate(startDateObj.getDate()+1)
        endDateObj.setDate(endDateObj.getDate()+1)

        let finalStart = startDateObj.toISOString().split("T")[0]
        let finalEnd = endDateObj.toISOString().split("T")[0]

        existingStartDates.push(finalStart)
        existingEndDates.push(finalEnd)
      }
    })

    console.log("start dates before submit:", existingStartDates)
    console.log("end dates before submit:", existingEndDates)

    const validDates = () => {
      // returns last 2 digits
      let startMonth;
      let startDay;
      let endMonth;
      let endDay;
      if (date[0].getMonth() < 10){
        startMonth = `0`+ String(date[0].getMonth())
      } else startMonth = String(date[0].getMonth())
      if (date[0].getDate() < 10){
        startDay = `0`+ String(date[0].getDate())
      } else startDay = String(date[0].getDate())
      if (date[1].getMonth() < 10){
        endMonth = `0`+ String(date[1].getMonth())
      } else endMonth = String(date[1].getMonth())
      if (date[1].getDate() < 10){
        endDay = `0`+ String(date[1].getDate())
      } else endDay = String(date[1].getDate())



      const startDateInput = String(date[0].getYear()) + startMonth + startDay
      const endDateInput = String(date[1].getYear()) + endMonth + endDay

      for (let bookingId in bookings){
        let startMonth;
        let startDay;
        let endMonth;
        let endDay;

        let exStartDate = new Date(bookings[bookingId].startDate)
        let exEndDate = new Date(bookings[bookingId].endDate)
        exStartDate.setDate(exStartDate.getDate() + 1)
        exEndDate.setDate(exEndDate.getDate() + 1)

        if (exStartDate.getMonth() < 10){
          startMonth = `0`+ String(exStartDate.getMonth())
        } else startMonth = String(exStartDate.getMonth())
        if (exStartDate.getDate() < 10){
          startDay = `0`+ String(exStartDate.getDate())
        } else startDay = String(exStartDate.getDate())
        if (exEndDate.getMonth() < 10){
          endMonth = `0`+ String(exEndDate.getMonth())
        } else endMonth = String(exEndDate.getMonth())
        if (exEndDate.getDate() < 10){
          endDay = `0`+ String(exEndDate.getDate())
        } else endDay = String(exEndDate.getDate())

        const newStartDate = String(exStartDate.getYear()) + startMonth + startDay
        const newEndDate = String(exEndDate.getYear()) + endMonth + endDay

        console.log("existing start:", newStartDate)
        console.log("existing end:", newEndDate)
        console.log("your start date:", startDateInput)
        console.log("your end date:", endDateInput)

        if ((startDateInput >= newStartDate && startDateInput<= newEndDate) || (
          endDateInput >= newStartDate && endDateInput <= newEndDate
        )) {
          return false
        } else return true
      }
    }

    if(date.length>0){
      console.log("VALID DATES?---------", validDates())
    }

    useEffect(()=>{
      let errs=[]
      let today = new Date();
      let actualStartDate = new Date(startDate)
      actualStartDate.setDate(actualStartDate.getDate()+1)
      if (actualStartDate<today) errs.push("Start date cannot be in the past")
      // console.log('today:..', today)
      // console.log('start date...', startDate)
      if (!startDate) errs.push("Please enter valid start date")
      if (!endDate) errs.push("Please enter valid end date")
      if (endDate< startDate) errs.push("endDate cannot come before startDate")
      if (existingStartDates.includes(startDate)) errs.push("Start date conflicts with an existing booking")
      if (existingEndDates.includes(endDate)) errs.push("End date conflicts with an existing booking")
      setValidationErrors(errs)

    }, [startDate, endDate])

    const convertCheckInDateDisplay = () => {
      let startingDate = date[0].toLocaleString('en-US', {
        month: "numeric",
        day: 'numeric',
        year: "numeric",
      })
      // let endingDate = date[1].toLocaleString('en-US', {
      //   month: "numeric",
      //   day: 'numeric',
      //   year: "numeric",
      // })
      return startingDate
    }

    const convertCheckOutDateDisplay = () => {
      let endingDate = date[1].toLocaleString('en-US', {
        month: "numeric",
        day: 'numeric',
        year: "numeric",
      })
      return endingDate
    }


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
        // console.log('booking...:',booking)

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
          history.push('/users/bookings')
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
      <div className="spot-middle-container-top-row">
        <div className='spot-booking-input'>
            <div>check in</div>
            {date.length>0 && (<div className="checkin-box">{convertCheckInDateDisplay()} </div>)}
            {!date.length && (<div className="checkin-box"> </div>)}
        </div>
        <div className='spot-booking-input' >
            <div>check out</div>
            {date.length>0 && (<div className="checkout-box">{convertCheckOutDateDisplay()} </div>)}
            {!date.length && (<div className="checkout-box"> </div>)}
        </div>
      </div>
    )

    // return (
    //   <>
    //   {hasSubmitted && validationErrors.length>0 && (
    //     <div>
    //       The following errors were found:
    //       <ul className='validation-errors'>
    //         {validationErrors.map((error) => (
    //           <li key={error}>{error}</li>
    //         ))}
    //       </ul>
    //     </div>
    //   )}
    //   <div className='spot-bookings-main-container'>
    //     <div className='images-container'>
    //       {spot && (<img className="spot-booking-image" src={`${spot.previewImage}`} style={{borderRadius:'0'}}/>)}
    //     </div>
    //     <div className="booking-form-container" >
    //       <form onSubmit={handleSubmit} style={{height:'380px'}}>
    //         <fieldset style={{height: '100%'}}>
    //           <h2> {formType} </h2>
    //             <div >
    //               <div className="form-group first">
    //                 <input
    //                   type="date"
    //                   value={startDate}
    //                   onChange={e => setStartDate(e.target.value)}
    //                   placeholder= 'start date'
    //                   className='form-control booking'
    //                 style={{width: '150px'}}
    //                 />
    //               </div>
    //               <div className="form-group last">
    //                   <input
    //                     type="date"
    //                     value={endDate}
    //                     onChange={e => setEndDate(e.target.value)}
    //                     placeholder='end date'
    //                     className='form-control booking'
    //                     style={{width: '150px'}}
    //                   />
    //               </div>
    //             </div>
    //           <input type="submit" value={formType} className='submit-button'/>
    //         </fieldset>
    //       </form>
    //     </div>
    //   </div>
    //   </>
    // )
}

export default BookingForm
