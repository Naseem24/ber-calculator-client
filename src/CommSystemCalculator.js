import React, { useState } from 'react';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

const CommSystemCalculator = () => {
    const [bandwidth, setBandwidth] = useState(20000000); // 20 MHz
    const [quantizerBits, setQuantizerBits] = useState(8);
    const [sourceEncoderRate, setSourceEncoderRate] = useState(0.5);
    const [channelEncoderRate, setChannelEncoderRate] = useState(0.75);
    const [burstSize, setBurstSize] = useState(1500 * 8); // 1500 bytes
    const [result, setResult] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault(); setLoading(true); setError(''); setResult(null);
        try {
            const response = await axios.post(`${API_URL}/api/comm-system`, { bandwidth, quantizerBits, sourceEncoderRate, channelEncoderRate, burstSize });
            setResult(response.data);
        } catch (err) { setError('Failed to get a response.'); console.error(err); }
        finally { setLoading(false); }
    };

    return (
        <div className="card">
            <h2>Communication System Chain Calculator</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group"><label>Bandwidth (Hz)</label><input type="number" value={bandwidth} onChange={(e) => setBandwidth(Number(e.target.value))} required /></div>
                <div className="form-group"><label>Number of Quantizer Bits</label><input type="number" value={quantizerBits} onChange={(e) => setQuantizerBits(Number(e.target.value))} required /></div>
                <div className="form-group"><label>Source Encoder Rate (e.g., 0.5)</label><input type="number" value={sourceEncoderRate} step="0.01" onChange={(e) => setSourceEncoderRate(Number(e.target.value))} required /></div>
                <div className="form-group"><label>Channel Encoder Rate (e.g., 0.75)</label><input type="number" value={channelEncoderRate} step="0.01" onChange={(e) => setChannelEncoderRate(Number(e.target.value))} required /></div>
                <div className="form-group"><label>Burst Size (bits)</label><input type="number" value={burstSize} onChange={(e) => setBurstSize(Number(e.target.value))} required /></div>
                <button type="submit" disabled={loading}>{loading ? 'Calculating...' : 'Calculate Data Rates'}</button>
            </form>
            {error && <p className="error">{error}</p>}
            {result && (
                <div className="results">
                    <h3>Results</h3>
                    <p><strong>Sampling Frequency:</strong> {(result.samplingFrequency / 1e6).toFixed(2)} Msps</p>
                    <p><strong>Quantizer Output Rate:</strong> {(result.quantizerRate / 1e6).toFixed(2)} Mbps</p>
                    <p><strong>Source Encoder Output Rate:</strong> {(result.sourceEncoderOutRate / 1e6).toFixed(2)} Mbps</p>
                    <p><strong>Channel Encoder Output Rate:</strong> {(result.channelEncoderOutRate / 1e6).toFixed(2)} Mbps</p>
                    <p><strong>Burst Duration:</strong> {(result.burstDuration * 1e6).toFixed(2)} µs</p>
                    <hr /><h4>Explanation</h4><p>{result.explanation}</p>
                </div>
            )}
        </div>
    );
};

export default CommSystemCalculator;