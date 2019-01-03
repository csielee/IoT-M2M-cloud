import React from 'react';
import {
    Show, SimpleShowLayout, ShowController, ShowView, 
    TextField, ArrayField, SingleFieldList, ChipField, ReferenceField,
    List, Datagrid, 
    ShowButton, ListButton,
} from 'react-admin';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Typography from '@material-ui/core/Typography';
import TimeSeriesField from './TimeSeriesField'

const cardStyle = {
    width: "99%",
    //minHeight: 300,
    margin: '0.5em',
    display: 'inline-block',
    verticalAlign: 'top'
};

const AirBoxGrid = ({ids, data, basePath}) => (
    <div style={{margin:'1em'}}>
    {ids.map( id =>
        <Card key={id} style={cardStyle}>
            <CardHeader title={`AirBox ${id}`}/>
            <CardContent>
                <TextField label="AirBox Name" record={data[id]} source="rn" style={{'font-size':'2.5em'}} />

                <TimeSeriesField label="AQ" record={data[id]} />
            </CardContent>
            <CardActions style={{ textAlign : 'right'}}>
                <ShowButton />
            </CardActions>
        </Card>
    )}
    </div>
);

AirBoxGrid.defaultProps = {
    data: {},
    ids: [],
}

export const AirBoxList = (props) => (
    <List {...props}>
        <AirBoxGrid />
    </List>
);

export default AirBoxList;