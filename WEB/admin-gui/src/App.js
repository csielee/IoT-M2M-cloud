import React, { Component } from 'react';
import { Admin, Resource } from 'react-admin';
import oneM2MDataProvider from './onem2m-server'
import './App.css';

class App extends Component {
  render() {
    return (
      <Admin title="oneM2M IoT admin" dataProvider={oneM2MDataProvider('http://path.to.my.api')}>

      </Admin>
    );
  }
}

export default App;
