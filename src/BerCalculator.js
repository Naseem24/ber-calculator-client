import React, { useState } from 'react';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

const BerCalculator = () => {
    const [ebNoDb, setEbNoDb] = useState(10);
    const [modulationOrder, setModulationOrder] = useState(2);
    const [result, setResult] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault(); setLoading(true); setError(''); setResult(null);
        try {
            const response = await axios.post(`${API_URL}/api/ber`, {
                ebNoDb: Number(ebNoDb),
                modulationOrder: parseInt(modulationOrder),
            });
            setResult(response.data);
        } catch (err) { setError('Failed to get a response.'); console.error(err); }
        finally { setLoading(false); }
    };

    return (
        <div className="card">
            <h2>BER (Signal Quality) Calculator</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Eb/No (in dB)</label>
                    <input type="number" value={ebNoDb} onChange={(e) => setEbNoDb(e.target.value)} required step="0.1" />
                </div>
                <div className="form-group">
                    <label>Modulation Scheme</label>
                    <select value={modulationOrder} onChange={(e) => setModulationOrder(e.target.value)}>
                        <option value="2">BPSK</option>
                        <option value="4">QPSK</option>
                        <option value="8">8-PSK</option>
                        <option value="16">16-PSK</option>
                    </select>
                </div>
                <button type="submit" disabled={loading}>{loading ? 'Calculating...' : 'Calculate BER'}</button>
            </form>
            {error && <p className="error">{error}</p>}
            {result && (
                <div className="results">
                    <h3>Results</h3>
                    <p><strong>Calculated BER:</strong> {result.ber?.toExponential(4)}</p>
                    <hr />
                    <h4>Explanation</h4>
                    <p>{result.explanation}</p>
                </div>
            )}
        </div>
    );
};

export default BerCalculator;