const express = require("express");
const bodyParser = require("body-parser");
const mailchimp = require("@mailchimp/mailchimp_marketing");

const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

/* Home Route */
app.get(
    "/",
    (req, res) => {
        res.sendFile(`${__dirname}/signup.html`);
    }
);

app.post(
    "/",
    (req, res) => {
        const {firstName, lastName, email} = req.body;
        const apiKey = "6b5b9f089695b951c7d19922084a626e-us13";
        const audienceID = "a209605a66";
        const serverPrefix = "us13";

        mailchimp.setConfig(
            {
                apiKey: apiKey,
                server: serverPrefix
            }
        );

        const usrData = [
            audienceID,
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ];

        async function run(){
            try{
                const response = await mailchimp.lists.addListMember(...usrData);
                res.sendFile(`${__dirname}/success.html`);
            }catch(error){
                res.send(error); 
                const errorCode = error.status;
                const errorMessege = JSON.parse(error.response.text).detail;
                console.log(`Error code: ${errorCode}`);
                console.log(`Details: ${errorMessege}`);
                res.sendFile(`${__dirname}/failure.html`);
            }
        };

        run();
    }
);

/* Failure Route */
app.post(
    "/failure",
    (req, res)=>{
        res.redirect("/");
    }
);

app.listen(process.env.PORT || 3000, () => console.log("Server is running on port 3000"));