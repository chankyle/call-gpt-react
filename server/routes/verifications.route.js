const config = require("../config/config.js");
const router = config.router;
const client = config.client;
const axios = require('axios');

let verificationURL = 'https://messaging.twilio.com/v1/Tollfree/Verifications/';

const getParams = (body) => {
    const params = new URLSearchParams();
    for (i in body) {
        params.append(i, body[i]);
    }
    return params;
}

// List all verifications
router.get("/get-verifications", async (req, res, next) => {
    try {
        const verifications = await axios.get(verificationURL, {
            auth: {
                username: config.accountSid,
                password: config.authToken
            }
        });
        // console.log(verifications.data);
        return res.status(200).json(verifications.data);
    } catch (e) {
        console.log(e.response.data);
        return res.status(e.response.data.status).send({});
    }
});


// Get single TFN Verification Record
router.get("/get-verification/:id", async (req, res, next) => {
    console.log(req.params.id) // returning null first pass
    try {
        const verification = await axios.get(verificationURL + req.params.id, {
            auth: {
                username: config.accountSid,
                password: config.authToken
            }
        })
        // console.log(verification.data)
        return res.status(200).json(verification.data);
    } catch (e) {
        console.log(e.response.data);
        // return res.status(e.response.data.status).send({
        // });
    }
});

// Check if a verification has been submitted for a given number
// curl -X GET 'https://messaging.twilio.com/v1/Tollfree/Verifications?TollfreePhoneNumberSid=PNXXXXXXXXX' \
// -u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
router.get("/check-verification-submitted/:id", async (req, res, next) => {
    console.log(req.params.id) // returning null first pass

    let pnSid = req.params.id
    let myURL = "https://messaging.twilio.com/v1/Tollfree/Verifications?TollfreePhoneNumberSid=" + pnSid
    // should return nothing
    // PN2b3510fe668ab60ac5b987d5a2d1d74a - should return verification sid

    console.log(myURL);

    try {
        const verification = await axios.get(myURL, {
            auth: {
                username: config.accountSid,
                password: config.authToken
            }
        })
        console.log(verification.data)
        return res.status(200).json(verification.data);
    } catch (e) {
        console.log(e.response.data);
        // return res.status(e.response.data.status).send({
        // });
    }
});


router.post("/create-verification", async (req, res, next) => {
    const params = getParams(req.body);
    console.log(params);
    try {
        const verification = await axios.post(verificationURL, params, {
            auth: {
                username: config.accountSid,
                password: config.authToken
            }
        })
        console.log(verification.data)
        return res.status(201).json(verification.data);
    } catch (e) {
        console.log(e.response.data);
        return res.status(e.response.data.status).send({
            code: e.response.data.code,
            message: e.response.data.message,
            more_info: e.response.data.more_info,
            status: e.response.data.status
        });
    }
});

module.exports = router;