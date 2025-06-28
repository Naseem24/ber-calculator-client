import React from 'react';
import { Link } from 'react-router-dom';

const calculators = [
    { key: 'ber', name: 'BER (Signal Quality)', path: '/ber', description: 'Calculate Bit Error Rate for BPSK, QPSK, and other M-PSK modulations.' },
    { key: 'erlang-b', name: 'Erlang B (Traffic)', path: '/erlang-b', description: 'Model telecom traffic to determine required channels and blocking probability.' },
    { key: 'comm-system', name: 'Comm System Chain', path: '/comm-system', description: 'Analyze data rates through a standard digital transmitter signal chain.' },
    { key: 'ofdm', name: 'OFDM System', path: '/ofdm', description: 'Design an OFDM system and calculate its maximum data rate and efficiency.' },
    { key: 'link-budget', name: 'Link Budget', path: '/link-budget', description: 'Determine the required transmitter power to close a wireless link.' },
    { key: 'cellular', name: 'Cellular Design', path: '/cellular', description: 'Perform high-level design of a cellular network, including cell count and reuse.' },
];

const HomePage = () => {
    return (
        <div className="homepage-container">
            <h2>Select a Calculator</h2>
            <p className="homepage-intro">Choose one of the wireless engineering tools below to get started.</p>
            <div className="calculator-grid">
                {calculators.map(calc => (
                    <Link to={calc.path} key={calc.key} className="calculator-card-link">
                        <h3>{calc.name}</h3>
                        <p>{calc.description}</p>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default HomePage;