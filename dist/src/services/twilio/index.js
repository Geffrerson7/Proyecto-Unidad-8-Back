"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const twilio_1 = require("twilio");
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioNumber = process.env.TWILIO_PHONE_NUMBER;
const recieverNumber = process.env.RECIEVER_NUMBER;
const client = new twilio_1.Twilio(accountSid, authToken);
async function sendSMS(checkProductStock) {
    const productNames = [];
    checkProductStock.forEach(function (obj) {
        productNames.push(obj.name);
    });
    const smsBody = productNames.toString();
    if (accountSid && authToken && recieverNumber && twilioNumber) {
        await client.messages
            .create({
            from: twilioNumber,
            to: recieverNumber,
            body: "The following products need restocking: " + smsBody,
        })
            .then((message) => console.log(message.sid));
        return true;
    }
    else {
        console.error("Missing one argument");
        return false;
    }
}
exports.default = sendSMS;
//# sourceMappingURL=index.js.map