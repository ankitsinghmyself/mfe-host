import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { Layout } from './components';

// STATIC imports for Module Federation
const DashboardApp = React.lazy(() => import("dashboard/App"));
const ProfileApp = React.lazy(() => import("profile/App"));

// Error Boundary component
class ErrorBoundary extends React.Component<{children: React.ReactNode}, { hasError: boolean }> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('MFE Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <h2>⚠️ Failed to load Micro-Frontend</h2>
          <p>Please refresh the page or check remote app status.</p>
        </div>
      );
    }
    return this.props.children;
  }
}

// MFE Wrapper with loading/error
const MFEDashboard = () => (
  <ErrorBoundary>
    <Suspense fallback={
      <div className="mfe-loading">
        <div className="spinner"></div>
        <p>Loading Dashboard...</p>
      </div>
    }>
      <DashboardApp />
    </Suspense>
  </ErrorBoundary>
);

const MFEProfile = () => (
  <ErrorBoundary>
    <Suspense fallback={
      <div className="mfe-loading">
        <div className="spinner"></div>
        <p>Loading Profile...</p>
      </div>
    }>
      <ProfileApp />
    </Suspense>
  </ErrorBoundary>
);

// Set active nav link
const setActiveLink = (path: string) => {
  const links = document.querySelectorAll('.nav-link');
  links.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === path) {
      link.classList.add('active');
    }
  });
};

// Main App with Router
const AppContent = () => {
  const location = useLocation();

  React.useEffect(() => {
    setActiveLink(location.pathname);
  }, [location]);

  return (
    <Layout>
      <div className="mfe-container">
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<MFEDashboard />} />
          <Route path="/profile" element={<MFEProfile />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </div>
    </Layout>
  );
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;

