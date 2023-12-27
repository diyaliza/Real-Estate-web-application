import React from "react"
import {useLocation, useNavigate} from 'react-router-dom';
import RealtorComponent from "./realtorcomponent";
import BuyerComponent from "./buyercomponent";
import '../styles/home.css'

function Home(){
    const location =useLocation()
    return (
        <div className="homePage">
            <h1>Welcome, {location.state.name}</h1>
            
            
            {location.state.userType === 'realtor' ? (
                <RealtorComponent />
            ) : (
                <BuyerComponent />
            )}
        </div>
    )
}

export default Home