import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory, NavLink, useLocation } from 'react-router-dom';
import { Modal } from '../../context/DeleteSpotImageModal';
import "./DeleteSpotImageModal.css"
import { deleteSpotImage, getSpotImages } from '../../store/image';


const DeleteSpotImageModal = ({review, setDeleteModal}) => {
  const dispatch = useDispatch()
  const {spotId, imageId} = useParams()
  const sessionUser = useSelector(state => state.session.user);
  const history = useHistory();

  const handleDelete = () => {
    dispatch(deleteSpotImage(imageId))
    dispatch(getSpotImages(spotId))
    setDeleteModal(false)
    history.push({pathname: `/spots/${spotId}/images/new`})
    // console.log('review length after deleting:', reviews.length)
  }
  return (
    <Modal onClose={()=> setDeleteModal(false)}>
      <div className='delete-review-question-container'>Are you sure you want to delete this spot image?</div>
      <div className='delete-review-yes-no-container'>
        <button className= 'delete-review-button' onClick={handleDelete}>Yes</button>
        <button className= 'delete-review-button' onClick={()=> setDeleteModal(false)}>No</button>
      </div>
    </Modal>
  )

}

export default DeleteSpotImageModal
