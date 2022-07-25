import { useParams } from "react-router-dom"
import React,{useState, useEffect} from "react"
import { useDispatch, useSelector } from "react-redux";
import { getSpotData, getSpots } from "../../store/spot";

const GetSpot = ({spots}) => {
    const {spotId} = useParams();
    const dispatch = useDispatch();
    const spot = spots[spotId]
    // const spot = spots.filter(spot => spot.id === Number(spotId))
    // const [spot, setSpot] = useState({})

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
        </>
    )
}

export default GetSpot
