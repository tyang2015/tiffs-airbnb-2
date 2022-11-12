import React from "react"
import {useParams, useHistory} from "react-router-dom"
import {useState, useEffect} from "react"
import {useDispatch, useSelector} from "react-redux"
import { createBooking } from "../../store/booking"
import './BookingForm.css'


const BookingForm = ({ date, bookings, formType, booking, spot})=> {
  // it will be valid or undefined bc edit form does not have spotId in url
  // that is ok
  // console.log('spot:', spot)
  console.log("DATES clicked inside booking:", date)
    const history = useHistory()
    const {spotId, bookingId} = useParams();
    const sessionUser = useSelector(state => state.session.user);

    const dispatch = useDispatch();
    // number strings can be compared
    // CHANGE HERE
    const [validationErrors, setValidationErrors] = useState([]);
    const [hasSubmitted, setHasSubmitted] = useState(false)
    const allBookings = Object.values(bookings)

    let spotBookings;
    if (formType==='Create Booking'){
      spotBookings = allBookings.filter(booking=> booking.spotId === Number(spotId))
    } else {
      spotBookings = allBookings.filter(booking=> booking.spotId === Number(bookingId))
    }

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

    // console.log("start dates before submit:", existingStartDates)
    // console.log("end dates before submit:", existingEndDates)

    const convertIntoComparableDates = (dateObj) => {
      const offset = dateObj.getTimezoneOffset()
      dateObj = new Date(dateObj.getTime() - (offset*60*1000))
      return dateObj.toISOString().split('T')[0]
    }

    const validDates = () => {
      if (allBookings.length ==0) return true
      let chosenStart;
      let chosenEnd;
      for (let i =0 ; i<allBookings.length; i++) {
        let booking = allBookings[i]
        let startDate = new Date(booking.startDate)
        let endDate = new Date(booking.endDate)
        startDate.setDate(startDate.getDate()+1)
        endDate.setDate(endDate.getDate()+1)
        let exStartDate = convertIntoComparableDates(startDate)
        let exEndDate = convertIntoComparableDates(endDate)
        if (date.length){
          chosenStart = convertIntoComparableDates(new Date(date[0]))
          chosenEnd = convertIntoComparableDates(new Date(date[1]))
        }
        // console.log("ex start date:", exStartDate)
        // console.log("ex end date:", exEndDate)
        // console.log("chosen start:", chosenStart)
        // console.log("chosen end:", chosenEnd)
        // CASE 1, CASE2, CASE3
        if ((chosenStart>= exStartDate && chosenStart<= exEndDate) || (
          chosenEnd>= exStartDate && chosenEnd<= exEndDate
        )) return false
        // CASE4
        if (chosenStart <= exStartDate && chosenEnd >= exEndDate) {
          return false
        }
      }
      return true

    }

    // console.log('dates:', date)
    if (date.length && date.length>1){
      console.log("VALID DATES?---------", validDates())
    }

    useEffect(()=>{
      let errs=[]
      let today = new Date();
      let actualStartDate = new Date(date[0])
      actualStartDate.setDate(actualStartDate.getDate()+1)
      // console.log("ACTUAL START DATE:", actualStartDate)
      if (actualStartDate<today) errs.push("Start date cannot be in the past")
      if (!date.length && !date[0]) errs.push("Please enter valid start date")
      if (!date.length && !date[1]) errs.push("Please enter valid end date")
      if (sessionUser && sessionUser.id == spot.ownerId) errs.push("Unauthorized: You cannot book your own spot")
      // if (endDate< startDate) errs.push("endDate cannot come before startDate")
      if (date[1] < date[0]) errs.push("End date cannot come before start date")
      if (!validDates()) errs.push("Dates coincide with existing bookings, please select other dates.")
      setValidationErrors(errs)

    }, [date])

    const convertCheckInDateDisplay = () => {
      let startingDate = date[0].toLocaleString('en-US', {
        month: "numeric",
        day: 'numeric',
        year: "numeric",
      })

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
        if (!sessionUser) {
          alert("Please login to book a spot")
          return
        }

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
          startDate: convertIntoComparableDates(date[0]) ,
          endDate: convertIntoComparableDates(date[1])
        }

        console.log("BOOKING OBJ::", booking)

        if (formType==='Create Booking'){
          let bookingCreated = dispatch(createBooking(spotId, booking))

          alert('Thanks for booking!')
          setHasSubmitted(false)
          history.push('/users/bookings')
          return
        }
    }

    return (
      <form onSubmit={handleSubmit}>
        <div className="second-third-container">
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
        </div>
        {hasSubmitted && validationErrors.length>0 && (
        <div>
          <ul className='validation-errors'>
            {validationErrors.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        </div>
        )}
        <div className="'last-third-container">
            <button type="submit" className="reserve-submit-button">
                Reserve
            </button>
        </div>
      </form>
    )

}

export default BookingForm
