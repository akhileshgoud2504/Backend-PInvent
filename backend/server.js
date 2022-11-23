const env  = require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const userRoute = require("./routers/userRouter");
const productRoute = require("./routers/productRoute");
const contactRoute = require("./routers/contactRoute");
const errorHandler = require("./middleware/errorMiddleware");
const cookieParser = require("cookie-parser");
const path = require("path");

const app = express();

const PORT = process.env.PORT || 5000;

//Middleware
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(
    cors({
      origin: ["http://localhost:3000", "https://pinvent.vercel.app"],
      credentials: true,
    })
  );

app.use(errorHandler);


app.use("/uploads", express.static(path.join(__dirname, "uploads")));

//Routers

app.get("/",(req,res)=>{
    res.send("<h1>Home...</h1>")
});

// Routes Middleware
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/contactus", contactRoute);

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