import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useEffect, useState, useRef } from 'react';
import MainSite from './MainSite';
import RequireLeadForm from './components/RequireLeadForm';
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
import PremiumRequests from './pages/admin/PremiumRequests';
import EmployeeQuoteRequests from './pages/employee/EmployeeQuoteRequests';
import EmployeePremiumRequests from './pages/employee/EmployeePremiumRequests';
import EmployeeLayout from './components/employee/EmployeeLayout';
import EmployeeLogin from './pages/employee/EmployeeLogin';
import GalleryManager from './pages/admin/GalleryManager';
import GalleryPage from './pages/GalleryPage';
import MainHome from './pages/MainHome';
import CareersManager from './pages/admin/CareersManager';
import CareersPage from './pages/CareersPage';
import AboutPage from './pages/AboutPage';
import ReelsManager from './pages/admin/ReelsManager';
import ClaimRatiosManager from './pages/admin/ClaimRatiosManager';
import ClaimRatiosPage from './pages/ClaimRatiosPage';
import DynamicPage from './pages/DynamicPage';
import ArticlePageWrapper from './pages/ArticlePageWrapper';

function ScrollToTop() {
  const { pathname } = useLocation();
  const [faded, setFaded] = useState(false);
  const prevPath = useRef(pathname);

  useEffect(() => {
    if (prevPath.current === pathname) return;
    prevPath.current = pathname;
    setFaded(true);
    const t = setTimeout(() => {
      window.scrollTo({ top: 0 });
      setFaded(false);
    }, 150);
    return () => clearTimeout(t);
  }, [pathname]);

  return (
    <div
      aria-hidden
      style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        background: '#fff',
        opacity: faded ? 1 : 0,
        pointerEvents: 'none',
        transition: faded ? 'opacity 0.12s ease' : 'opacity 0.22s ease',
      }}
    />
  );
}

const Gated = ({ element }: { element: React.ReactNode }) => (
  <RequireLeadForm>{element}</RequireLeadForm>
);

function App() {
  return (
    <>
      <Toaster position="top-right" />
      <Router>
        <ScrollToTop />
        <Routes>
          {/* Lead Form — gateway for new visitors */}
          <Route path="/leadform" element={<MainSite />} />

          {/* Main Website Routes — all gated behind lead form submission */}
          <Route path="/" element={<Gated element={<MainHome />} />} />
          <Route path="/home" element={<Gated element={<MainHome />} />} />
          <Route path="/gallery" element={<Gated element={<GalleryPage />} />} />
          <Route path="/careers" element={<Gated element={<CareersPage />} />} />
          <Route path="/about" element={<Gated element={<AboutPage />} />} />
          <Route path="/contact" element={<Gated element={<ContactPage />} />} />
          <Route path="/policy/:id" element={<Gated element={<PolicyDescription />} />} />
          <Route path="/dashboard" element={<Gated element={<UserDashboard />} />} />
          <Route path="/claims" element={<Gated element={<ClaimRatiosPage />} />} />
          <Route path="/article/:topic" element={<Gated element={<ArticlePageWrapper />} />} />

          {/* All sub-pages — also gated */}
          <Route path="/best-plans" element={<Gated element={<DynamicPage />} />} />
          <Route path="/health-plans" element={<Gated element={<DynamicPage />} />} />
          <Route path="/term-plans" element={<Gated element={<DynamicPage />} />} />
          <Route path="/vehicle-plans" element={<Gated element={<DynamicPage />} />} />
          <Route path="/plans/:type/:provider" element={<Gated element={<DynamicPage />} />} />
          <Route path="/vehicle-compare" element={<Gated element={<DynamicPage />} />} />
          <Route path="/find-vehicle" element={<Gated element={<DynamicPage />} />} />
          <Route path="/know-vehicle" element={<Gated element={<DynamicPage />} />} />
          <Route path="/compare-vehicle" element={<Gated element={<DynamicPage />} />} />
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
            <Route path="premium-requests" element={<PremiumRequests />} />
            <Route path="employees" element={<EmployeeManager />} />
            <Route path="best-plans" element={<BestPlansManager />} />
            <Route path="call-requests" element={<CallRequests />} />
            <Route path="policies" element={<PolicyManager />} />
            <Route path="gallery" element={<GalleryManager />} />
            <Route path="careers" element={<CareersManager />} />
            <Route path="reels" element={<ReelsManager />} />
            <Route path="claim-ratios" element={<ClaimRatiosManager />} />
          </Route>

          {/* Employee Routes — NOT gated (separate auth) */}
          <Route path="/employee" element={<Navigate to="/employee/login" replace />} />
          <Route path="/employee/login" element={<EmployeeLogin />} />
          <Route path="/employee/dashboard" element={<EmployeeLayout />}>
            <Route index element={<Navigate to="/employee/dashboard/leads?type=health" replace />} />
            <Route path="leads" element={<LeadManagement />} />
            <Route path="quote-requests" element={<EmployeeQuoteRequests />} />
            <Route path="premium-requests" element={<EmployeePremiumRequests />} />
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
