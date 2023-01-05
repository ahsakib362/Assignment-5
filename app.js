// Basic Package Import

const express = require('express');
const router = require('./src/routes/api');
const app = new express();
const bodyParser = require('body-parser');

// Security Middleware

const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const ExpressMongoSanitize = require('express-mongo-sanitize');
const hpp = require('hpp');
const xss = require('xss-clean');
const cors = require('cors');

// Database Library Import.

const mongoose = require('mongoose');
const { Router } = require('express');

// Security Middleware Implement

app.use(cors());
app.use(helmet());
app.use(ExpressMongoSanitize());
app.use(hpp());
app.use(xss());

// Body Parser Implement

app.use(bodyParser.json());

// Request Rate Limit

const Limiter = rateLimit({windowMs:15*60*1000,max:3000})
app.use(Limiter);

// Mongo DB Database Connection

let URI = "mongodb://127.0.0.1:27017/ToDo";
let OPTION = {user:'',pass:'',autoIndex:true};
mongoose.connect(URI,OPTION,(error)=>{
    console.log("Connection Successful");
    console.log(error);
})

// Route Implement

app.use("/api/v1",router);

// Undefined Route Implement.

app.use("*",(req,res)=>{
    res.status(404).json({status:"fail",data:"Not Found"})
});

module.exports = app;






