import { useParams } from 'react-router-dom';
// import SpoForm from './ReportForm';
import { useSelector } from 'react-redux';
import SpotForm from '../SpotForm';
import React from "react"

const EditSpotForm = ({spots}) => {
    const {spotId} = useParams();
    const spotObj = useSelector(state=>state.spots)
    let spot = spotObj[spotId]

   
    // console.log('Spot from parent component:', spot)
    // you will have spotID from spot prop here
    // it is not used for CREATE
    return (
        <SpotForm spot={spot} spots={spots} formType="Update Spot"/>
    )
}

export default EditSpotForm
