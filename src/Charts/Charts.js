import React, { Component } from 'react';

  var ChartsContext=this;

class Charts extends Component {
    constructor(props) {
        super(props);
        ChartsContext=this;
        ChartsContext.state = {
            isLoaded: false,
         Updateddata:[],
         ChartData:[],
         CurrentRow:-1
        };
    }
    render() {
        return (<div className="col-md-12" id="ChartRender">
        </div>)
    }
    componentDidMount()
    { 
        ChartsContext.Load();
    }
    LoadChart()
    {
        var Highcharts = require('highcharts');
        require('highcharts/modules/exporting')(Highcharts);
      
        Highcharts.chart('ChartRender', {
            // options - see https://api.highcharts.com/highcharts
        });
        Highcharts.chart('ChartRender', {
            chart: {
                type: 'spline',
                animation: Highcharts.svg, // don't animate in old IE
                marginRight: 10,
                events: {
                    load: function () {
        
                        // set up the updating of the chart each second
                        var series = this.series[0];
                        setInterval(function () {
                            var x = (new Date()).getTime(), // current time
                                y = ChartsContext.ChangeCurrentRow().accuracy;
                            series.addPoint([x, y], true, true);
                        }, 5000);
                    }
                }
            },
        
            time: {
                useUTC: false
            },
        
            title: {
                text: 'Accuracy Data'
            },
            xAxis: {
                type: 'Date',
                tickPixelInterval: 150
            },
            yAxis: {
                title: {
                    text: 'Value'
                },
                plotLines: [{
                    value: 0,
                    width: 1,
                    color: '#808080'
                }]
            },
            tooltip: {
                headerFormat: '<b>{series.name}</b><br/>',
                pointFormat: '{point.x:%Y-%m-%d %H:%M:%S}<br/>{point.y:.2f}'
            },
            legend: {
                enabled: false
            },
            exporting: {
                enabled: false
            },
            series: [{
                name: 'Random data',
                data: (function () {
                    // generate an array of random data
                    var data = [],
                        time = (new Date()).getTime(),
                        i;
        
                    for (i = -19; i <= 0; i += 1) {
                        data.push({
                            x: time + i * 5000,
                            y: Math.random()
                        });
                    }
                    return data;
                }())
            }]
        });
    }
    Load()
    {
        fetch("https://react-assessment-api.herokuapp.com/api/drone")
            .then(res => res.json())
            .then(
            (result) => {
                ChartsContext.setState({
                isLoaded: true,
                Updateddata: result.data,
                CurrentRow:-1
                });
                ChartsContext.LoadChart();
                //setInterval(ChartsContext.ChangeCurrentRow, 5000);
            },
            (error) => {
                ChartsContext.setState({
                isLoaded: true
                });
            }
            )
    }
        ChangeCurrentRow()
        {
            var CurrentRowIndex=ChartsContext.state.CurrentRow;
            CurrentRowIndex=CurrentRowIndex+1;
            if(CurrentRowIndex>ChartsContext.state.Updateddata.length)
            {
                CurrentRowIndex=0;
            }
            ChartsContext.setState({
                CurrentRow: CurrentRowIndex
                });
           return this.state.Updateddata[CurrentRowIndex];
        }
    }

export default Charts;