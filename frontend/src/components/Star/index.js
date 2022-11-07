import { FaStar } from "react-icons/fa";
import React from "react"
import "./Star.css"


const Star = ({starNum, filled, value, onClick, onMouseEnter, onMouseLeave}) => {
    return (
        <label>
          <input type='radio' id='rating' required="required"/>
          <FaStar color={filled? "orange": "lightgray"}
              onClick={onClick}
              // onChange={onClick}
              value={value}
              className='star'
              id='star'
              onMouseEnter={onMouseEnter}
              onMouseLeave={onMouseLeave}
              style={{ marginLeft: starNum>0? "20px": "0"}}
          />
        </label>
    )
}
 export default Star
