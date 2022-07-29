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
    const [showLngMenu, setShowLngMenu] = useState(false)

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

    const ToggleLngMenu= (e) => {
        if (sessionUser.id!==spot.ownerId){
            alert('Only the authorized owner can view longitude & latitude coordinates')
            return
        }
        showLngMenu === true? setShowLngMenu(false): setShowLngMenu(true)
        // setShowLngMenu(true)
    }
    // useEffect(()=>{
    //     set
    // }, [showLngMenu])

    return (
        <>
            <h2> spot details for {spotId}</h2>
            {spot && (
                <div className='spot-detail-card'>
                    <img className='spot-preview-image' src={`${spot.previewImage}`} alt={`${spot.name} picture`}/>
                    <div className='spot-detail' >
                        <div className= 'spot-detail-icon-container'>
                            <i class="fa-solid fa-house"></i>
                        </div>
                        <p className='spot-detail-item-description'> Name: {spot.name}</p>
                    </div>
                    <div className='spot-detail'>
                        <div className= 'spot-detail-icon-container'>
                            <i class="fa-solid fa-envelope"></i>
                        </div>
                        <p className='spot-detail-item-description'> Description: {spot.description}</p>
                    </div>
                    <div className='spot-detail'>
                        <div className= 'spot-detail-icon-container'>
                            <i class="fa-solid fa-city"></i>
                        </div>
                        <p className='spot-detail-item-description'> City: {spot.city}</p>
                    </div>
                    <div className='spot-detail'>
                        <div className= 'spot-detail-icon-container'>
                            <i class="fa-solid fa-dollar-sign"></i>
                        </div>
                        <p className='spot-detail-item-description'> Price: ${spot.price}</p>
                    </div>
                    <div>
                        <p> Show longitude and latitude coordinates</p>
                        <input
                            type='button'
                            onClick={ToggleLngMenu}
                            value={showLngMenu? "<" : ">"}
                        />

                    </div>
                    {showLngMenu && (
                        <div className='spot-detail'>
                            <div className= 'spot-detail-icon-container'>
                                <i class="fa-solid fa-dollar-sign"></i>
                            </div>
                            <p className='spot-detail-item-description'> Longitude: {spot.lng}</p>
                        </div>
                    )}
                </div>

            )}
            <button onClick={deleteHandle}> Delete Spot </button>
        </>
    )
}

export default GetSpot
