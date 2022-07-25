import LoginFormPage from "./components/LoginFormPage"
import {Switch, Route} from "react-router-dom"
import React, {useEffect, useState} from 'react';
import {useDispatch} from "react-redux"
import * as sessionActions from "./store/session";
import SignupFormPage from "./components/SignupFormPage/index";
import Navigation from "./components/Navigation";
import Spots from './components/Spots'

function App() {
  const dispatch = useDispatch();
  const [isLoaded,setIsLoaded] = useState(false);
  useEffect(()=>{
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch])

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
      <Switch>
        <Route exact path="/login">
          <LoginFormPage/>
        </Route>
        <Route exact path="/users">
          {/* <h2> hello </h2> */}
          <SignupFormPage/>
        </Route>
        <Route exact path= "/spots">
          <Spots />
        </Route>
      </Switch>
      )}
    </>
  );
}

export default App;
