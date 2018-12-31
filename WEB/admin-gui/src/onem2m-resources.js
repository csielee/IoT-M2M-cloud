import React from 'react';
import {Show, SimpleShowLayout, TextField, List, Datagrid, ShowButton} from 'react-admin';

export const ResourceShow = (props) => (
    <Show {...props}>
        <SimpleShowLayout>
            <TextField label="resource Name" source="rn" />
            <TextField label="resource Type" source="ty" />
            <TextField label="create Time" source="ct" />
            <TextField label="last Modified Time" source="lt" />
        </SimpleShowLayout>
    </Show>
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