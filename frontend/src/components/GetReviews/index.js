import "./GetReviews.css"
import React,{useState, useEffect} from "react"
import { useDispatch, useSelector } from "react-redux";
import  {getSpotReviews}  from "../../store/review";
import { NavLink, useParams } from "react-router-dom";
import "./GetReviews.css"
import pfp1 from "./images/pfp1.jpg"
import pfp2 from "./images/pfp2.gif"
import pfp4 from "./images/pfp4.jpg"
import pfp5 from "./images/pfp5.jpg"
import pfp6 from "./images/pfp6.jpg"
import pfp7 from "./images/pfp7.jpg"
import pfp8 from "./images/pfp8.jpg"
import pfp9 from "./images/pfp9.jpg"
import pfp10 from "./images/pfp10.jpg"
import pfp11 from "./images/pfp11.jpg"
import pfp12 from "./images/pfp12.jpg"
import pfp13 from "./images/pfp13.jpg"
import pfp14 from "./images/pfp14.jpg"
import DeleteReviewModal from "../DeleteReviewModal";
import { useTriggerUpdateReview } from "../../context/TriggerUpdateReview";
// import review from "../../../../backend/db/models/review";

// BY SPOT
const pfpUrls = [pfp1, pfp2, pfp4, pfp5, pfp6, pfp7, pfp8, pfp9, pfp10, pfp11, pfp12, pfp13, pfp14]

