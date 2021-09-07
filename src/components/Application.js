import React                from "react";
import DayList              from "./DayList";
import Appointment          from "components/Appointment/index";
import useApplicationData   from "hooks/useApplicationData";
import { 
  getAppointmentsForDay, 
  getInterview, 
  getInterviewersForDay }   from "helpers/selectors";
import "components/Application.scss";

export default function Application(props) {
  const { state, setDay, bookInterview, cancelInterview } = useApplicationData();
  
  const dailyAppointments = getAppointmentsForDay(state, state.day);
  const interviewers      = getInterviewersForDay(state, state.day);
  
    
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
            days  ={state.days} // new state object
            day   ={state.day}  // new state object
            setDay={setDay}     // new state object
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

