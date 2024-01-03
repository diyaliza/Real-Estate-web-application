// BidList.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/BidList.css'

const BidList = ({ listingId }) => {
  const [bids, setBids] = useState([]);

  useEffect(() => {
    const fetchBids = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/bids/${listingId}`);
        setBids(response.data);
      } catch (error) {
        console.error('Error fetching bids:', error);
      }
    };

    fetchBids();
  }, [listingId]);

  if (!bids.length) {
    return <div>No bids available for this listing.</div>;
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Bid ID</th>
          <th>Bidding Price</th>
          <th>User Name</th>
          <th>Contact Email</th>
          <th>Contact Phone</th>
          {/* Add other necessary fields */}
        </tr>
      </thead>
      <tbody>
        {bids.map((bid) => (
          <tr key={bid._id}>
            <td>{bid.biddingId}</td>
            <td>{bid.biddingPrice}</td>
            <td>{bid.userName}</td>
            <td>{bid.contactEmail}</td>
            <td>{bid.contactPhone}</td>
            {/* Add other necessary fields */}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default BidList;
