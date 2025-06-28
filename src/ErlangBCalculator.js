import React, { useState } from 'react';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

const ErlangBCalculator = () => {
    const [traffic, setTraffic] = useState(10);
    const [channels, setChannels] = useState(15);
    const [maxBlocking, setMaxBlocking] = useState(0.01);
    const [result, setResult] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault(); setLoading(true); setError(''); setResult(null);
        try {
            const response = await axios.post(`${API_URL}/api/erlang-b`, { traffic, channels, maxBlocking });
            setResult(response.data);
        } catch (err) { setError('Failed to get a response.'); console.error(err); }
        finally { setLoading(false); }
    };

    return (
        <div className="card">
            <h2>Erlang B (Traffic) Calculator</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Offered Traffic (Erlangs)</label>
                    <input type="number" value={traffic} onChange={(e) => setTraffic(Number(e.target.value))} required />
                </div>
                <div className="form-group">
                    <label>Number of Channels</label>
                    <input type="number" value={channels} onChange={(e) => setChannels(Number(e.target.value))} required />
                </div>
                <div className="form-group">
                    <label>Max Desired Blocking Probability (e.g., 0.01 for 1%)</label>
                    <input type="number" value={maxBlocking} step="0.001" onChange={(e) => setMaxBlocking(Number(e.target.value))} required />
                </div>
                <button type="submit" disabled={loading}>{loading ? 'Calculating...' : 'Calculate Traffic Metrics'}</button>
            </form>
            {error && <p className="error">{error}</p>}
            {result && (
                <div className="results">
                    <h3>Results</h3>
                    <p><strong>Calculated Blocking Probability:</strong> {(result.blockingProbability * 100).toFixed(4)}%</p>
                    <p><strong>Required Channels for Target:</strong> {result.requiredChannels}</p>
                    <hr /><h4>Explanation</h4><p>{result.explanation}</p>
                </div>
            )}
        </div>
    );
};

export default ErlangBCalculator;