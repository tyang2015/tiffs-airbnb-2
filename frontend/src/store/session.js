import { csrfFetch } from "./csrf"


const SET_USER = 'user/setUser'
const REMOVE_USER = 'user/removeUser'


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
    // CHANGED HERE
    // console.log('data from signup:', data)
    
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
            newState = {...state}
            newState.user = action.payload
            return newState
        }
        case REMOVE_USER:{
            newState = {...state}
            newState.user = null
            return newState
        }
        default:
            return state
    }
}

export default sessionReducer;
