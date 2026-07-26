import { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ArticlePage from '../components/article/ArticlePage';
import BookCallModal from '../components/BookCallModal';
import QuoteModal from '../components/QuoteModal';
import { Toaster } from 'react-hot-toast';
import { useParams } from 'react-router-dom';

function ArticlePageWrapper() {
  const { topic } = useParams<{ topic: string }>();
  const [isBookCallOpen, setIsBookCallOpen] = useState(false);
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [quotePlanName, setQuotePlanName] = useState('');

  const handleBookCall = () => setIsBookCallOpen(true);
  const handleGetQuote = (planName?: string) => {
    setQuotePlanName(planName || '');
    setIsQuoteOpen(true);
  };

  return (
    <div className="app">
      <Header onBookCall={handleBookCall} />
      <ArticlePage onBookCall={handleBookCall} onGetQuote={handleGetQuote} topic={decodeURIComponent(topic || 'Term Insurance')} />
      <Footer onBookCall={handleBookCall} />
      <BookCallModal isOpen={isBookCallOpen} onClose={() => setIsBookCallOpen(false)} />
      <QuoteModal isOpen={isQuoteOpen} onClose={() => setIsQuoteOpen(false)} planName={quotePlanName} />
      <Toaster position="top-center" />
    </div>
  );
}

export default ArticlePageWrapper;
