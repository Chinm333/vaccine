require("dotenv").config();




const express = require("express");

const app = express();

const port = 5000;

const cors = require("cors");



app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: false }));




const accountSid = process.env.ACCOUNT_SID;

const authToken = process.env.AUTH_TOKEN;


let twilioNum = process.env.TWILIO_PHONE_NUMBER;




const client = require("twilio")(accountSid, authToken);




app.post("/sendOTP", (req, res) => {

    const { phone } = req.body;






    client.messages

        .create({

            body: `Warning:The temperature is gone out of the range. Please look into the device is working or not!`,

            from: twilioNum,

            to: phone

        })

        .then((messages) => {

            res.status(200).json({ phone });

        })

        .catch((err) => {

            console.error("phone : ", err.message);

            return res.json({ error: err.message });

        });

});




app.listen(port, () => {

    console.log(`listening on ${port}`);

});