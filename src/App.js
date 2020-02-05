//App.js
import React, { Component } from 'react';
import  GenerateGrid  from './GenerateGrid.js'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { continueStatement } from '@babel/types';
let array ;//= new Array();
const DefaulGrid =  [
  [ 0, 0, 0, 0, 1 ],
  [ 1, 1, 0, 0, 0 ],
  [ 1, 1, 0, 1, 1 ],
  [ 0, 0, 0, 0, 0 ],
  [ 1, 1, 1, 0, 0 ],
];
let randomGrid= DefaulGrid;// [[]];
export default class App extends Component {
  
      state = { count: 0,random: 0 };

      handleClick() {
        const min = 0;
        const max = 1;
        const rand = min + Math.random() * (max - min);
        this.setState({ random: this.state.random + parseInt(rand) });
        var a = new Array(10); 
        var length=this.state.gridLength || 5;
        randomGrid=this.matrix(length, length );
        this.clearGrid();
      }
  // generate grid
      matrix(rows, cols){
      var arr = [];
    
      for(var i=0; i < rows; i++){
          // Creates an empty line
          arr.push([]);
          // Adds cols to the empty line:
          arr[i].push( new Array(cols));
          for(var j=0; j < cols; j++){
            // Initializes:
            arr[i][j] = Math.floor(Math.random() *2)  % 2 ;//defaultValue;
          }
      }
    
    return arr;
    }

    setGridLength = (childData) => {
      this.setState({gridLength: childData});
      this.clearGrid();
    }

    clearGrid(){
      for(var i = 0; i < randomGrid.length; i++) {
        var cube = randomGrid[i];
        for(var j = 0; j < cube.length; j++) {
          if(document.getElementById(i+"-"+j)){
            document.getElementById(i+"-"+j).innerHTML ="";
            document.getElementById(i+"-"+j).classList.remove("selectedSquare");
          }
        }
      }
    };
    addSelectedGrid(){
      array.map((item,ind)=>{
        for(var i = 0; i < randomGrid.length; i++) {
          var cube = randomGrid[i];
          for(var j = 0; j < cube.length; j++) {
            if(item==document.getElementById(i+"-"+j).id){
              document.getElementById(i+"-"+j).classList.add("selectedSquare");
              
            }
          }
        }
      });
    };

  handleGridClick(event)   {
      
      this.setState({ count: 0 });
    
      array=new Array();
        if(event.currentTarget.className.indexOf("zero") >-1){
          return;
        }
        
         
        this.clearGrid(); // to clear existing count lable
        var rowIndex =  event.currentTarget.id.split('-')[0];
        var colIndex = event.currentTarget.id.split('-')[1];
        if(randomGrid[rowIndex][colIndex]==1){
            array.push(rowIndex+"-"+colIndex);    
        }
        if (array.length > 0) {
            for(var i=0 ; i < array.length;i++ ) {
                var splitArray =  array[i].split("-");
                this.checkAdjacent(parseInt(splitArray[0]), parseInt(splitArray[1])) ;
            }  
        }  
        this.setState({ count: array.length });
        document.getElementById(event.currentTarget.id).innerHTML=array.length;
    }
       checkAdjacent(rowIndex, colIndex) {
     
        //Right
        var row = rowIndex;
        var col = colIndex+1;
        var length=randomGrid[0].length;
        if((row >= 0 && row <length  && col >=  0 && col < length ) &&randomGrid[row][col]==1){
            var value  = row+"-"+col;
            if (!array.includes(value)){
                array.push(value);    
            }   
        }
        //Left
        row = rowIndex;
        col = colIndex-1;
        if((row >= 0 && row <length  && col >=  0 && col < length ) && randomGrid[row][col]==1){
            var value  = row+"-"+col;
            if (!array.includes(value)){
                array.push(value);    
            }  
        }
        //bottom
        row = rowIndex+1;
        col = colIndex;
        if((row >= 0 && row <length  && col >=  0 && col < length ) &&randomGrid[row][col]==1){
            var value  = row+"-"+col;
            if (!array.includes(value)){
                array.push(value);    
            }   
        }
        //up
        row = rowIndex-1;
        col = colIndex;
        if((row >= 0 && row <length  && col >=  0 && col < length ) &&randomGrid[row][col]==1){
            var value  = row+"-"+col;
            if (!array.includes(value)){
                array.push(value);    
            }
        }
        this.addSelectedGrid();
       // console.log(array)  
    }
    render(){
       
        return (
              <div className="container">
                   <div className="row">
                   <div className="card">
                      <div className="card-header">
                      Grid Interview Problem : Vaion 
                      </div>

                      <div className="card-body row">
                      <div className="col-sm-6">
                        <h5 className="card-title">Generate Grid</h5>
                        <p className="card-text">Using a given two-dimensional array (a grid)  of 1s and 0s, rendered the grid model on a web page using a colour to represent 1s, and empty for 0s.</p>
                        <p className="card-text">When you click on a filled square, the number of filled squares connected to this square and all other filled squares connected to those squares, are counted and displays on clicked square.</p>
                        <p className="card-text">Numbers in other coloured squares are cleared when a new square is clicked</p>
                        <p className="card-text">Clicking on a non-filled square should do nothing</p>
                        <p className="card-text">Grid can be generated with the size NxN elements with 0s and 1s randomly, using the  slider, change the N value from 0 to 10, then click the button to generate random numbers of 0 and 1 and render the grid in web page. </p>
                      </div>
                        <div className="col-sm-6">
                          <div className="row">
                          <div className="col-sm-11">
                            <GenerateGrid handlerFromParant = {this.setGridLength} /> <br/> 
                            <button className="btn btn-primary" onClick={
                          (e) => { e.preventDefault(); this.handleClick(e) }}
                          >Generate</button> <br/> <br/>
                        </div>
                        <br/>
                        <br/> <br/>
                          <div className="col-sm-12">
                          {randomGrid.map((row, i) => (
                            <div className="row" key={i}>
                            {row.map((cell, j) => (
                                    <div className= {"col-sm-1"+(cell ? ' box' : ' zero') } id={`${i}-${j}`} key={j} 
                                        onClick={
                                            (e) => { e.preventDefault(); this.handleGridClick(e) }}
                                        >   
                                    </div>             
                            ))}
                            </div>
                        ))}</div></div>
                        </div>
                      </div>
                   </div>
                </div>
             </div>
        );
    }
}