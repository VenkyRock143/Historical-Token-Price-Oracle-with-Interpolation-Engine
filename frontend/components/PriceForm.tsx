import { useState } from 'react';
import { usePriceStore } from '../store/usePriceStore';
import { fetchPrice, scheduleHistory } from '../utils/api';
import Spinner from './Spinner';

export default function PriceForm() {
  const [token, setToken] = useState('');
  const [network, setNetwork] = useState('ethereum');
  const [timestamp, setTimestamp] = useState('');
  const [loading, setLoading] = useState(false);
  const setResult = usePriceStore(state => state.setResult);

  const handlePrice = async () => {
    setLoading(true);
    const res = await fetchPrice(token, network, Number(timestamp));
    setResult(res);
    setLoading(false);
  };

  const handleSchedule = async () => {
    setLoading(true);
    await scheduleHistory(token, network);
    alert('History fetch scheduled.');
    setLoading(false);
  };

  return (
    <div>
      <input placeholder="Token Address" value={token} onChange={e => setToken(e.target.value)} className="border p-2 w-full mb-2" />
      <select value={network} onChange={e => setNetwork(e.target.value)} className="border p-2 w-full mb-2">
        <option value="ethereum">Ethereum</option>
        <option value="polygon">Polygon</option>
      </select>
      <input placeholder="Timestamp (UNIX)" value={timestamp} onChange={e => setTimestamp(e.target.value)} className="border p-2 w-full mb-2" />
      <div className="flex gap-2">
        <button onClick={handlePrice} className="bg-blue-600 text-white px-4 py-2 rounded">Get Price</button>
        <button onClick={handleSchedule} className="bg-green-600 text-white px-4 py-2 rounded">Schedule Full History</button>
      </div>
      {loading && <Spinner />}
    </div>
  );
}
