import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { PieChart, Pie, Legend, XAxis, YAxis, Tooltip, ResponsiveContainer, Label, Cell, Text } from 'recharts';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

const COLORS = ['#00C49F', '#FFBB28', '#FF0000']

class IndicatorField extends Component {
    constructor(props) {
        super(props);
        this.state = {indicatorValue : 0}
    }
    
    componentDidMount() {
        this.timerID = setInterval(this.updateTimeSeriesData.bind(this), this.props.interVal);
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    updateTimeSeriesData() {
        this.setState((prevState, props)=>{
            return {indicatorValue : Math.random()};
        })
    }

    render () {
        const { label, source, record = {}, warnnigThreshold, dangerThreshold, minValue, maxValue } = this.props;
        const { indicatorValue } = this.state;

        const indicator_show_data = [
            {name:'Normal', value:warnnigThreshold},
            {name:'Warning', value:dangerThreshold - warnnigThreshold},
            {name:'Danger', value:1-dangerThreshold}
        ]

        const indicator_data = [
            {value:indicatorValue - minValue},
            {value:maxValue - indicatorValue},
        ]

          //          <Legend verticalAlign="top" />
        return (
            <Card raised={false} ><CardContent style={{ textAlign: 'center' }}>
            <ResponsiveContainer minWidth={200} width="99%" height={200} debounce={1} margin={{ top: 0, right: 20, left: 20, bottom: 0 }}>
                <PieChart>
                    <Pie data={indicator_show_data} startAngle={200} endAngle={-20} innerRadius={80} outerRadius={100} paddingAngle={0} fill="#8884d8" dataKey="value">
                        {indicator_show_data.map((entry, index)=>(<Cell key={index} fill={COLORS[index % COLORS.length]} />))}
                    </Pie>
                    <Pie data={indicator_data} startAngle={200} minAngle={5} endAngle={-20} innerRadius={0} outerRadius={75} paddingAngle={0} fill="#8884d8" dataKey="value">
                        {indicator_data.map((entry, index)=>(<Cell key={index} fill={index==0? '#0066FF' : '#FFFFFF'} />))}
                    </Pie>
                    <Tooltip content={({payload})=>payload.length > 0 && payload[0].name ? `${payload[0].name}`:''}/>
                    
                </PieChart>
            </ResponsiveContainer>
            <h3>
                {label?label:source?source:''} = {indicatorValue?indicatorValue:''}
            </h3>
            </CardContent></Card>
        );
    }
} 

IndicatorField.propTypes = {
    label: PropTypes.string,
    record: PropTypes.object,
    source: PropTypes.string.isRequired,
    interVal : PropTypes.number,
};

IndicatorField.defaultProps = {
    source : "value",
    interVal : 3000,
    warnnigThreshold : 0.6,
    dangerThreshold : 0.8,
    minValue : 0.0,
    maxValue : 1.0,
}

export default IndicatorField;