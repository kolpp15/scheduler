import React, { useState, useEffect } from "react";
import axios from "axios";
import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "components/Appointment/index";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";


// FAKE DATA NO LONGER NEEDED w/ AXIOS API GET
// const days = [
//   {
//     id: 1,
//     name: "Monday",
//     spots: 2,
//   },
//   {
//     id: 2,
//     name: "Tuesday",
//     spots: 5,
//   },
//   {
//     id: 3,
//     name: "Wednesday",
//     spots: 0,
//   },
// ];

// const appointments = [
//   {
//     id: 1,
//     time: "12pm",
//   },
//   {
//     id: 2,
//     time: "1pm",
//     interview: {
//       student: "Lydia Miller-Jones",
//       interviewer: {
//         id: 1,
//         name: "Sylvia Palmer",
//         avatar: "https://i.imgur.com/LpaY82x.png",
//       }
//     }
//   },
//   {
//     id: 3,
//     time: "2pm",
//     interview: {
//       student: "Brian Sohn",
//       interviewer: {
//         id: 2,
//         name: "Tori Malcom",
//         avatar: "https://i.imgur.com/Nmx0Qxo.png",
//       }
//     }
//   },
//   {
//     id: 4,
//     time: "3pm",
//   },
//   {
//     id: 5,
//     time: "4pm",
//     interview: {
//       student: "Jenny Choi",
//       interviewer: {
//         id: 4,
//         name: "Cohana Roy",
//         avatar: "https://i.imgur.com/FK8V841.jpg",
//       }
//     }
//   },
// ];



export default function Application(props) {
  // const [day, setDay] = useState("Monday");
  // const [days, setDays] = useState([]);
  // const setDays = days => setState(prev => ({ ...prev, days}));

  
  // combine two states
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  });
  
  const setDay = day => setState({ ...state, day });
  const dailyAppointments = getAppointmentsForDay(state, state.day);
  const interviewers = getInterviewersForDay(state, state.day);
  
  // logging the values that we pass to it
  function bookInterview(id, interview) {
    // console.log('THIS IS THE ID: >>>', id);
    // console.log('THIS IS THE INTERVIEW: >>>', interview);

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
      setState({
        ...state, 
        appointments
      });
    }) 
  }

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
      setState({
        ...state, 
        appointments
      });
    }) 
  }
  
  const appointmentArr = dailyAppointments.map(appointment => {
    const interview = getInterview(state, appointment.interview);

    return (
      <Appointment 
        key={appointment.id} 
        {...appointment} 
        interview={interview}
        interviewers={interviewers}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
      />
    );
  });

  
  useEffect(() => {
    const getDays = "http://localhost:8001/api/days"
    const getAppt = "http://localhost:8001/api/appointments"
    const getIntv = "http://localhost:8001/api/interviewers"
    
    Promise.all([
      axios.get(getDays),
      axios.get(getAppt),
      axios.get(getIntv)
    ]).then((all) => {
      setState(prev => ({
        ...prev,
        days:         all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      }))
      // console.log('days data: ', all[0].data);
      // console.log('appt data: ', all[1].data);
      // console.log('intv data: ', all[2].data);
    })

    // axios
    //   .get(getDays).then((response) => {
    //     // setDays([...response.data])
    //   });

    // add second parameter to STOP
  }, []);



  return (
    <main className="layout">

      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />

        <hr className="sidebar__separator sidebar--centered" />

        <nav className="sidebar__menu">
          <DayList
            days={state.days} // new state object
            day={state.day}   // new state object
            setDay={setDay}   // new state object
          />
        </nav>

        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>

      <section className="schedule">
        {appointmentArr}
        <Appointment key="last" time="5pm" />

      </section>

    </main>
  );
}

