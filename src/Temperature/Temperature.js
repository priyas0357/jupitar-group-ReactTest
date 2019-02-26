import React, { Component } from 'react';

import ReactDOM from 'react-dom';
var TemperatureContext=this;
class Temperature extends Component {
    constructor(props) {
        super(props);
        TemperatureContext=this;
        TemperatureContext.state = {
            isLoaded: false,
         Updateddata:[],
         CurrentRow:-1
        };
      }
    render() {
      return (<div className="col-md-12">

          {TemperatureContext.state.Updateddata!=null && TemperatureContext.state.CurrentRow!=-1?(
              <div className="col-md-12">
                  uom: {TemperatureContext.state.Updateddata[TemperatureContext.state.CurrentRow].uom}<br />
                    metric:   {TemperatureContext.state.Updateddata[TemperatureContext.state.CurrentRow].metric}<br />
                    latitude: {TemperatureContext.state.Updateddata[TemperatureContext.state.CurrentRow].latitude}<br />
                    accuracy: {TemperatureContext.state.Updateddata[TemperatureContext.state.CurrentRow].accuracy}<br />
                    timestamp:  {TemperatureContext.state.Updateddata[TemperatureContext.state.CurrentRow].timestamp}<br />
                    longitude: {TemperatureContext.state.Updateddata[TemperatureContext.state.CurrentRow].longitude}<br />
              </div>
          ):
          <div></div>}
      </div>)}
      componentDidMount()
      {
          TemperatureContext.Load();
       

      }
    Load()
    {
        fetch("https://react-assessment-api.herokuapp.com/api/drone")
            .then(res => res.json())
            .then(
            (result) => {
                TemperatureContext.setState({
                isLoaded: true,
                Updateddata: result.data,
                CurrentRow:-1
                });
                TemperatureContext.ChangeCurrentRow();
                setInterval(TemperatureContext.ChangeCurrentRow, 5000);
            },
            (error) => {
                TemperatureContext.setState({
                isLoaded: true
                });
            }
            )
    }
        ChangeCurrentRow()
        {
            var CurrentRowIndex=TemperatureContext.state.CurrentRow;
            CurrentRowIndex=CurrentRowIndex+1;
            if(CurrentRowIndex>TemperatureContext.state.Updateddata.length)
            {
                CurrentRowIndex=0;
            }
            TemperatureContext.setState({
                CurrentRow: CurrentRowIndex
                });
        }
    }

    export default Temperature;