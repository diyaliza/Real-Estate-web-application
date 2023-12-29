import React, { useRef, useState, useEffect, createRef } from 'react';
import gsap from 'gsap';
import '../styles/menu.css';
import NewListingForm from './newListingForm';
import MyListings from './myListings';

const Header = ({ items, user }) => {
  const $root = useRef();
  const $indicator1 = useRef();
  const $indicator2 = useRef();
  const $items = useRef(items.map(createRef));
  const [hoveredItem, setHoveredItem] = useState(-1);
  const [clickedItem, setClickedItem] = useState(-1);
  const [showNewListingForm, setShowNewListingForm] = useState(false);
  const [showMyListings, setShowMyListings] = useState(false); 

  const animate = () => {
    const activeItem = $items.current[clickedItem !== -1 ? clickedItem : hoveredItem];
    if (!activeItem || !activeItem.current) return;
  
    const menuOffset = $root.current.getBoundingClientRect();
    const { width, height, top, left } = activeItem.current.getBoundingClientRect();
  
    const settings = {
      x: left - menuOffset.x,
      y: top - menuOffset.y,
      width: width,
      height: height,
      backgroundColor: items[clickedItem !== -1 ? clickedItem : hoveredItem].color,
      ease: 'elastic.out(.7, .7)',
      duration: 0.8
    };
  
    gsap.to($indicator1.current, {
      ...settings
    });
  
    gsap.to($indicator2.current, {
      ...settings,
      duration: 1
    });
  };
  
  useEffect(() => {
    animate();
    window.addEventListener('resize', animate);

    return () => {
      window.removeEventListener('resize', animate);
    };
  }, [hoveredItem, clickedItem]);

  const handleItemHover = (index) => {
    setHoveredItem(index);
  };

  const handleItemClick = (index) => {
    setClickedItem((prev) => (prev === index ? -1 : index)); // Toggle the clicked item
    switch(index){
      case 0:
        setShowNewListingForm(true);
        setShowMyListings(false);
        break;
      case 1:
        setShowNewListingForm(false);
        setShowMyListings(true);
        break;
      default:
        setShowNewListingForm(false);
        setShowMyListings(false);
    }
   
  };

  return (
    <div>
      <div ref={$root} className="menu">
        {items.map((item, index) => (
          <button
            key={item.name}
            ref={$items.current[index]}
            className={`item ${clickedItem === index ? 'active' : ''}`}
            onMouseEnter={() => handleItemHover(index)}
            onClick={() => handleItemClick(index)}
          >
            {item.name}
          </button>
        ))}
        <div ref={$indicator1} className="indicator" />
        <div ref={$indicator2} className="indicator" />
      </div>
      <div className = "item-show">
        {showNewListingForm && <NewListingForm user={user}/>}
        {showMyListings && <MyListings user={user} />}
        </div>
    </div>
  );
};

export default Header;
