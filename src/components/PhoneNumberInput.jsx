import React, { useState } from "react";
const PhoneNumberInput = ({ onCall, onCancel }) => {
  const [phoneNumber, setPhoneNumber] = useState("0727143163");
  const [countryCode, setCountryCode] = useState("+254");

  const [error, setError] = useState("");

  const validatePhoneNumber = (number) => {
    const phoneRegex = /^[0-9]{10}$/;
    return phoneRegex.test(number);
  };

  const handleCall = () => {
    if (validatePhoneNumber(phoneNumber)) {
      onCall(countryCode + phoneNumber);
      // makeCalls({ phoneNumber: countryCode + phoneNumber });
      setError("");
    } else {
      setError("Invalid phone number");
    }
  };

  return (
    <div className="phone-input-container">
      <div className="country-code-input">
        <input
          type="text"
          value={countryCode}
          onChange={(e) => setCountryCode(e.target.value)}
          placeholder="Country Code"
        />
      </div>
      <div className="phone-number-input">
        <input
          type="text"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          placeholder="Enter phone number"
        />
      </div>
      {error && <p className="error">{error}</p>}
      <div className="buttons">
        <button onClick={handleCall}>Call</button>
        <button onClick={onCancel}>Cancel</button>
      </div>
    </div>
  );
};

export default PhoneNumberInput;
