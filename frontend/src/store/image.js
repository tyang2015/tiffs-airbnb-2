import { csrfFetch } from "./csrf";
const GET_SPOT_IMAGES = "images/getSpotImages"
const CREATE_SPOT_IMAGE = "images/createSpotImages"
const UPDATE_SPOT_IMAGE = "images/updateSpotImage"
const DELETE_SPOT_IMAGE = "images/deleteSpotImage"

const loadSpotImages = (payload) => {
  return {
    type: GET_SPOT_IMAGES,
    payload
  }
}

const create = (payload) => {
  return {
    type: CREATE_SPOT_IMAGE,
    payload
  }
}

const update = (payload) => {
  return {
    type: UPDATE_SPOT_IMAGE,
    payload
  }
}

const remove = (id) => {
  return {
    type: DELETE_SPOT_IMAGE,
    id
  }
}

// MUST ADD THIS IN BACKEND
export const getSpotImages = (spotId) => async dispatch => {
  const response = await csrfFetch(`/api/spots/${spotId}/images`)
  if (response.ok){
    let images = await response.json()
    console.log("IMAGES FROM SPOT in thunk:", images)
    dispatch(loadSpotImages(images))
    return images
  }
}

export const createSpotImage = (spotId, payload) => async dispatch => {
  const response = await csrfFetch(`/api/spots/${spotId}/images`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    // headers: {'Content-Type': 'image/jpeg'},
    body: JSON.stringify(payload)
  })
  if (response.ok){
    const image = await response.json()
    console.log('CREATED IMAGE IN THUNK:', image)
    dispatch(create(image))
    return image
  }
}

// // MUST ADD THIS IN BACKEND
export const updateSpotImage = (imageId, payload) => async dispatch => {
  const response = await csrfFetch(`/api/images/${imageId}`, {
    method: 'PATCH',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(payload)
  })
  if (response.ok){
    const image = await response.json()
    dispatch(update(image))
    return image
  }
}

export const deleteSpotImage = (imageId) => async dispatch => {
  const response = await csrfFetch(`/api/images/${imageId}`, {
    method:'DELETE',
    headers:{'Content-Type': 'application/json'}
  })
  if (response.ok){
    dispatch(remove(imageId))
  }
}

const initialState={}
const imageReducer = (state=initialState, action) => {
  switch (action.type){
    case GET_SPOT_IMAGES: {
      let newState = {}
      action.payload.images.forEach(image => newState[image.id] = image)
      return newState
    }
    case CREATE_SPOT_IMAGE: {
      let newState = {...state}
      action.payload.id = action.payload
      return newState
    }
    case UPDATE_SPOT_IMAGE: {
      let newState = {...state}
      action.payload.id = action.payload
      return newState
    }
    case DELETE_SPOT_IMAGE: {
      let newState = {...state}
      delete newState[action.id]
      return newState
    }
    default: {
      return state
    }
  }
}

export default imageReducer
