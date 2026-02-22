import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LegacyApp from './LegacyApp';
import LofiLoom from './components/lofi/LofiLoom';
import SubscriptionStacker from './components/subscription/SubscriptionStacker';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LofiLoom />} />
        <Route path="/subscription" element={<SubscriptionStacker />} />
        <Route path="/legacy" element={<LegacyApp />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
