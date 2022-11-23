const env  = require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const userRoute = require("./routers/userRouter");
const productRoute = require("./routers/productRoute");
const errorHandler = require("./middleware/errorMiddleware");
const cookieParser = require("cookie-parser");

const app = express();

const PORT = process.env.PORT || 5000;

//Middleware
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(errorHandler);

//Routers

app.get("/",(req,res)=>{
    res.send("<h1>Home...</h1>")
});

// Routes Middleware
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);

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