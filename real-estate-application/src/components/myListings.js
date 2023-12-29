// MyListings.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import '../styles/realtorcomponent.css';


function MyListings({ user }) {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        console.log(user.userId);
        const response = await axios.get(`http://localhost:8000/list/${user.userId}`);
        setListings(response.data);
      } catch (error) {
        console.error('Error fetching listings:', error);
      }
    };

    fetchListings();
  }, [user]);

  return (
    <div className="card-container">
      {listings.map(listing => (
        <Card key={listing.listingId} className={`custom-card ${listing.listingId}`}>
          <Card.Img variant="top" src={listing.image} />
          <Card.Body>
            <Card.Title className="uppercase-title">{listing.title}</Card.Title>
            <Card.Text className="lowercase-text">{listing.description}</Card.Text>
            <Link to={`/listing/${listing.listingId}`}>
              <Button variant="primary">View Details</Button>
            </Link>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
}

export default MyListings;
