const config = require("../config/config.js");
const router = config.router;
const client = config.client;

router.get("/message-response/:sid", async (req, res, next) => {
    messageSid = req.params.sid;
    // SetTimeout as we poll the message log to get a response which is not immediate
    setTimeout(async () => {
        try {
            let msgResponse = await client.messages(messageSid).fetch();
            console.log(msgResponse);
            return res.status(200).send(msgResponse);
        } catch (e) {
            console.log(e);
            return res.status(e.status).send(e);
        }
    }, 1000)
});

router.post("/send-message", async (req, res, next) => {
    try {
        let message = await client.messages.create({
            from: req.body.from,
            to: req.body.to,
            body: req.body.body
        });
        console.log(message.sid);
        return res.status(200).json(message);
    } catch (e) {
        console.log(e);
        return res.status(e.status).send({
            message: e.moreInfo
        });
    }
});



module.exports = router;