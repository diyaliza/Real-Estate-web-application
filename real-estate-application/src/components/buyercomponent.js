import HeaderBuyer from './headerBuyer.js'
import React, { useState } from 'react';
function BuyerComponent({user}){
    const items = [
        {
          name: "Listings",
          color: "#001f3f",
          href: "https:localhost:8000/listings"
        },
        {
          name: "My Bids",
          color: "#001f3f",
          href: "#"
        },
        {
          name: "News",
          color: "#001f3f",
          href: "#"
        }
      ]; 
      const [showListings, setShowListings] = useState(false); 
      const [showMyBids, setShowMyBids] = useState(false); 
      const handleItemClick = (index) => {
        switch(index){
          case 0:
            console.log(index)
            showListings(true);
            showMyBids(false);
            break;
          case 1:
            console.log(index)
            showMyBids(true);
            showListings(false);
            break;
          default:
            break;
        }
      }
    
      return (
        <div className="comp">
          <div>
            <HeaderBuyer items={items} onItemClick={handleItemClick} user={user}/> 
          </div>
          
        </div>
      );
}
export default BuyerComponent