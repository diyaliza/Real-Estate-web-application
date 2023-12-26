import React from "react"
import {useLocation, useNavigate} from 'react-router-dom';

function Home(){
    const location =useLocation()
    return (
        <div className="homePage">
            <h1>Hello {location.state.name} and welcome to the homepage, you are {location.state.userType}</h1>
        </div>
    )
}

export default Home