const GetReviews = ({spot}) =>{
    let {spotId}= useParams();
    const dispatch = useDispatch()
    let sessionUser = useSelector(state=> state.session.user)
    let reviews = useSelector(state=> Object.values(state.reviews))
    const [deleteReviewModal, setDeleteReviewModal] = useState(false)
    const [avgStarRating, setAvgStarRating] = useState('')
    // const [triggerUpdate, setTriggerUpdate] = useState(false)
    const [reviewObj, setReviewObj] = useState(null)
    const { triggerUpdate, setTriggerUpdate } = useTriggerUpdateReview();
    console.log("GET REVIEWS:", reviews)

    useEffect(()=> {
      dispatch(getSpotReviews(spotId))
    }, [dispatch])

    // FOR CREATE a review
    useEffect(()=> {
      if (reviews.length == 0){
        setAvgStarRating("No")
      }
      const getNewReviews = async () => {
        let totalStars;
        let newReviews = await dispatch(getSpotReviews(spotId)).then(data=> {
          if (!data || data.length ===0 ){
            setAvgStarRating("No")
            return
          }
          console.log("DATA.REVIEWS", data)
          return data.reviews
        })
        if (!newReviews){
          return
        }
        let allRatings = newReviews.map(review => review.stars)
        let userIds = newReviews.map(review=> review.user_id)
        if (allRatings && allRatings.length> 0){
          totalStars = allRatings.reduce( (accum, cur)=> accum + cur)
        } else {
          setAvgStarRating("No")
        }
        let avgRating = (totalStars/(allRatings.length)).toFixed(2)
        setAvgStarRating(avgRating)
        if (userIds?.length>0 && userIds.includes(sessionUser.id)) {
          alert("Looks like you have already submitted a review. Only new customers can submit a review.")
        }
      }
      getNewReviews()
    } , [reviews?.length])

      // for updating a review, only avgRating should change
  useEffect(()=> {
    console.log("USE EFFECT TRIGGERED after update review")
    const updateRating = async ()=> {
      let newReviews = await dispatch(getSpotReviews(spotId)).then(data=>{
        return data.reviews
      })
      let totalStars;
      let allRatings = newReviews.map(review => review.stars)
      if (allRatings && allRatings.length> 0){
        totalStars = allRatings.reduce( (accum, cur)=> accum + cur)
      } else {
        setAvgStarRating("No")
      }
      // console.log('total stars insideL', totalStars)
      let avgRating = (totalStars/(allRatings.length)).toFixed(2)
      setAvgStarRating(avgRating)

    }
    updateRating()

  }, [triggerUpdate])



    const getDate = (dateStr) => {
      let createdTimeObj = new Date(dateStr)
      let convertedLocalTime = createdTimeObj.toLocaleString('en-US', {
        month: "long",
        year: "numeric"
      })
      return convertedLocalTime
    }
    console.log('REVIEWS FOR SPOT::', reviews)
    console.log("user:", sessionUser)

    const calcNewRating = () => {

    }

    return (
      <div>
        <div className="review-header-container">
          <div className="review-header-rating-container">
            <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" style={{height: "100%", display: 'flex', alignItems: 'center', display: "block", height: "16px", width: "16px", fill: "currentcolor"}}><path d="M15.094 1.579l-4.124 8.885-9.86 1.27a1 1 0 0 0-.542 1.736l7.293 6.565-1.965 9.852a1 1 0 0 0 1.483 1.061L16 25.951l8.625 4.997a1 1 0 0 0 1.482-1.06l-1.965-9.853 7.293-6.565a1 1 0 0 0-.541-1.735l-9.86-1.271-4.127-8.885a1 1 0 0 0-1.814 0z" fill-rule="evenodd"></path></svg>
            {/* {spot.avgStarRating==='NaN'? "New": spot.avgStarRating} • */}
            {avgStarRating} •
          </div>
          <div>
            {reviews.length>0? reviews.length: 0} reviews
          </div>
        </div>
        <div className="spot-reviews-main-content-container">
          {reviews.length> 0 && reviews.map((review, i)=> (
            <div key={review.id} className="spot-reviews-card-container">
              <div className="spot-reviews-card-container-top-row-reviewer-info">
                <img src={pfpUrls[i%pfpUrls.length]} className='review-pfp'/>
                <div className="spot-reviews-card-container-top-row-reviewer-info-right-container">
                  <div style={{width: "100%", textOverflow:"ellipsis"}}>
                    {(<div>{ review?.User?.firstName}</div>)}
                  </div>
                  <div style={{width: "100%", textOverflow:"ellipsis"}}>
                    {getDate(review?.createdAt)}
                  </div>
                </div>
                {(sessionUser && sessionUser.id == review.userId ) && (
                  <div className="update-delete-review-container">
                    <div className="review-button-container">
                      <NavLink to={{pathname:`/spots/${spotId}/reviews/${review?.id}`, state: {review}}}>
                        <i class="fa-solid fa-pen-to-square"></i>
                      </NavLink>
                    </div>
                    <div className="review-button-container">
                      <i class="fa-solid fa-trash-can" onClick={()=> {
                        setDeleteReviewModal(true)
                        setReviewObj(review)
                      }}></i>
                    </div>
                  </div>
                )}
                {deleteReviewModal && (<DeleteReviewModal review={reviewObj} setDeleteReviewModal={setDeleteReviewModal}/>)}
              </div>
              <div className="spot-reviews-card-container-bottom-row-review" >
                  <div>{review.review}</div>
              </div>
              </div>

          ))}
        </div>
        {reviews.length == 0 && (
          <div className="spot-reviews-main-container-no-reviews">
            <div>
              <i className="fa-solid fa-book-open-cover"></i>
            </div>
              No Reviews
          </div>
        )}
        {sessionUser && sessionUser.id != spot.ownerId && (
          <div className="create-review-container">
            <NavLink to={`/spots/${spotId}/reviews/new`}>
              <div style={{marginTop: "2em", display: 'flex', textAlign: "center"}} className="spot-footer-button create-a-review-button">
                Create a Review
              </div>
            </NavLink>
          </div>
        )}
      </div>


        // <div>
        //     <div  className="reviews-main-container">
        //         <div className="review-header-container">
        //           <div className="review-header-rating-container">
        //             <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" style={{height: "100%", display: 'flex', alignItems: 'center', display: "block", height: "16px", width: "16px", fill: "currentcolor"}}><path d="M15.094 1.579l-4.124 8.885-9.86 1.27a1 1 0 0 0-.542 1.736l7.293 6.565-1.965 9.852a1 1 0 0 0 1.483 1.061L16 25.951l8.625 4.997a1 1 0 0 0 1.482-1.06l-1.965-9.853 7.293-6.565a1 1 0 0 0-.541-1.735l-9.86-1.271-4.127-8.885a1 1 0 0 0-1.814 0z" fill-rule="evenodd"></path></svg>
        //             {spot.avgStarRating==='NaN'? "New": spot.avgStarRating} •
        //           </div>
        //           <div>
        //             {reviews.length>0? reviews.length: 0} reviews
        //           </div>
        //         </div>


        //         {reviews.length>0 && (
        //         <div className="spot-reviews-main-content-container">
        //           {reviews.map(review=> (
        //             <div key={review.id} className="spot-reviews-card-container">
        //               <div className="spot-reviews-card-container-top-row-reviewer-info">
        //                 <img src={pfpUrls[Math.floor(Math.random()* pfpUrls.length)]} className='review-pfp'/>
        //                 <div className="spot-reviews-card-container-top-row-reviewer-info-right-container">
        //                   <div style={{width: "100%", textOverflow:"ellipsis"}}>
        //                     {review.User.firstName}
        //                   </div>
        //                   <div style={{width: "100%", textOverflow:"ellipsis"}}>
        //                     {getDate(review.createdAt)}
        //                   </div>
        //                 </div>
        //                 {sessionUser.id == review.userId && (
        //                   <div className="update-delete-review-container">
        //                     <div className="review-button-container">
        //                       <NavLink to={{pathname:`/spots/${spot.id}/reviews/${review.id}`, state: {review}}}>
        //                         <i class="fa-solid fa-pen-to-square"></i>
        //                       </NavLink>
        //                     </div>
        //                     <div className="review-button-container">
        //                       <i class="fa-solid fa-trash-can" onClick={()=> {
        //                         setDeleteReviewModal(true)
        //                         setReviewObj(review)
        //                       }}></i>
        //                     </div>
        //                   </div>
        //                 )}
        //                 {deleteReviewModal && (<DeleteReviewModal review={reviewObj} setDeleteReviewModal={setDeleteReviewModal}/>)}
        //               </div>
        //               <div className="spot-reviews-card-container-bottom-row-review" >
        //                   <div>{review.review}</div>
        //               </div>
        //             </div>
        //           ))}
        //         </div>
        //         )}
        //         {reviews.length == 0 && (
        //           <div className="spot-reviews-main-container-no-reviews">
        //             <div>
        //               <i className="fa-solid fa-book-open-cover"></i>
        //             </div>
        //               No Reviews
        //           </div>
        //         )}
        //         {sessionUser.id != spot.ownerId && (
        //           <div className="create-review-container">
        //             <NavLink to={`/spots/${spotId}/reviews/new`}>
        //               <div className="spot-footer-button create-a-review-button">
        //                 Create a Review
        //               </div>
        //             </NavLink>

        //           </div>
        //         )}
        //     </div>
        // </div>
    )
}

export default GetReviews
