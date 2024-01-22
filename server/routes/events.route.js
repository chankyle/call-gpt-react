const config = require("../config/config.js");
const router = config.router;
const client = config.client;
const axios = require('axios');

let eventArray = [];

// Client requests events
router.get("/get-events", async (req, res, next) => {
    try {
        console.log(eventArray);
        return res.status(200).json(eventArray);;
    } catch (e) {
        console.log(e.response.data);
    }
});

// Event stream posts events
router.post("/create-event", async (req, res, next) => {
    try {
        console.log(req.body[0]);
        eventArray.push(req.body[0]);
    } catch (e) {
        console.log(e.response.data);
    }
});

module.exports = router;