// iterate through spots data gathered from useSelector
// <outside div> {spots.map ( <div> <img/> .... </div>)} -> refer to the drawing
import {useDispatch, useSelector} from 'react-redux'
import {useState, useEffect} from 'react'
import {getSpots} from "../../store/spot"
import React from 'react'
import './Spots.css'
import ClipLoader from "react-spinners/ClipLoader"

const Spots = ({spots}) =>{
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const allSpots = Object.values(spots)
    // let spots = useSelector(state=> Object.values(state.spots))

    // triggers this in the first stage. end state useSelector triggers render
    // useEffect(()=>{
    //     dispatch(getSpots())
    // }, [dispatch])
    // for (let i =0; i<allSpots.length; i++){
    //     // totalScore for each spot/ number for each spot
    //     let totalScore = 0
    //     //[ {id: 1, stars: 5, ...}, {id:3, stars:4}]
    //     let reviewsArr = Object.values(allSpots[i].reviews)
    //     let numReviews = reviewsArr.length
    //     for (let j=0; j<reviewsArr.length; j++){
    //         totalScore = totalScore + reviewsArr[j].stars
    //     }
    //     allSpots.avgStarRating = (totalScore/numReviews).toFixed(2)
    // }


    // when spots is loaded from useSelector, then i will setloading to false
    useEffect(()=>{
        setLoading(true)
        if (allSpots) setLoading(false)
    }, [allSpots])
    // if (!allSpots) return (
    //     <>
    //         <ClipLoader size={100} color={"#36D7B7"}/>
    //     </>
    // )
        // else
    return (
        <>
            <div className="spots-main-grid-container">
               <ClipLoader size={100} color={"#36D7B7"}/>
                {
                    allSpots.map(spot => (
                    <div key={spot.id} className= "spot-card-container">
                        {/* <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" style="display: block; fill: rgba(0, 0, 0, 0.5); height: 24px; width: 24px; stroke: var(--f-mkcy-f); stroke-width: 2; overflow: visible;"><path d="m16 28c7-4.733 14-10 14-17 0-1.792-.683-3.583-2.05-4.95-1.367-1.366-3.158-2.05-4.95-2.05-1.791 0-3.583.684-4.949 2.05l-2.051 2.051-2.05-2.051c-1.367-1.366-3.158-2.05-4.95-2.05-1.791 0-3.583.684-4.949 2.05-1.367 1.367-2.051 3.158-2.051 4.95 0 7 7 12.267 14 17z"></path></svg> */}
                        <img src={spot.previewImage}  alt={`${spot.name} picture`}/>
                        <div className='spot-bottom-text-container'>
                            <div className='spot-bottom-left-text-container'>
                                <h3> {spot.city}, {spot.state}</h3>
                                <p> <b>${spot.price}</b> night</p>
                            </div>
                            <div className= 'spot-bottom-right-text-container'>
                                <p>⭐ <span>{spot.avgStarRating}</span></p>
                            </div>
                            <p></p>
                        </div>

                    </div>
                    ))
                }

            </div>

        </>
    )
}

export default Spots
