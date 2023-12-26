const express = require("express")
const mongoose = require('mongoose');
const user = require('../backend/models/userModel')
const cors = require("cors")
const app = express()
const dotenv = require('dotenv')
const bcrypt = require('bcrypt');
dotenv.config({path: '../backend/config.env'})

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors())

const DB = process.env.DATABASE.replace(
    '<password>',
    process.env.DATABASE_PASSWORD
  );
  console.log(DB); // check the database connection string
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
    //useCreateIndex: true,
    //useFindAndModify: false
  })
  .then(() => {
    console.log('DB connection successful!')
  })
  .catch(err => {
    console.log('DB connection failed!');
    console.log(err); 
  });
app.get("/",cors(),(req, res)=>{

})

app.post("/", async (req, res) => {
    const { email, password } = req.body;
  
    try {
        const userRecord = await user.findOne({ email }).select('+password');
      console.log("UR",userRecord)
  
      if (userRecord) {
        // Email exists, check if the provided password matches
        const passwordMatch = (password == userRecord.password)
        console.log(userRecord, passwordMatch)
        if (passwordMatch) {
          res.json({
            status: "success",
            message: "Login successful",
            user: userRecord,
          });
        } else {
          res.json({
            status: "failure",
            message: "Incorrect password",
          });
        }
      } else {
        res.json({
          status: "failure",
          message: "Email not found",
        });
      }
    } catch (e) {
      res.json({
        status: "error",
        message: "An error occurred",
      });
    }
});


app.post("/signup", async (req, res) => {
    const { name, email, password, userType, passwordConfirmation } = req.body;
    const data = {
      name: name,
      email: email,
      password: password,
      userType: userType,
      passwordConfirmation: passwordConfirmation,
    };
  
    try {
      const checkEmail = await user.findOne({ email: email });
  
      if (checkEmail) {
        // Email already exists
        return res.json({
          status: "failure",
          message: "Email already exists",
        });
      }
  
      // Check if password matches confirmation
      if (password !== passwordConfirmation) {
        return res.json({
          status: "failure",
          message: "Password and confirmation do not match",
        });
      }
  
      // Insert new user data into the database
      await user.insertMany([data]);
  
      // Send success response
      res.json({
        status: "success",
        message: "User registered successfully",
      });
  
    } catch (e) {
      // An error occurred during the database operation
      console.error(e);
      res.json({
        status: "error",
        message: "An error occurred",
      });
    }
  });
  
app.listen(8000,()=>{
    console.log("port connected")
})