import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { LineChart, Line, Legend, XAxis, YAxis, Tooltip, ResponsiveContainer, Label } from 'recharts';

class TimeSeriesField extends Component {
    constructor(props) {
        super(props);
        this.state = {timeSeries : []}
    }
    
    componentDidMount() {
        this.timerID = setInterval(this.updateTimeSeriesData.bind(this), this.props.interVal);
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    updateTimeSeriesData() {
        this.setState((prevState, props)=>{
            let newSeriesData = {
                time:new Date(),
            }
            newSeriesData[this.props.source] = Math.random()
            return {timeSeries : prevState.timeSeries.concat(newSeriesData).slice(-props.seriesLength)};
        })
    }

    render () {
        const { label, source, record = {} } = this.props;

        return (
            <ResponsiveContainer minWidth={200} width="99%" height={320} debounce={1} margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
                <LineChart data={this.state.timeSeries}>
                    <XAxis dataKey="time">
                        <Label value="Time" position="insideBottom"/>
                    </XAxis>
                    <YAxis label={{ value : label?label:'', angle:-90, offset:-10, position:'left'}} />
                    <Tooltip />
                    <Legend verticalAlign="top" />
                    <Line type="monotone" dataKey={source} stroke="#8884d8" />
                </LineChart>
            </ResponsiveContainer>
        );
    }
} 

TimeSeriesField.propTypes = {
    label: PropTypes.string,
    record: PropTypes.object,
    source: PropTypes.string.isRequired,
    interVal : PropTypes.number,
};

TimeSeriesField.defaultProps = {
    source : "value",
    interVal : 3000,
    seriesLength : 10,
}

export default TimeSeriesField;