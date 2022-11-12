import React,{useState, useEffect} from "react"
import {useDispatch, useSelector} from "react-redux"
import {useHistory, useParams} from 'react-router-dom'
import { Modal } from "../../context/CreateSpotModal";
import SpotForm from "./SpotForm";
import { getSpots } from "../../store/spot";

// ALSO FOR UPDATESPOTMODAL
const CreateSpotModal = ({setSpotModal, formType}) => {
  const dispatch = useDispatch();
  const {spotId} = useParams();
  const spots = useSelector(state=> state.spots)
  const spot = spots[spotId]
  console.log('spot id in create spot modal', spotId)
  useEffect(()=> {
    dispatch(getSpots())
  }, [dispatch])
  console.log("sPOT HERE::", spot)
  return (
    <Modal onClose={()=> setSpotModal(false)}>
      <SpotForm spot={spot} formType={formType} setSpotModal={setSpotModal}/>
    </Modal>
  )

}

export default CreateSpotModal
