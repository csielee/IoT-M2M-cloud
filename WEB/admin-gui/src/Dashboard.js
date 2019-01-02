import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { Title } from 'react-admin';
import { LineChart, Line, Legend, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

var data = [
    {name : 0, value : 1},
    {name : 3, value : 2},
    {name : 6, value : 1},
]

export default (props) => (
    <Card>
        <Title title="Welcome to the administration" />
        <CardContent>
        <ResponsiveContainer minWidth={200} width="99%" height={320} debounce={1} >
            <LineChart data={data}>
                <XAxis dataKey="name"/>
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="value" stroke="#8884d8" />
            </LineChart>
        </ResponsiveContainer>
        </CardContent>
    </Card>
);