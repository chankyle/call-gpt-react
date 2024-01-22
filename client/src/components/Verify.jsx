import { useState } from "react";
import axios from "axios";

const Verify = () => {
  const [phoneNumber, setPhoneNumber] = useState("+16477782422");
  const [channel, setChannel] = useState("sms");
  const [code, setCode] = useState("");
  const [lookupResponse, setLookupResponse] = useState("");
  const [verifyResponse, setVerifyReponse] = useState("");
  const [sendVerifyResponse, setSendVerifyResponse] = useState("");

  const sendVerification = () => {
    axios
      .get(
        "http://localhost:3001/security/verify/" + phoneNumber + "/" + channel
      )
      .then((response) => {
        console.log(response.data);
        setSendVerifyResponse(response.data);
      })
      .catch((e) => console.log(e));
  };

  const checkVerification = () => {
    axios
      .get("http://localhost:3001/security/verify-check/" + code)
      .then((response) => {
        console.log(response.data);
        setVerifyReponse(response.data);
      })
      .catch((e) => console.log(e));
  };

  const lookUp = () => {
    console.log(phoneNumber);
    axios
      .get("http://localhost:3001/security/lookup-line-type/" + phoneNumber)
      .then((response) => {
        console.log(response.data);
        setLookupResponse(response.data);
      })
      .catch((e) => console.log(e));
  };

  return (
    <div>
      <h1>Account Security Demo</h1>
      <div className="form-group">
        <label htmlFor="phoneNumber">Phone Number</label>
        <input
          id="phoneNumber"
          className="form-control"
          value={phoneNumber}
          placeholder="+1647..."
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
      </div>
      <button onClick={lookUp} className="btn btn-primary">
        Lookup Number
      </button>
      <div>
        {lookupResponse ? (
          <div className="alert alert-primary" role="alert">
            Lookup returned the following for {lookupResponse?.phoneNumber}{" "}
            <br />
            Carrier is {lookupResponse.lineTypeIntelligence?.carrier_name}
            <br />
            Line type is {lookupResponse.lineTypeIntelligence?.type}
          </div>
        ) : null}
      </div>
      <div className="form-group">
        <label htmlFor="channel">Channel</label>
        <select
          className="form-control"
          id="channel"
          onChange={(e) => setChannel(e.target.value)}
        >
          <option>sms</option>
          <option>call</option>
          <option>whatsapp</option>
          {/* <option>email</option> */}
        </select>
      </div>

      <button onClick={sendVerification} className="btn btn-primary">
        Send Verification
      </button>
      <div>
        {sendVerifyResponse ? (
          <div className="alert alert-success" role="alert">
            Success! Your verification is: {sendVerifyResponse.status}
          </div>
        ) : null}
      </div>
      <div className="form-group">
        <label htmlFor="code">Input Code</label>
        <input
          id="code"
          className="form-control"
          value={code}
          placeholder="Enter OTP"
          onChange={(e) => setCode(e.target.value)}
        />
      </div>
      <button onClick={checkVerification} className="btn btn-primary">
        Check Verification
      </button>
      <div>
        {verifyResponse.status === "approved" ? (
          <div className="alert alert-success" role="alert">
            Success your OTP code was {verifyResponse.status}
          </div>
        ) : null}
        {verifyResponse.status === "pending" ? (
          <div className="alert alert-danger" role="alert">
            Please try again your OTP verification is still{" "}
            {verifyResponse.status}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Verify;
