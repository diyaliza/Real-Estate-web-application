import React, { useState } from 'react';
import Header from './header'; // Correct import statement
import NewListingForm from './newListingForm';
import '../styles/realtorcomponent.css'


function RealtorComponent({ user }) {
  const items = [
    {
      name: "New Listing",
      color: "#001f3f",
      href: "https:localhost:8000/listing/new"
    },
    {
      name: "My Listings",
      color: "#001f3f",
      href: "#"
    },
    {
      name: "News",
      color: "#001f3f",
      href: "#"
    }
  ]; 
  const [showNewListingForm, setShowNewListingForm] = useState(false); 
  const [showMyListings, setShowMyListings] = useState(false); 
  const handleItemClick = (index) => {
    switch(index){
      case 0:
        console.log(index)
        setShowNewListingForm(true);
        setShowMyListings(false);
        break;
      case 1:
        console.log(index)
        setShowMyListings(true);
        setShowNewListingForm(false);
        break;
      default:
        break;
    }
  }

  return (
    <div className="comp">
      <div>
        <Header items={items} onItemClick={handleItemClick} user={user}/> 
      </div>
      
    </div>
  );
  
  
}

export default RealtorComponent; // Use 'export default' instead of 'module.exports'
