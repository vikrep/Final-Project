import React, { Component } from 'react';
import './Button.css'

class Button extends Component  {
    render(){
        return(
            <div className="wrapper">
               <button className="btn fn-submit-name searchB" onClick={this.props.clicked}>{this.props.name}</button>
                </div>
        )
    }

}
export default Button;