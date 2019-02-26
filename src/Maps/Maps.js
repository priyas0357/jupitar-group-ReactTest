import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
 
const AnyReactComponent = ({ text }) => <div>{text}</div>;
var MapsContext=this;
class Maps extends Component {
    constructor(props) {
        super(props);
        MapsContext=this;
        MapsContext.state = {
            isLoaded: false,
         Updateddata:[],
         CurrentData:null,
         CurrentRow:-1,
         latitude: 59.95,
         longitude: 30.33,
         Area:""
        };
    }
    static defaultProps = {
        center: {
         
        },
        zoom: 11
      };
     
      render() {
        return (
          // Important! Always set the container height explicitly
          <div id="MapRender">
 <div style={{ height: '100vh', width: '100%' }}>
       <GoogleMapReact
         bootstrapURLKeys={{ key: "" }}
         defaultCenter={this.props.center}
         defaultZoom={this.props.zoom}
       >
         <AnyReactComponent
           lat={this.state.latitude}
           lng={this.state.longitude}
           text={this.state.Area}
         />
       </GoogleMapReact>
          </div>
          </div>
        );
      }
      Load()
    {
        fetch("https://react-assessment-api.herokuapp.com/api/drone")
            .then(res => res.json())
            .then(
            (result) => {
                MapsContext.setState({
                isLoaded: true,
                Updateddata: result.data,
                CurrentRow:-1
                });
                MapsContext.ChangeCurrentRow();
                setInterval(MapsContext.ChangeCurrentRow, 5000);
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
        var CurrentRowIndex=MapsContext.state.CurrentRow;
        CurrentRowIndex=CurrentRowIndex+1;
        if(CurrentRowIndex>MapsContext.state.Updateddata.length)
        {
            CurrentRowIndex=0;
        }
        fetch("https://react-assessment-api.herokuapp.com/api/weather/location/search/?lattlong="+MapsContext.state.Updateddata[CurrentRowIndex].latitude+","+MapsContext.state.Updateddata[CurrentRowIndex].longitude)
        .then(res => res.json())
        .then(
        (result) => {
        ///weather/location/search/?lattlong
            MapsContext.setState({
                CurrentRow: CurrentRowIndex,
                latitude: MapsContext.state.Updateddata[CurrentRowIndex].latitude,
                longitude: MapsContext.state.Updateddata[CurrentRowIndex].longitude,
                Area:result.data.title
                });
        },
        (error) => {
            TemperatureContext.setState({
            isLoaded: true
            });
        })
      
    }
}

export default Maps;