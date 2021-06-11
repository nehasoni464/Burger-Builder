import React, { Component } from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../Components/Burger/Burger';
import BuildControls from '../../Components/Burger/BuildControls/BuildControls';
import Modal from '../../Components/UI/Modal/Modal';
import OrderSummary from '../../Components/Burger/OrderSummary/OrderSummary';
import axios from '../../axiosOrders'
import Spinner from '../../Components/UI/Spinner/Spinner'
//import Backdrop from '../../Components/UI/Backdrop/Backdrop'
import errorHandling from '../../hoc/ErrorHandling/ErrorHandling';
import * as actionType from '../../Store/action';
import {connect} from 'react-redux'





class BurgerBuilder extends Component {
    // constructor(props){
    //     super(props);
    //     this.state={...}

    // }
    state = {
        // ingredients: null,
        // tprice: 6,
        // purchasable: false,
        purchasing: false,
        loading: false,
        error: false
    }


    componentDidMount() {
        console.log('hello')
        // axios.get('https://burger-bae-default-rtdb.firebaseio.com/ingredients.json')
        //     .then(response => {
        //         this.setState({ ingredients: response.data }, () => {
        //             //console.log("Updated state: ", this.state);
        //         })

        //     })
        //     .catch(error => this.setState({ error: true }))
    }

    updatePurchaseState(ingredients) {
        //  const ingredients={
        //      ...this.state.ingredients
        //  }
        const sum = Object.keys(ingredients)
            .map(igkey => {
                return ingredients[igkey]
            })
            .reduce((sum, el) => {
                return sum + el;

            }, 0);
        return(sum > 0 )


    }
    // addIngredientHandler = (type) => {
    //     const oldCount = this.state.ingredients[type];
    //     const ucount = oldCount + 1;
    //     const uingredients = {
    //         ...this.state.ingredients
    //     }
    //     uingredients[type] = ucount;
    //     const priceAddition = ingredient_p[type];
    //     const oldP = this.state.tprice;
    //     const newP = oldP + priceAddition;
    //     this.setState({ tprice: newP, ingredients: uingredients })
    //     this.updatePurchaseState(uingredients)
    // }
    // removeIngredientHandler = (type) => {
    //     const oldCount = this.state.ingredients[type]
    //     if (oldCount <= 0) {
    //         return;
    //     }
    //     const ucount = oldCount - 1;
    //     const uingredients = {
    //         ...this.state.ingredients
    //     }
    //     uingredients[type] = ucount;
    //     const newR = this.state.tprice - ingredient_p[type]
    //     this.setState({ tprice: newR, ingredients: uingredients })
    //     this.updatePurchaseState(uingredients)
    // }
    purchaseHandler = () => {

        this.setState({ purchasing: true })
    }
    purchaseCancelHandler = () => {

        this.setState({ purchasing: false })
    }
    purchaseContinueHandler = () => {
        // this.setState({ loading: true })
        // alert('chl continue')
        // const order = {
        //     ingredients: this.state.ingredients,
        //     price: this.state.tprice,
        //     customer: {
        //         name: 'neha',
        //         address: {
        //             street: 'sff',
        //             pincode: '495',
        //             country: 'India'
        //         },
        //         email: 'dummy@test.com'
        //     },
        //     deliveryMethod: 'fastest'
        // }

        // axios.post('/orders.json', order)
        //     .then(response => this.setState({ loading: false, purchasing: false }))
        //     .catch(error => this.setState({ loading: false, purchasing: false }))
    //    const queryParams=[];
    //    for(let i in this.state.ingredients){
    //        queryParams.push(encodeURIComponent(i)+'='+encodeURIComponent(this.state.ingredients[i]))
    //    }
    //    queryParams.push('price='+this.state.tprice)
    //    const queryString =queryParams.join('&');

        this.props.history.push('/checkout');
    }






    render() {
        const disabledInfo = {

            ...this.props.ings
        }
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0

        }
        let orderSummary = null;
        let burger = null;




        if (this.props.ings === null) {
            burger = this.state.error ? <p >"opps something went wrong!!"</p> : <Spinner />
        }
        else {
            burger = (<Aux>
                <Burger ingredients={this.props.ings} />
                <BuildControls
                    ingredientAdded={this.props.onIngredientsAdded}
                    ingredientRemove={this.props.onIngredientsRemove}
                    disabled={disabledInfo}
                    purchasable={this.updatePurchaseState(this.props.ings)}
                    ordered={this.purchaseHandler}
                    price={this.props.price} />
            </Aux>)
            orderSummary = (<Aux><OrderSummary ingredients={this.props.ings}
                price={this.props.price}
                purchaseCancel={this.purchaseCancelHandler}
                purchaseContinue={this.purchaseContinueHandler} /></Aux>)
        }
        if (this.state.loading) {
            orderSummary = <Spinner />
        }





        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        )
    }
}
const mapStateToProps=state=>{
    return{
        ings:state.ingredients,
        price:state.tprice
    }
}
const mapDispatchToProps=dispatch=>{
    return{
        onIngredientsAdded:(ingName)=>dispatch({type:actionType.ADD_INGREDIENT,ingredientName:ingName}),
        onIngredientsRemove:(ingName)=>dispatch({type:actionType.REMOVE_INGREDIENT,ingredientName:ingName})
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(errorHandling(BurgerBuilder, axios));