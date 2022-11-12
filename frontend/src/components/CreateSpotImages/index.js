import React, { useState, useEffect } from "react"
import { useParams, useHistory, NavLink } from "react-router-dom"
import { useSelector, dispatch, useDispatch } from "react-redux"
import { getSpotImages, createSpotImage } from "../../store/image"
import { getSpotData , getSpots } from "../../store/spot"
import "./CreateSpotImages.css"
import sumPic from "./images/sumButton2.png"
import ffErrorPic from "./images/spot-image-error-pic.jpg"
import pencilPic from "./images/pencil-edit.png"
import chocoboPic from "./images/chocobo1.jpg"
// cover photo is spot preview Image
// 5 photos max: (including spot cover photo)


const CreateSpotImages = () => {
  let {spotId} = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const spots = useSelector(state=> state.spots)
  const images = useSelector(state => Object.values(state.images))
  const sessionUser = useSelector(state=> state.session.user)
  const [coverPhotoUrl, setCoverPhotoUrl] = useState("")
  const [imageFilePath0, setImageFilePath0]= useState('')
  // const [imageFilePath1, setImageFilePath1]= useState('')
  // const [imageFilePath2, setImageFilePath2]= useState('')
  // const [imageFilePath3, setImageFilePath3]= useState('')
  const [preview0, setPreview0] = useState('')
  // const [preview1, setPreview1] = useState('')
  // const [preview2, setPreview2] = useState('')
  // const [preview3, setPreview3] = useState('')
  const [isUpdate, setIsUpdate] = useState(false)
  const [hasSubmitted, setHasSubmitted] = useState(false)

  // MAX 4: for only the images NOT preview image (there must always be 1 preview image)
  const [imageCounter, setImageCounter] = useState(0)
  const [uploadedImg, setUploadedImg] = useState(false)
  const [errors, setErrors] = useState([])
  let spot = spots[spotId]
  // will not change
  let imagesRemaining = 4 - imageCounter

  useEffect(()=> {
    if (spot){
      // setCoverPhotoUrl(images[0].url)
      setCoverPhotoUrl(spot.previewImage)
    }
  }, [spot])

  // increment this each time you upload an image
  // useEffect(()=> {
  //   setImageCounter(images.length)
  // }, [images.length])

  useEffect(()=> {
    dispatch(getSpotImages(Number(spotId)))
    dispatch(getSpots())
    // dispatch(getSpotData(spotId))
  }, [dispatch])

  useEffect(()=> {
    let errs=[]
    if (!preview0 ) errs.push("Please upload one image")
    if (images.length>=4) errs.push("Max image upload is 4. To change cover photo, please edit your spot")
    setErrors(errs)
  }, [preview0, images.length])

  useEffect(() => {
    if (!imageFilePath0){
      setPreview0(undefined)
      return
    }
    const objectUrl = URL.createObjectURL(imageFilePath0)
    // console.log('object url:', objectUrl)
    setPreview0(objectUrl)

    return () => URL.revokeObjectURL(objectUrl)
  }, [imageFilePath0])


  // useEffect(()=> {
  //   console.log("trigger PREVIEW 1 use effect")

  //   if (!imageFilePath1){
  //     setPreview1(undefined)
  //     return
  //   }
  //   const objectUrl = URL.createObjectURL(imageFilePath1)
  //   setPreview1(objectUrl)

  // return () => URL.revokeObjectURL(objectUrl)
  // }, [imageFilePath1])

  // useEffect(()=> {
  //   if (!imageFilePath2){
  //     setPreview2(undefined)
  //     return
  //   }
  //   const objectUrl = URL.createObjectURL(imageFilePath2)
  //   setPreview2(objectUrl)

  // return () => URL.revokeObjectURL(objectUrl)
  // }, [imageFilePath2])

  // useEffect(()=> {
  //   if (!imageFilePath3){
  //     setPreview3(undefined)
  //     return
  //   }
  //   const objectUrl = URL.createObjectURL(imageFilePath3)
  //   setPreview3(objectUrl)
  // return () => URL.revokeObjectURL(objectUrl)

  // }, [imageFilePath3])


  const onSelectFile = (e) => {
    // console.log('i in select file function:...',i)
    let file = e.target.files[0]
    if (!e.target.files || e.target.files.length === 0) {
      setImageFilePath0(undefined)
      return
    }
    setImageFilePath0(file)
    // if (i==0) setImageFilePath0(file)
    // if (i==1) setImageFilePath1(file)
    // if (i==2) setImageFilePath2(file)
    // if (i==3) setImageFilePath3(file)
    return
  }

  const timeSinceUpdate = (date) => {
    var seconds = Math.floor((new Date() - date) / 1000);

    var interval = seconds / 31536000;

    if (interval > 1) {
      return Math.floor(interval) + " years";
    }
    interval = seconds / 2592000;
    if (interval > 1) {
      return Math.floor(interval) + " months";
    }
    interval = seconds / 86400;
    if (interval > 1) {
      return Math.floor(interval) + " days";
    }
    interval = seconds / 3600;
    if (interval > 1) {
      return Math.floor(interval) + " hours";
    }
    interval = seconds / 60;
    if (interval > 1) {
      return Math.floor(interval) + " minutes";
    }
    return Math.floor(seconds) + " seconds";
  }

  const handleSubmit = (e) => {
    // THIS is for create
    e.preventDefault()
    setHasSubmitted(true)
    if (errors.length > 0) {
      alert("Cannot submit form!")
      return
    }
    let image = {
      url: preview0
    }
    dispatch(createSpotImage(spotId, image))
    dispatch(getSpotImages(spotId))
    alert("Successfully submitted!")
    setHasSubmitted(false)
    // history.push(`/spots/${spotId}`)
    return
  }

  // console.log("image count:", imageCounter)
  return (
    <div className="create-spot-images-main-container">
      {errors.length>0 && hasSubmitted && (
        <div className="validation-errors-create-update-review">
            <ul className='validation-errors ' style={{paddingLeft: "0px"}}>
                {errors.map((error) => (
                <li style={{listStyle: "none"}} key={error}> {error}</li>
                ))}
            </ul>
        </div>
      )}
      <div className="create-spot-images-title-container">
        <div>Photos</div>
        <div>Add photos that show guests what your place looks like.</div>
      </div>
      <form className="create-spot-images-content-container" onSubmit={handleSubmit}>
        <div className="create-spot-images-cover-photo-main-container">
          <div className="create-spot-images-cover-photo-content-container">
            <div className="create-spot-images-cover-photo-picture-container">
              <img src={coverPhotoUrl} className="create-spote-images-cover-pic"
                onError={e => { e.currentTarget.src = ffErrorPic; }}
              />
            </div>
            <div className="create-spot-images-cover-photo-right-pane-text-container">
              <div className="create-spot-images-cover-photo-title">Cover photo</div>
              {spot && (
                <div className="create-spot-images-cover-photo-updated-text">Updated {timeSinceUpdate(new Date(spot.updatedAt))} ago</div>
              )}
            </div>
          </div>
        </div>
        <div className="create-spot-images-grid-container">
          {(images.length || preview0) && images.map(image =>(
            <div style={{height: "100%", width: "100%", position:"relative"}}>
              <img key={image.id} className="create-spot-images-image-card" src={image.url}
                onError={e => { e.currentTarget.src =
                ffErrorPic; }}
              />
              <NavLink to={{pathname: `/spots/${spotId}/images/${image.id}/edit`}}>
                <div style={{zIndex: '3'}} className='create-spot-images-footer-edit-button'>
                  <img style={{width: "50px", height: "50px"}}src={pencilPic}
                    />
                </div>
              </NavLink>
            </div>
          ))}
          {(images.length == 0  && !preview0 ) && (
            <div>
              <div className="create-spot-images-no-images-card">
                No images uploaded
                <img style={{height: "70px", width: "50px", marginLeft: '.5em'}} src={chocoboPic}
                />
              </div>
            </div>
          )}
          {/* {Array(imagesRemaining).fill(1).map((item, i) => ( */}
            <div style={{position:"relative"}} className="create-spot-images-footer-upload-new-image">
              <input
                className="create-spot-image"
                type="file"
                onChange={onSelectFile}
                />
              <div className="create-spot-fake-file">
                <img src={sumPic} style={{marginBottom:"15px"}}/>
                Add photos
              </div>
              {/* {i==0? preview0: i==1? preview1: i==2? preview2 : preview3 && (
                <img style={{zIndex: '2'}} className="create-spot-images-footer-rendered-image" id="spot-pic-image"
                  src={
                    i==0? preview0: i==1? preview1: i==2? preview2 : preview3
                  }
                  onError={e => { e.currentTarget.src =
                  ffErrorPic; }}
                />
              )} */}
              {preview0 && (
                <img style={{zIndex: '2'}} className="create-spot-images-footer-rendered-image" id="spot-pic-image"
                  src={
                   preview0
                  }
                  onError={e => { e.currentTarget.src =
                  ffErrorPic; }}
                />
              )}
              {/* {preview0 && (
                <div style={{zIndex: '3'}} className='create-spot-images-footer-edit-button'>
                  <img style={{width: "50px", height: "50px"}}src={pencilPic}/>
                </div>
                )} */}
            </div>
          {/* )) } */}
        </div>
        <button type='submit' className="create-spot-photo-button"> Submit </button>
      </form>
    </div>
  )
}

export default CreateSpotImages
