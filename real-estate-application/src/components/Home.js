import React from "react"
import {useLocation, useNavigate} from 'react-router-dom';
import RealtorComponent from "./realtorcomponent";
import BuyerComponent from "./buyercomponent";
import '../styles/home.css'

function Home(){
    const location =useLocation()
    const userName = location.state?.name || 'Guest';
    const userType = location.state?.userType || 'Unknown';
    return (
        <div className="homePage">
            <h1>Welcome, {userName} and you are a {userType}</h1>
            
            
            {location.state.userType === 'realtor' ? (
                <RealtorComponent user={location.state}/>
            ) : (
                <BuyerComponent />
            )}
        </div>
    )
}

export default Home