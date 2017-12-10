import React, { Component } from 'react';
import Form from "react-jsonschema-form";
import { titleCase } from 'change-case';

const createDocument = () => fetch('/api/create', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify([
    'agent',
    'suburb',
    'recentSales',
    'totalSales',
  ]),
}).then(res => res.json());

class App extends Component {
  state = {
    settings: undefined,
  };

  getSettings = () => {
    createDocument().then(settings => this.setState({ settings }));
  }

  render() {
    if (!this.state.settings) {
      return (
        <div className='container'>
          <button className="btn btn-primary btn-block" onClick={this.getSettings}>Create Document</button>
        </div>
      );
    }

    return (
      <div className='container'>
        <button onClick={this.getSettings}>Reset Document</button>
        <Form schema={ this.state.settings }/>
      </div>
    );
  }
};

export default App;
