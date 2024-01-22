import { useState } from "react";
import axios from "axios";

const BuyTollFree = (props) => {
  const [tollFreeNumber, setTollFreeNumber] = useState(null);

  const buyTollFree = async () => {
    try {
      const tollFreeNumber = await axios.get(
        "http://localhost:3001/senders/buy-toll-free"
      );
      console.log(tollFreeNumber.data);
      setTollFreeNumber(tollFreeNumber.data);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <button onClick={buyTollFree} className="btn btn-dark">
        Buy Toll-Free Number
      </button>
      <div>
        {tollFreeNumber
          ? "Success you just purchased the following number: " + tollFreeNumber
          : null}
      </div>
    </div>
  );
};

export default BuyTollFree;
