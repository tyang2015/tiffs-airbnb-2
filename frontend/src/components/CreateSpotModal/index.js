import React,{useState, useEffect} from "react"
import {useDispatch, useSelector} from "react-redux"
import {useHistory} from 'react-router-dom'
import { Modal } from "../../context/CreateSpotModal";
import SpotForm from "./SpotForm";
import { getSpots } from "../../store/spot";

const CreateSpotModal = ({setSpotModal}) => {
  const dispatch = useDispatch();
  // const spots = useSelector(state=> Objectstate.spots)
  // const spot = spots[]

  useEffect(()=> {
    dispatch(getSpots())
  }, [dispatch])

  return (
    <Modal onClose={()=> setSpotModal(false)}>
      <SpotForm formType="Create Spot" setSpotModal={setSpotModal}/>
    </Modal>
  )

}

export default CreateSpotModal
