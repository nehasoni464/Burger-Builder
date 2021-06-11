import React, { Component } from 'react'
import Order from '../../Components/Order/Order'
import axios from '../../axiosOrders'
import withErrorHandler from '../../hoc/ErrorHandling/ErrorHandling'
class Orders extends Component {

    state = {
        orders: [],
        loading: true
    }
    componentWillMount() {
    
        axios.get('/orders.json')
            .then(res => {
                console.log(res);
                const fetchedOrders = [];
                for (let key in res.data) {
                    fetchedOrders.push({
                        ...res.data[key],
                        id: key
                    })

                }
                this.setState({ loading: false, orders: fetchedOrders })
            })
            .catch(err => {
                this.setState({ loading: false })
            })
    }
    render() {
       
        return (
            <div>
                {this.state.orders.map(order => (
                    <Order key={order.id}
                    ingredients={order.ingredients}
                    price={order.price} 
                    />
                ))
                }
                
            </div>
        )
    }
}
export default withErrorHandler(Orders, axios);