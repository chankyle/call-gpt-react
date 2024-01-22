import axios from "axios";
import { useState, useEffect } from "react";
import { getSenders } from "../hooks/useGetSenders";
import "../styles/SendSMS.css";
import MessageResponse from "./MessageResponse";

const SendSMS = (props) => {
  const [from, setFrom] = useState(null);
  const [senderOptions, setSenderOptions] = useState([
    "No toll-free numbers found",
  ]);
  const [verifications, setVerifications] = useState([]);
  const [verStatus, setVerStatus] = useState([]);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    to: "+16477782422",
    body: "Hello!",
  });

  useEffect(() => {
    getSenders()
      .then((senders) => {
        let phoneNumberArray = [];
        for (const i in senders?.data) {
          phoneNumberArray.push([
            senders.data[i].phoneNumber,
            senders.data[i].sid,
          ]);
        }
        setFrom({ from: phoneNumberArray[0] });
        setSenderOptions(phoneNumberArray);
      })
      .catch((e) => console.log(e));

    axios
      .get("http://localhost:3001/verifications/get-verifications")
      .then((verifications) => {
        let verificationArray = [];
        let verStatusArray = [];
        for (const i in verifications.data.verifications) {
          verificationArray.push(
            verifications.data.verifications[i].tollfree_phone_number_sid
          );
          verStatusArray.push(verifications.data.verifications[i].status);
        }
        setVerifications(verificationArray);
        setVerStatus(verStatusArray);
      })
      .catch((e) => console.log(e));
  }, []);

  const createOptions = (phoneNumberArray) => {
    const createOptions = phoneNumberArray.map((sender, index) => {
      if (verifications.includes(sender[1])) {
        return (
          <option key={sender[0]} value={sender[0]}>
            {sender[0]} - Verification submitted - {verStatus[index]}
          </option>
        );
      } else {
        return (
          <option key={sender[0]} value={sender[0]}>
            {sender[0]} - Please submit verification
          </option>
        );
      }
    });
    return createOptions;
  };

  const sendSMS = async (e) => {
    try {
      e.preventDefault();
      formData.from = from.from;
      const response = await axios.post(
        "http://localhost:3001/messages/send-message",
        formData
      );
      setMessage(response.data.sid);
    } catch (e) {
      console.log(e);
      setError(e.response.data);
    }
  };

  return (
    <div>
      <form onSubmit={sendSMS}>
        <div className="form-group">
          <label htmlFor="smsFrom">From</label>
          <select
            className="form-control"
            id="smsFrom"
            onChange={(e) => setFrom({ from: e.target.value })}
          >
            {createOptions(senderOptions)}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="smsTo">To</label>
          <input
            id="smsTo"
            className="form-control"
            value={formData.to}
            onChange={(e) => setFormData({ ...formData, to: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="smsBody">Body</label>
          <input
            id="smsBody"
            className="form-control"
            value={formData.body}
            onChange={(e) => setFormData({ ...formData, body: e.target.value })}
          />
        </div>
        <div>
          {error ? (
            <p>
              An error occurred: <a href={error.message}>{error.message}</a>
            </p>
          ) : null}
          {message ? <p>Message sid: {message}</p> : null}
        </div>
        <button type="submit" className="btn btn-primary">
          Send SMS
        </button>
      </form>
      <MessageResponse messageSid={message} />
    </div>
  );
};

export default SendSMS;
