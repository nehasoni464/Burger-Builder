import React from 'react'
import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'
import './SideDrawer.css'
import Aux from '../../../hoc/Aux'
import Backdrop from '../../UI/Backdrop/Backdrop'
const sideDrawer= (props)=>{
    let attachedC=['SideDrawer','Close'];
    if(props.open){
        attachedC=['SideDrawer','Open'];
    }



    return(
    


    <Aux>
        <Backdrop show={props.open} clicked={props.closed}/>
<div className= {attachedC.join(' ')}>
    {/* <div className="Logo"> */}
    <Logo height="3rem" />
    {/* </div> */}
   
    <nav>
        <NavigationItems/>
    </nav>
</div>
</Aux>
)
}
export default sideDrawer;
