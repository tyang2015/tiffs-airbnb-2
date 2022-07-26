import { csrfFetch } from "./csrf";

const GET_BOOKINGS = 'bookings/getBookings';

const load = (payload) => {
    return {
        type: GET_BOOKINGS,
        payload
    }
}

const getBookings = () => async dispatch => {
    const response = await csrfFetch(`/api/users/bookings`)
}

const bookingReducer = (state= {}, action) => {

}
