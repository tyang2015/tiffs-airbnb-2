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
import CreateSpotForm from "./components/CreateSpotForm";
import EditSpotForm from "./components/EditSpotForm"

function App() {
  const dispatch = useDispatch();
  // // array form
  // let spots = useSelector(state=> Object.values(state.spots))
  // // object form
  let spots = useSelector(state=> state.spots)

  const [isLoaded,setIsLoaded] = useState(false);
  useEffect(()=>{
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch])

  // load all spots
  useEffect(()=>{
    dispatch(getSpots())
  }, [dispatch])

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
      <Switch>
        {/* <Route exact path="/login">
          <LoginFormPage/>
        </Route> */}
        <Route exact path="/users">
          <SignupFormPage/>
        </Route>
        <Route exact path= "/api/spots">
          <Spots spots={spots}/>
        </Route>
        {/* make an alternative endpoint for the create spot form */}
        <Route exact path= "/api/spots/new">
          <CreateSpotForm spots={spots}/>
        </Route>
        {/* change the edit url  */}
        <Route exact path= "/api/spots/:spotId/edit">
          <EditSpotForm spots={spots}/>
        </Route>
        <Route exact path= "/api/spots/:spotId">
          <GetSpot spots={spots}/>
        </Route>
      </Switch>
      )}
    </>
  );
}

export default App;
