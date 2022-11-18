import './App.less';

import { useEffect } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';

import { Layout } from './components/AppLayout';
import AdapterServices from './page/adapterServices';
import DataStore from './page/dataStore';
import DownstreamApps from './page/downstreamApps';
import EventHandlers from './page/eventHandlers';

function App() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);

  return (
    <Layout>
      <Routes>
        <Route
          path="/"
          element={<Navigate to="/adapter-services" replace={true} />}
        />
        <Route path="/adapter-services" element={<AdapterServices />} />
        <Route path="/event-handlers" element={<EventHandlers />} />
        <Route path="/downstream-apps" element={<DownstreamApps />} />
        <Route path="/data-store" element={<DataStore />} />
      </Routes>
    </Layout>
  );
}

export default App;
