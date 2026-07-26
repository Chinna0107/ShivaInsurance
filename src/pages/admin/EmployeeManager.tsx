import { useState, useEffect } from 'react';
import { FiPlus, FiEdit2, FiTrash2 } from 'react-icons/fi';
import toast from 'react-hot-toast';

interface Employee {
  id: string;
  name: string;
  email: string;
  role: string;
  department: string;
  password?: string;
}

const EmployeeManager = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({ name: '', email: '', role: '', department: '', password: '' });

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const res = await fetch('https://shiva-be.vercel.app/api/employees');
      if (res.ok) {
        const data = await res.json();
        setEmployees(data);
      }
    } catch (err) {
      console.error(err);
      toast.error('Failed to fetch employees');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (employee?: Employee) => {
    if (employee) {
      setEditingEmployee(employee);
      setFormData({ name: employee.name, email: employee.email, role: employee.role, department: employee.department, password: '' });
    } else {
      setEditingEmployee(null);
      setFormData({ name: '', email: '', role: '', department: '', password: '' });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingEmployee(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingEmployee) {
        const res = await fetch(`https://shiva-be.vercel.app/api/employees/${editingEmployee.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
        if (res.ok) {
          toast.success('Employee updated successfully');
          fetchEmployees();
          handleCloseModal();
        }
      } else {
        const res = await fetch('https://shiva-be.vercel.app/api/employees', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
        if (res.ok) {
          toast.success('Employee added successfully');
          fetchEmployees();
          handleCloseModal();
        }
      }
    } catch (err) {
      console.error(err);
      toast.error('Failed to save employee');
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      try {
        const res = await fetch(`https://shiva-be.vercel.app/api/employees/${id}`, {
          method: 'DELETE'
        });
        if (res.ok) {
          toast.success('Employee deleted');
          fetchEmployees();
        }
      } catch (err) {
        console.error(err);
        toast.error('Failed to delete employee');
      }
    }
  };

  // removed early return for loading

  return (
    <div style={{ padding: '1rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.8rem', color: 'var(--text-dark, #1f2937)', margin: 0 }}>Employee Management</h1>
        <button 
          onClick={() => handleOpenModal()}
          style={{
            display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1.5rem',
            backgroundColor: 'var(--primary-color, #2e9f68)', color: 'white', border: 'none', borderRadius: '8px',
            cursor: 'pointer', fontWeight: 'bold', boxShadow: '0 4px 10px rgba(46, 159, 104, 0.3)',
            transition: 'background 0.2s'
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--primary-hover, #238052)'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--primary-color, #2e9f68)'}
        >
          <FiPlus /> Add Employee
        </button>
      </div>

      {/* Table */}
      <div className="table-responsive-wrapper" style={{ backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.02)', border: '1px solid var(--border-color, #e5e7eb)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#f9fafb', borderBottom: '1px solid var(--border-color, #e5e7eb)', textAlign: 'left' }}>
              <th style={{ padding: '1rem 1.5rem', color: '#6b7280', fontWeight: 600 }}>Name</th>
              <th style={{ padding: '1rem 1.5rem', color: '#6b7280', fontWeight: 600 }}>Email</th>
              <th style={{ padding: '1rem 1.5rem', color: '#6b7280', fontWeight: 600 }}>Role</th>
              <th style={{ padding: '1rem 1.5rem', color: '#6b7280', fontWeight: 600 }}>Department</th>
              <th style={{ padding: '1rem 1.5rem', color: '#6b7280', fontWeight: 600, textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              [...Array(4)].map((_, i) => (
                <tr key={`skeleton-${i}`} style={{ borderBottom: '1px solid var(--border-color, #e5e7eb)' }}>
                  <td style={{ padding: '1rem 1.5rem' }}><div className="skeleton-box" style={{ width: '130px', height: '20px' }}></div></td>
                  <td style={{ padding: '1rem 1.5rem' }}><div className="skeleton-box" style={{ width: '180px', height: '18px' }}></div></td>
                  <td style={{ padding: '1rem 1.5rem' }}><div className="skeleton-box" style={{ width: '80px', height: '24px', borderRadius: '12px' }}></div></td>
                  <td style={{ padding: '1rem 1.5rem' }}><div className="skeleton-box" style={{ width: '90px', height: '18px' }}></div></td>
                  <td style={{ padding: '1rem 1.5rem' }}><div className="skeleton-box" style={{ width: '80px', height: '20px', marginLeft: 'auto', display: 'block' }}></div></td>
                </tr>
              ))
            ) : employees.length > 0 ? (
              employees.map((emp) => (
              <tr key={emp.id} style={{ borderBottom: '1px solid var(--border-color, #e5e7eb)', transition: 'background 0.2s' }} onMouseEnter={e => e.currentTarget.style.backgroundColor = '#f9fafb'} onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}>
                <td style={{ padding: '1rem 1.5rem', fontWeight: 500, color: 'var(--text-dark, #1f2937)' }}>{emp.name}</td>
                <td style={{ padding: '1rem 1.5rem', color: '#6b7280' }}>{emp.email}</td>
                <td style={{ padding: '1rem 1.5rem' }}>
                  <span style={{ 
                    padding: '0.25rem 0.75rem', borderRadius: '9999px', fontSize: '0.85rem',
                    backgroundColor: emp.role === 'Manager' ? '#fef3c7' : '#dcfce7',
                    color: emp.role === 'Manager' ? '#d97706' : 'var(--success-color, #10b981)',
                    fontWeight: 500
                  }}>
                    {emp.role}
                  </span>
                </td>
                <td style={{ padding: '1rem 1.5rem', color: '#6b7280' }}>{emp.department}</td>
                <td style={{ padding: '1rem 1.5rem', textAlign: 'right' }}>
                  <button 
                    onClick={() => handleOpenModal(emp)}
                    style={{ background: 'none', border: 'none', color: 'var(--primary-color, #2e9f68)', cursor: 'pointer', marginRight: '1rem' }}
                  >
                    <FiEdit2 size={18} />
                  </button>
                  <button 
                    onClick={() => handleDelete(emp.id)}
                    style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer' }}
                  >
                    <FiTrash2 size={18} />
                  </button>
                </td>
              </tr>
            ))
            ) : (
              <tr>
                <td colSpan={5} style={{ padding: '3rem', textAlign: 'center', color: '#9ca3af' }}>
                  No employees found. Add one to get started!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal Overlay */}
      {isModalOpen && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, 
          backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: 'white', padding: '2rem', borderRadius: '12px', width: '100%', maxWidth: '500px',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
            maxHeight: '90vh', overflowY: 'auto', WebkitOverflowScrolling: 'touch'
          }}>
            <h2 style={{ margin: '0 0 1.5rem', color: 'var(--text-dark, #1f2937)' }}>
              {editingEmployee ? 'Edit Employee' : 'Add New Employee'}
            </h2>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              
              <div>
                <label style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.9rem', color: '#4b5563', fontWeight: 500 }}>Name</label>
                <input 
                  type="text" required
                  value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})}
                  style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid var(--border-color, #e5e7eb)', outline: 'none' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.9rem', color: '#4b5563', fontWeight: 500 }}>Email</label>
                <input 
                  type="email" required
                  value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})}
                  style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid var(--border-color, #e5e7eb)', outline: 'none' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.9rem', color: '#4b5563', fontWeight: 500 }}>Password {editingEmployee && "(Leave blank to keep current)"}</label>
                <input 
                  type="password" required={!editingEmployee}
                  value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})}
                  style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid var(--border-color, #e5e7eb)', outline: 'none' }}
                />
              </div>

              <div style={{ display: 'flex', gap: '1rem' }}>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.9rem', color: '#4b5563', fontWeight: 500 }}>Role</label>
                  <select 
                    value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})} required
                    style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid var(--border-color, #e5e7eb)', outline: 'none', backgroundColor: 'white' }}
                  >
                    <option value="">Select Role</option>
                    <option value="Agent">Agent</option>
                    <option value="Manager">Manager</option>
                    <option value="Admin">Admin</option>
                  </select>
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.9rem', color: '#4b5563', fontWeight: 500 }}>Department</label>
                  <select 
                    value={formData.department} onChange={e => setFormData({...formData, department: e.target.value})} required
                    style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid var(--border-color, #e5e7eb)', outline: 'none', backgroundColor: 'white' }}
                  >
                    <option value="">Select Dept</option>
                    <option value="Health">Health</option>
                    <option value="Life">Life</option>
                    <option value="Auto">Auto</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1.5rem' }}>
                <button type="button" onClick={handleCloseModal} style={{ padding: '0.75rem 1.5rem', backgroundColor: 'white', color: '#4b5563', border: '1px solid var(--border-color, #e5e7eb)', borderRadius: '6px', cursor: 'pointer' }}>
                  Cancel
                </button>
                <button type="submit" style={{ padding: '0.75rem 1.5rem', backgroundColor: 'var(--primary-color, #2e9f68)', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>
                  {editingEmployee ? 'Update' : 'Save'}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeManager;
