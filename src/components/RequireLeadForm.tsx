import { Navigate } from 'react-router-dom';

/**
 * Wraps any route and redirects to /leadform if the user hasn't
 * submitted the lead form yet (checked via localStorage token).
 */
const RequireLeadForm = ({ children }: { children: React.ReactNode }) => {
  const hasSubmitted = sessionStorage.getItem('lead_submitted_token') === 'true';
  if (!hasSubmitted) {
    return <Navigate to="/leadform" replace />;
  }
  return <>{children}</>;
};

export default RequireLeadForm;
