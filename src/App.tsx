import './App.less';

import { useEffect } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';

import { Layout } from './components/AppLayout';
import AdapterServices from './page/adapterServices';
import Blocks from './page/blocks';
import DataStore from './page/dataStore';
import DownstreamApps from './page/downstreamApps';
import EventHandlers from './page/eventHandlers';
import Events from './page/events';
import TaskDetail from './page/taskDetail';
import Transactions from './page/transactions';

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
        <Route path="/adapter-services/taskDetail" element={<TaskDetail />} />
        <Route path="/event-handlers" element={<EventHandlers />} />
        <Route path="/downstream-apps" element={<DownstreamApps />} />
        <Route path="/data-store" element={<DataStore />} />
        <Route path="/data-store/blocks" element={<Blocks />} />
        <Route path="/data-store/transactions" element={<Transactions />} />
        <Route path="/data-store/events" element={<Events />} />
      </Routes>
    </Layout>
  );
}

export default App;
