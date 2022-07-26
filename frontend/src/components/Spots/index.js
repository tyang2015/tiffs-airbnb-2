// iterate through spots data gathered from useSelector
// <outside div> {spots.map ( <div> <img/> .... </div>)} -> refer to the drawing
import {useDispatch, useSelector} from 'react-redux'
import {useState, useEffect} from 'react'
import {getSpots} from "../../store/spot"
import React from 'react'
import './Spots.css'

const Spots = ({spots}) =>{
    const dispatch = useDispatch();
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
    // console.log('spots data:', allSpots)

    const getSpotData = (e) =>{
        e.preventDefault();
        dispatch(getSpots())
    }
    return (
        <>
            <h2> all spots data here</h2>

            {/* <button onClick={getSpotData}> CLICK HERE TO TEST SPOT DATA </button> */}
            {/* spots-main-container will be where you specify the grid layout */}
            <div className="spots-main-grid-container">
                {
                    allSpots.map(spot => (
                    <div key={spot.id} className= "spot-card-container">
                        <img src={spot.previewImage} alt={`${spot.name} picture`}/>
                        <div className='spot-bottom-text-container'>
                            <div className='spot-bottom-left-text-container'>
                                <h3> {spot.city}, {spot.state}</h3>
                                <p> ${spot.price} night</p>
                            </div>
                            <div className= 'spot-bottom-right-text-container'>
                                <p> ⭐ <span>{spot.avgStarRating}</span></p>
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
