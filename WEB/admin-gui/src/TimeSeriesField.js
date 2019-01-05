import React from 'react';
import PropTypes from 'prop-types';
import { LineChart, Line, Legend, XAxis, YAxis, Tooltip, ResponsiveContainer, Label } from 'recharts';

const COLOR = ["#00BBFF", "#4400CC", "#FF7744", "#00FF99", "#8884d8", "	#7A0099", "#888888"];

const TimeSeriesField = ({ label, source, record = [] }) => {
    // use record gen timeSeries
    const timeSeries = record.map((oneRecord, index)=>{
        return {ct:oneRecord['ct'], ...oneRecord['con']};
    })
    // check source is array
    if (!Array.isArray(source))
        source = [source]
    return (
        <ResponsiveContainer minWidth={200} width="99%" height={340} debounce={1} margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
            <LineChart data={timeSeries}>
                <XAxis dataKey="ct">
                    <Label value="Time" position="insideBottomLeft" offset={10}/>
                </XAxis>
                <YAxis label={{ value : label?label:'', angle:-90, offset:-10, position:'left'}} />
                <Tooltip />
                <Legend verticalAlign="top" />
                {source.map((s,idx)=>
                    (<Line key={idx}
                        type="monotone" 
                        dataKey={s} 
                        stroke={COLOR[idx % COLOR.length]}
                        isAnimationActive={false} 
                        animationDuration={500} 
                        animationEasing="linear"
                    />)
                )}
            </LineChart>
        </ResponsiveContainer>
    );

} 

TimeSeriesField.propTypes = {
    label: PropTypes.string,
    source: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.array,
    ]).isRequired,
};

TimeSeriesField.defaultProps = {
    source : "value",
    seriesLength : 10,
}

export default TimeSeriesField;