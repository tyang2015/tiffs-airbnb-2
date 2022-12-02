import React from "react"
import {useParams, useHistory} from "react-router-dom"
import {useState, useEffect} from "react"
import {useDispatch, useSelector} from "react-redux"
import Star from "../Star"
import { createSpotReview, editReview } from "../../store/review"
import "./ReviewForm.css"
import pfp1 from "./images/pfp1.jpg"
import pfp2 from "./images/pfp2.jpg"
import pfp4 from "./images/pfp4.jpg"
import pfp5 from "./images/pfp5.jpg"
import pfp6 from "./images/pfp6.jpg"
import pfp8 from "./images/pfp8.jpg"
import pfp9 from "./images/pfp9.jpg"
import pfp11 from "./images/pfp11.jpg"
import pfp13 from "./images/pfp13.jpg"
import pfp14 from "./images/pfp14.jpg"
import { useTriggerUpdateReview } from "../../context/TriggerUpdateReview"

const pfpUrls = [pfp1, pfp2, pfp4, pfp5, pfp6, pfp8, pfp9, pfp11, pfp13, pfp14 ]


const ReviewForm = ({reviews,reviewObj, spotId, formType}) => {
    const dispatch = useDispatch();
    const history= useHistory();
    const sessionUser = useSelector(state => state.session.user);
    const { triggerUpdate, setTriggerUpdate } = useTriggerUpdateReview();
    let [review, setReview] = useState(reviewObj? reviewObj.review: '')
    const [stars, setStars] = useState(reviewObj? reviewObj.stars: null);
    const [hasSubmitted, setHasSubmitted] = useState(false)
    const [hover, setHover] = useState(null);
    const [validationErrors, setValidationErrors] = useState([])

    useEffect(()=> {
      let profilePic = document.getElementById("review-pfp")
      profilePic.setAttribute('src', pfpUrls[Math.floor(Math.random()* pfpUrls.length)] )
    }, [])

    useEffect(()=>{
        let errors =[]
        if (!stars || stars<1 || stars>5) errors.push("Star rating must be integer from 1 to 5")
        if (reviews){
            for (let i = 0; i< reviews.length;i++){
                let currReview= reviews[i]
                if (!sessionUser) return
                else if (sessionUser.id === currReview.userId){
                    errors.push("User already has a review for this spot")
                }
            }
        }
        if (review.length>250) errors.push("Review must be less than 250 characters")
        setValidationErrors(errors)

    }, [review, stars])

    const handleSubmit =e=> {
        e.preventDefault();
        // alert('testing submit, not finalized')
        setHasSubmitted(true)
        if (!sessionUser){
            alert('Please login to write a review')
            return
        }
        if (validationErrors.length>0){
            alert("Cannot submit review form!")
            return
        }

        reviewObj = {
            ...reviewObj,
            stars,
            review
        }
        // console.log('review obj after revision:', reviewObj)
        if (formType==="Create Review"){
            dispatch(createSpotReview(spotId, reviewObj))
            alert('successfully submitted review!')
            setHasSubmitted(false)
            setStars(null)
            setReview('')
            history.push(`/spots/${spotId}`)
            return
        } else {
            dispatch(editReview(reviewObj))
            alert('review has been updated!')
            setTriggerUpdate(!triggerUpdate)
            setHasSubmitted(false)
            setStars(null)
            setReview('')
            history.push(`/spots/${spotId}`)
            return
        }
    }

    return (
        <>
            {validationErrors.length>0 && hasSubmitted && (
                <div className="validation-errors-create-update-review">
                    <ul className='validation-errors ' style={{paddingLeft: "0px"}}>
                        {validationErrors.map((error) => (
                        <li style={{listStyle: "none"}} key={error}> * {error}</li>
                        ))}
                    </ul>
                </div>
            )}
            {/* <div className="review-main-container"> */}
            <form onSubmit={handleSubmit} className="review-main-container">
              <div className="create-review-form-header">
                <h1 className="formtype-title">{formType}</h1>
                <img id="review-pfp" alt="Final fantasy Owner" className='review-form review-pfp'/>
              </div>
              <div className="review-form-label-textarea-container">
                  <label style={{margin: "2em 0 1.2em 0", color: "black" , fontSize: "18px", fontWeight: "bold"}} for="review-content">Leave a public review</label>
                  <textarea placeholder="Say a few words about the owner's stay"
                    type="textarea"
                    className="create-review-content"
                    id='review-content'
                    name='review-content'
                    // style={{width:"200px", height: "200px"}}
                    onChange={e=>setReview(e.target.value)}
                    value={review}
                    required={true}
                    />
              </div>
              <div style={{margin: "1.2em 0"}}>
                  {[1,2,3,4,5].map( ( ratingValue, i)=> (
                      <Star
                          value={ratingValue}
                          onClick={()=> setStars(ratingValue)}
                          filled={ratingValue <= hover || ratingValue<=stars}
                          key={ratingValue}
                          onMouseEnter={()=>setHover(ratingValue)}
                          onMouseLeave={()=>setHover(null)}
                          starNum = {i}
                      />
                  ))}
              </div>
              <button type="submit" className="submit-button">Submit review</button>
            </form>
            {/* </div> */}
        </>
    )
}

export default ReviewForm
