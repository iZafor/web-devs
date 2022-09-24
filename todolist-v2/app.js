const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const _ = require("lodash");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const uri = `mongodb+srv://iZafor:xT489Fxi0YCuITGSfmct@cluster0.mg232wa.mongodb.net/todolistDB`

mongoose.connect(uri);

const itemsSchema = new mongoose.Schema({
  name: String
});

const listSchema = new mongoose.Schema({
  name: String,
  items: [itemsSchema]
});

const Item = mongoose.model("Item", itemsSchema);

const List = mongoose.model("List", listSchema);

const item1 = new Item({
  name: "Welcome to your todolist!"
});

const item2 = new Item({
  name: "Hit the + button to add new item."
});

const item3 = new Item({
  name: "<-- Hit this to delete an item."
});

const defaultItems = [item1, item2, item3];

const initialInsert = () => {
  Item.insertMany(defaultItems, (err) => {
    if (err) {
      return console.log(err);
    }
  });
}

app.get("/", function (req, res) {

  Item.find((err, foundItems) => {
    if (err) {
      return console.log(err);
    }

    if (foundItems.length === 0) {
      initialInsert();
      res.redirect("/");
    }

    if (foundItems.length > 0) {
      res.render("list", { listTitle: "Today", newListItems: foundItems });
    }

  });

});

app.post("/", function (req, res) {

  const itemName = req.body.newItem;
  const listName = _.capitalize(req.body.list);

  if (itemName.trim()) {
    const item = new Item({
      name: itemName
    });

    if (listName === "Today") {
      item.save();
      res.redirect("/");
    }

    if (listName !== "Today") {
      List.findOneAndUpdate({ name: listName }, { $push: { items: item } }, (err, resultst) => {
        if (err) {
          return console.log(err);
        }

        res.redirect(`/${listName}`);
      })
    }
  }

});


app.post("/delete/:Route", function (req, res) {
  const itemToDelete = req.body.checkbox;
  const route = _.capitalize(req.params.Route);

  console.log(route);

  if (route === "Today") {
    Item.findByIdAndDelete(itemToDelete, (err) => {
      if (err) {
        console.log(err);
      }
      console.log(`Deleted item with id of ${itemToDelete}`)
      res.redirect("/");
    });
  }

  if (route !== "Today") {
    List.findOneAndUpdate({ name: route }, { $pull: { items: { _id: itemToDelete } } }, (err, results) => {
      if (err) {
        return console.log(err);
      }

      console.log(`Deleted item with id of ${itemToDelete}`)
      res.redirect(`/${route}`);
    })
  }

});


/* Custom Routes */
app.get("/:customRoute", function (req, res) {
  const customRoute = _.capitalize(req.params.customRoute);

  List.findOne({ name: customRoute }, (err, foundList) => {
    if (err) {
      return console.log(err);
    }

    if (!foundList) {
      const list = new List({
        name: customRoute,
        items: defaultItems
      });
      list.save();

      res.redirect(`/${customRoute}`)
    }

    if (foundList) {
      if (foundList.items.length > 0) {
        res.render("list", { listTitle: customRoute, newListItems: foundList.items });
      }

      if (foundList.items.length === 0) {
        foundList.items.push(...defaultItems);
        foundList.save();
        res.redirect(`/${customRoute}`);
      }

    }

  });

});

app.listen(3000, function () {
  console.log("Server started on port 3000");
});
