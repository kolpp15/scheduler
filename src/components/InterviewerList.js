import InterviewerListItem from "./InterviewerListItem";
import "./InterviewerList.scss";
import React from 'react';

export default function InterviewerList(props) {

  const interviewerArr = props.interviewers.map((interviewer) => {
    return (
      <InterviewerListItem
        // id={interviewer.id}
        key={interviewer.id}
        name={interviewer.name}
        avatar={interviewer.avatar}
        selected={interviewer.id === props.value}
        setInterviewer={event => props.onChange(interviewer.id)}
        // selected={interviewer.id === props.interviewer} // Interviewers && line 132 in index.js Storybook
        // setInterviewer={event => props.setInterviewer(interviewer.id)}
      />
    )
  })


  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4> 
      <ul className="interviewers__list">
        {interviewerArr}
      </ul>
    </section>
  )
}