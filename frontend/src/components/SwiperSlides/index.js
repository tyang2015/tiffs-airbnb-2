import {useDispatch, useSelector} from 'react-redux'
import {useState, useEffect} from 'react'
import {getSpots} from "../../store/spot"
import {SwiperSlide, Swiper} from 'swiper/react'
import "swiper/swiper-bundle.css"
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import "./SwiperSlides.css"

const SwiperSlides = () =>{
  const dispatch = useDispatch();
  const allSpots= useSelector(state => Object.values(state.spots))
  console.log("all spots", allSpots)
  useEffect(()=> {
    dispatch(getSpots())
    // dispatch(getSpotImages(1))
  }, [dispatch])
  return (
    <div className='slides-main-container'>
      {/* <Swiper id="main"> */}
        {allSpots.length>0 && allSpots.map(spot => (
          <SwiperSlide key={spot.id}>
            <img src={spot.prevewImage}/>
          </SwiperSlide>
        ))}
      {/* </Swiper> */}
    </div>
  )

}

export default SwiperSlides
