import React, { Fragment } from "react";
import classNames from 'classnames';
import "components/Appointment/styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";

export default function Appointment(props) {


  return (
    <article className="appointment">
      <Header time={props.time} />
                                                                {/* Set the interviewer to [0].name in the story */}
      {props.interview ? <Show student={props.interview.student} interviewer={props.interview.interviewer} /> : <Empty />}
    </article>
  )
}