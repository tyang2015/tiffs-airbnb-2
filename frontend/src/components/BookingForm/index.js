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
    const convertIntoComparableDates = (dateObj) => {
      // dateObj.setHours(0,0,0,0)
      const offset = dateObj.getTimezoneOffset()
      dateObj = new Date(dateObj.getTime() - (offset*60*1000))
      return dateObj.toISOString().split('T')[0]
    }

    const validDates = () => {
      if (allBookings.length>0){
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
          console.log("ex start date:", exStartDate)
          console.log("ex end date:", exEndDate)
          console.log("chosen start:", chosenStart)
          console.log("chosen end:", chosenEnd)
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

      // // returns last 2 digits
      // let startMonth;
      // let startDay;
      // let endMonth;
      // let endDay;
      // if (date[0].getMonth() < 10){
      //   startMonth = `0`+ String(date[0].getMonth())
      // } else startMonth = String(date[0].getMonth())
      // if (date[0].getDate() < 10){
      //   startDay = `0`+ String(date[0].getDate())
      // } else startDay = String(date[0].getDate())
      // if (date[1].getMonth() < 10){
      //   endMonth = `0`+ String(date[1].getMonth())
      // } else endMonth = String(date[1].getMonth())
      // if (date[1].getDate() < 10){
      //   endDay = `0`+ String(date[1].getDate())
      // } else endDay = String(date[1].getDate())



      // const startDateInput = String(date[0].getYear()) + startMonth + startDay
      // const endDateInput = String(date[1].getYear()) + endMonth + endDay

      // for (let bookingId in bookings){
      //   let startMonth;
      //   let startDay;
      //   let endMonth;
      //   let endDay;

      //   let exStartDate = new Date(bookings[bookingId].startDate)
      //   let exEndDate = new Date(bookings[bookingId].endDate)
      //   exStartDate.setDate(exStartDate.getDate() + 1)
      //   exEndDate.setDate(exEndDate.getDate() + 1)

      //   if (exStartDate.getMonth() < 10){
      //     startMonth = `0`+ String(exStartDate.getMonth())
      //   } else startMonth = String(exStartDate.getMonth())
      //   if (exStartDate.getDate() < 10){
      //     startDay = `0`+ String(exStartDate.getDate())
      //   } else startDay = String(exStartDate.getDate())
      //   if (exEndDate.getMonth() < 10){
      //     endMonth = `0`+ String(exEndDate.getMonth())
      //   } else endMonth = String(exEndDate.getMonth())
      //   if (exEndDate.getDate() < 10){
      //     endDay = `0`+ String(exEndDate.getDate())
      //   } else endDay = String(exEndDate.getDate())

      //   const newStartDate = String(exStartDate.getYear()) + startMonth + startDay
      //   const newEndDate = String(exEndDate.getYear()) + endMonth + endDay

      //   console.log("existing start:", newStartDate)
      //   console.log("existing end:", newEndDate)
      //   console.log("your start date:", startDateInput)
      //   console.log("your end date:", endDateInput)

      //   if ((startDateInput >= newStartDate && startDateInput<= newEndDate) || (
      //     endDateInput >= newStartDate && endDateInput <= newEndDate
      //   )) {
      //     return false
      //   } else return true
      // }
    }

    // console.log('dates:', date)
    if (date.length){
      console.log("VALID DATES?---------", validDates())
    }

    useEffect(()=>{
      let errs=[]
      let today = new Date();
      // let actualStartDate = new Date(startDate)
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
      // if (existingStartDates.includes(startDate)) errs.push("Start date conflicts with an existing booking")
      // if (existingEndDates.includes(endDate)) errs.push("End date conflicts with an existing booking")
      setValidationErrors(errs)

    }, [date])

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
          startDate: convertIntoComparableDates(date[0]) ,
          endDate: convertIntoComparableDates(date[1])
        }

        console.log("BOOKING OBJ::", booking)

        if (formType==='Create Booking'){
          let bookingCreated = dispatch(createBooking(spotId, booking))
          // existingStartDates.push(startDate)
          // existingEndDates.push(endDate)
          // console.log('start date after successful create:', existingStartDates)
          // console.log('end date after successful create:', existingEndDates)
          // setStartDate('')
          // setEndDate('')
          alert('Thanks for booking!')
          setHasSubmitted(false)
          history.push('/users/bookings')
          return
        }
        // else{
        //   let bookingUpdated = dispatch(editBooking(booking.id, booking))
        //   alert('Your booking has been rescheduled!')
        //   setHasSubmitted(false)
        //   history.push('/users/bookings')
        //   return
        // }
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
          The following errors were found:
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
