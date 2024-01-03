// ListingDetails.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import '../styles/realtorcomponent.css'; // Import common styles
import '../styles/listingDetails.css'; // Import the CSS file
import BidForm from './bidForm';
import BidList from './bidList';

const BuyerListingDetails = ({}) => {
  const { listingId, userId } = useParams();
  const history = useNavigate();
  const [listingDetails, setListingDetails] = useState(null);
  const [user, setUser] = useState(null);
  const [showBidForm, setShowBidForm] = useState(false);
  const [showBidList, setShowBidList] = useState(false); // New state to toggle bid list

  const handlePlaceBid = () => {
    setShowBidForm(false);
    setShowBidForm(true);
  };

  const handleViewBids = () => {
    setShowBidForm(false);
    setShowBidList(true);
  };

  const handleCloseBidForm = () => {
    setShowBidForm(false);
  };

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
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    fetchUserDetails();
    fetchListingDetails();
  }, [listingId]);


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
      <button className="btn btn-primary" onClick={handlePlaceBid}>
          Place Bid
        </button>
        <button className="btn btn-primary" onClick={handleViewBids}>
          View Bids
        </button>
      
    </div>
    {showBidForm && (
        <BidForm listing={listingDetails} user={user} onClose={handleCloseBidForm} />
      )}
      {showBidList && <BidList listingId={listingId} />}
    
    </div>
  );
};

export default BuyerListingDetails;
