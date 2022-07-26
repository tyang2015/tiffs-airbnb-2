import { useParams } from "react-router-dom"
import React,{useState, useEffect} from "react"
import { useDispatch, useSelector } from "react-redux";
import {deleteSpot } from "../../store/spot";

// you can key in spots, no need for reducer
const GetSpot = ({spots}) => {
    const {spotId} = useParams();
    const dispatch = useDispatch();
    const spot = spots[spotId]
    // const spot = spots.filter(spot => spot.id === Number(spotId))
    // const [spot, setSpot] = useState({})

    // display error msg?
    const deleteHandle = (e) => {
        dispatch(deleteSpot(spotId))
        console.log('successsfully deleted?')
    }

    return (
        <>
            <h2> spot details for {spotId}</h2>
            {spot && (
                <div>
                    <p> Name: {spot.name}</p>
                    <p> Description: {spot.description}</p>
                    <p> City: {spot.city}</p>
                    <p> Price: {spot.price}</p>
                </div>

            )}
            <button onClick={deleteHandle}> Delete Spot </button>
        </>
    )
}

export default GetSpot
