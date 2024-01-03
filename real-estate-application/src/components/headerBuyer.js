import React, { useRef, useState, useEffect, createRef } from 'react';
import gsap from 'gsap';
import '../styles/menu.css';
import Listings from './listings';
import MyListings from './myListings';

const HeaderBuyer = ({ items, user }) => {
  const $root = useRef();
  const $indicator1 = useRef();
  const $indicator2 = useRef();
  const $items = useRef(items.map(createRef));
  const [hoveredItem, setHoveredItem] = useState(-1);
  const [clickedItem, setClickedItem] = useState(-1);
  const [showListings, setshowListings] = useState(false);
  const [showMyBids, setshowMyBids] = useState(false); 

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
        setshowListings(true);
        setshowMyBids(false);
        break;
      case 1:
        setshowListings(false);
        setshowMyBids(true);
        break;
      default:
        setshowListings(false);
        setshowMyBids(false);
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
        {showListings && <Listings user={user}/>}
        {showMyBids && <Listings user={user} />}
        </div>
    </div>
  );
};

export default HeaderBuyer;
