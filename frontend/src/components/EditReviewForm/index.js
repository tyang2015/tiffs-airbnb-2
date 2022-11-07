import React, {useState,useEffect} from "react"
import ReviewForm from "../ReviewForm"
import { useParams , useLocation} from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { getSpotReviews } from "../../store/review"


const EditReviewForm = () => {
    let { spotId, reviewId} = useParams()
    let location = useLocation();
    const dispatch = useDispatch()
    const reviews = useSelector(state=> state.reviews)
    const review = reviews[reviewId]
    // console.log('reviews in edit formmm:', reviews)
    // console.log('reviewwww :', review)
    // let review = location?.state?.review
    // console.log('REVIEW FROM EDIT FORM:', review)
    useEffect(()=>{
      dispatch(getSpotReviews(Number(spotId)))
  }, [dispatch])


    return (
        <ReviewForm formType="Edit Review" spotId={spotId} reviewObj={review} />
    )
}

export default EditReviewForm
