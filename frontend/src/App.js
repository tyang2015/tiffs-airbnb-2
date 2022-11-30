import LoginFormPage from "./components/LoginFormPage"
import {Switch, Route} from "react-router-dom"
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux"
import * as sessionActions from "./store/session";
import SignupFormPage from "./components/SignupFormPage/index";
import Navigation from "./components/Navigation";
import Spots from './components/Spots'
import GetSpot from './components/GetSpot'
import { getSpots } from "./store/spot";
import { getBookings } from "./store/booking";
import EditSpotForm from "./components/EditSpotForm"
import UserBookings from "./components/UserBookings";
import SpotBookings from "./components/SpotBookings";
import CreateBookingForm from "./components/CreateBookingForm";
import EditBookingForm from "./components/EditBookingForm";
import CreateReviewForm from "./components/CreateReviewForm";
import EditReviewForm from "./components/EditReviewForm";
import CreateSpotImages from "./components/CreateSpotImages";
import UpdateSpotImage from "./components/UpdateSpotImage";

function App() {
  const dispatch = useDispatch();
  // // array form
  // let spots = useSelector(state=> Object.values(state.spots))
  // // object form
  const spots = useSelector(state=> state.spots)

  const [isLoaded,setIsLoaded] = useState(false);
  useEffect(()=>{
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch])

  // moved down here after user is restored
  // const bookings = useSelector(state=>state.bookings)

    // load all spots
    useEffect(()=>{
      dispatch(getSpots())
    }, [dispatch])

    // // load all bookings
    // useEffect(()=>{
    //   dispatch(getBookings())
    // }, [dispatch])

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
      <Switch>
        <Route exact path= "/">
          <Spots spots={spots}/>
        </Route>
        <Route exact path= "/spots/:spotId/edit">
          <EditSpotForm spots={spots}/>
        </Route>
        <Route exact path= "/spots/:spotId">
          <GetSpot spots={spots}/>
        </Route>
        <Route exact path= "/users/bookings">
          <UserBookings/>
        </Route>
        {/* <Route exact path= "/spots/:spotId/bookings/new">
          <CreateBookingForm spots={spots}/>
        </Route> */}
        <Route exact path= "/spots/:spotId/bookings/:bookingId">
          <EditBookingForm spots={spots}/>
        </Route>
        <Route exact path= "/spots/:spotId/bookings" spots={spots}>
          <SpotBookings/>
        </Route>
        <Route exact path= "/spots/:spotId/reviews/new" >
          <CreateReviewForm/>
        </Route>
        <Route exact path= "/spots/:spotId/reviews/:reviewId">
          <EditReviewForm/>
        </Route>
        <Route exact path= "/spots/:spotId/images/new">
          <CreateSpotImages/>
        </Route>
        <Route exact path= "/spots/:spotId/images/:imageId/edit">
          <UpdateSpotImage/>
        </Route>
        <Route>
          <h2>Page Not Found</h2>
        </Route>
      </Switch>
      )}
    </>
  );
}

export default App;
