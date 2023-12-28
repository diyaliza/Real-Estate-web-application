// NewListingForm.jsx
import React, { useState } from 'react';
import '../styles/menu.css';

const NewListingForm = () => {
  const [listingData, setListingData] = useState({
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setListingData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform actions with listing data, e.g., send to server
    console.log('Listing form submitted:', listingData);
  };

  return (
    <form className='realtor-listing-form' onSubmit={handleSubmit}>
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
