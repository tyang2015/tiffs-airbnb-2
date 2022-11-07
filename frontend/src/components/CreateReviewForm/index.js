import React, { useState, useEffect } from "react"
import ReviewForm from "../ReviewForm"
import { useParams } from "react-router-dom"
// import  from "react"
import { useSelector, dispatch, useDispatch } from "react-redux"
import { getSpotReviews } from "../../store/review"

// reviews PER SPOT
const CreateReviewForm = () => {
    let {spotId} = useParams()
    let dispatch = useDispatch();
    const reviews = useSelector(state=> Object.values(state.reviews))
    useEffect(()=>{
        dispatch(getSpotReviews(Number(spotId)))
    }, [dispatch])
    // console.log('reviews in CREATE REVIEW FORM component:', reviews)
    // const reviewObj = {
    //     review: '',
    //     stars: null
    // }
    return (
        <ReviewForm reviews={reviews}  spotId= {spotId} formType={"Create Review"} />
    )
}

export default CreateReviewForm
