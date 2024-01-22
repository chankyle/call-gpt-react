const express = require("express");
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 3001;
const app = express();

// Express Route
const messagesRoute = require("./routes/messages.route");
const sendersRoute = require("./routes/senders.route");
const verificationsRoute = require("./routes/verifications.route");
const eventsRoute = require("./routes/events.route");
const securityRoute = require("./routes/security.route");
const hackathonRoute = require("./routes/hackathon.route");

// Cors (Needed for localhost to be on different ports for client and server)
const cors = require("cors");
const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

//Routes
app.use("/messages", messagesRoute);
app.use("/senders", sendersRoute);
app.use("/verifications", verificationsRoute);
app.use("/events", eventsRoute);
app.use("/security", securityRoute);
app.use("/hackathon", hackathonRoute);

app.listen(PORT, () => {
  console.log(`Server listening on PORT:${PORT}`);
});
