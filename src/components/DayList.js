import DayListItem from './DayListItem'
import React from 'react'

export default function DayList(props) {

  const daysArr = props.days.map((day) => {
    return (
      <DayListItem 
        // in React, we need to uniquely identify each component with a key prop!! MUST
        key={day.id} 
        name={day.name} 
        spots={day.spots} 
        selected={day.name === props.day} 
        setDay={props.setDay} 
      />
    )
  })
  
  return (
    <ul>
      {daysArr}
    </ul>
  )
}