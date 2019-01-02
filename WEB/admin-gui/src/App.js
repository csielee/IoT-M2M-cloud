import React, { Component } from 'react';
import { Admin, Resource, ListGuesser } from 'react-admin';
import oneM2MDataProvider from './onem2m-server'
import { ResourceShow, ResourceList } from './onem2m-resources'
import Dashboard from './Dashboard';
import './App.css';

class App extends Component {
  render() {
    return (
      <Admin dashboard={Dashboard} title="oneM2M IoT admin" dataProvider={oneM2MDataProvider('http://localhost:10002/~/in-cse')}>
        <Resource name="resources" show={ResourceShow} list={ResourceList}  />
      </Admin>
    );
  }
}

export default App;
