// client/src/App.js
import React from 'react';
import BerCalculator from './BerCalculator';
import './App.css';

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <h1>Wireless AI Project</h1>
            </header>
            <main>
                <BerCalculator />
            </main>
        </div>
    );
}

export default App;