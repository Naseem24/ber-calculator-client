import React, { useState } from 'react';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

const LinkBudgetCalculator = () => {
    const [dataRate, setDataRate] = useState(1000000); // 1 Mbps
    const [temp, setTemp] = useState(290);
    const [noiseFigure, setNoiseFigure] = useState(3);
    const [requiredEbNo, setRequiredEbNo] = useState(10);
    const [fadeMargin, setFadeMargin] = useState(6);
    const [pathLoss, setPathLoss] = useState(120);
    const [otherLosses, setOtherLosses] = useState(2);
    const [txGain, setTxGain] = useState(20);
    const [rxGain, setRxGain] = useState(20);
    const [result, setResult] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault(); setLoading(true); setError(''); setResult(null);
        try {
            const response = await axios.post(`${API_URL}/api/link-budget`, { dataRate, temp, noiseFigure, requiredEbNo, fadeMargin, pathLoss, otherLosses, txGain, rxGain });
            setResult(response.data);
        } catch (err) { setError('Failed to get a response.'); console.error(err); }
        finally { setLoading(false); }
    };

    return (
        <div className="card">
            <h2>Link Budget Calculator</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group"><label>Data Rate (bps)</label><input type="number" value={dataRate} onChange={e => setDataRate(Number(e.target.value))} required /></div>
                <div className="form-group"><label>System Temperature (K)</label><input type="number" value={temp} onChange={e => setTemp(Number(e.target.value))} required /></div>
                <div className="form-group"><label>Receiver Noise Figure (dB)</label><input type="number" value={noiseFigure} onChange={e => setNoiseFigure(Number(e.target.value))} required /></div>
                <div className="form-group"><label>Required Eb/No (dB)</label><input type="number" value={requiredEbNo} onChange={e => setRequiredEbNo(Number(e.target.value))} required /></div>
                <div className="form-group"><label>Fade Margin (dB)</label><input type="number" value={fadeMargin} onChange={e => setFadeMargin(Number(e.target.value))} required /></div>
                <div className="form-group"><label>Path Loss (dB)</label><input type="number" value={pathLoss} onChange={e => setPathLoss(Number(e.target.value))} required /></div>
                <div className="form-group"><label>Other Losses (dB)</label><input type="number" value={otherLosses} onChange={e => setOtherLosses(Number(e.target.value))} required /></div>
                <div className="form-group"><label>Transmit Antenna Gain (dBi)</label><input type="number" value={txGain} onChange={e => setTxGain(Number(e.target.value))} required /></div>
                <div className="form-group"><label>Receive Antenna Gain (dBi)</label><input type="number" value={rxGain} onChange={e => setRxGain(Number(e.target.value))} required /></div>
                <button type="submit" disabled={loading}>{loading ? 'Calculating...' : 'Calculate Link Budget'}</button>
            </form>
            {error && <p className="error">{error}</p>}
            {result && (
                <div className="results">
                    <h3>Results</h3>
                    <p><strong>Thermal Noise Power:</strong> {result.noisePower?.toFixed(2)} dBW</p>
                    <p><strong>Receiver Sensitivity:</strong> {result.sensitivity?.toFixed(2)} dBW</p>
                    <p><strong>Required Received Power:</strong> {result.requiredRxPower?.toFixed(2)} dBW</p>
                    <p><strong>Required Transmitted Power:</strong> {result.requiredTxPowerDbw?.toFixed(2)} dBW</p>
                    <p><strong>Required Transmitted Power:</strong> {result.requiredTxPowerWatts?.toFixed(2)} Watts</p>
                    <hr /><h4>Explanation</h4><p>{result.explanation}</p>
                </div>
            )}
        </div>
    );
};

export default LinkBudgetCalculator;