import React , { Component }from 'react';
import logo from './logo.svg';
import {BrowserRouter as Router,Route} from 'react-router-dom'
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

import Register from './Components/Register'
import Login from './Components/Login'
import QuestionAnswer from './Components/QuestionAnswer'
import Chat from './Components/Chat'
import Join from './Components/Join'

class App extends Component {
  render() {
    return (
     
      <Router>
        
        <div className="App">
       
          <Route exact path="/" component = {Login}/>
          <div class="container">
          <Route exact path="/join" component = {Join}/>
          <Route exact path="/chat" component = {Chat}/>
          <Route exact path="/register" component = {Register}/>
          <Route exact path="/login" component = {Login}/>
          <Route exact path="/questionanswer" component = {QuestionAnswer}/>
          
          </div>
          </div>
      </Router>
    );
  }
}


export default App;
