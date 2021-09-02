import React, { useState } from "react";
import className from 'classnames';
import Button from "components/Button";
import InterviewerList from "../InterviewerList"
import { action } from "@storybook/addon-actions/dist/preview";

export default function Form(props) {

  //these are the hooks. Check devtool React components
  const [name, setName] = useState(props.name || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);

  //First create: Reset button onCancel
  const reset = () => {
    setName("");
    setInterviewer(null);
  }

  //onCancel = reset() and cancel()
  const cancel = () => {
    reset();
    props.onCancel();
  }

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        {/* preventDefault to not get an error on Enter */}
        <form onSubmit={event => event.preventDefault()} autoComplete="off">
          <input
            className="appointment__create-input text--semi-bold"
            name={name}
            type="text"
            placeholder="Enter Student Name"
            value={name}
            onChange={event => setName(event.target.value)}
          />
        </form>
        <InterviewerList 
          interviewers={props.interviewers} 
          value={interviewer} 
          onChange={setInterviewer} 
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button onClick={cancel} danger>Cancel</Button>
          <Button onClick={props.onSave} confirm>Save</Button>
        </section>
      </section>
    </main>  
  )
}