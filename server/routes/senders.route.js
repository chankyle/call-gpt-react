const config = require("../config/config.js");
const router = config.router;
const client = config.client;

router.get("/get-senders", async (req, res, next) => {
    try {
        let numbers = await client.incomingPhoneNumbers.tollFree
            .list({
                limit: 10,
            });

        const numArray = numbers.map((num) => {
            return num;
        })
        // console.log(numArray) // e.g. [ {},{},...,{}]
        return res.status(200).send(numArray);
    } catch (e) {
        console.log(e);
        return res.status(e.status).send(e);
    }
});

router.get("/buy-toll-free", async (req, res, next) => {
    try {
        let availableTollFree = await client.availablePhoneNumbers('CA')
            .tollFree
            .list({
                limit: 1
            });

        console.log(availableTollFree);

        let buyTollFree = await client.incomingPhoneNumbers
            .create({
                phoneNumber: availableTollFree[0].phoneNumber
            });

        console.log(buyTollFree);

        return res.status(200).send(buyTollFree.phoneNumber);

    } catch (e) {
        console.log(e);
        return res.status(e.status).send(e);
    }

});



module.exports = router;