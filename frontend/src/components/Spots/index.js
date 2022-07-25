// iterate through spots data gathered from useSelector
// <outside div> {spots.map ( <div> <img/> .... </div>)} -> refer to the drawing
import {useDispatch, useSelector} from 'react-redux'
import {useState, useEffect} from 'react'
import {getSpots} from "../../store/spot"
import React from 'react'

const Spots = ({spots}) =>{
    const dispatch = useDispatch();
    // console.log('spots in spots component:', spots)
    const allSpots = Object.values(spots)
    // let spots = useSelector(state=> Object.values(state.spots))
    // const [spots, getSpots] = useState('')

    // triggers this in the first stage. end state useSelector triggers render
    // useEffect(()=>{
    //     dispatch(getSpots())
    // }, [dispatch])

    const getSpotData = (e) =>{
        e.preventDefault();
        dispatch(getSpots())
    }

    return (
        <>
            <h2> all spots data here</h2>
            {/* <button onClick={getSpotData}> CLICK HERE TO TEST SPOT DATA </button> */}
            <div>
                {
                    allSpots.map(spot => (
                    <div key={spot.id}>
                        <h3>{spot.name}</h3>
                        <p>{spot.description}</p>
                    </div>
                    ))
                }
                spot
            </div>

        </>
    )
}

export default Spots
