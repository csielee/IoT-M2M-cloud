import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { Title,ReferenceInput, SelectInput, SimpleForm, Toolbar } from 'react-admin';
import ChangeButton from './ChangeButton'
import Typography from '@material-ui/core/Typography';

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
        <Typography component="p">
            Hi everyone!!<br/>
            this is a final project for IoT/M2M cource<br/>
            you can find this project on <a href="https://github.com/csielee/IoT-M2M-cloud">GITHUB</a>
        </Typography>
        {/*
        <SimpleForm resource="resources"  toolbar={<DashBoardToolbar />} submitOnEnter={false}>
        <ReferenceInput label="test" source="id" reference="resources">
            <SelectInput optionText={<RNField />} optionValue="id" />
        </ReferenceInput>
        </SimpleForm>
        */}
        </CardContent>
    </Card>
);