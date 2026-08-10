import React from 'react';
import ArticleHero from './ArticleHero';
import TableOfContents from './TableOfContents';
import ArticleContent from './ArticleContent';
import './ArticlePage.css';

interface ArticlePageProps {
  onBookCall?: () => void;
  onGetQuote?: () => void;
  topic?: string;
}

const ArticlePage: React.FC<ArticlePageProps> = ({ onBookCall, onGetQuote, topic = 'Life Insurance' }) => {
  return (
    <div className="article-page">
      <div className="container article-container">
        <ArticleHero topic={topic} />
        <div className="article-layout">
          <aside className="article-sidebar">
            <TableOfContents />
          </aside>
          <main className="article-body">
            <ArticleContent onBookCall={onBookCall} onGetQuote={onGetQuote} topic={topic} />
          </main>
        </div>
      </div>
    </div>
  );
};

export default ArticlePage;
