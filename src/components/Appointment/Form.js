import React, { useState } from "react";
import className from 'classnames';
import Button from "components/Button";
import InterviewerList from "../InterviewerList"
import { action } from "@storybook/addon-actions/dist/preview";

export default function Form(props) {

  //these are the hooks. Check devtool React components
  const [name, setName] = useState(props.name || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [error, setError] = useState("");

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

  const validate = () => {
    if (name === "") {
      setError("Student name cannot be blank!!!!!"); // this will still pass the test 
      return;
    }
    setError("");
    props.onSave(name, interviewer);
  }

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        {/* preventDefault to not get an error on Enter */}
        <form onSubmit={event => event.preventDefault()} autoComplete="off">
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            value={name}
            onChange={event => setName(event.target.value)}
            data-testid="student-name-input"  //to test jest 
          />
          <section className="appointment__validation">{error}</section>
        </form>
        <InterviewerList 
          interviewers={props.interviewers} 
          value={interviewer} ß
          onChange={setInterviewer} 
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button onClick={cancel} danger>Cancel</Button>
          <Button onClick={validate} confirm>Save</Button>
        </section>
      </section>
    </main>  
  )
}