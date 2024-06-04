const server_url = "http://localhost:5000";
import axios from "axios";
import { useState } from "react";

function handleErrors(error) {
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
}

async function MakeCall(data) {
  return await axios.post(`${server_url}/call`, { data }).catch(handleErrors);
}

export default MakeCall;
