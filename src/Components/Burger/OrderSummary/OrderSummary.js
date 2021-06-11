import React from 'react'
import Aux from '../../../hoc/Aux'
import Button from '../../UI/Button/Button'

const orderSummary =(props)=>{
    
    const ingredientSummary=Object.keys(props.ingredients)
.map(igKey=>{
    return <li key={igKey}>
        <span style={{textTransform:'capitalize'}}>{igKey}</span>: {props.ingredients[igKey]}</li>
})





return(
    <Aux>
        <h3>your Order</h3>
        <p>A yummy burger has these ingredients</p>
    <ul>
        {ingredientSummary}
    </ul>
    <p><strong>Total Price:{props.price.toFixed(2)}</strong></p>
    <p>Continuee to checkout</p>
    <Button btnType="Danger" clicked={props.purchaseCancel}>Cancel</Button>
    <Button btnType="Success" clicked={props.purchaseContinue}>Continue</Button>
    </Aux>
)
}
export  default orderSummary