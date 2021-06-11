// import classes from '*.module.css'
import React from 'react'
import './Navigation.css'
import { NavLink } from 'react-router-dom'
import { exact } from 'prop-types'
 const navigationItem=(props)=>(
     
         <li className="NavigationItem">
       <NavLink to={props.link}
       exact={props.exact}
       activeClassName='active'>
         {props.children}</NavLink>
         </li>
    
 )
 export default navigationItem