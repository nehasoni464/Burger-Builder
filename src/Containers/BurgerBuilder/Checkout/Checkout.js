import React, {Component} from 'react';
import CheckoutSummary from '../../../Components/Order/CheckoutSummary/CheckoutSummary'
import {Route} from 'react-router-dom';
import ContactData from '../../ContactData/ContactData'
import {connect} from 'react-redux'
class Checkout extends  Component{
    // state={
    //     ingredients:null, 
    //     price:0
    // }
    // componentWillMount(){
    //     const query=new URLSearchParams(this.props.location.search);
    //     const ingredients={};
    //     let price=0;
    //     for(let param of query.entries()){
    //         if(param[0]==='price'){
    //             price=param[1]
    //         }else{
    //             ingredients[param[0]]= +param[1];
    //         }
    //     }
    //     this.setState({ingredients:ingredients, price:price})
    // }
    checkoutCancelledHandler=()=>{
        this.props.history.goBack();
    }
    checkoutContinueHandler=()=>
    {
        this.props.history.replace('/checkout/contact-data');
    }
    render(){
        return(
            <div>
                <CheckoutSummary ingredients={this.props.ings}
                checkoutCancelled={this.checkoutCancelledHandler}
                checkoutContinue={this.checkoutContinueHandler}/>
                <Route path={this.props.match.path +'/contact-data'} 
                // render={(props)=>(<ContactData price={this.state.price} ingredients={this.state.ingredients}{...props}/>)}
                component={ContactData}
                />
            </div>
        )

    }

}
const mapStateToProps=state=>{
    return{
        ings:state.ingredients,
        // price:state.tprice
    }
}
export default connect(mapStateToProps) (Checkout) 