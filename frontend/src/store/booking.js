import { csrfFetch } from "./csrf";

const GET_BOOKINGS = 'bookings/getBookings';
const CREATE_BOOKING = 'bookings/createBooking';
const EDIT_BOOKING= 'bookings/editBooking';
const DELETE_BOOKING= 'bookings/deleteBooking';

const load = (payload) => {
    return {
        type: GET_BOOKINGS,
        payload
    }
}

const create = (booking) => {
    return {
        type: CREATE_BOOKING,
        booking
    }
}

const edit = (booking) => {
    return {
        type: EDIT_BOOKING,
        booking
    }
}

const remove = (id) => {
    return {
        type: DELETE_BOOKING,
        id
    }
}

export const getBookings = () => async dispatch => {
    const response = await csrfFetch(`/api/users/bookings`)
    if (response.ok){
        let bookings = await response.json()
        // console.log('bookings in thunk:', bookings)
        dispatch(load(bookings))
    }
}

export const createBooking =(spotId, payload) => async dispatch =>{
    const response = await csrfFetch(`/api/spots/${spotId}/bookings`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(payload)
    })
    if (response.ok){
        const booking =await response.json()
        console.log('Create booking in thunk:', booking)
        dispatch(create(booking))
    }
}

export const editBooking = (bookingId, payload) => async dispatch => {
    const response = await csrfFetch(`/api/spots/bookings/${bookingId}`, {
        method: 'PATCH',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(payload)
    })
    if (response.ok){
        let booking = await response.json()
        dispatch(edit(booking))
    }
}

export const deleteBooking = (bookingId) => async dispatch => {
    const response = await csrfFetch(` /api/spots/bookings/${bookingId}`, {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'}
    })
    if (response.ok){
        dispatch(remove(bookingId))
    }
}

const bookingReducer = (state= {}, action) => {
    switch (action.type){
        case GET_BOOKINGS: {
            // let newState = {...state}
            // IMPERATIVE YOU DONT SPREAD OLD STATE HERE
            // why? because this require users authentication, and you spread the other user's info (old login) into this one
            let newState = {}
            action.payload.bookings.forEach(booking=> newState[booking.id]= booking)
            // console.log('new State:', newState)
            return newState
        }
        case CREATE_BOOKING:{
            let newState = {...state}
            newState[action.booking.id] = action.booking
            return newState
        }
        case EDIT_BOOKING:{
            let newState = {...state}
            newState[action.booking.id] = action.booking
            return newState
        }
        case DELETE_BOOKING: {
            // console.log('OLD STATE BEFORE DELETE:', state)
            let newState = JSON.parse(JSON.stringify(state))
            delete newState[action.id]
            // console.log('NEW STATE AFTER DELETE:', newState)
            return newState
        }
        default:
            return state
    }
}

export default bookingReducer
