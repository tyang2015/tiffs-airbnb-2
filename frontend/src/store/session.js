import { csrfFetch } from "./csrf"

// my old state should not appear and be quickly repopulated with new user data
const SET_USER = 'user/setUser'
const REMOVE_USER = 'user/removeUser'

// added here
// if you have reset bookings in both reducers
const RESET_BOOKINGS_LOGOUT = 'bookings/resetBookingsLogout'



const setUser = (user) =>{
    return {
        type: SET_USER,
        payload:user
    }
}

const removeUser =() => {
    return {
        type: REMOVE_USER,
    }
}

const reset = (payload) => {
  return {
      type: RESET_BOOKINGS_LOGOUT,
      payload
  }
}

// thunk creator function for login
// IMPORTANT: u may have to change credential to email later
export const login = (user) => async (dispatch) => {
    const { email, password } = user;
    const response = await csrfFetch('/api/session', {
      method: 'POST',
      body: JSON.stringify({
        email,
        password,
      }),
    });
    const data = await response.json();
    // console.log(data)
    // CHANGED HERE
    dispatch(setUser(data.user));
    return response;
  };

//   phase 2
// ADDED HERE
  export const signup = (user) => async (dispatch) => {
    const { email, password, firstName, lastName} = user;
    const response = await csrfFetch("/api/users", {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
        firstName,
        lastName,
      }),
    });
    const data = await response.json();
    dispatch(setUser(data));
    return response;
  };

// phase 3
export const logout = () => async (dispatch) => {
  const response = await csrfFetch('/api/session', {
    method: 'DELETE',
  });
  dispatch(removeUser());
  return response;
};

// // when i logout,i should clear out the bookings data
// export const resetBookingsLogOut = () => async dispatch => {
//   const response = await csrfFetch(`/api/users/bookings`)
//   if (response.ok){
//       let bookings = await response.json()
//       dispatch(reset(bookings))
//   }
// }


//   last part in phase 1
export const restoreUser = () => async dispatch => {
  const response = await csrfFetch('/api/session');
  const data = await response.json();
  // CHANGED data.user to data
  dispatch(setUser(data.user));
  return response;
};

const initialState = {user:null}
// this should always return only 1 user object (not a bunch of users)
const sessionReducer = (state=initialState, action ) =>{
    let newState;
    switch (action.type){
        case SET_USER:{
          // how to get my new data to populate automatically?
            newState = {...state}
            // newState={}
            newState.user = action.payload
            return newState
        }
        case REMOVE_USER:{
            // newState = {...state}
            // SHOULD I CLEAR OUT BOOKINGS? =>
            // include case inside the store BOOKINGS reducer for REMOVE_USER?
            // can the dispatch trigger both bookings and session reducers?
            newState={}
            newState.user = null
            return newState
        }
        // case RESET_BOOKINGS_LOGOUT:{
        //   let newState = {}
        //   action.payload.bookings.forEach(booking=> newState[booking.id]= booking)
        //   return newState
        // }
        default:
            return state
    }
}

export default sessionReducer;
