// NewListingForm.jsx
import {useNavigate, Link} from "react-router-dom"
import React, { useState } from 'react';
import '../styles/menu.css';
import axios from "axios"

const NewListingForm = ({user}) => {
  const history=useNavigate()
  const [listingData, setListingData] = useState({
    listingId: '',
    title: '',
    description: '',
    price: '',
    bedrooms: '',
    bathrooms: '',
    location: '',
    contactName: user.name,
    contactEmail: user.email,
    contactPhone: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setListingData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      console.log(listingData);
      await axios
        .post("http://localhost:8000/list", {
          listingData,
        })
        .then((res) => {
          if (res.data.status === "success") {
            alert("Listing added!");
            // Clear form fields after successful submission
            setListingData({
              listingId:'',
              title: '',
              description: '',
              price: '',
              bedrooms: '',
              bathrooms: '',
              location: '',
              contactName: '',
              contactEmail: '',
              contactPhone: '',
            });
            history("/home", { state: user });
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
    <form className='realtor-listing-form' onSubmit={handleSubmit}>
      <p>
        <label htmlFor='listingId'>Listing ID:</label>
        <input
          id='title'
          type='text'
          name='listingId'
          value={listingData.listingId}
          onChange={handleChange}
        />
      </p>
      <p>
        <label htmlFor='title'>Title:</label>
        <input
          id='title'
          type='text'
          name='title'
          value={listingData.title}
          onChange={handleChange}
        />
      </p>
      <p>
        <label htmlFor='description'>Description:</label>
        <textarea
          id='description'
          name='description'
          value={listingData.description}
          onChange={handleChange}
        />
      </p>
      <p>
        <label htmlFor='price'>Price:</label>
        <input
          id='price'
          type='text'
          name='price'
          value={listingData.price}
          onChange={handleChange}
        />
      </p>
      <p>
        <label htmlFor='bedrooms'>Bedrooms:</label>
        <input
          id='bedrooms'
          type='text'
          name='bedrooms'
          value={listingData.bedrooms}
          onChange={handleChange}
        />
      </p>
      <p>
        <label htmlFor='bathrooms'>Bathrooms:</label>
        <input
          id='bathrooms'
          type='text'
          name='bathrooms'
          value={listingData.bathrooms}
          onChange={handleChange}
        />
      </p>
      <p>
        <label htmlFor='location'>Location:</label>
        <input
          id='location'
          type='text'
          name='location'
          value={listingData.location}
          onChange={handleChange}
        />
      </p>
      <p>
        <label htmlFor='contactName'>Contact Name:</label>
        <input
          id='contactName'
          type='text'
          name='contactName'
          value={listingData.contactName}
          onChange={handleChange}
        />
      </p>
      <p>
        <label htmlFor='contactEmail'>Contact Email:</label>
        <input
          id='contactEmail'
          type='email'
          name='contactEmail'
          value={listingData.contactEmail}
          onChange={handleChange}
        />
      </p>
      <p>
        <label htmlFor='contactPhone'>Contact Phone:</label>
        <input
          id='contactPhone'
          type='tel'
          name='contactPhone'
          value={listingData.contactPhone}
          onChange={handleChange}
        />
      </p>
     
      <button type='submit'>Submit Listing</button>

     
    </form>
  );
};

export default NewListingForm;
