import React, { useState, useEffect } from "react";
import axios                          from "axios";


export default function useApplicationData() {

  // HELPER: remainingSpots Function -----------------------------------------
  const spotsRemain = (id, change) => {
    const daysArr = [...state.days]                 // initial array
    daysArr.map((day) => {
      for (const appointment of day.appointments) { // loop through appointments 
        if (appointment === id) {                   // match appointment and ID
          day.spots = day.spots + change;           // both increment and decrement
        } 
      }
      return day.spots;
    })
    return daysArr;
  }

  // STATE -------------------------------------------------------------------
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  });

  // setDay ------------------------------------------------------------------
  const setDay = day => setState({ ...state, day });

  useEffect(() => {
    const getDays = "http://localhost:8001/api/days"
    const getAppt = "http://localhost:8001/api/appointments"
    const getIntv = "http://localhost:8001/api/interviewers"
    
    Promise.all([
      axios.get(getDays),
      axios.get(getAppt),
      axios.get(getIntv)
    ])
    .then((all) => {
      setState(prev => ({
        ...prev,
        days:         all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      }))
    })
  }, []);


  // bookInterview -----------------------------------------------------------
  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.put(`/api/appointments/${id}`, {interview} )
    .then((response) => {
      spotsRemain(id, -1);     // DECREMENT -1 helper function
      setState({
        ...state, 
        appointments
      });
    }) 
  }

  // cancelInterview -----------------------------------------------------------
  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.delete(`/api/appointments/${id}`, {interview: null} )
    .then((response) => {
      spotsRemain(id, 1);      // INCREMENT +1 helper function
      setState({
        ...state, 
        appointments
      });
    }) 
  }

  return { state, setDay, bookInterview, cancelInterview }
}

