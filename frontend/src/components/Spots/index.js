// iterate through spots data gathered from useSelector
// <outside div> {spots.map ( <div> <img/> .... </div>)} -> refer to the drawing
import {useDispatch, useSelector} from 'react-redux'
import {useState, useEffect} from 'react'
import {getSpots} from "../../store/spot"
import React from 'react'

const Spots = () =>{
    const dispatch = useDispatch();
    let spots = useSelector(state=> Object.values(state.spots))
    // const [spots, getSpots] = useState('')

    useEffect(()=>{
        dispatch(getSpots())
    }, [dispatch])

    const getSpotData = (e) =>{
        e.preventDefault();
        dispatch(getSpots())
    }

    return (
        <>
            <h2> spots data here</h2>
            {/* <button onClick={getSpotData}> CLICK HERE TO TEST SPOT DATA </button> */}
            <div>
                {
                    spots.map(spot => (
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
