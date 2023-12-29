const express = require("express")
const mongoose = require('mongoose');
const user = require('../backend/models/userModel')
const listing = require('../backend/models/listingModel')
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
  app.get('/list/:userid', async (req, res) => {
    const { userid } = req.params;
    try {
      // Assuming you have a model named 'Listing'
      const listingUser = await user.find({ userId: userid})
      console.log(listingUser[0].email)
      const listings = await listing.find({ contactEmail: listingUser[0].email });
      res.json(listings);
    } catch (e) {
      console.error('Error fetching listings:', e);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  app.get('/listing/:listingId', async(req, res) => {
    const {listingId} = req.params;
    try{
      const listingItem = await listing.find({listingId: listingId});
      console.log(listingItem)
      res.json(listingItem[0]);
    }catch (e) {
      console.error('Error fetching listings:', e);
      res.status(500).json({ error: 'Internal Server Error' });
    }
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

app.post("/list", async (req, res) => {
  console.log(req.body)
  const { listingId, bathrooms, bedrooms, contactEmail, contactName, contactPhone, description, location, price, title } = req.body.listingData;
    const data = {
      listingId: listingId,
      bathrooms: bathrooms,
      bedrooms: bedrooms,
      contactEmail: contactEmail,
      contactName: contactName,
      contactPhone: contactPhone,
      description: description,
      location: location,
      price: price,
      title: title
    };
    try{
      //console.log(data)
      await listing.insertMany([data]);
      res.json({
        status: "success",
        message: "Listing registered successfully",
      });
    }catch(e){
      console.error(e);
      res.json({
        status: "error",
        message: "An error occurred",
      });

    }
    
})


app.post("/signup", async (req, res) => {
    const { userId, name, email, password, userType, passwordConfirmation } = req.body;
    const data = {
      userId: userId,
      name: name,
      email: email,
      password: password,
      userType: userType,
      passwordConfirmation: passwordConfirmation,
    };
  
    try {
      const checkEmail = await user.findOne({ userId: userId });
  
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