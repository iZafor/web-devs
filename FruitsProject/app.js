const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/fruitsDB");

const fruitsSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "fruit without a name!"]
        },
        rating: {
            type: Number,
            min: 1,
            max: 10
        },
        review: String,
    }
);

const Fruit = mongoose.model("Fruit", fruitsSchema);

const fruit = new Fruit(
    {
        rating: 10,
        review: "Peaches are so yummy!."
    }
);
    
// fruit.save().then(()=>console.log("Saved record..."));
const mango = new Fruit({
    name: "Mango",
    rating: 10,
    review: "Decilcious"
})

// mango.save();

const personSchema = new mongoose.Schema(
    {
        name: String,
        age: Number,
        favouriteFruit: fruitsSchema
    }
);

const Person = mongoose.model("Person", personSchema);

// const person = new Person(
//     {
//         name: "Amy",
//         age: 12,
//         favouriteFruit: pineapple 
//     }
// );

// person.save().then(()=>{
//     console.log("Saved record...")
// });

// Person.find((err, people)=>{
//     if(err){
//         return console.log(err);
//     }
//     mongoose.connection.close();
//     console.log(people);
// });

// Person.deleteMany({name: "Jhon"}, (err)=>{
//     if(err){
//         return console.log(err);
//     }
//     mongoose.connection.close();
//     console.log("Deleted all records containing \"name\" as \"Jhon\"");
// })
    
// const kiwi = new Fruit(
//     {
//         name: "Kiwi",
//         rating: 10,
//         review: "The best fruit"
//     }
// );

// const orange = new Fruit(
//     {
//         name: "Orange",
//         rating: 4,
//         review: "Too sour for me"
//     }
// );

// const banana = new Fruit(
//     {
//         name: "Banana",
//         rating: 3,
//         review: "Weird texture"
//     }
// ); 

// Fruit.insertMany([kiwi, orange, banana], (err)=>{
//     if(err){
//         return console.log(err);
//     }
//     console.log("Succesfully inserted records.");
// });

Fruit.find((err, fruits) => {
    if (err) {
        return console.log(err);
    }

    mongoose.connection.close();

    fruits.forEach((fruit) => {
        console.log(fruit?.name);
    });
});

// Fruit.updateOne({ _id: "631ede857276518af3dcf950" }, { name: "Peach" }, (err) => {
//     if (err) {
//         return console.log(err);
//     }
//     console.log("Record updated...");
// });

// Fruit.deleteOne({ name: "Peach" }, (err) => {
//     if(err){
//         return console.log(err);
//     }
//     console.log("Deletion succesfull.");
// });

