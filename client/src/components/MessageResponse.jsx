import { useState, useEffect } from "react";
import axios from "axios";

const MessageResponse = (props) => {
  const messageSid = props.messageSid;
  const [msgReponse, setMsgResponse] = useState(null);

  useEffect(() => {
    if (messageSid) {
      try {
        axios
          .get("http://localhost:3001/messages/message-response/" + messageSid)
          .then((response) => {
            console.log(response.data);
            setMsgResponse(response.data);
          });
      } catch (e) {
        console.log(e);
      }
    }
  }, [messageSid]);

  const createErrorLink = () => {
    const errorLink =
      "https://www.twilio.com/docs/api/errors/" +
      { msgReponse }.msgReponse?.errorCode;
    return errorLink;
  };

  return (
    <div>
      {msgReponse?.errorCode ? (
        <p>
          An error occurred:{" "}
          <a href={createErrorLink()}>
            https://www.twilio.com/docs/api/errors/{msgReponse?.errorCode}
          </a>
        </p>
      ) : null}
    </div>
  );
};

export default MessageResponse;
