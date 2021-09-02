import React from "react";
import className from 'classnames';
import Button from "components/Button";
import InterviewerList from "../InterviewerList"
import { action } from "@storybook/addon-actions/dist/preview";

export default function Form(props) {

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off">
          <input
            className="appointment__create-input text--semi-bold"
            name={props.name}
            type="text"
            placeholder="Enter Student Name"
            /*
              This must be a controlled component
            */
          />
        </form>
        <InterviewerList 
          interviewers={props.interviewers} 
          value={props.interviewer} 
          onChange={action("onChange")} 
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button onClick={props.onCancel} danger>Cancel</Button>
          <Button onClick={props.onSave} confirm>Save</Button>
        </section>
      </section>
    </main>  
  )
}