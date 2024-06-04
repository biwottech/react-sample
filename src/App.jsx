import React, { useState, useEffect } from "react";
import PhoneNumberInput from "./components/PhoneNumberInput";
import CallInProgress from "./components/CallInProgress";
import axios from "axios";
import "./App.css";
const server_url = "http://localhost:5000";

function App() {
  const [status, setStatus] = useState("idle");

  const handleErrors = (error) => {
    {
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log("Error", error.message);
      }
      console.log(error.config);
    }
  };

  async function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async function getCallStatus(call_uuid) {
    var response = await axios
      .get(`${server_url}/call-status?id=${call_uuid}`)
      .catch(handleErrors);
    let status = response.data.response.status;
    return status !== "completed" ? "ringing" : "idle";
  }

  const handleCall = async (phoneNumber) => {
    setStatus("ringing");
    var response = await axios
      .post(`${server_url}/call`, { phoneNumber })
      .catch(handleErrors);
    let uuid = response.data.call.uuid;
    setStatus(await getCallStatus(uuid));

    while (status !== "idle") {
      await sleep(5000);
      setStatus(await getCallStatus(uuid));
    }
  };

  const handleCancel = () => {
    console.log("Handling cancel");
    setStatus("idle");
  };

  const handleEndCall = () => {
    console.log("Handling end call");
    setStatus("idle");
  };

  return (
    <>
      <div className="app">
        {status === "idle" && (
          <PhoneNumberInput
            onCall={handleCall}
            onCancel={handleCancel}
          />
        )}
        {status === "ringing" && <CallInProgress onEndCall={handleEndCall} />}
        {}
      </div>
    </>
  );
}

export default App;
