import axios from "axios";

export const getSenders = async () => {
  try {
    const senders = await axios.get(
      "http://localhost:3001/senders/get-senders"
    );
    return senders;
  } catch (e) {
    console.log(e);
  }
};
