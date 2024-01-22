import { useState, useEffect } from "react";
import axios from "axios";

const CheckVerification = () => {
  const [verificationSids, setVerificationSids] = useState(["HHXXXX"]);
  const [verificationSid, setVerificationSid] = useState("");
  const [verification, setVerification] = useState(null);
  const [error, setError] = useState(null);

  const createOptions = (sidArray) => {
    const createOptions = sidArray.map((sid) => (
      <option key={sid} value={sid}>
        {sid}
      </option>
    ));
    return createOptions;
  };

  useEffect(() => {
    axios
      .get("http://localhost:3001/verifications/get-verifications/")
      .then((v) => {
        let sidArr = [];
        for (const i in v.data.verifications) {
          sidArr.push(v.data.verifications[i]?.sid);
        }
        setVerificationSids(sidArr);
        setVerificationSid(sidArr[0]);
      })
      .catch((e) => console.log(e));
  }, []);

  const checkVerification = async (e) => {
    e.preventDefault();
    try {
      const verification = await axios.get(
        "http://localhost:3001/verifications/get-verification/" +
          verificationSid
      );
      setVerification(verification.data);
    } catch (e) {
      console.log(e);
      setError(e);
    }
  };

  return (
    <div>
      <form onSubmit={checkVerification}>
        <div className="form-group">
          <label htmlFor="verificationSids">Verification Sids</label>
          <select
            className="form-control"
            id="verificationSids"
            onChange={(e) => setVerificationSid(e.target.value)}
            value={verificationSid}
          >
            {createOptions(verificationSids)}
          </select>
        </div>
        <button type="submit" className="btn btn-primary">
          Check Verification Status
        </button>
      </form>
      {error ? (
        <p>
          An error occurred status {error.status}:{" "}
          <a href={error.more_info}>{error.message}</a>
        </p>
      ) : null}
      {verification ? (
        <p>
          Your verification status is {verification.status} for phone number:{" "}
          {verification.tollfree_phone_number_sid}
        </p>
      ) : null}
    </div>
  );
};

export default CheckVerification;
