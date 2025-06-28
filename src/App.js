import React, { useState } from 'react';
import './App.css';

// Import all your calculator components
import BerCalculator from './components/BerCalculator';
import ErlangBCalculator from './components/ErlangBCalculator';
import CommSystemCalculator from './components/CommSystemCalculator';
import OfdmCalculator from './components/OfdmCalculator';
import LinkBudgetCalculator from './components/LinkBudgetCalculator';
import CellularCalculator from './components/CellularCalculator';

const calculators = {
    ber: { name: 'BER (Signal Quality)', component: <BerCalculator /> },
    erlangB: { name: 'Erlang B (Traffic)', component: <ErlangBCalculator /> },
    commSystem: { name: 'Comm System Chain', component: <CommSystemCalculator /> },
    ofdm: { name: 'OFDM System', component: <OfdmCalculator /> },
    linkBudget: { name: 'Link Budget', component: <LinkBudgetCalculator /> },
    cellular: { name: 'Cellular Design', component: <CellularCalculator /> },
};

function App() {
    const [activeCalculator, setActiveCalculator] = useState('ber');

    return (
        <div className="App">
            <header className="App-header">
                <h1>Wireless AI Project</h1>
            </header>
            <div className="main-content">
                <nav className="sidebar">
                    <h3>Calculators</h3>
                    <ul>
                        {Object.entries(calculators).map(([key, { name }]) => (
                            <li
                                key={key}
                                className={activeCalculator === key ? 'active' : ''}
                                onClick={() => setActiveCalculator(key)}
                            >
                                {name}
                            </li>
                        ))}
                    </ul>
                </nav>
                <main className="content-area">
                    {calculators[activeCalculator].component}
                </main>
            </div>
        </div>
    );
}

export default App;