import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DashboardPage from './components/DashboardPage';
import AllRequestsTablePage from './components/AllRequestsTablePage';
import TrackInProgressPage from './components/TrackInProgressPage';
import ReportCompletePage from './components/ReportCompletePage';
import ResolveWarningsPage from './components/ResolveWarningsPage';
import DesignLibraryPage from './components/DesignLibraryPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DesignLibraryPage />} />
        <Route path="/design-library/dashboard" element={<DashboardPage />} />
        <Route path="/design-library/requests" element={<AllRequestsTablePage />} />
        <Route path="/design-library/track-in-progress" element={<TrackInProgressPage />} />
        <Route path="/design-library/report-complete" element={<ReportCompletePage />} />
        <Route path="/design-library/resolve-warnings" element={<ResolveWarningsPage />} />
        <Route path="/design-library" element={<DesignLibraryPage />} />
      </Routes>
    </Router>
  );
}

export default App;