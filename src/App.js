import React, { Component } from 'react';
import Layout from './Components/Layout/Layout'
import BurgerBuilder from './Containers/BurgerBuilder/BurgerBuilder';
import {Route,Switch} from 'react-router-dom'
import Checkout from './Containers/BurgerBuilder/Checkout/Checkout'
import Orders from './Containers/Orders/Orders'
class App extends Component {
  render() {
    return (
      <div>
        <Layout>
          <Switch>
            <Route path="/checkout"  component={Checkout}/>
            <Route path="/Orders"  component={Orders}/>
            <Route path="/" exact component={BurgerBuilder} />
          </Switch>
        </Layout>
       
          
      </div>
    );
  }
}

export default App;
