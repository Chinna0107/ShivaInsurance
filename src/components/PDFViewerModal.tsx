import React, { useState } from 'react';
import { pdfjs, Document, Page } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Download, X } from 'lucide-react';
import './PDFViewerModal.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface PDFViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  fileUrl: string;
}

const PDFViewerModal: React.FC<PDFViewerModalProps> = ({ isOpen, onClose, title, fileUrl }) => {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1.0);

  const [containerWidth, setContainerWidth] = useState(window.innerWidth);

  React.useEffect(() => {
    const handleResize = () => setContainerWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!isOpen) return null;

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setPageNumber(1);
  };

  const changePage = (offset: number) => {
    setPageNumber(prev => numPages ? Math.min(Math.max(1, prev + offset), numPages) : prev);
  };

  const changeScale = (delta: number) => {
    setScale(prev => Math.min(Math.max(0.5, prev + delta), 3.0));
  };

  return (
    <div className="pdf-viewer-overlay">
      <div className="pdf-viewer-modal">
        {/* Header */}
        <div className="pdf-header">
          <h2>{title}</h2>
          
          <div className="pdf-header-controls">
            <div className="pdf-zoom-controls">
              <button onClick={() => changeScale(-0.2)} className="pdf-zoom-btn"><ZoomOut size={16} /></button>
              <span className="pdf-zoom-text">{Math.round(scale * 100)}%</span>
              <button onClick={() => changeScale(0.2)} className="pdf-zoom-btn"><ZoomIn size={16} /></button>
            </div>
            
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <a href={fileUrl} target="_blank" rel="noopener noreferrer" className="pdf-download-btn">
                <Download size={16} /> <span className="pdf-download-btn-text">Download</span>
              </a>
              
              <button onClick={onClose} className="pdf-close-btn">
                <X size={24} />
              </button>
            </div>
          </div>
        </div>

        {/* Viewer */}
        <div className="pdf-body">
          <Document
            file={fileUrl}
            onLoadSuccess={onDocumentLoadSuccess}
            loading={<div style={{ padding: '2rem', color: '#6b7280' }}>Loading PDF Document...</div>}
            error={<div style={{ padding: '2rem', color: '#ef4444' }}>Failed to load PDF. Please use the download button.</div>}
          >
            {numPages && (
              <div className="pdf-page-container">
                <Page
                  pageNumber={pageNumber}
                  scale={containerWidth < 768 ? 1 : scale}
                  width={containerWidth < 768 ? containerWidth - 32 : undefined}
                  renderTextLayer={true}
                  renderAnnotationLayer={true}
                />
              </div>
            )}
          </Document>

          {/* Pagination Fixed at bottom */}
          {numPages && (
            <div className="pdf-pagination">
              <button 
                onClick={() => changePage(-1)} disabled={pageNumber <= 1}
              >
                <ChevronLeft size={20} />
              </button>
              <span>
                Page {pageNumber} of {numPages}
              </span>
              <button 
                onClick={() => changePage(1)} disabled={pageNumber >= numPages}
              >
                <ChevronRight size={20} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PDFViewerModal;
