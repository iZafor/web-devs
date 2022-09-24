require("dotenv").config()
const express = require("express");
const bodyParser = require("body-parser");
const _ = require("lodash");
const mongoose = require("mongoose");

mongoose.connect(process.env.DB_URI, (err) => {
  if (!err) {
    console.log("Connected to the Database successfully.");
  }
});

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

const PORT = process.env.PORT || 3000;

const postSchema = new mongoose.Schema({
  title: String,
  content: String
});

const Post = mongoose.model("Post", postSchema);

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));


/* Home Route */
app.get(
  "/",
  (req, res) => {
    Post.find((err, foundPosts) => {
      if (err) {
        return console.log(err);
      }
      res.render("home", { startingContent: homeStartingContent, allPosts: foundPosts });
    });
  }
);


/* About Route */
app.get(
  "/about",
  (req, res) => {
    res.render("about", { startingContent: aboutContent });
  }
);


/* Contact Route */
app.get(
  "/contact",
  (req, res) => {
    res.render("contact", { startingContent: contactContent });
  }
);

/* Compose Route */
app.get(
  "/compose",
  (req, res) => {
    res.render("compose");
  }
);

app.post(
  "/compose",
  (req, res) => {
    const postTitle = _.capitalize(_.lowerCase(req.body.postTitle.toLowerCase()));
    const postContent = req.body.postBody.trim();
    if (postTitle.length > 0 && postContent.length > 0) {
      const newPost = new Post({
        title: postTitle,
        content: postContent
      });
      newPost.save();
      res.redirect("/");
    } else {
      res.redirect("/compose");
    }
  }
);


/* Post Routes */
app.get(
  "/posts/:title",
  (req, res) => {
    const requestedPostTitle = _.capitalize(_.lowerCase(req.params.title.toLowerCase()));

    Post.findOne({ title: requestedPostTitle }, (err, post) => {
      if (err) {
        return console.log(err);
      }

      if (post) {
        res.render("post", { postTitle: post.title, postBody: post.content });
      }

      if (!post) {
        res.redirect("/");
      }
    });
  }
);



app.listen(PORT, () => console.log(`App is running on port ${PORT}`));
