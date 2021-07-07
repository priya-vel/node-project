
const express = require("express");
const { DBConnection } = require("./config/database");
const { UserRouter} = require('./users/routes')
const { json, urlencoded } = express;

const app = express();

DBConnection().then((res) => {
    console.log("db connected");
}).catch(err => {
    console.log(err);
})


app.use(json());
app.use(urlencoded({extended:true}));
app.use("/user", UserRouter)

module.exports = {
    app
}
