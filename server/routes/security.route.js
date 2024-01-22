const config = require("../config/config.js");
const router = config.router;
const client = config.client;
const verifyService = config.verifyService;

router.get("/lookup-line-type/:phoneNumber", async (req, res, next) => {
    phoneNumber = req.params.phoneNumber;
    console.log(phoneNumber);
    try {
        let response = await client.lookups.v2.phoneNumbers(phoneNumber).fetch({
            fields: ['line_type_intelligence'] //sim_swap, call_forwarding, live_activity, identity_match, caller_name
        })
        console.log(response);
        return res.status(200).send(response);
    } catch (e) {
        console.log(e);
        return res.status(e.status).send(e);
    }
});

router.get("/verify/:phoneNumber/:channel", async (req, res, next) => {
    phoneNumber = req.params.phoneNumber;
    channel = req.params.channel;
    try {
        let response = await client.verify.services(verifyService).verifications.create({
            to: phoneNumber,
            channel: channel, //sms, call, whatsapp, email - (TOTP, Push)
            locale: 'en'
        })
        console.log(response);
        return res.status(200).send(response);
    } catch (e) {
        console.log(e);
        return res.status(e.status).send(e);
    }
});

router.get("/verify-check/:code", async (req, res, next) => {
    try {
        let response = await client.verify.services(verifyService).verificationChecks.create({
            to: phoneNumber,
            code: req.params.code
        })
        console.log(response);
        return res.status(200).send(response);
    } catch (e) {
        console.log(e);
        return res.status(e.status).send(e);
    }
});

module.exports = router;