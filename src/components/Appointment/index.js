import React, { Fragment } from "react";
import classNames from 'classnames';
import "components/Appointment/styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import useVisualMode from "hooks/useVisualMode";


export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
    );
    
  function save(name, interviewer) {
    console.log('interviewerrrrr', interviewer);
    transition(SAVING)
    const interview = {
      student: name,
      interviewer
    };
    props.bookInterview(props.id, interview)
    .then((response) => {
      transition(SHOW);
    })
  };

  function deleteAppt() {
    transition(DELETING);
    props.cancelInterview(props.id)
    .then(response => {
      transition(EMPTY);
    })
  }

  function confirming() {
    transition(CONFIRM);
  }

  return (
    <article className="apoointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === CREATE && <Form interviewers={props.interviewers} onCancel={() => back()} onSave = {save} />}
      {mode === SHOW && <Show student={props.interview.student} interviewer={props.interview.interviewer} onDelete={confirming}/>}
      {mode === SAVING && <Status message="Saving..." />}
      {mode === DELETING && <Status message="Deleting..." />}
      {mode === CONFIRM && <Confirm message="Are you sure you would like to delete?" onCancel={() => back()} onConfirm={deleteAppt} />}
    </article>
  );
}