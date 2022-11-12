import { useParams, useHistory, NavLink, useLocation } from "react-router-dom"
import React,{useState, useEffect} from "react"
import { useDispatch, useSelector } from "react-redux";
import { updateSpotImage, getSpotImages, deleteSpotImage } from "../../store/image";
import pencilPic from "./images/pencil-edit.png"
import "./UpdateSpotImage.css"
import ffErrorPic from "./images/spot-image-error-pic.jpg"
import DeleteSpotImageModal from "../DeleteSpotImageModal";

const UpdateSpotImage = () => {
  const {spotId, imageId} = useParams();
  // const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();
  const imageData = useSelector(state=> state.images)
  const [photoNum, setPhotoNum] = useState("")
  const [imageFilePath, setImageFilePath] = useState('')
  const [preview, setPreview] = useState("")
  const [hasSubmitted, setHasSubmitted] = useState(false)
  const [deleteModal, setDeleteModal] = useState(false)
  const [errors, setErrors] = useState([])
  const images = Object.values(imageData)
  const image = imageData[imageId]

  useEffect(()=> {
    let errs = []
    if (!preview) errs.push("Please select another image to display")
    setErrors(errs)
  }, [preview])


  useEffect(()=> {
    dispatch(getSpotImages(spotId))
  }, [])

  useEffect(()=> {
    if (images.length==0 || !image) return
    setPhotoNum(images.map(image=> image.id).indexOf(Number(imageId)))
  }, [images.length])

  useEffect(() => {
    if (!imageFilePath){
      setPreview(undefined)
      return
    }

    const objectUrl = URL.createObjectURL(imageFilePath)
    // console.log("objectURL in update:", objectUrl)
    setPreview(objectUrl)

  return () => URL.revokeObjectURL(objectUrl)
  }, [imageFilePath])

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
  // console.log('photo numberrr:', photoNum)

  const onSelectFile = (e) => {
    let file = e.target.files[0]
    if (!e.target.files || e.target.files.length === 0) {
      setImageFilePath(undefined)
      return
    }
    setImageFilePath(file)
    return
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setHasSubmitted(true)
    if (errors.length>0){
      alert("Cannot submit form!")
      return
    }

    let image = {
      url: preview
    }

    dispatch(updateSpotImage(imageId, image))
    alert("Your photo has been successfully updated!")
    setHasSubmitted(false)
    history.push(`/spots/${spotId}`)
    return

  }


  return (
    <div className="update-spot-image-main-container-with-back-button">
      <div className="update-spot-image-back-to-all-photos-container">
        <div style={{height: "100%", display: "flex", alignItems: "center"}}>
          <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-label="Previous" role="img" focusable="false" style={{display: "block", fill: "none", height: "12px", width: "12px", stroke: "currentcolor", strokeWidth: "4", overflow: "visible"}}><g fill="none"><path d="m20 28-11.29289322-11.2928932c-.39052429-.3905243-.39052429-1.0236893 0-1.4142136l11.29289322-11.2928932"></path></g></svg>
        </div>
        <div style={{height: "100%", display: "flex", alignItems: "center"}}>
          <NavLink to={`/spots/${spotId}/images/new`} className="navlink">
            <div style={{height: "fit-content"}}>Back to all photos </div>
          </NavLink>
        </div>
      </div>
      {errors.length>0 && hasSubmitted && (
        <div className="validation-errors-create-update-review">
            <ul className='validation-errors ' style={{paddingLeft: "0px"}}>
                {errors.map((error) => (
                <li style={{listStyle: "none"}} key={error}> {error}</li>
                ))}
            </ul>
        </div>
    )}
      <form className="update-spot-image-main-container" onSubmit={handleSubmit}>
        <div className="update-spot-image-left-pane">
          {image && (
            <img src={!preview? image.url: preview} className="update-spot-image-pic"
              onError={e => { e.currentTarget.src =
              ffErrorPic; }}
            />
          )}
          <div style={{position:"relative"}} className="edit-spot-image-input-edit-button-container">
            <div style={{zIndex: '3'}} className='edit-spot-image-button'>
              <img style={{width: "50px", height: "50px"}}src={pencilPic}/>
            </div>
            <input type="file" onChange={onSelectFile} className="edit-spot-button-input-file-upload-button"/>
          </div>
        </div>
        <div className="update-spot-image-right-pane">
          <div style={{paddingLeft: '1em'}}>Photo {photoNum} of {images.length + 1}</div>
          {image && (<div style={{paddingLeft: '1em'}}> Updated {timeSinceUpdate(new Date(image.updatedAt))} ago</div>)}
          <div className="update-spot-image-update-delete-container">
            <button className="update-spot-photo-button" type="submit">Update Photo</button>
            <div className="delete-spot-photo-button" onClick={()=> setDeleteModal(true)}>Delete Photo</div>
          </div>
          {deleteModal && <DeleteSpotImageModal setDeleteModal={setDeleteModal}/>}
        </div>
      </form>
    </div>
  )
}

export default UpdateSpotImage
