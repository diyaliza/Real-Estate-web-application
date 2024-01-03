const express = require("express")
const mongoose = require('mongoose');
const user = require('../backend/models/userModel')
const Bidding = require('../backend/models/biddingModel')
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
  app.get('/listings',async(req, res)=>{
    
    try {
      const listingsRecords = await listing.find({status:'Active'});
      console.log('listingsRecords',listingsRecords)
      res.json(listingsRecords);
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  })

  app.post('/bid', async (req, res) => {
    try {
      const bidData = req.body.bidData;
      console.log('bidData', bidData)
  
      // Assuming your Bidding model has fields like listingId, listingName, biddingPrice, userName, contactEmail, contactPhone
      const newBid = new Bidding({
        listingId: bidData.listingId,
        listingName: bidData.listingName,
        biddingPrice: bidData.biddingPrice,
        userName: bidData.userName,
        contactEmail: bidData.contactEmail,
        contactPhone: bidData.contactPhone,
        // Set other fields as needed
      });
      console.log(newBid)
  
      // Save the new bid to the database
      await newBid.save();
  
      res.status(201).json({ message: 'Bid placed successfully' });
    } catch (error) {
      console.error('Error placing bid:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  app.get('/bids/:listingId', async (req, res) => {
    try {
      const listingId = req.params.listingId;
  
      // Fetch all bids for the given listingId from the database
      const bids = await Bidding.find({ listingId });
  
      res.status(200).json(bids);
    } catch (error) {
      console.error('Error fetching bids:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
app.get('/user/:userId', async( req, res) => {
  const {userId} = req.params
  console.log('useriD', userId)
  try{
    const userRecord = await user.findOne({ userId: userId});
    console.log('user',userRecord)
    res.json(userRecord)
  }catch(e){
    console.log(e)
    res.json({message:e})
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
app.put("/listing/:listingId/close", async(req, res) => {
  const {listingId} = req.params;
  console.log(listingId)
    try{
      let listingItem = await listing.find({listingId: listingId});
      listingItem = listingItem[0]
      
      console.log("changed - >", listingItem.status)
      listingItem.status = 'Closed';
      await listingItem.save();
      res.json({ message: 'Listing closed successfully' });
    }catch (e) {
      console.error('Error fetching listings:', e);
      res.status(500).json({ error: 'Internal Server Error' });
    }

})
  
app.listen(8000,()=>{
    console.log("port connected")
})