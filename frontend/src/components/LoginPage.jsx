import React, { useState } from 'react';
import { User, Lock, Mail, UserCircle, GraduationCap } from 'lucide-react';

export default function LoginPage({ setUser }) {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'student'
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async () => {
  setError('');
  setLoading(true);

  try {
    const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
    const payload = isLogin 
      ? { email: formData.email, password: formData.password }
      : formData;

    const response = await fetch(`http://localhost:5000${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (data.success) {
      // Set user and let App.jsx handle the redirect
      setUser(data.user);
    } else {
      setError(data.message || 'Something went wrong');
    }
    } catch (err) {
        setError('Unable to connect to server. Make sure the backend is running.');
        console.error('Error:', err);
    } finally {
        setLoading(false);
    }
};

  const styles = {
    outerContainer: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      overflow: 'auto'
    },
    contentWrapper: {
      maxWidth: '440px',
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    },
    card: {
      background: 'white',
      borderRadius: '24px',
      padding: '40px',
      width: '100%',
      boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
      boxSizing: 'border-box'
    },
    header: {
      textAlign: 'center',
      marginBottom: '32px'
    },
    iconCircle: {
      width: '64px',
      height: '64px',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '0 auto 16px'
    },
    title: {
      fontSize: '32px',
      fontWeight: 'bold',
      color: '#1f2937',
      margin: '0 0 8px 0'
    },
    subtitle: {
      color: '#6b7280',
      margin: 0
    },
    toggleContainer: {
      display: 'flex',
      background: '#f3f4f6',
      borderRadius: '50px',
      padding: '4px',
      marginBottom: '24px'
    },
    toggleButton: {
      flex: 1,
      padding: '10px 20px',
      border: 'none',
      borderRadius: '50px',
      fontWeight: '500',
      cursor: 'pointer',
      transition: 'all 0.3s',
      fontSize: '14px'
    },
    toggleButtonActive: {
      background: 'white',
      color: '#764ba2',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
    },
    toggleButtonInactive: {
      background: 'transparent',
      color: '#6b7280'
    },
    inputContainer: {
      position: 'relative',
      marginBottom: '16px'
    },
    iconWrapper: {
      position: 'absolute',
      left: '12px',
      top: '50%',
      transform: 'translateY(-50%)',
      color: '#9ca3af',
      pointerEvents: 'none'
    },
    input: {
      width: '100%',
      padding: '12px 12px 12px 40px',
      border: '1px solid #e5e7eb',
      borderRadius: '12px',
      fontSize: '14px',
      outline: 'none',
      transition: 'border 0.3s',
      boxSizing: 'border-box'
    },
    roleLabel: {
      fontSize: '14px',
      fontWeight: '500',
      color: '#374151',
      marginBottom: '8px',
      display: 'block'
    },
    roleContainer: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '12px',
      marginBottom: '16px'
    },
    roleButton: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px',
      padding: '12px',
      border: '2px solid',
      borderRadius: '12px',
      cursor: 'pointer',
      transition: 'all 0.3s',
      background: 'transparent',
      fontSize: '14px',
      fontWeight: '500'
    },
    roleButtonActive: {
      borderColor: '#764ba2',
      background: '#f3e8ff',
      color: '#764ba2'
    },
    roleButtonInactive: {
      borderColor: '#e5e7eb',
      color: '#374151'
    },
    error: {
      background: '#fef2f2',
      border: '1px solid #fecaca',
      color: '#dc2626',
      padding: '12px 16px',
      borderRadius: '12px',
      fontSize: '14px',
      marginBottom: '16px'
    },
    submitButton: {
      width: '100%',
      padding: '12px',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      border: 'none',
      borderRadius: '12px',
      fontSize: '16px',
      fontWeight: '500',
      cursor: 'pointer',
      transition: 'transform 0.2s, box-shadow 0.2s',
      marginBottom: '16px'
    },
    submitButtonDisabled: {
      opacity: 0.5,
      cursor: 'not-allowed'
    },
    footer: {
      textAlign: 'center',
      fontSize: '14px',
      color: '#6b7280'
    },
    link: {
      color: '#764ba2',
      fontWeight: '500',
      textDecoration: 'none',
      cursor: 'pointer',
      background: 'none',
      border: 'none',
      padding: 0
    },
    infoCard: {
      marginTop: '24px',
      background: 'rgba(255,255,255,0.9)',
      borderRadius: '16px',
      padding: '16px',
      textAlign: 'center',
      width: '100%',
      boxSizing: 'border-box'
    },
    infoText: {
      fontSize: '14px',
      color: '#374151',
      margin: 0
    }
  };

  return (
    <div style={styles.outerContainer}>
      <div style={styles.contentWrapper}>
        <div style={styles.card}>
          <div style={styles.header}>
            <div style={styles.iconCircle}>
              <GraduationCap size={32} color="white" />
            </div>
            <h1 style={styles.title}>DeskQuest</h1>
            <p style={styles.subtitle}>
              {isLogin ? 'Welcome back!' : 'Create your account'}
            </p>
          </div>

          <div style={styles.toggleContainer}>
            <button
              onClick={() => {
                setIsLogin(true);
                setError('');
              }}
              style={{
                ...styles.toggleButton,
                ...(isLogin ? styles.toggleButtonActive : styles.toggleButtonInactive)
              }}
            >
              Login
            </button>
            <button
              onClick={() => {
                setIsLogin(false);
                setError('');
              }}
              style={{
                ...styles.toggleButton,
                ...(!isLogin ? styles.toggleButtonActive : styles.toggleButtonInactive)
              }}
            >
              Register
            </button>
          </div>

          <div>
            {!isLogin && (
              <div style={styles.inputContainer}>
                <div style={styles.iconWrapper}>
                  <User size={20} />
                </div>
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleInputChange}
                  style={styles.input}
                />
              </div>
            )}

            <div style={styles.inputContainer}>
              <div style={styles.iconWrapper}>
                <Mail size={20} />
              </div>
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleInputChange}
                style={styles.input}
              />
            </div>

            <div style={styles.inputContainer}>
              <div style={styles.iconWrapper}>
                <Lock size={20} />
              </div>
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
                style={styles.input}
              />
            </div>

            {!isLogin && (
              <div style={{ marginBottom: '16px' }}>
                <label style={styles.roleLabel}>I am a:</label>
                <div style={styles.roleContainer}>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, role: 'student' })}
                    style={{
                      ...styles.roleButton,
                      ...(formData.role === 'student' ? styles.roleButtonActive : styles.roleButtonInactive)
                    }}
                  >
                    <UserCircle size={20} />
                    <span>Student</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, role: 'professor' })}
                    style={{
                      ...styles.roleButton,
                      ...(formData.role === 'professor' ? styles.roleButtonActive : styles.roleButtonInactive)
                    }}
                  >
                    <GraduationCap size={20} />
                    <span>Professor</span>
                  </button>
                </div>
              </div>
            )}

            {error && (
              <div style={styles.error}>
                {error}
              </div>
            )}

            <button
              onClick={handleSubmit}
              disabled={loading}
              style={{
                ...styles.submitButton,
                ...(loading ? styles.submitButtonDisabled : {})
              }}
              onMouseEnter={(e) => {
                if (!loading) {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 10px 20px rgba(0,0,0,0.2)';
                }
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = 'none';
              }}
            >
              {loading ? 'Please wait...' : (isLogin ? 'Login' : 'Create Account')}
            </button>
          </div>

          <div style={styles.footer}>
            {isLogin ? (
              <p>
                Don't have an account?{' '}
                <button
                  onClick={() => {
                    setIsLogin(false);
                    setError('');
                  }}
                  style={styles.link}
                >
                  Register now
                </button>
              </p>
            ) : (
              <p>
                Already have an account?{' '}
                <button
                  onClick={() => {
                    setIsLogin(true);
                    setError('');
                  }}
                  style={styles.link}
                >
                  Login here
                </button>
              </p>
            )}
          </div>
        </div>

        <div style={styles.infoCard}>
          <p style={styles.infoText}>
            🎮 Earn points by attending class • 🏆 Compete on leaderboards • 🎁 Unlock rewards
          </p>
        </div>
      </div>
    </div>
  );
}