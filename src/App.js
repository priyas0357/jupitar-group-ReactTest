import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Router, Route} from 'react-router';
import ReactDOM from 'react-dom';
import Temperature from '../src/Temperature/Temperature';
import Charts from '../src/Charts/Charts';
import 'bootstrap/dist/css/bootstrap.min.css';
class App extends Component {
  render() {
    return (
      <div className="row">
      <div className="col-md-12">
     <center> <h2>
        Assignment
      </h2>
      </center>
      </div>
      <div className="panel panel-default col-md-6">
    <div className="panel-body col-md-12" id="Temperature"></div>
       </div>
       <div id="Charts" className="col-md-6">

       </div>
      </div>
    );
  }
  componentDidMount()
  {
    this.Temperature();
  }
  Temperature()
  {
    ReactDOM.render(<Temperature />, document.getElementById("Temperature"));
    ReactDOM.render(<Charts />, document.getElementById("Charts"));
  }
 /* <div className="AppHeader">
 } <Router>
    <Route exact path="/" component={Temperature} />
  </Router>
  <a href='/'>Home</a>
</div>*/
}
export default App;
