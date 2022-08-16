import { csrfFetch } from "./csrf"

const GET_SPOTS = 'spots/getSpots'
const GET_SPOT_DATA = 'spots/getSpotData'
const DELETE_SPOT = 'spots/deleteSpot'
const CREATE_SPOT = 'spots/createSpot'
const UPDATE_SPOT = 'spots/updateSpot'

// action creator
// this is going to be brought back from the DB with: eg. spotData = await response.json()
// then you dispatch the action with dispatch(loadSpots(spotData))

// load all spots
const load = (payload) => {
    return {
        type: GET_SPOTS,
        // key into action.spots (refer to your API doc) to get array of spots
        payload
    }
}

// delete spot
const remove = (id) => {
    return {
        type: DELETE_SPOT,
        id
    }
}


// remember we dispatch this from thunk AFTER getting our info from db
// including the id field
const create = (payload) => {
    return {
        type: CREATE_SPOT,
        payload
    }
}

// the argument will be passed to reducer (newState) to be returned on component useSelector
const getOneSpot = (spot) => {
    return {
        type: GET_SPOT_DATA,
        spot
    }
}

const edit = (spot) => {
    return {
        type: UPDATE_SPOT,
        spot
    }
}

export const deleteSpot = (id)=> async dispatch => {
    // console.log('inside deleteSpot thunk')
    let response = await csrfFetch(`/api/spots/${id}`, {
        method:'DELETE',
        headers:{'Content-Type': 'application/json'}
    });
    if (response.ok){
        // const data = await response.json()
        // dont plug the data (which is just a msg) in.we just need to delete in DB
        dispatch(remove(id))
    }
}


export const editSpot = (id, payload) => async dispatch => {
    // console.log('inside EditSpot thunk creator')
    let response = await csrfFetch(`/api/spots/${id}`, {
        method:'PATCH',
        headers:{'Content-Type': 'application/json'},
        body:JSON.stringify(payload)
    })
    if (response.ok){
        const spot = await response.json()
        dispatch(edit(spot))
    }
}

// payload = object SUBMITTED from form
export const createSpot = (payload) => async dispatch => {
    // console.log('inside CreateSpot thunk creator')
    let response = await csrfFetch('/api/spots', {
        method:'POST',
        headers:{'Content-Type': 'application/json'},
        body:JSON.stringify(payload)
    })
    if (response.ok){
        const spot = await response.json()
        dispatch(create(spot))
    }
}

// getting spot details for 1 Spot
export const getSpotData= (id) => async dispatch => {
    // console.log('inside thunk creator for getSpotData')
    const response = await fetch(`/api/spots/${id}`)
    if (response.ok){
        let spot = await response.json()
        console.log('spot details:', spot)
        dispatch(getOneSpot(spot))
    }
}


// thunk action creator
// QUESTION: should i add another endpoint for /api/spots/:spotId/images
export const getSpots = () => async dispatch => {
    const response = await fetch('/api/spots');
    if (response.ok){
        let spots = await response.json()
        let spotIdList = spots.spots.map(spot=> spot.id)
        for (let i = 0; i< spotIdList.length; i++){
            let realSpotId = spotIdList[i]
            let response2 = await fetch(`/api/spots/${realSpotId}/reviews`)
            // get avgStarRating for each /api/spots/:spotId
            let response3 = await fetch(`/api/spots/${realSpotId}`)
            if (response2.ok && response3.ok) {
                let reviewsObj = await response2.json()
                let spotDetailsObj = await response3.json()
                let avgRating = spotDetailsObj.avgStarRating
                // spots.spots[i].reviews = reviewsObj.reviews
                spots.spots[i].reviews ={}
                reviewsObj.reviews.forEach(review=> {
                    spots.spots[i].reviews[review.id] = review
                })
                spots.spots[i].avgStarRating = avgRating
            }
        }



        // let newSpots = {...spots}
        // let scores = []
        // let numReviews = []
        // for (let i=0; spots.spots.length; i++){
        //     newSpots.spots[i].reviews = {}
        //     numReviews.push(spots.spots[i].Reviews.length)
        //     scores[i]=0
        //     for (let j=0; spots.spots[i].Reviews.length; j++){
        //         let review = spots.spots[i].Reviews[j]
        //         if (review){
        //             newSpots.spots[i].reviews[review.id] = review
        //             scores[i]= scores[i]+ spots.spots[i].Reviews[j].stars
        //         }
        //     }
        //     newSpots[i].avgStarRating = (scores[i]/numReviews[i]).toFixed(2)
        // }
        // dispatch(load(newSpots))
        dispatch(load(spots));
    }
}

const initialState = {}
const spotReducer = (state= initialState, action) => {
    switch (action.type){
        case GET_SPOTS: {
            // let allSpots = {}
            // console.log('spot data array from reducer:', action.payload.spots)
            // action.payload.spots.forEach(spot => {
            //     allSpots[spot.id] = spot
            //     // allSpots[spot.id].reviews = JSON.stringify(spot.reviews)
            // })
            // for (let i = 0; i< action.payload.spots.length; i++) {
            //     let spot = action.payload.spots[i]
            //     allSpots[spot.id] = spot
            //     // console.log(`review for spot ${i+1}: ${allSpots[spot.id].reviews}`)
            //     console.log("reviews for a single spot:", allSpots[spot.id].reviews)
            //     // instantiate it
            //     const oldReviewObj= {}
            //     oldReviewObj[action.payload.spots[i].reviews[0].id] = action.payload.spots[i].reviews[0]
            //     for (let j=0; j< action.payload.spots[i].reviews.length; j++){
            //         let review = action.payload.spots[i].reviews[j]
            //         const newReviewObj={}
            //         // if (j===0){
            //             oldReviewObj[review.id] = {...oldReviewObj, review}
            //         // }
            //         // else {
            //             newReviewObj[review.id]= review
            //         // }
            //         allSpots[spot.id].reviews = {...oldReviewObj, ...newReviewObj}
            //     }
            // }
            let allSpots ={}
            action.payload.spots.forEach(spot => allSpots[spot.id] = spot)
            // console.log('all spots object (with reviews):',allSpots)
            return {...state, ...allSpots}
        }
        case DELETE_SPOT: {
            const newState= {...state}
            delete newState[action.id]
            return newState
        }
        case CREATE_SPOT: {
            const newState = {...state}
            newState[action.payload.id] = action.payload
            return newState
        }
        case GET_SPOT_DATA: {
            const newState = {...state}
            newState[action.spot.id] =action.spot
            // newState = {1: {id:1, ownerId:1,...}}
            // console.log('new state in get spot data:', newState)
            return newState
        }
        case UPDATE_SPOT: {
            const newState = {...state}
            // const newState= JSON.parse(JSON.stringify(state))
            newState[action.spot.id] = action.spot
            // console.log('new state for updating spot:', newState)
            return newState
        }
        default:
            return state
    }
}

export default spotReducer
