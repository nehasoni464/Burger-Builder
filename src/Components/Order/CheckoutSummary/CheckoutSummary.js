import React from 'react'
import Burger from '../../Burger/Burger'
import Button from '../../UI/Button/Button'
import Spinner from '../../UI/Spinner/Spinner'
import './CheckoutSummary.css'
const checkoutSummary= (props)=>{
    if(!props.ingredients){
        return <Spinner/>
    }







return(
    <div className='CheckoutSummary'>
        <h1>We hope it tastes well!!</h1>
        <div style={{width:'300px',  margin:'auto'}}>
    <Burger ingredients={props.ingredients}/>
    </div>
    <Button btnType="Danger"
    clicked={props.checkoutCancelled}>Cancel</Button>
    <Button btnType="Success"
    clicked={props.checkoutContinue}>Continue</Button>
    </div>
)



}
export default checkoutSummary;