import axios from '../../axiosOrders';
import React, { Component } from 'react'
import Button from '../../Components/UI/Button/Button'
import Spinner from '../../Components/UI/Spinner/Spinner'
import './ContactData.css'
import Input from '../../Components/UI/Input/Input'
import{connect} from 'react-redux'
class ContactData extends Component {
    state = {
        orderForm: {

            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'your Name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched:false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'street'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched:false
            },
            zipcode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'zipcode'
                },
                value: '',
                validation: {
                    required: true,
                    minlength:5,
                    maxlength:5
                },
                valid: false,
                touched:false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched:false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'your Mail'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched:false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        { value: 'fastest', displayValue: 'Fastest' },
                        { value: 'cheapest', displayValue: 'cheapest' }
                    ]
                },
                 valid:true,
                value: 'fastest',
                validation:{}
            }
        },
        loading: false,
        formValid:false
    }
    checkValidity(value, rules) {
        // console.log("--->",rules);
        let isValid = true;
        if (rules.required) {
            isValid = value.trim() !== "" && isValid;
        }
        if(rules.minlength)
        {
            isValid=value.length>=rules.minlength && isValid;
        }
        if(rules.maxlength)
        {
            isValid=value.length<=rules.maxlength && isValid;
        }
        return isValid;
    }
    orderHandler = (event) => {
        event.preventDefault();
        this.setState({ loading: true })
        const formdata = {}
        for (let i in this.state.orderForm) {
            formdata[i] = this.state.orderForm[i].value
        }
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            orderdata: formdata

        }
        console.log(order);
        axios.post('/orders.json', order)
            .then(response => {
                this.setState({ loading: false })
                this.props.history.push('/')

            })
            .catch(error => {
                this.setState({ loading: false })
            })
    }

    changeHandler = (event, identifier) => {
        const updatedOrderForm = {
            ...this.state.orderForm
        }
        const updatedFormelement =
        {
            ...updatedOrderForm[identifier]
        }
        updatedFormelement.value = event.target.value;
        updatedFormelement.valid = this.checkValidity(updatedFormelement.value, updatedFormelement.validation)
       
        updatedFormelement.touched=true
        updatedOrderForm[identifier] = updatedFormelement;
        let formIsValid= true;
        for (let i in updatedOrderForm){
            formIsValid=updatedOrderForm[i].valid && formIsValid;

        }
        this.setState({ orderForm: updatedOrderForm, formValid:formIsValid})
    }
    render() {
        const formElementsArray = [];
        for (let key in this.state.orderForm) {
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            });
        }
        let form = (
            <form onSubmit={this.orderHandler}>
                {formElementsArray.map(formElement => (
                    <Input

                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        invalid={!formElement.config.valid}
                        shouldValidate={formElement.config.validation}
                        touched={formElement.config.touched}
                        key={formElement.id}
                        changed={(event) => this.changeHandler(event, formElement.id)}
                    />

                ))}

                <Button btnType="Success" disabled={!this.state.formValid}>Order</Button>
            </form>

        );
        if (this.state.loading) {
            form = <Spinner />
        }
        return (
            <div className='ContactData'>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        )

    }
}
 const mapStateToProps=state=>{
     return{
         ingredients:state.ingredients,
         price:state.tprice
     }
 }



export default connect(mapStateToProps) (ContactData);