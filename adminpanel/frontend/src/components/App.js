import React, { Component } from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import MainComp from './MainComp';

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <MainComp />
            </BrowserRouter>
            
        );
    }
}

const appDiv = document.getElementById('app');
render(<App />, appDiv);