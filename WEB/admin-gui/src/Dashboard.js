import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { Title,ReferenceInput, SelectInput, SimpleForm, Toolbar } from 'react-admin';
import { LineChart, Line, Legend, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import ChangeButton from './ChangeButton'

var data = [
    {name : 0, value : 1},
    {name : 3, value : 2},
    {name : 6, value : 1},
]

// using handleSubmit to deal with custom behavior
const DashBoardToolbar = props => (
    <Toolbar {...props}>
        <ChangeButton />
    </Toolbar>
)

const RNField = ({record})=> {
    return (<span>{record.rn}{record.ty?`(type=${record.ty})`:''}</span>)
}


export default (props) => (
    <Card {...props}>
        <Title title="Welcome to the administration" />
        <CardContent>
        
        <SimpleForm resource="resources"  toolbar={<DashBoardToolbar />} submitOnEnter={false}>
        <ReferenceInput label="test" source="xdd" reference="resources" target="ty">
            <SelectInput optionText={<RNField />} optionValue="id" />
        </ReferenceInput>
        </SimpleForm>

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