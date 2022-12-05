import React, { useState, dispatch, useContext } from "react";
import OtpInput from "react-otp-input";
import { useLocation } from "react-router-dom";
// import "./index.css";

import axios from "axios";
import { GlobalContext } from "../context";
const Otp = () => {
  let { state, dispatch } = useContext(GlobalContext);
  const { state: abc } = useLocation();

  const { email } = abc;

  const [pin, setpin] = useState();
  const handleSubmit = async () => {
    try {
      let response = await axios.post(`${state.baseUrl}/verifyOtp`, {
        email: email,
        pin: pin,
      });
      console.log("response: ", response);

      // dispatch({
      //   type: "verify",
      //   payload: response.email.pin,
      // });
    } catch (e) {
      console.log("Error in api call: ", e);
    }
  };
  return (
    <>
      <h1>Enter Otp</h1>
      <div className="Otp-main">
        <OtpInput
          className="otp"
          value={pin}
          onChange={setpin}
          numInputs={4}
          separator={<span>--</span>}
        />
        <button onClick={handleSubmit} disabled={!pin}>
          SUBMIT
        </button>
      </div>
    </>
  );
};

export default Otp;
