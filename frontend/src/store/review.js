import { csrfFetch } from "./csrf";
const GET_SPOT_REVIEWS = 'reviews/getSpotReviews'
const CREATE_SPOT_REVIEW = 'reviews/createSpotReview'
const EDIT_REVIEW ='reviews/editReview'
const DELETE_REVIEW = 'reviews/deleteReview'
const GET_USER_REVIEWS = 'reviews/getUserReviews'

const loadSpotReviews = (payload) => {
    return {
        type: GET_SPOT_REVIEWS,
        payload
    }
}

const createBySpot = (review) =>{
    return {
        type: CREATE_SPOT_REVIEW,
        review
    }
}

const update = (review) => {
    return {
        type: EDIT_REVIEW,
        review
    }
}

const remove = (id) => {
  return {
    type: DELETE_REVIEW,
    id
  }
}

const loadUserReviews = (payload) => {
    return {
        type: GET_USER_REVIEWS,
        payload
    }
}

export const getSpotReviews = (spotId) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`)
    if (response.ok){
        let reviews= await response.json()
        dispatch(loadSpotReviews(reviews))
        return reviews
    }
}

export const getUserReviews = () => async dispatch => {
    const response = await csrfFetch(`/api/users/reviews`)
    if (response.ok){
        let reviews = await response.json()
        dispatch(loadUserReviews(reviews))
    }
}

export const createSpotReview = (spotId,payload) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`,{
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(payload)
    })
    if (response.ok){
        const review = await response.json()
        // console.log('review data in thunk:', review)
        dispatch(createBySpot(review))
    }
}

// export const

export const editReview= (payload) => async dispatch => {
    const response = await csrfFetch(`/api/reviews/${payload.id}`, {
        method: 'PATCH',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(payload)
    })
    if (response.ok){
        const review = await response.json()
        console.log('updated review in thunk:', review)
        dispatch(update(review))
    }
}

// const GET_BOOKINGS = 'bookings/getBookings';
// const CREATE_BOOKING = 'bookings/createBooking';
// const EDIT_BOOKING= 'bookings/editBooking';
// const DELETE_BOOKING= 'bookings/deleteBooking';
export const deleteReview = (reviewId) => async dispatch => {
  const response = await csrfFetch(`/api/reviews/${reviewId}`, {
    method:'DELETE',
    headers:{'Content-Type': 'application/json'}
  })
  if (response.ok){
    dispatch(remove(reviewId))
  }
}


const initialState={}
const reviewReducer = (state=initialState, action) =>{
    switch (action.type) {
        case GET_SPOT_REVIEWS: {
            let newState = {}
           action.payload.reviews.forEach(review=> newState[review.id] = review)
            return newState
        }
        case GET_USER_REVIEWS:{
            let newState = {}
            action.payload.Reviews.forEach(review=> newState[review.id] = review )
            return newState
        }
        case CREATE_SPOT_REVIEW: {
            let newState = {...state}
            newState[action.review.id] = action.review
            return newState
        }
        case EDIT_REVIEW:{
            let newState = {...state}
            newState[action.review.id] = action.review
            return newState
        }
        case DELETE_REVIEW:{
            let newState = {...state}
            delete newState[action.id]
            return newState

        }
        default: {
            return state
        }

    }
}

export default reviewReducer
