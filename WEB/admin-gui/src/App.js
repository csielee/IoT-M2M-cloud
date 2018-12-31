import React, { Component } from 'react';
import { Admin, Resource, ListGuesser } from 'react-admin';
import oneM2MDataProvider from './onem2m-server'
import { ResourceShow, ResourceList } from './onem2m-resources'
import './App.css';

class App extends Component {
  render() {
    return (
      <Admin title="oneM2M IoT admin" dataProvider={oneM2MDataProvider('http://localhost:10002/~/in-cse')}>
        <Resource name="resources" list={ResourceList} show={ResourceShow} />
      </Admin>
    );
  }
}

export default App;
