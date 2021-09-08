/*
  We are rendering `<Application />` down below, so we need React.createElement
*/
import React from "react";

/*
  We import our helper functions from the react-testing-library
  The render function allows us to render Components
*/
import { render } from "@testing-library/react";

/*
  We import the component that we are testing
*/
import Appointment from "../Appointment/index"

/*
  A test that renders a React Component
*/
describe("Appointment", () => {
  it("renders without crashing", () => { // test() is same as it()
    render(<Appointment />);
  });

  // Mock functinos using jest.fn()
  it("doesn't call the function", () => {
    const fn = jest.fn();
    expect(fn).toHaveBeenCalledTimes(0);
  });

  it("calls the function", () => {
    const fn = jest.fn();
    fn();
    expect(fn).toHaveBeenCalledTimes(1);
   });

   it("calls the function with specific arguments", () => {
    const fn = jest.fn();
    fn(100);
    expect(fn).toHaveBeenCalledWith(100);
   });

   it("uses the mock implementation", () => {
    const fn = jest.fn((a, b) => 42);
    fn(1, 200000000000000000000);
    expect(fn).toHaveReturnedWith(42);
   });

});