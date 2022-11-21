const env  = require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

const PORT = process.env.PORT || 5000;

//Middleware
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(bodyParser.json());

//Routers

app.get("/",(req,res)=>{
    res.send("<h1>Home...</h1>")
});

//connect to DB and start server
mongoose
        .connect(process.env.MONGO_URI)
        .then(()=>{
            app.listen(PORT,()=>{
                console.log(`server running on the port : ${PORT}`);
            });
        })
        .catch((error)=>{
            console.log(error);
        })