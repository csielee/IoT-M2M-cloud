import React, { Component } from 'react';
import { Admin, Resource, ListGuesser } from 'react-admin';
import oneM2MDataProvider from './onem2m-server'
import './App.css';

class App extends Component {
  render() {
    return (
      <Admin title="oneM2M IoT admin" dataProvider={oneM2MDataProvider('http://localhost:10002/~/in-cse')}>
        <Resource name="AE" list={ListGuesser} />
      </Admin>
    );
  }
}

export default App;
