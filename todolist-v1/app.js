const express = require("express");
const bodyParser = require("body-parser");
const date = require(`${__dirname}/date.js`);

const app = express();

const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(`public`));

let items = [];
let workItems = [];

let route = "";

/* Home Route */
app.get(
    "/",
    (req, res) => {
        route = "/";
        let day = date.getDate();
        res.render("list", { pageTitle: "ToDo List", listTitle: day, listItems: items, postRoute: route });
    }
);

app.post(
    "/",
    (req, res) => {
        const currentItem = req.body.newItem.trim().toUpperCase();
        if (req.body.button === "add" && currentItem.length > 0) {
            items.push(currentItem);
        } else {
            items = [];
        }
        res.redirect("/");
    }
);


/* Work Route */
app.get(
    "/work",
    (req, res) => {
        route = "/work";
        res.render("list", { pageTitle: "Work List", listTitle: "Work List", listItems: workItems, postRoute: route });
    }
);

app.post(
    "/work",
    (req, res) => {
        const currentItem = req.body.newItem.trim();
        if (req.body.button === "add" && currentItem.length > 0) {
            workItems.push(currentItem.toUpperCase());
        } else {
            workItems = [];
        }
        res.redirect("/work");
    }
);



app.listen(PORT, () => console.log(`App is running on port ${PORT}`));