import { useParams } from 'react-router-dom';
// import SpoForm from './ReportForm';
import { useSelector , useDispatch} from 'react-redux';
import SpotForm from '../SpotForm';
import React from "react"
import { useEffect } from 'react';
import { getSpots } from '../../store/spot';

const EditSpotForm = () => {
    const {spotId} = useParams();
    const dispatch = useDispatch();
    const spotObj = useSelector(state=>state.spots)
    const spots = Object.values(spotObj)
    let spot = spotObj[spotId]

    // console.log('Spot from parent component:', spot)
    // you will have spotID from spot prop here
    // it is not used for CREATE
    useEffect(()=> {
      dispatch(getSpots())
    }, [dispatch])
    return (
        <SpotForm spot={spot} spots={spots} formType="Update Spot"/>
    )
}

export default EditSpotForm
