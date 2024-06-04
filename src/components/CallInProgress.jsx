import React from "react";

const CallInProgress = ({ onEndCall }) => {
  return (
    <div className="call-in-progress-container">
      <p>Ringing...</p>
      <button onClick={onEndCall}>End Call</button>
    </div>
  );
};

export default CallInProgress;
