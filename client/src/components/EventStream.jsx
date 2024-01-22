import { useState } from "react";
import axios from "axios";

const EventStream = (props) => {
  const [events, setEvents] = useState([]);

  const displayEvents = () => {
    console.log(events);
    const display = events.map((event, index) => {
      return (
        <div key={index}>
          <p>---</p>
          <div className="col">
            <span style={{ fontWeight: `bold` }}>Event Id:</span> {event?.id}{" "}
          </div>
          <div className="col">
            <span style={{ fontWeight: `bold` }}>Time:</span> {event?.time}{" "}
          </div>
          <div className="col">
            <span style={{ fontWeight: `bold` }}>Event Type:</span>{" "}
            {event?.type}
          </div>
        </div>
      );
    });

    return display;
  };

  const getEvents = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        "http://localhost:3001/events/get-events"
      );
      console.log(response.data); // [ {}, {}, ... {}]    ]
      setEvents(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <h3>Events</h3>
      {displayEvents()}
      <button onClick={getEvents} className="btn btn-primary">
        Get Events
      </button>
    </div>
  );
};

export default EventStream;
