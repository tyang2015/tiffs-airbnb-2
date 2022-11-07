import React,{useState, useEffect} from "react"
import { useDispatch, useSelector } from "react-redux";
import "./GetUserReviews.css"
import { getUserReviews } from "../../store/review";
import { NavLink } from "react-router-dom";

const GetUserReviews = () => {
    const dispatch = useDispatch();
    const userReviews = useSelector(state=> Object.values(state.reviews))
    // convert the date to full month year
    for (let i=0;i<userReviews.length;i++){
        let review = userReviews[i]
        let newDate = new Date(review.createdAt)
        let month = newDate.toLocaleString('default', {month: 'long'});
        let finalDate = month.concat(" ").concat(newDate.getFullYear().toString())
        review.createdAt= finalDate
    }

    useEffect(()=>{
        // console.log('todo./.')
        // await dispatch()
        dispatch(getUserReviews())
    }, [dispatch])
    return (
        <>
            <div>
                <h1>Reviews by you</h1>
            </div>
            <div>
                <h2>Reviews to Write</h2>
            </div>
            <div className="past-reviews-main-container">
                <h2>Past Reviews You've Written</h2>
                <div className="past-reviews-content-container">
                    {userReviews.length>0 && userReviews.map(review=>(
                        <div key={review.id} className="review-card-container">
                            {review && review.Spot && (
                                <h3>Review for Owner {review.Spot.ownerId}</h3>
                            )}
                            <p>{review.review}</p>
                            <p>{review.createdAt}</p>
                            <div className= 'edit-review-button-container'>
                                <NavLink to={`/reviews/${review.id}`}>
                                    <button className='edit-review-button'>Edit</button>
                                </NavLink>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default GetUserReviews
