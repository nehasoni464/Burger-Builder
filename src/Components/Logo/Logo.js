import React from 'react'
import BurgerLogo from '../../assests/images/127 burger-logo.png'
import './Logo.css'

const logo=(props)=>(
    <div className="Logo">
        <img src={BurgerLogo} alt="MyBurger" style={{height: props.height}}/>
    </div>
)

export default logo;