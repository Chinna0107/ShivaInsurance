import { useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import InfoPage from './InfoPage';
import ResourcePage from './ResourcePage';
import DecoderPage from './DecoderPage';
import ClaimsPage from './ClaimsPage';
import BestPlansPage from './BestPlansPage';
import VehicleComparePage from './VehicleComparePage';
import VehicleFindPage from './VehicleFindPage';
import PlansPage from './PlansPage';
import BookCallModal from '../components/BookCallModal';
import QuoteModal from '../components/QuoteModal';
import { Toaster } from 'react-hot-toast';
import { infoPages, resourcePages, decoderPages, claimsPages } from '../data/pageContent';

function DynamicPage() {
  const { slug } = useParams<{ slug: string }>();
  const location = useLocation();
  // For named routes like /best-plans that don't use a :slug param,
  // derive the slug from the pathname
  const resolvedSlug = slug || location.pathname.replace(/^\//, '');

  const [isBookCallOpen, setIsBookCallOpen] = useState(false);
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [quotePlanName, setQuotePlanName] = useState('');

  const handleBookCall = () => setIsBookCallOpen(true);
  const handleGetQuote = (planName?: any) => {
    if (typeof planName === 'string') {
      setQuotePlanName(planName);
    } else {
      setQuotePlanName('');
    }
    setIsQuoteOpen(true);
  };

  const renderContent = () => {
    if (resolvedSlug === 'best-plans') {
      return <BestPlansPage onBookCall={handleBookCall} onGetQuote={handleGetQuote} />;
    }
    if (resolvedSlug === 'health-plans') {
      return <PlansPage type="Health" onBookCall={handleBookCall} onGetQuote={handleGetQuote} />;
    }
    if (resolvedSlug === 'term-plans') {
      return <PlansPage type="Term" onBookCall={handleBookCall} onGetQuote={handleGetQuote} />;
    }
    if (resolvedSlug === 'vehicle-plans') {
      return <PlansPage type="Vehicle" onBookCall={handleBookCall} onGetQuote={handleGetQuote} />;
    }
    if (resolvedSlug === 'vehicle-compare') {
      return <VehicleComparePage onBookCall={handleBookCall} />;
    }
    if (resolvedSlug === 'find-vehicle') {
      return <VehicleFindPage onBookCall={handleBookCall} />;
    }
    if (infoPages[resolvedSlug]) {
      return <InfoPage data={infoPages[resolvedSlug]} onBookCall={handleBookCall} onGetQuote={handleGetQuote} />;
    }
    if (resourcePages[resolvedSlug]) {
      return <ResourcePage data={resourcePages[resolvedSlug]} onBookCall={handleBookCall} />;
    }
    if (decoderPages[resolvedSlug]) {
      return <DecoderPage data={decoderPages[resolvedSlug]} onBookCall={handleBookCall} onGetQuote={handleGetQuote} />;
    }
    if (claimsPages[resolvedSlug]) {
      return <ClaimsPage data={claimsPages[resolvedSlug]} onBookCall={handleBookCall} />;
    }

    return (
      <div className="container" style={{ padding: '8rem 2rem', textAlign: 'center' }}>
        <h2>Page Not Found</h2>
        <p style={{ margin: '1rem 0 2rem', color: 'var(--text-gray)' }}>The page you are looking for does not exist.</p>
        <a href="/home" className="btn btn-primary">Back to Home</a>
      </div>
    );
  };

  return (
    <div className="app">
      <Header onBookCall={handleBookCall} />
      {renderContent()}
      <Footer onBookCall={handleBookCall} />
      <BookCallModal isOpen={isBookCallOpen} onClose={() => setIsBookCallOpen(false)} />
      <QuoteModal isOpen={isQuoteOpen} onClose={() => setIsQuoteOpen(false)} planName={quotePlanName} />
      <Toaster position="top-center" />
    </div>
  );
}

export default DynamicPage;
