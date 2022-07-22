import LoginFormPage from "./components/LoginFormPage"
import {Switch, Route} from "react-router-dom"
import React from 'react';
import {useEffect, useState} from 'react';
import {useDispatch} from "react-redux"
import * as sessionActions from "./store/session";

function App() {
  const dispatch = useDispatch();
  const [isLoaded,setIsLoaded] = useState(false);
  useEffect(()=>{
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch])

  return isLoaded && (
    <Switch>
      <Route path="/login">
        <LoginFormPage/>
      </Route>
    </Switch>
  );
}

export default App;
