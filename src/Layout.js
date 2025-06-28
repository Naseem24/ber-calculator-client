import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './Layout';
import HomePage from './pages/HomePage';
import BerCalculator from './components/BerCalculator';
import ErlangBCalculator from './components/ErlangBCalculator';
import CommSystemCalculator from './components/CommSystemCalculator';
import OfdmCalculator from './components/OfdmCalculator';
import LinkBudgetCalculator from './components/LinkBudgetCalculator';
import CellularCalculator from './components/CellularCalculator';
import './App.css';

function App() {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                {/* The HomePage is the main menu */}
                <Route index element={<HomePage />} />

                {/* Each calculator gets its own dedicated route/page */}
                <Route path="ber" element={<BerCalculator />} />
                <Route path="erlang-b" element={<ErlangBCalculator />} />
                <Route path="comm-system" element={<CommSystemCalculator />} />
                <Route path="ofdm" element={<OfdmCalculator />} />
                <Route path="link-budget" element={<LinkBudgetCalculator />} />
                <Route path="cellular" element={<CellularCalculator />} />
            </Route>
        </Routes>
    );
}

export default App;