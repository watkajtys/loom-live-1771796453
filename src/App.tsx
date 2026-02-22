import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LegacyApp from './LegacyApp';
import LofiLoom from './components/lofi/LofiLoom';
import SubscriptionStacker from './components/subscription/SubscriptionStacker';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SubscriptionStacker />} />
        <Route path="/lofi" element={<LofiLoom />} />
        <Route path="/legacy" element={<LegacyApp />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
