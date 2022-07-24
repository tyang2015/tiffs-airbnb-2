const GET_SPOTS = 'spots/getSpots'

// action creator
// this is going to be brought back from the DB with: eg. spotData = await response.json()
// then you dispatch the action with dispatch(loadSpots(spotData))
const load = (spots) => {
    return {
        type: GET_SPOTS,
        spots
    }
}

// thunk action creator
export const getSpots = () => {
    const response = await fetch('/api/spots');
    if (response.ok){
        const spots = await response.json()
        dispatch(load(spots));
    }
}
