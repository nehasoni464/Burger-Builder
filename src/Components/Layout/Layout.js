import React, { Component }from 'react';
import Aux from '../../hoc/Aux';
import Toolbar from '../Navigation/Toolbar/Toolbar'
import './Layout.css'
import Sidedrawer from '../Navigation/SideDrawer/SideDrawer'
class Layout extends Component{
    state={
        showSideDrawer:false
    }
    sideDrawerCloseHandler=()=>{
        this.setState({showSideDrawer:false})
    }
    sideDrawerToggleHandler=()=>{
        this.setState((prevstate)=>{
            return {showSideDrawer:!prevstate.showSideDrawer}
        })
    }
    render(){
        return (
        <Aux>
        <Toolbar drawerClicked={this.sideDrawerToggleHandler}/>
    
        <Sidedrawer closed={this.sideDrawerCloseHandler}
        open={this.state.showSideDrawer}/>  
          <main className="Content">
            {this.props.children}
        </main>
    
        </Aux>)
    }
}
export default Layout; 