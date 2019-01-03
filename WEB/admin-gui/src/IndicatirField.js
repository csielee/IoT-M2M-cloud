import React from 'react';
import PropTypes from 'prop-types';
import { PieChart, Pie, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

const COLORS = ['#00C49F', '#FFBB28', '#FF0000']

const IndicatorField = ({ label, source, record = [], warnnigThreshold, dangerThreshold, minValue, maxValue }) => {

        const data = record.slice(-1)[0] || {};

        const indicatorValue = data['con'] && data['con'][source] || 0;

        const indicator_show_data = [
            {name:'Normal', value:warnnigThreshold},
            {name:'Warning', value:dangerThreshold - warnnigThreshold},
            {name:'Danger', value:1-dangerThreshold}
        ]

        const indicator_data = [
            {value:indicatorValue - minValue},
            {value:maxValue - indicatorValue},
        ]

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

IndicatorField.propTypes = {
    label: PropTypes.string,
    source: PropTypes.string.isRequired,
};

IndicatorField.defaultProps = {
    source : "value",
    warnnigThreshold : 0.6,
    dangerThreshold : 0.8,
    minValue : 0.0,
    maxValue : 1.0,
}

export default IndicatorField;