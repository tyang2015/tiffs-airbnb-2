import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory, NavLink, useLocation } from 'react-router-dom';
import { Modal } from '../../context/DeleteReviewModal';
import "./DeleteReviewModal.css"
import { deleteReview, getSpotReviews } from '../../store/review';

const DeleteReviewModal = ({review, setDeleteReviewModal}) => {
  const dispatch = useDispatch()
  const {spotId} = useParams()
  const sessionUser = useSelector(state => state.session.user);
  const history = useHistory()

  const handleDelete = () => {
    dispatch(deleteReview(review.id))
    dispatch(getSpotReviews(Number(spotId)))
    setDeleteReviewModal(false)
    history.push({pathname: `/spots/${spotId}`})
    // console.log('review length after deleting:', reviews.length)
  }
  return (
    <Modal onClose={()=> setDeleteReviewModal(false)}>
      <div className='delete-review-question-container'>Are you sure you want to delete this review?</div>
      <div className='delete-review-yes-no-container'>
        <button className= 'delete-review-button' onClick={handleDelete}>Yes</button>
        <button className= 'delete-review-button' onClick={()=> setDeleteReviewModal(false)}>No</button>
      </div>
    </Modal>
  )

}

export default DeleteReviewModal
