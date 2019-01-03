import React, { Component } from 'react';
import { Admin, Resource, ListGuesser } from 'react-admin';
import oneM2MDataProvider from './onem2m-server'
import { ResourceShow, ResourceList } from './onem2m-resources'
import { AirBoxList } from './AirBox'
import Dashboard from './Dashboard';
import Toys from '@material-ui/icons/Toys'
import './App.css';

class App extends Component {
  render() {
    return (
      <Admin dashboard={Dashboard} title="oneM2M IoT admin" dataProvider={oneM2MDataProvider('http://localhost:10002/~/in-cse')}>
        <Resource name="resources" show={ResourceShow} list={ResourceList}  />
        <Resource name="airboxs" list={AirBoxList} icon={Toys} />
      </Admin>
    );
  }
}

export default App;
