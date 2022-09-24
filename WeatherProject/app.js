const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(`${__dirname}`));

app.get(
    "/",
    (req, res) => {
        res.sendFile(`${__dirname}/index.html`);
    }
);


app.post(
    "/",
    (req, res) => {

        const usrLocation = req.body.location;
        const endPoint = "https://api.openweathermap.org/data/2.5/weather?";
        const units = "metric";
        const appID = "9da31e3fe6abdb522784802673b39d07";
        const url = `${endPoint}q=${usrLocation}&units=${units}&appid=${appID}`;

        https.get(url, (response) => {
            console.log(`Status code: ${response.statusCode}`);

            response.on(
                "data",
                (data) => {
                    const weatherData = JSON.parse(data);
                    const temp = weatherData.main.temp;
                    const description = weatherData.weather[0].description;
                    const location = weatherData.name;
                    const icon = weatherData.weather[0].icon;
                    const iconURL = `http://openweathermap.org/img/wn/${icon}@4x.png`;

                    res.write("<div>");
                    res.write(`<h3>The weather is currently ${description}.<h3/>`);
                    res.write(`<h1>Temperature in ${location} is ${temp} degree celcius.<h1/>`);
                    res.write(`<img src="${iconURL}">`);
                    res.write("<div/>");
                    res.send();
                }
            );
        });
    }
);



app.listen(3000, () => console.log("Server is running on port 3000..."));