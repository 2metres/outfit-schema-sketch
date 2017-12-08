import React, { Component } from 'react';

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
        <div className='App'>
          <button onClick={this.getSettings}>Create Document</button>
        </div>
      );
    }

    // Render something with the settings here
    return (
      <h1>I haz some setings {JSON.stringify(this.state.sesttings)}</h1>
    );
  }
};

export default App;
