import { useState, useEffect } from "react";
import axios from "axios";
import { getSenders } from "../hooks/useGetSenders";
import "../styles/VerificationForm.css";
import BuyTollFree from "./BuyTollFree";

const VerificationForm = () => {
  const [TollfreePhoneNumberSid, setTollfreePhoneNumberSid] = useState("");
  const [verification, setVerification] = useState(null);
  const [verifications, setVerifications] = useState(null);
  const [error, setError] = useState(null);
  const [senderOptions, setSenderOptions] = useState(["+1800..."]);
  const [formData, setFormData] = useState({
    BusinessName: "",
    BusinessStreetAddress: "",
    BusinessStreetAddress2: "",
    BusinessCity: "",
    BusinessStateProvinceRegion: "",
    BusinessPostalCode: "",
    BusinessCountry: "",
    BusinessWebsite: "",
    BusinessContactFirstName: "",
    BusinessContactLastName: "",
    BusinessContactEmail: "",
    BusinessContactPhone: "",
    UseCaseCategories: "",
    UseCaseSummary: "",
    ProductionMessageSample: "",
    OptInImageUrls: "",
    OptInType: "",
    MessageVolume: "",
    AdditionalInformation: "",
    NotificationEmail: "",
    ExternalReferenceId: "",
  });

  useEffect(() => {
    getSenders()
      .then((senders) => {
        let sidArray = [];
        for (const i in senders?.data) {
          sidArray.push([senders.data[i].phoneNumber, senders.data[i].sid]);
        }
        setTollfreePhoneNumberSid(sidArray[0][1]);
        setSenderOptions(sidArray);
      })
      .catch((e) => console.log(e));

    axios
      .get("http://localhost:3001/verifications/get-verifications")
      .then((response) => {
        let verificationArray = [];
        for (const i in response.data?.verifications) {
          verificationArray.push(
            response.data.verifications[i].tollfree_phone_number_sid
          );
        }
        setVerifications(verificationArray);
      })
      .catch((e) => console.log(e));
  }, []);

  const createOptions = (sidArray) => {
    const createOptions = sidArray.map((sender) => {
      if (verifications?.includes(sender[1])) {
        return (
          <option key={sender[1]} value={sender[1]}>
            {sender[0]} - Verification submitted
          </option>
        );
      } else {
        return (
          <option key={sender[0]} value={sender[1]}>
            {sender[0]} - Please submit verification
          </option>
        );
      }
    });
    return createOptions;
  };

  const populateSampleData = () => {
    setFormData({
      BusinessName: "Owl Inc",
      BusinessStreetAddress: "123 Main Street",
      BusinessStreetAddress2: "Suite 101",
      BusinessCity: "Anytown",
      BusinessStateProvinceRegion: "AA",
      BusinessPostalCode: "11111",
      BusinessCountry: "US",
      BusinessWebsite: "www.example.com",
      BusinessContactFirstName: "firstName",
      BusinessContactLastName: "lastName",
      BusinessContactEmail: "email@example.com",
      BusinessContactPhone: "+16471234567",
      UseCaseCategories: "TWO_FACTOR_AUTHENTICATION",
      UseCaseSummary:
        "This number is used to send out promotional offers and coupons to the customers of Johns Coffee Shop",
      ProductionMessageSample: "Attempt1",
      OptInImageUrls: "https://zipwhiptestbusiness.com/images/image1.jpg",
      OptInType: "Verbal",
      MessageVolume: "10",
      AdditionalInformation:
        "see our privacy policy here www.johnscoffeeshop.com/privacypolicy",
      NotificationEmail: "support@company.com",
      ExternalReferenceId: "abc123",
    });
  };

  const renderForm = () => {
    var formArray = [];
    for (var i in formData) {
      formArray.push([i, formData[i]]);
    }
    const newForm = formArray.map((row) => {
      if (row[0] !== "TollfreePhoneNumberSid") {
        return (
          <div className="col-6" key={row[0]}>
            <div className="form-group">
              <label htmlFor={row[0]}>{row[0]}</label>
              <input
                className="form-control form-control-sm"
                id={row[0]}
                value={row[1]}
                onChange={(e) =>
                  setFormData({ ...formData, [row[0]]: e.target.value })
                }
              />
            </div>
          </div>
        );
      } else {
        return null;
      }
    });
    return newForm;
  };

  const submitVerification = async (e) => {
    try {
      e.preventDefault();
      formData.TollfreePhoneNumberSid = TollfreePhoneNumberSid;
      const verification = await axios.post(
        "http://localhost:3001/verifications/create-verification",
        formData
      );
      setVerification(verification.data);
    } catch (e) {
      setError(e.response.data);
    }
  };

  const whiteText = {
    color: "white",
  };

  return (
    <div>
      <div className="container">
        <div className="col">
          <div className="row">
            <button className="btn btn-secondary">
              <a
                style={whiteText}
                href="https://www.twilio.com/docs/sms/a2p-tollfree-messaging-compliance-api-onboarding-guide#1-getting-started"
              >
                See API Documentation
              </a>
            </button>
          </div>
        </div>
      </div>
      <BuyTollFree />
      <h5>---</h5>
      <form onSubmit={submitVerification}>
        <div className="container">
          <div className="form-group">
            <label htmlFor="TollfreePhoneNumberSid">
              TollfreePhoneNumberSid
            </label>
            <select
              className="form-control form-control-sm"
              id="TollfreePhoneNumberSid"
              value={TollfreePhoneNumberSid}
              onChange={(e) => setTollfreePhoneNumberSid(e.target.value)}
            >
              {createOptions(senderOptions)}
            </select>
          </div>
          <div className="row">{renderForm()}</div>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit Verification Record
        </button>
      </form>
      <button onClick={populateSampleData} className="btn btn-secondary">
        Populate Sample Data
      </button>

      {error ? (
        <p>
          An error occurred status {error.status}:{" "}
          <a href={error.more_info}>{error.message}</a>
        </p>
      ) : null}
      {verification ? (
        <p>
          Success! Your verification status is {verification.status} with sid:{" "}
          {verification.sid}
        </p>
      ) : null}
    </div>
  );
};

export default VerificationForm;
