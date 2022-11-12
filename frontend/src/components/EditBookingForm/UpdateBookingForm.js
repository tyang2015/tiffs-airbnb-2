import React from "react"
import {useParams, useHistory} from "react-router-dom"
import {useState, useEffect} from "react"
import {useDispatch, useSelector} from "react-redux"
import { createBooking, editBooking, getSpotBookings } from "../../store/booking"
import { getSpots } from "../../store/spot"
import Calendar from 'react-calendar';
import "./EditBookingForm.css"
import SpotBookings from "../SpotBookings"

const UpdateBookingForm = ({booking, bookings, spot, formType}) => {
  const history = useHistory()
  const dispatch = useDispatch();
  console.log("SPOT in booking form:", spot)

  const {spotId, bookingId} = useParams();
  const sessionUser = useSelector(state => state.session.user);
  const [date,setDate ] = useState(new Date())
  const [validationErrors, setValidationErrors] = useState([]);
  const [hasSubmitted, setHasSubmitted] = useState(false)
  // const bookings = useSelector(state=> Object.values(state.bookings))
  const spots = useSelector(state => state.spots)
  // const spot = spots[spotId]

  useEffect(()=>{
    let errs=[]
    let today = new Date();
    let actualStartDate = new Date(date[0])
    actualStartDate.setDate(actualStartDate.getDate()+1)
    // if (actualStartDate<today) errs.push("Start date cannot be in the past")
    if (!date.length && !date[0]) errs.push("Please enter valid start date")
    if (!date.length && !date[1]) errs.push("Please enter valid end date")
    if (sessionUser && spot && sessionUser.id == spot.ownerId) errs.push("Unauthorized: You cannot book your own spot")
    if (date[1] < date[0]) errs.push("End date cannot come before start date")
    if (!validDates()) errs.push("Dates coincide with existing bookings, please select other dates.")
    setValidationErrors(errs)

  }, [date])

  useEffect(()=> {
    dispatch(getSpots())
  }, [dispatch])

  const convertDateToLocal = (dateStr) => {
    let dateObj = new Date(dateStr)
    dateObj.setDate(dateObj.getDate() + 1)
    return dateObj
  }

  const calcTotalPrice = (spotPrice) => {
    return Math.round(spotPrice * calcNightsBooked(), 2)
  }

  const convertIntoComparableDates = (dateObj) => {
    // dateObj.setHours(0,0,0,0)
    const offset = dateObj.getTimezoneOffset()
    dateObj = new Date(dateObj.getTime() - (offset*60*1000))
    return dateObj.toISOString().split('T')[0]
  }

  const calcNightsBooked = () => {
    if (date.length>0){
      let newStart = new Date(date[0])
      let newEnd = new Date(date[1])
      let timeDiff= Math.ceil(((newStart.getTime() - newEnd.getTime()) / (1000 * 3600 * 24)))
      return Math.abs(timeDiff)
    } else {
      return null
    }
  }

  const validDates = () => {
    if (bookings.length>0){
      let chosenStart;
      let chosenEnd;
      for (let i =0 ; i<bookings.length; i++) {
        let booking = bookings[i]
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
  }

  if (date.length){
    console.log(validDates())
  }
  const convertDateInDisplay = (dateObj) => {
    let finalDate = dateObj.toLocaleString('en-US', {
      month: "numeric",
      day: 'numeric',
      year: "numeric",
    })
    return finalDate
  }

  // const convertCheckOutDateDisplay = () => {
  //   let endingDate = date[1].toLocaleString('en-US', {
  //     month: "numeric",
  //     day: 'numeric',
  //     year: "numeric",
  //   })
  //   return endingDate
  // }

  const formatDate = (dateStr) => {
    let dateObj = new Date(dateStr)
    dateObj.setDate(dateObj.getDate()+1)
    let finalDate = dateObj.toLocaleString('en-US', {
      month: "long",
      day: 'numeric',
      year: "numeric",
    })
    return finalDate
  }

  const handleSubmit = (e) => {
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

    dispatch(editBooking(booking.id, booking))
    alert("Your booking has been rescheduled!")
    setHasSubmitted(false)
    history.push('/users/bookings')
    return
  }

  if (date.length){
    console.log("Valid dates? ", validDates())
  }

  // const handleBookingSubmit = () => {
  //   if (!sessionUser) {
  //     alert("Please login first to book a spot")
  //   }
  // }

  return (
    <div className="update-bookings-main-outer-container">
        {spot && (<div className="update-bookings-title-container"> Update Form for Spot {spot.name}</div>)}
        {booking && (<div className="original-booking-date-container">Original booking dates: {formatDate(booking.startDate)} to {formatDate(booking.endDate)}</div>)}
        {hasSubmitted && validationErrors.length>0 && (
          <div>
            <ul className='validation-errors'>
              {validationErrors.map((error) => (
                <li key={error}>{error}</li>
              ))}
            </ul>
          </div>
        )}
      <div className="update-bookings-main-container">
        {/* <div className="update-bookings-booking-container"> */}
        <Calendar
          style={{margin:"auto"}}
          onChange={setDate}
          value={date}
          selectRange={true}
          showDoubleView={true}
          view="month"
          className="calendar"
          minDate={new Date()}
          tileClassName={({date,view})=>{
            // if (view === 'month' && date.getDay() === 3) return 'booked'
            // else return null
            bookings.map(booking =>{
              let exStartDate = convertIntoComparableDates(new Date(booking.startDate))
              let exEndDate = convertIntoComparableDates(new Date(booking.endDate))
              let calendarDate = convertIntoComparableDates(new Date(date))
              // console.log("calendar date:", calendarDate)
              if ((calendarDate>= exStartDate && calendarDate<= exEndDate)){
                console.log("calendar date is booked")
                return "booked-date"
              } else return "normal-date"
            })
          }}
        />
          <div className="spot-detail-container-2 update-booking-container">
            <div className="top-third-container">
                {spot && (
                  <>
                    <div> <b style={{fontSize: '24px'}}>${spot.price}</b> night</div>
                    <div className="star-rating-reviews-container">
                        <div className="star-rating-container">
                            <i class="fa-solid fa-star"></i>
                            <p> {spot.avgStarRating==='NaN'? "New": spot.avgStarRating}</p>
                        </div>
                    </div>
                  </>
                )}
            </div>
            <form onSubmit={handleSubmit}>
              <div className="second-third-container">
                <div className="spot-middle-container-top-row">
                  <div className='spot-booking-input'>
                      <div>check in</div>
                      {date.length>0 && (<div className="checkin-box">{convertDateInDisplay(date[0])} </div>)}
                      {!date.length && (<div className="checkin-box"> </div>)}
                  </div>
                  <div className='spot-booking-input' >
                      <div>check out</div>
                      {date.length>0 && (<div className="checkout-box">{convertDateInDisplay(date[1])} </div>)}
                      {!date.length && (<div className="checkout-box"> </div>)}
                  </div>
                </div>
              </div>
              <div className="'last-third-container">
                  <button type="submit" className="reserve-submit-button">
                      Reserve
                  </button>
              </div>
            </form>
            {/* <div style={{height: "3em", display: "flex", alignItems: 'center', justifyContent: "center"}}>
              You won't be charged yet
            </div> */}
            <div className="get-spot-price-breakdown-container">
              <div className="get-spot-price-breakdown-first-row price-row">
                {spot && (<div className="price-breakdown-label">${spot.price}x {calcNightsBooked()} nights</div>)}
                {spot && (<div>${calcTotalPrice(spot.price)}</div>)}
              </div>
              <div className="get-spot-price-breakdown-second-row price-row">
                <div className="price-breakdown-label">Cleaning fee</div>
                <div>$90</div>
              </div>
              <div className="get-spot-price-breakdown-third-row price-row">
                <div className="price-breakdown-label">Service fee</div>
                <div>$325</div>
              </div>
            </div>
            <div className='get-spot-price-breakdown-total-container'>
              <div>Total before taxes</div>
              {spot && (<div>${90 + 325 + calcTotalPrice(spot.price)}</div>)}
            </div>
          </div>
        </div>
      {/* </div> */}
    </div>

  )

}

export default UpdateBookingForm
