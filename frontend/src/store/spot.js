const GET_SPOTS = 'spots/getSpots'
// structure of initial state:
// spotId: {
//     spotData,
//     reviews:{
//         reviewId: {
//                 reviewData,
//                 user: {userData for who reviewed}
//             }
//     },
//     images: {normalizedImageData}
// }



// action creator
// this is going to be brought back from the DB with: eg. spotData = await response.json()
// then you dispatch the action with dispatch(loadSpots(spotData))
const load = (payload) => {
    return {
        type: GET_SPOTS,
        // key into action.spots (refer to your API doc) to get array of spots
        payload
    }
}


// thunk action creator
export const getSpots = () => async dispatch => {
    const response = await fetch('/api/spots');
    if (response.ok){
        let spots = await response.json()
        // for each spot retrieved, the id can be used to get the
        // /api/spots/:spotId/review endpoint's reviews data
        // console.log('spots')
        let spotIdList = spots.spots.map(spot=> spot.id)
        console.log('spot id list:' , spotIdList)
        // let newSpots = spots.toJSON()
        for (let i = 0; i< spotIdList.length; i++){
            let spotId = i+1
            let response2 = await fetch(`/api/spots/${spotId}/reviews`)
            // console.log('reponse object:',response.json())
            if (response2.ok) {
                let reviewsObj = await response2.json()
                // console.log('reviews response object:', reviewsObj.reviews)

                spots.spots[i].reviews = reviewsObj.reviews
                // console.log('reviews key in object:' , spots.spots[spotId-1])
                console.log('spots updated:', spots)
            }
        }
        // }
        // console.log('spots in thunk before going into reducer', spots)
        dispatch(load(spots));
    }
        // spotIdList.forEach(spotId=> {
        //     let response = await fetch(`/api/spots/${spotId}/reviews`)
        //     if (response.ok) {
        //         spots.reviews = response.reviews.filter(review => !review.Images || !review.Spot)
        //     }
        // })

        // put all the data into spots
    // }
}


const initialState = {}

const spotReducer = (state= initialState, action) => {
    switch (action.type){
        case GET_SPOTS: {
            let allSpots = {}
            // console.log('spot data array from reducer:', action.payload.spots)
            // action.payload.spots.forEach(spot => {
            //     allSpots[spot.id] = spot
            //     // allSpots[spot.id].reviews = JSON.stringify(spot.reviews)
            // })
            for (let i = 0; i< action.payload.spots.length; i++) {
                let spot = action.payload.spots[i]
                allSpots[spot.id] = spot
                // for (let j=0; j< action.payload.spots[i].reviews.length; j++){
                //     // j + 1 is the review id
                //     let review = action.payload.spots[i].reviews[j]
                //     if (j===0){
                //         allSpots[spot.id].reviews = {}
                //     }
                //     console.log(`review:`, review)
                //     // // the first review of every spot, the object can be reiniiated
                //     allSpots[spot.id].reviews[review.id] = review
                // }
            }
            // console.log('all spots object (with reviews):', allSpots)
            return {...state, ...allSpots}
        }
        default:
            return state
    }
}

export default spotReducer
