// state.days.name === day
// state.days.appointments = state.appointments.id
// state.days.appointments = [], return empty


export function getAppointmentsForDay(state, day) {

  const dailyApptArr = [];

  state.days.forEach(stateDay => {
    if (stateDay.name === day) {
      stateDay.appointments.forEach(id => {
        dailyApptArr.push(state.appointments[id]);
      })
    }
  })
  return dailyApptArr;
}

export function getInterview(state, interview) {

  if (!interview) {
    return null;
  } else {
    return {
      student: interview.student,
      "interviewer": state.interviewers[interview.interviewer] //inside appointments object
    }
  }
}

export function getInterviewersForDay(state, day) {

  const dailyIntvArr = [];

  state.days.forEach(stateDay => {
    if (stateDay.name === day) {
      stateDay.interviewers.forEach(id => {
        dailyIntvArr.push(state.interviewers[id]);
      })
    }
  })
  return dailyIntvArr;
}