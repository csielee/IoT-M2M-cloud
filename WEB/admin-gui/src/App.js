import React, { Component } from 'react';
import { Admin, Resource } from 'react-admin';
import DataProvider from './onem2m-server'
import { ResourceShow, ResourceList } from './onem2m-resources'
import { AirBoxList } from './AirBox'
import Dashboard from './Dashboard';
import Toys from '@material-ui/icons/Toys'
import './App.css';

class App extends Component {
  render() {
    return (
      <Admin dashboard={Dashboard} title="oneM2M IoT admin" dataProvider={DataProvider}>
        <Resource name="resources" show={ResourceShow} list={ResourceList}  />
        <Resource name="airboxs" list={AirBoxList} icon={Toys} />
        <Resource name="airboxs_data" />
      </Admin>
    );
  }
}

export default App;
