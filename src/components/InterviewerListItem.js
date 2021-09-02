import React from "react";
import "components/InterviewerListItem.scss";
import classNames from "classnames";

export default function InterviewerListItem(props) {

  const interviewerClass = classNames(
      "interviewers__item",                               // define unselected
    { "interviewers__item--selected": props.selected }    // define selected
    )

  return (
    <li 
      className={interviewerClass}
      onClick={props.setInterviewer}         // set State onClick
      // onClick={event => props.setItem(props.id)}
    >
      <img
        className="interviewers__item-image" // refer to SCSS
        src={props.avatar}                   // in the storybook index.js
        alt={props.name}                     // in the storybook index.js
      />
      {props.selected && props.name}         
    </li>
  );

}