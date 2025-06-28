// === VERCEL DEPLOYMENT RESET - 2024 ===
import React, { useState } from 'react';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

// ... the rest of your code ...
// client/src/BerCalculator.js
import React, { useState } from 'react';
import axios from 'axios';

// The backend URL for local testing. We will connect to the server we built in Step 4.
// ✅ CORRECT
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

const BerCalculator = () => {
    // State to hold user inputs
    const [ebNoDb, setEbNoDb] = useState(10);
    const [modulationOrder, setModulationOrder] = useState(2); // Default to BPSK

    // State to hold the results and status
    const [result, setResult] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setResult(null);

        try {
            const ebNoLinear = Math.pow(10, ebNoDb / 10);
            const response = await axios.post(`${API_URL}/api/ber`, {
                ebNoLinear,
                modulationOrder: parseInt(modulationOrder),
            });
            setResult(response.data);
        } catch (err) {
            if (err.response) {
                const serverMessage = err.response.data.message || 'The server returned an error.';
                setError(`Error from server: ${serverMessage}`);
            } else if (err.request) {
                setError('Failed to get a response. Is the backend server running?');
            } else {
                setError('An unexpected error occurred.');
            }
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="card">
            <h2>Bit Error Rate (BER) Calculator</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="ebNoDb">Eb/No (in dB)</label>
                    <input
                        id="ebNoDb"
                        type="number"
                        value={ebNoDb}
                        onChange={(e) => setEbNoDb(Number(e.target.value))}
                        required
                        step="0.1"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="modOrder">Modulation Scheme</label>
                    <select
                        id="modOrder"
                        value={modulationOrder}
                        onChange={(e) => setModulationOrder(e.target.value)}
                    >
                        <option value="2">BPSK</option>
                        <option value="4">QPSK</option>
                        <option value="8">8-PSK</option>
                        <option value="16">16-PSK</option>
                    </select>
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? 'Calculating...' : 'Calculate BER'}
                </button>
            </form>

            {error && <p className="error">{error}</p>}

            {result && (
                <div className="results">
                    <h3>Results</h3>
                    <p><strong>Calculated BER:</strong> {result.calculations?.ber.toExponential(4)}</p>
                    <hr />
                    <h4>Explanation</h4>
                    <p>{result.aiExplanation}</p>
                </div>
            )}
        </div>
    );
};

export default BerCalculator;