const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const uri = "mongodb://localhost:27017/wikiDB";

mongoose.connect(uri, (err) => {
    if (err) return console.log(err);
    console.log("Connected to the server succesfully.");
});

const articleSchema = new mongoose.Schema({
    title: String,
    content: String
});

const Article = mongoose.model("Article", articleSchema);

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(`__dirname`));

app.route("/articles")
    .get((req, res) => {
        Article.find({}, (err, foundArticles) => {
            if (err) return res.send(err);
            res.send(foundArticles);
        });
    })
    .post((req, res) => {
        const title = req.body.title;
        const content = req.body.content;

        const newArticle = new Article({
            title: title,
            content: content
        });

        newArticle.save().catch((err) => res.send(err)).then(() => res.send(`Added content: \n${newArticle}`));
    })
    .delete((req, res) => {
        Article.deleteMany({}, (err) => {
            if (err) return res.send(err);
            res.send("Deleted all document succesfully.");
        });
    });


/* Requests for a specific article */
app.route("/articles/:title")
    .get((req, res) => {
        Article.findOne({ title: req.params.title }, (err, foundArtile) => {
            if (err) return res.send(err);
            res.send(foundArtile);
        });
    })
    .put((req, res) => {
        Article.replaceOne(
            { title: req.params.title },
            { title: req.body.title, content: req.body.content },
            (err, result) =>{
                if(err) return res.send(err);
                res.send(result);
            }
        );
    })
    .patch((req, res) => {
        Article.updateOne(
            { title: req.params.title },
            { $set: req.body },
            (err) =>{
                if(err) return res.send(err);
                res.send("Update succesfull.");
            }
        );
    })
    .delete((req, res) => {
        Article.deleteOne({ title: req.params.title }, (err) => {
            if (err) return res.send(err);
            res.send(`Deleted content titled "${req.params.title}"`);
        })
    });


app.listen(PORT, () => console.log(`App is running on port ${PORT}`));