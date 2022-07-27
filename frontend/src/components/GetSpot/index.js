import { useParams, useHistory } from "react-router-dom"
import React,{useState, useEffect} from "react"
import { useDispatch, useSelector } from "react-redux";
import {deleteSpot } from "../../store/spot";
import './GetSpot.css'

// you can key in spots, no need for reducer
const GetSpot = ({spots}) => {
    const {spotId} = useParams();
    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector(state => state.session.user);

    const spot = spots[spotId]
    // const spot = spots.filter(spot => spot.id === Number(spotId))
    // const [spot, setSpot] = useState({})
    console.log('spots: ',spots)

    // display error msg?
    const deleteHandle = async (e) => {
        if (sessionUser.id!== spot.ownerId){
            alert('You do not have permission to delete spot')
        } else {
            await dispatch(deleteSpot(spotId))
            alert('successfully deleted!')
            history.push('/spots')
        }
    }

    return (
        <>
            <h2> spot details for {spotId}</h2>
            {spot && (
                <div className='spot-detail-card'>
                    <img className='spot-preview-image' src={`${spot.previewImage}`} alt={`${spot.name} picture`}/>
                    <p className='spot-detail'> Name: {spot.name}</p>
                    <p className='spot-detail'> Description: {spot.description}</p>
                    <p className='spot-detail'> City: {spot.city}</p>
                    <p className='spot-detail'> Price: {spot.price}</p>
                </div>

            )}
            <button onClick={deleteHandle}> Delete Spot </button>
        </>
    )
}

export default GetSpot
