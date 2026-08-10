import { useState } from 'react';
import Hero from '../components/Hero';
import ProcessFeatures from '../components/ProcessFeatures';
import CtaBanner from '../components/CtaBanner';
import Testimonials from '../components/Testimonials';
import ProductCards from '../components/ProductCards';
import InsurancePartners from '../components/InsurancePartners';
import TrustIndicators from '../components/TrustIndicators';
import MediaMentions from '../components/MediaMentions';
import FAQ from '../components/FAQ';
import BookCallModal from '../components/BookCallModal';
import QuoteModal from '../components/QuoteModal';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

function MainHome() {
  const navigate = useNavigate();
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

  return (
    <div className="app">
      <Header onBookCall={handleBookCall} />
      <main>
        <Hero onBookCall={handleBookCall} onGetQuote={handleGetQuote} />
        <TrustIndicators />
        <InsurancePartners />
        <ProductCards
          onViewHealthPlans={() => navigate('/health-plans')}
          onViewTermPlans={() => navigate('/term-plans')}
          onViewVehiclePlans={() => navigate('/vehicle-plans')}
          onLearnMore={() => navigate('/compare-health')}
          onLearnMoreVehicle={() => navigate('/know-vehicle')}
        />
        <ProcessFeatures onNavigate={() => navigate('/expert')} />
        <Testimonials onNavigate={() => navigate('/expert')} />
        <CtaBanner onBookCall={handleBookCall} />
        <MediaMentions />
        <FAQ onBookCall={handleBookCall} />
      </main>
      <Footer onBookCall={handleBookCall} />
      <BookCallModal isOpen={isBookCallOpen} onClose={() => setIsBookCallOpen(false)} />
      <QuoteModal isOpen={isQuoteOpen} onClose={() => setIsQuoteOpen(false)} planName={quotePlanName} />
      <Toaster position="top-center" />
    </div>
  );
}

export default MainHome;
