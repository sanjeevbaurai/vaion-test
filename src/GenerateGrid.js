//App.js
import React, { Component } from 'react';
import InputRange from 'react-input-range';
import 'react-input-range/lib/css/index.css';


export default class GenerateGrid  extends Component {
    constructor(props) {
      super(props);
   
      this.state = {
        value: 5
      };
    }
    
    handleGridClick(event){
        console.log(event)
        this.setState({value:event});
        this.props.handlerFromParant(event);
    }
   
    render() {
      return (
        <InputRange
        maxValue={10}
        minValue={0}
        value={this.state.value}
       // onChange={value => this.setState({ value })} 
        onChange={
            (e) => { this.handleGridClick(e) }}/>
      );
    }
  }