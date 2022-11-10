import { createContext, useContext, useEffect, useState } from 'react';
import React from "react"

export const TriggerUpdateReview = createContext();

export const useTriggerUpdateReview = () => useContext(TriggerUpdateReview);

export default function TriggerUpdateReviewProvider({children}){
  const [triggerUpdate, setTriggerUpdate] = useState(true)
  // useEffect(()=>{
  //   console.log('trigger countdown in provider:', triggerUpdate)
  // }, [triggerUpdate])

  return (
    <TriggerUpdateReview.Provider
      value={{triggerUpdate, setTriggerUpdate}}
    >
      {children}
    </TriggerUpdateReview.Provider>
  )
}
