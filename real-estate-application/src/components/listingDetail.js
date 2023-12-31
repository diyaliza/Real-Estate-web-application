// ListingDetails.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import '../styles/realtorcomponent.css'; // Import common styles
import '../styles/listingDetails.css'; // Import the CSS file

const ListingDetails = ({}) => {
  const location =useLocation()
  const { listingId, userId } = useParams();
  console.log(listingId, userId)
  const history = useNavigate(); 
  const [listingDetails, setListingDetails] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchListingDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/listing/${listingId}`);
        setListingDetails(response.data);
      } catch (error) {
        console.error('Error fetching listing details:', error);
      }
    };
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/user/${userId}`);
        setUser(response.data);
        console.log(user)
      } catch (error) {
        console.error('Error fetching listing details:', error);
      }
    };
    fetchUserDetails();
    fetchListingDetails();
  }, [listingId]);
  const handleDealClosure = async () => {
    try {
      // Make a request to update the listing status to "Closed"
      await axios.put(`http://localhost:8000/listing/${listingId}/close`);
      alert('Congratulations! Deal closed')
      
      // Redirect to a different page or update the UI as needed
      // For example, you can redirect the user to the home page
      history('/home', {state: user});
    } catch (error) {
      console.error('Error closing the deal:', error);
    }
  };

  if (!listingDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="listing-details-container">
      <div className="title">{listingDetails.title}</div>
      <div className="details-section">
        <div className="detail-label">Bathrooms:</div>
        <div className="detail-value">{listingDetails.bathrooms}</div>

        <div className="detail-label">Bedrooms:</div>
        <div className="detail-value">{listingDetails.bedrooms}</div>

        <div className="detail-label">Contact Email:</div>
        <div className="detail-value">{listingDetails.contactEmail}</div>

        <div className="detail-label">Contact Name:</div>
        <div className="detail-value">{listingDetails.contactName}</div>

        <div className="detail-label">Contact Phone:</div>
        <div className="detail-value">{listingDetails.contactPhone}</div>

        <div className="detail-label">Description:</div>
        <div className="detail-value">{listingDetails.description}</div>

        <div className="detail-label">Location:</div>
        <div className="detail-value">{listingDetails.location}</div>

        <div className="detail-label">Price:</div>
        <div className="detail-value">{listingDetails.price}</div>

        <div className="detail-label">Bids:</div>
        <div className="detail-value">{listingDetails.bids}</div>
      </div>
      <div className="btn-container">
      <button className="btn btn-primary">Delete Listing</button>
      <button className="btn btn-primary">View Bids</button>
      <button className="btn btn-primary" onClick={handleDealClosure}>Close the Deal</button>
    </div>
    </div>
  );
};

export default ListingDetails;
