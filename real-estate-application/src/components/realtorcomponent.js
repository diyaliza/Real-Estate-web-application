import React from 'react';
import Header from './header'; // Correct import statement


function RealtorComponent() {
  const items = [
    {
      name: "New Listing",
      color: "#001f3f",
      href: "#"
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

  return (
    <div className="App">
      
      <Header items={items} /> {/* Use the correct component name (Header) */}
    </div>
  );
}

export default RealtorComponent; // Use 'export default' instead of 'module.exports'
