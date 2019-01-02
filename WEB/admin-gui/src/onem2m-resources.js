import React from 'react';
import {
    Show, SimpleShowLayout, ShowController, ShowView, 
    TextField, ArrayField, SingleFieldList, ChipField, 
    List, Datagrid, 
    ShowButton, ListButton,
} from 'react-admin';
import CardActions from '@material-ui/core/CardActions'

const cardActionStyle = {
    zIndex: 2,
    display: 'inline-block',
    float: 'right',
};

const ResourceShowActions = ({basePath, data, resource})=>(
    <CardActions style={cardActionStyle}>
        <ListButton basePath={basePath} />
    </CardActions>
);

export const ResourceShow = (props) => (
    <ShowController {...props}>
    {controllerProps =><ShowView actions={<ResourceShowActions/>} {...props} {...controllerProps}>
        <SimpleShowLayout>
            <TextField label="resource Name" source="rn" />
            <TextField label="resource Type" source="ty" />
            <TextField label="create Time" source="ct" />
            <TextField label="last Modified Time" source="lt" />
            { controllerProps.record.lbl &&
            <ArrayField label="labels" source="lbl">
                <SingleFieldList>
                    <ChipField source="name"/>
                </SingleFieldList>
            </ArrayField>
            }
        </SimpleShowLayout>
    </ShowView>}
    </ShowController>
);

export const ResourceList = props => (
    <List {...props}>
        <Datagrid>
            <TextField source="id" />
            <TextField label="resource Name" source="rn" />
            <ShowButton />
        </Datagrid>
    </List>
);

export default ResourceShow;