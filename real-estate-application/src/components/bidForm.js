// NewListingForm.jsx
import {useNavigate, Link} from "react-router-dom"
import React, { useState } from 'react';
import '../styles/menu.css';
import axios from "axios"

const BidForm = ({listing, user}) => {
  const history=useNavigate()
  const [bidData, setBidData] = useState({
    biddingId: '',
    listingId: listing.listingId,
    listingName: listing.title,
    biddingPrice: '',
    userName: user.name,
    contactEmail: user.email,
    contactPhone: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBidData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      console.log(bidData);
      await axios
        .post("http://localhost:8000/bid", {
          bidData,
        })
        .then((res) => {
            console.log(res.data)
          if (res.status === 201) {
            alert("Bidding added!");
            // Clear form fields after successful submission
            setBidData({
                biddingId: '',
                listingId: listing.listingId,
                listingName: listing.title,
                biddingPrice: '',
                userName: user.name,
                contactEmail: user.email,
                contactPhone: '',
            });
            history(`/buyerlisting/${listing.listingId}/${user.userId}`);
          } else if (res.data.status === "failure") {
            alert(res.data.message);
          }
        })
        .catch((e) => {
          alert("Wrong details");
          console.log(e);
        });
    } catch (e) {
      console.log(e);
    }
  }
  

 

  return (
    <form className='bid-form' onSubmit={handleSubmit}>
       <p>
  <label htmlFor='biddingId'>Bidding ID:</label>
  <input
    id='biddingId'
    type='text'
    name='biddingId'
    value={bidData.biddingId}
    onChange={handleChange}
    disabled  // disable user input
  />
</p>

      <p>
        <label htmlFor='listingId'>Listing ID:</label>
        <input
          id='listingId'
          type='text'
          name='listingId'
          value={bidData.listingId}
          onChange={handleChange}
        />
      </p>
      <p>
        <label htmlFor='listingName'>Listing Name:</label>
        <input
          id='listingName'
          type='text'
          name='listingName'
          value={bidData.listingName}
          onChange={handleChange}
        />
      </p>
      <p>
        <label htmlFor='biddingPrice'>Bidding Price:</label>
        <input
          id='biddingPrice'
          type='text'
          name='biddingPrice'
          value={bidData.biddingPrice}
          onChange={handleChange}
        />
      </p>
      <p>
        <label htmlFor='userName'>User Name:</label>
        <input
          id='userName'
          type='text'
          name='userName'
          value={bidData.userName}
          onChange={handleChange}
        />
      </p>
      <p>
        <label htmlFor='contactEmail'>Contact Email:</label>
        <input
          id='contactEmail'
          type='email'
          name='contactEmail'
          value={bidData.contactEmail}
          onChange={handleChange}
        />
      </p>
      <p>
        <label htmlFor='contactPhone'>Contact Phone:</label>
        <input
          id='contactPhone'
          type='tel'
          name='contactPhone'
          value={bidData.contactPhone}
          onChange={handleChange}
        />
      </p>
  
      {/* Add other necessary fields as needed */}
     
      <button type='submit'>Place Bid</button>
    </form>
  );
  
};

export default BidForm;
