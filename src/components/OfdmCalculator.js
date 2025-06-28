import React, { useState } from 'react';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

const OfdmCalculator = () => {
    const [modOrder, setModOrder] = useState(16); // 16-QAM
    const [rbBw, setRbBw] = useState(180000); // 180 kHz
    const [subcarrierSpacing, setSubcarrierSpacing] = useState(15000); // 15 kHz
    const [symbolsPerRb, setSymbolsPerRb] = useState(14);
    const [parallelRbs, setParallelRbs] = useState(100);
    const [rbDuration, setRbDuration] = useState(0.001); // 1 ms
    const [result, setResult] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault(); setLoading(true); setError(''); setResult(null);
        try {
            const response = await axios.post(`${API_URL}/api/ofdm`, { modOrder, rbBw, subcarrierSpacing, symbolsPerRb, parallelRbs, rbDuration });
            setResult(response.data);
        } catch (err) { setError('Failed to get a response.'); console.error(err); }
        finally { setLoading(false); }
    };

    return (
        <div className="card">
            <h2>OFDM System Calculator</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group"><label>Modulation Order (e.g., 16 for 16-QAM)</label><input type="number" value={modOrder} onChange={(e) => setModOrder(Number(e.target.value))} required /></div>
                <div className="form-group"><label>Resource Block Bandwidth (Hz)</label><input type="number" value={rbBw} onChange={(e) => setRbBw(Number(e.target.value))} required /></div>
                <div className="form-group"><label>Subcarrier Spacing (Hz)</label><input type="number" value={subcarrierSpacing} onChange={(e) => setSubcarrierSpacing(Number(e.target.value))} required /></div>
                <div className="form-group"><label>OFDM Symbols per Resource Block</label><input type="number" value={symbolsPerRb} onChange={(e) => setSymbolsPerRb(Number(e.target.value))} required /></div>
                <div className="form-group"><label>Number of Parallel Resource Blocks</label><input type="number" value={parallelRbs} onChange={(e) => setParallelRbs(Number(e.target.value))} required /></div>
                <div className="form-group"><label>Resource Block Duration (seconds)</label><input type="number" value={rbDuration} step="0.0001" onChange={(e) => setRbDuration(Number(e.target.value))} required /></div>
                <button type="submit" disabled={loading}>{loading ? 'Calculating...' : 'Calculate OFDM Metrics'}</button>
            </form>
            {error && <p className="error">{error}</p>}
            {result && (
                <div className="results">
                    <h3>Results</h3>
                    <p><strong>Bits per Symbol:</strong> {result.bitsPerSymbol}</p>
                    <p><strong>Subcarriers per Resource Block:</strong> {result.subcarriersPerRb}</p>
                    <p><strong>Bits per Resource Block:</strong> {result.bitsPerRb}</p>
                    <p><strong>Maximum Data Rate:</strong> {(result.maxDataRate / 1e6).toFixed(2)} Mbps</p>
                    <p><strong>Total Bandwidth:</strong> {(result.totalBw / 1e6).toFixed(2)} MHz</p>
                    <p><strong>Spectral Efficiency:</strong> {result.spectralEfficiency?.toFixed(2)} bps/Hz</p>
                    <hr /><h4>Explanation</h4><p>{result.explanation}</p>
                </div>
            )}
        </div>
    );
};

export default OfdmCalculator;