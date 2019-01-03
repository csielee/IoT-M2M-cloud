import React, {Component} from 'react';
import {
    TextField, List, 
    ShowButton, ListButton,
} from 'react-admin';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import TimeSeriesField from './TimeSeriesField';
import IndicatorField from './IndicatirField';
import Toys from '@material-ui/icons/Toys'
import Grid from '@material-ui/core/Grid';
import { GET_MANY } from 'react-admin';
import PropTypes from 'prop-types';
import DataProvider from './onem2m-server'

const cardStyle = {
    width: "99%",
    //minHeight: 300,
    margin: '0.5em',
    display: 'inline-block',
    verticalAlign: 'top'
};

class AirBoxGrid extends Component {
    constructor(props) {
        super(props)
        this.state = {data : {}}
    }

    componentDidMount() {
        this.timerID = setTimeout(this.updateData.bind(this), 500);
    }

    componentWillUnmount() {
        clearTimeout(this.timerID);
    }

    updateData() {
        const {ids, data, basePath, seriesLength} = this.props;
        if (ids.length == 0)
            return;
        DataProvider(GET_MANY, 'airboxs_data', {ids:ids, dcnt:'air-condition'}).then(response=>{
            // response data is array
            const newData = response.data.reduce((prev, oneRecord, idx)=>{
                const {con} = oneRecord;

                if (!con)
                    return prev;

                oneRecord.con = con?JSON.parse(con):undefined;
                if (!prev[oneRecord.id])
                    prev[oneRecord.id] = []
                prev[oneRecord.id] = prev[oneRecord.id].concat(oneRecord).slice(-seriesLength) 
                return prev;
            }, this.state.data);
            if(newData) {
                this.setState({
                    data : newData
                })
            }
            this.timerID = setTimeout(this.updateData.bind(this), this.props.interVal);
            console.log('set next timeout !!!')
            console.log(newData)
        })
    }

    render() {
        const {ids, data, basePath} = this.props;

        return (
            <div style={{margin:'1em'}}>
            {ids.map( id =>
                <Card key={id} style={cardStyle}>
                    <CardHeader title={`AirBox ${id}`} avatar={<Toys />}/>
                    <CardContent style={{flexGrow: 1,}}>
                        <TextField label="AirBox Name" record={data[id]} source="rn" style={{'fontSize':'1.5em'}} />
                        <Grid container spacing={24}>
                            <Grid item xs={12}>
                                <TimeSeriesField label="ppm" record={this.state.data[id]} source={["0.3um", "0.5um", "1um", "2.5um", "pm1", "pm2.5", "pm10"]} />
                            </Grid>
                            <Grid item xs={4}>
                                <IndicatorField source="temperature" record={data[id]} interVal={10000} minValue={0} maxValue={100}/>
                            </Grid>
                            <Grid item xs={4}>
                                <IndicatorField source="humidaty" record={data[id]} interVal={10000} minValue={0} maxValue={100}/>
                            </Grid>
                            <Grid item xs={4}>
                                <IndicatorField source="rpm" record={data[id]} interVal={10000} minValue={0} maxValue={6000}/>
                            </Grid>
                        </Grid>
                    </CardContent>
                    <CardActions style={{ textAlign : 'right'}}>
                        <ShowButton />
                    </CardActions>
                </Card>
            )}
            </div>
        )
    } 
}

AirBoxGrid.defaultProps = {
    data: {},
    ids: [],
    interVal : 1000,
    seriesLength : 20,
}

export const AirBoxList = (props) => (
    <List actions={null} {...props}>
        <AirBoxGrid />
    </List>
);

export default AirBoxList;