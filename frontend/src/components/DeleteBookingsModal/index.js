import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory, NavLink, useLocation } from 'react-router-dom';
import { Modal } from '../../context/DeleteReviewModal';
// import { deleteReview, getSpotReviews } from '../../store/review';
import { deleteBooking, getBookings } from '../../store/booking';

const DeleteBookingModal = ({ setModal, booking, spot}) => {
  const dispatch = useDispatch()
  const sessionUser = useSelector(state => state.session.user);
  const history = useHistory()

  const handleDelete = () => {
    dispatch(deleteBooking(booking.id))
    dispatch(getBookings())
    setModal(false)
    history.push({pathname: `/users/bookings`})
  }
  return (
    <Modal onClose={()=> setModal(false)}>
      <div className='delete-review-question-container'>Are you sure you want to delete this booking?</div>
      <div className='delete-review-yes-no-container'>
        <button className= 'delete-review-button' onClick={handleDelete}>Yes</button>
        <button className= 'delete-review-button' onClick={()=> setModal(false)}>No</button>
      </div>
    </Modal>
  )

}

export default DeleteBookingModal
