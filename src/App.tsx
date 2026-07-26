import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import MainSite from './MainSite';
import RequireLeadForm from './components/RequireLeadForm';

// Admin Imports
import AdminLayout from './components/admin/AdminLayout';
import AdminLogin from './pages/admin/AdminLogin';
import LeadManagement from './pages/admin/LeadManagement';
import EmployeeManager from './pages/admin/EmployeeManager';
import CallRequests from './pages/admin/CallRequests';
import PolicyManager from './pages/admin/PolicyManager';
import BestPlansManager from './pages/admin/BestPlansManager';
import PolicyDescription from './pages/PolicyDescription';
import UserDashboard from './pages/UserDashboard';
import ContactPage from './pages/ContactPage';
import QuoteRequests from './pages/admin/QuoteRequests';
import EmployeeQuoteRequests from './pages/employee/EmployeeQuoteRequests';

// Employee Imports
import EmployeeLayout from './components/employee/EmployeeLayout';
import EmployeeLogin from './pages/employee/EmployeeLogin';

// Main Site Pages
import MainHome from './pages/MainHome';
import DynamicPage from './pages/DynamicPage';
import ArticlePageWrapper from './pages/ArticlePageWrapper';

// Helper to wrap a page with the lead form gate
const Gated = ({ element }: { element: React.ReactNode }) => (
  <RequireLeadForm>{element}</RequireLeadForm>
);

function App() {
  return (
    <>
      <Toaster position="top-right" />
      <Router>
        <Routes>
          {/* Lead Form — gateway for new visitors */}
          <Route path="/leadform" element={<MainSite />} />

          {/* Main Website Routes — all gated behind lead form submission */}
          <Route path="/" element={<Gated element={<MainHome />} />} />
          <Route path="/home" element={<Gated element={<MainHome />} />} />
          <Route path="/contact" element={<Gated element={<ContactPage />} />} />
          <Route path="/policy/:id" element={<Gated element={<PolicyDescription />} />} />
          <Route path="/dashboard" element={<Gated element={<UserDashboard />} />} />
          <Route path="/article/:topic" element={<Gated element={<ArticlePageWrapper />} />} />

          {/* All sub-pages — also gated */}
          <Route path="/best-plans" element={<Gated element={<DynamicPage />} />} />
          <Route path="/know-term" element={<Gated element={<DynamicPage />} />} />
          <Route path="/know-health" element={<Gated element={<DynamicPage />} />} />
          <Route path="/compare-term" element={<Gated element={<DynamicPage />} />} />
          <Route path="/compare-health" element={<Gated element={<DynamicPage />} />} />
          <Route path="/find-term" element={<Gated element={<DynamicPage />} />} />
          <Route path="/find-health" element={<Gated element={<DynamicPage />} />} />
          <Route path="/articles-term" element={<Gated element={<DynamicPage />} />} />
          <Route path="/articles-health" element={<Gated element={<DynamicPage />} />} />
          <Route path="/videos-term" element={<Gated element={<DynamicPage />} />} />
          <Route path="/videos-health" element={<Gated element={<DynamicPage />} />} />
          <Route path="/video-guides-term" element={<Gated element={<DynamicPage />} />} />
          <Route path="/ebook-term" element={<Gated element={<DynamicPage />} />} />
          <Route path="/ebook-health" element={<Gated element={<DynamicPage />} />} />
          <Route path="/expert" element={<Gated element={<DynamicPage />} />} />
          <Route path="/decode-care" element={<Gated element={<DynamicPage />} />} />
          <Route path="/decode-hdfc-ergo" element={<Gated element={<DynamicPage />} />} />
          <Route path="/decode-tata-aig" element={<Gated element={<DynamicPage />} />} />
          <Route path="/decode-niva" element={<Gated element={<DynamicPage />} />} />
          <Route path="/decode-star" element={<Gated element={<DynamicPage />} />} />
          <Route path="/decode-zuno" element={<Gated element={<DynamicPage />} />} />
          <Route path="/decode-lic" element={<Gated element={<DynamicPage />} />} />
          <Route path="/decode-hdfc-life" element={<Gated element={<DynamicPage />} />} />
          <Route path="/decode-bajaj" element={<Gated element={<DynamicPage />} />} />
          <Route path="/decode-sbi" element={<Gated element={<DynamicPage />} />} />
          <Route path="/decode-absli" element={<Gated element={<DynamicPage />} />} />
          <Route path="/decode-tata-aia" element={<Gated element={<DynamicPage />} />} />
          <Route path="/claims-understand" element={<Gated element={<DynamicPage />} />} />
          <Route path="/claims-intimate" element={<Gated element={<DynamicPage />} />} />
          <Route path="/claims-support" element={<Gated element={<DynamicPage />} />} />

          {/* Admin Routes — NOT gated (separate auth) */}
          <Route path="/admin" element={<Navigate to="/admin/login" replace />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminLayout />}>
            <Route index element={<Navigate to="/admin/dashboard/leads" replace />} />
            <Route path="leads" element={<LeadManagement />} />
            <Route path="quote-requests" element={<QuoteRequests />} />
            <Route path="employees" element={<EmployeeManager />} />
            <Route path="best-plans" element={<BestPlansManager />} />
            <Route path="call-requests" element={<CallRequests />} />
            <Route path="policies" element={<PolicyManager />} />
          </Route>

          {/* Employee Routes — NOT gated (separate auth) */}
          <Route path="/employee" element={<Navigate to="/employee/login" replace />} />
          <Route path="/employee/login" element={<EmployeeLogin />} />
          <Route path="/employee/dashboard" element={<EmployeeLayout />}>
            <Route index element={<Navigate to="/employee/dashboard/leads?type=health" replace />} />
            <Route path="leads" element={<LeadManagement />} />
            <Route path="quote-requests" element={<EmployeeQuoteRequests />} />
            <Route path="call-requests" element={<CallRequests />} />
          </Route>

          {/* Catch-all → lead form for new users, home for existing */}
          <Route path="*" element={<Navigate to="/leadform" replace />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
