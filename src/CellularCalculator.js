import React, { useState } from 'react';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

const CellularCalculator = () => {
    const [coverageArea, setCoverageArea] = useState(1000); // sq km
    const [cellRadius, setCellRadius] = useState(2); // km
    const [subscribers, setSubscribers] = useState(50000);
    const [callsPerHour, setCallsPerHour] = useState(2);
    const [callDuration, setCallDuration] = useState(3); // minutes
    const [requiredSir, setRequiredSir] = useState(9); // dB
    const [pathLossExp, setPathLossExp] = useState(4);
    const [result, setResult] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault(); setLoading(true); setError(''); setResult(null);
        try {
            const response = await axios.post(`${API_URL}/api/cellular`, { coverageArea, cellRadius, subscribers, callsPerHour, callDuration, requiredSir, pathLossExp });
            setResult(response.data);
        } catch (err) { setError('Failed to get a response.'); console.error(err); }
        finally { setLoading(false); }
    };

    return (
        <div className="card">
            <h2>Cellular System Design Calculator</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group"><label>Total Coverage Area (sq. km)</label><input type="number" value={coverageArea} onChange={e => setCoverageArea(Number(e.target.value))} required /></div>
                <div className="form-group"><label>Cell Radius (km)</label><input type="number" value={cellRadius} onChange={e => setCellRadius(Number(e.target.value))} required /></div>
                <div className="form-group"><label>Number of Subscribers</label><input type="number" value={subscribers} onChange={e => setSubscribers(Number(e.target.value))} required /></div>
                <div className="form-group"><label>Average Calls per User per Hour</label><input type="number" value={callsPerHour} onChange={e => setCallsPerHour(Number(e.target.value))} required /></div>
                <div className="form-group"><label>Average Call Duration (minutes)</label><input type="number" value={callDuration} onChange={e => setCallDuration(Number(e.target.value))} required /></div>
                <div className="form-group"><label>Required SIR (dB)</label><input type="number" value={requiredSir} onChange={e => setRequiredSir(Number(e.target.value))} required /></div>
                <div className="form-group"><label>Path Loss Exponent</label><input type="number" value={pathLossExp} onChange={e => setPathLossExp(Number(e.target.value))} required /></div>
                <button type="submit" disabled={loading}>{loading ? 'Calculating...' : 'Calculate Cellular Design'}</button>
            </form>
            {error && <p className="error">{error}</p>}
            {result && (
                <div className="results">
                    <h3>Results</h3>
                    <p><strong>Hexagonal Cell Area:</strong> {result.cellArea?.toFixed(2)} sq. km</p>
                    <p><strong>Required Number of Cells:</strong> {result.numCells}</p>
                    <p><strong>Traffic per User:</strong> {result.trafficPerUser?.toFixed(4)} Erlangs</p>
                    <p><strong>Total System Traffic:</strong> {result.totalTraffic?.toFixed(2)} Erlangs</p>
                    <p><strong>Traffic per Cell:</strong> {result.trafficPerCell?.toFixed(2)} Erlangs</p>
                    <p><strong>Required Cluster Size (N):</strong> {result.clusterSize}</p>
                    <hr /><h4>Explanation</h4><p>{result.explanation}</p>
                </div>
            )}
        </div>
    );
};

export default CellularCalculator;