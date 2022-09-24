const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

/* Home Route */
app.get(
    "/",
    function (req, res) {
        res.sendFile(`${__dirname}/index.html`);
    }
);

app.post(
    "/",
    function (req, res) {
        let num1 = Number(req.body.num1);
        let num2 = Number(req.body.num2);
        res.send(`Summation: ${num1 + num2}`);
    }
);

/* BMI Calculator */
app.get(
    "/bmicalculator",
    function (req, res) {
        res.sendFile(`${__dirname}/bmiCalculator.html`);
    }
);

app.post(
    "/bmicalculator",
    function (req, res) {
        let weight = parseFloat(req.body.weight);
        let height = parseFloat(req.body.height);
        let bmi = weight/(height*height);
        bmi = bmi.toFixed(2);
        res.send(`<h3>Your BMI is ${bmi}<h3/>`);
    }
);



app.listen(3000);