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

// thunk creator function
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
    dispatch(setUser(data.user));
    return response;
  };

//   last part in phase 1
export const restoreUser = () => async dispatch => {
const response = await csrfFetch('/api/session');
const data = await response.json();
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
