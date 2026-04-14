import React, { Suspense } from "react";

// ✅ STATIC imports (REQUIRED for Module Federation)
const DashboardApp = React.lazy(() => import("dashboard/App"));
const ProfileApp = React.lazy(() => import("profile/App"));

// Optional Error Boundary (recommended)
class ErrorBoundary extends React.Component<any, { hasError: boolean }> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <div>Failed to load remote.</div>;
    }
    return this.props.children;
  }
}

function App() {
  return (
    <div>
      <h1>Host App</h1>

      <ErrorBoundary>
        <Suspense fallback={<div>Loading Dashboard...</div>}>
          <DashboardApp />
        </Suspense>
      </ErrorBoundary>

      <ErrorBoundary>
        <Suspense fallback={<div>Loading Profile...</div>}>
          <ProfileApp />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}

export default App;