import React, { useState, useEffect } from 'react';
import { FiPlus, FiTrash2, FiEdit2, FiImage } from 'react-icons/fi';
import toast from 'react-hot-toast';

interface ClaimRatio {
  id: string;
  category: string;
  company: string;
  story: string;
  image_url: string;
  created_at: string;
}

const API = import.meta.env.VITE_API_URL || 'http://localhost:3000';

const ClaimRatiosManager = () => {
  const [claimRatios, setClaimRatios] = useState<ClaimRatio[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRatio, setEditingRatio] = useState<ClaimRatio | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    category: '',
    company: '',
    story: ''
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>('');

  useEffect(() => {
    fetchClaimRatios();
  }, []);

  const fetchClaimRatios = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API}/api/claim-ratios`);
      if (response.ok) {
        const data = await response.json();
        setClaimRatios(data);
      }
    } catch (err) {
      toast.error('Failed to load claim ratios');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (ratio?: ClaimRatio) => {
    if (ratio) {
      setEditingRatio(ratio);
      setFormData({
        category: ratio.category,
        company: ratio.company,
        story: ratio.story
      });
      setPreview(ratio.image_url);
    } else {
      setEditingRatio(null);
      setFormData({ category: '', company: '', story: '' });
      setPreview('');
    }
    setImageFile(null);
    setIsModalOpen(true);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const data = new FormData();
      data.append('category', formData.category);
      data.append('company', formData.company);
      data.append('story', formData.story);
      if (imageFile) {
        data.append('image', imageFile);
      }

      const url = editingRatio 
        ? `${API}/api/claim-ratios/${editingRatio.id}`
        : `${API}/api/claim-ratios`;
      
      const method = editingRatio ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        body: data,
      });

      if (!response.ok) throw new Error('Failed to save claim ratio');

      toast.success(editingRatio ? 'Claim ratio updated!' : 'Claim ratio added!');
      setIsModalOpen(false);
      fetchClaimRatios();
    } catch (error) {
      toast.error('Failed to save claim ratio');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this claim ratio?')) return;
    
    setDeletingId(id);
    try {
      const response = await fetch(`${API}/api/claim-ratios/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete');
      
      toast.success('Claim ratio deleted');
      fetchClaimRatios();
    } catch (error) {
      toast.error('Failed to delete claim ratio');
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', minHeight: '300px' }}>
        <div style={{ width: '40px', height: '40px', border: '3px solid #f3f3f3', borderTop: '3px solid #f1592a', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
      </div>
    );
  }

  return (
    <div className="admin-page" style={{ padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1f2937' }}>Claim Ratios</h1>
        <button 
          onClick={() => handleOpenModal()}
          style={{ display: 'flex', alignItems: 'center', gap: '8px', backgroundColor: '#f1592a', color: 'white', padding: '10px 16px', borderRadius: '6px', border: 'none', cursor: 'pointer', fontWeight: 600 }}
        >
          <FiPlus /> Add Claim Ratio
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
        {claimRatios.length === 0 ? (
          <div style={{ gridColumn: '1 / -1', padding: '40px', textAlign: 'center', backgroundColor: 'white', borderRadius: '8px', border: '1px solid #e5e7eb', color: '#6b7280' }}>
            No claim ratios found. Add your first one!
          </div>
        ) : (
          claimRatios.map((ratio) => (
            <div key={ratio.id} style={{ backgroundColor: 'white', borderRadius: '8px', border: '1px solid #e5e7eb', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
              <div style={{ height: '160px', backgroundColor: '#f3f4f6', position: 'relative' }}>
                {ratio.image_url ? (
                  <img src={ratio.image_url} alt={ratio.company} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#9ca3af' }}>
                    <FiImage size={32} />
                  </div>
                )}
              </div>
              <div style={{ padding: '16px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                  <div>
                    <h3 style={{ fontWeight: 'bold', fontSize: '1.1rem', margin: 0, color: '#111827' }}>{ratio.company}</h3>
                    <span style={{ display: 'inline-block', padding: '2px 8px', backgroundColor: '#eef2ff', color: '#4f46e5', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 600, marginTop: '4px' }}>
                      {ratio.category}
                    </span>
                  </div>
                </div>
                <p style={{ color: '#4b5563', fontSize: '0.875rem', margin: '0 0 16px 0', flex: 1, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                  {ratio.story}
                </p>
                <div style={{ display: 'flex', gap: '8px', marginTop: 'auto', borderTop: '1px solid #f3f4f6', paddingTop: '12px' }}>
                  <button 
                    onClick={() => handleOpenModal(ratio)}
                    style={{ flex: 1, padding: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', border: '1px solid #e5e7eb', backgroundColor: 'white', color: '#374151', borderRadius: '4px', cursor: 'pointer', fontSize: '0.875rem', fontWeight: 500 }}
                  >
                    <FiEdit2 /> Edit
                  </button>
                  <button 
                    onClick={() => handleDelete(ratio.id)}
                    disabled={deletingId === ratio.id}
                    style={{ flex: 1, padding: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', border: '1px solid #fee2e2', backgroundColor: '#fef2f2', color: '#ef4444', borderRadius: '4px', cursor: deletingId === ratio.id ? 'not-allowed' : 'pointer', fontSize: '0.875rem', fontWeight: 500 }}
                  >
                    <FiTrash2 /> {deletingId === ratio.id ? 'Deleting...' : 'Delete'}
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {isModalOpen && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50, padding: '20px' }}>
          <div style={{ backgroundColor: 'white', borderRadius: '8px', padding: '24px', width: '100%', maxWidth: '500px', maxHeight: '90vh', overflowY: 'auto' }}>
            <h2 style={{ margin: '0 0 20px 0', fontSize: '1.25rem', fontWeight: 'bold' }}>
              {editingRatio ? 'Edit Claim Ratio' : 'Add Claim Ratio'}
            </h2>
            
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', marginBottom: '6px', fontSize: '0.875rem', fontWeight: 500, color: '#374151' }}>Category</label>
                <input 
                  type="text" 
                  value={formData.category} 
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  placeholder="e.g. Health, Life, Motor"
                  required
                  style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #d1d5db', fontSize: '0.95rem' }}
                />
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', marginBottom: '6px', fontSize: '0.875rem', fontWeight: 500, color: '#374151' }}>Company</label>
                <input 
                  type="text" 
                  value={formData.company} 
                  onChange={(e) => setFormData({...formData, company: e.target.value})}
                  placeholder="e.g. HDFC Ergo, Niva Bupa"
                  required
                  style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #d1d5db', fontSize: '0.95rem' }}
                />
              </div>
              
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', marginBottom: '6px', fontSize: '0.875rem', fontWeight: 500, color: '#374151' }}>Story</label>
                <textarea 
                  value={formData.story} 
                  onChange={(e) => setFormData({...formData, story: e.target.value})}
                  placeholder="Describe the claim ratio story..."
                  required
                  rows={4}
                  style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #d1d5db', fontSize: '0.95rem', resize: 'vertical' }}
                />
              </div>
              
              <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'block', marginBottom: '6px', fontSize: '0.875rem', fontWeight: 500, color: '#374151' }}>Image</label>
                <input 
                  type="file" 
                  accept="image/*"
                  onChange={handleImageChange}
                  style={{ width: '100%', padding: '8px', border: '1px dashed #d1d5db', borderRadius: '6px' }}
                />
                {preview && (
                  <div style={{ marginTop: '12px', borderRadius: '6px', overflow: 'hidden', height: '120px', width: 'fit-content' }}>
                    <img src={preview} alt="Preview" style={{ height: '100%', objectFit: 'contain' }} />
                  </div>
                )}
              </div>

              <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(false)}
                  style={{ padding: '10px 16px', borderRadius: '6px', border: '1px solid #d1d5db', backgroundColor: 'white', color: '#374151', cursor: 'pointer', fontWeight: 500 }}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  disabled={submitting}
                  style={{ padding: '10px 16px', borderRadius: '6px', border: 'none', backgroundColor: '#f1592a', color: 'white', cursor: submitting ? 'not-allowed' : 'pointer', fontWeight: 600, opacity: submitting ? 0.7 : 1 }}
                >
                  {submitting ? 'Saving...' : 'Save'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClaimRatiosManager;
