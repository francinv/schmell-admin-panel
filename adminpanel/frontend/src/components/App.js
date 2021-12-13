import React, { Component } from 'react';
import { render } from 'react-dom';

class App extends Component {
    render() {
        return (<h1>React App</h1>);
    }
}

const appDiv = document.getElementById('app');
render(<App />, appDiv);