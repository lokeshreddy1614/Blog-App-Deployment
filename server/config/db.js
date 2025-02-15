const mongoose = require("mongoose");

mongoose.set('strictQuery', false);

mongoose.connect("mongodb://blog-mongo-container:27017/BlogApp").then(() => {
    console.log("connected!");
}).catch((err) => {
    console.log(err);
});

