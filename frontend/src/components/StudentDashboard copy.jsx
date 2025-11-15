import React, { useState, useEffect } from 'react';
import { Trophy, Calendar, Gift, Star, TrendingUp, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function StudentDashboard({ user, setUser }) {
  const navigate = useNavigate();
  const [attendance, setAttendance] = useState([]);
  const [leaderboard, setLeaderboard] = useState([]);
  const deskImage = user.home || "desk.png";

  useEffect(() => {
    // Fetch student's attendance history
    fetch(`http://localhost:5000/api/attendance/user/${user._id}`)
      .then(res => res.json())
      .then(data => {
        if (data.success) setAttendance(data.attendance);
      })
      .catch(err => console.error('Error fetching attendance:', err));

    // Fetch leaderboard
    fetch('http://localhost:5000/api/users/leaderboard/top')
      .then(res => res.json())
      .then(data => {
        if (data.success) setLeaderboard(data.leaderboard);
      })
      .catch(err => console.error('Error fetching leaderboard:', err));
  }, [user._id]);

  const handleLogout = () => {
    setUser(null);
    navigate('/');
  };

  const styles = {
    container: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      overflow: 'auto',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    },
    innerContainer: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '20px'
    },
    header: {
      background: 'white',
      borderRadius: '16px',
      padding: '24px',
      marginBottom: '20px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    headerLeft: {
      flex: 1
    },
    welcomeText: {
      fontSize: '28px',
      fontWeight: 'bold',
      color: '#1f2937',
      margin: '0 0 8px 0'
    },
    subtitle: {
      color: '#6b7280',
      margin: 0
    },
    logoutButton: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      padding: '10px 20px',
      background: '#57555bff',
      color: 'white',
      border: 'none',
      borderRadius: '12px',
      fontSize: '14px',
      fontWeight: '500',
      cursor: 'pointer',
      transition: 'all 0.2s'
    },
    statsContainer: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '16px',
      marginBottom: '20px'
    },
    statCard: {
      background: 'white',
      borderRadius: '16px',
      padding: '20px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
      display: 'flex',
      alignItems: 'center',
      gap: '16px'
    },
    iconCircle: {
      width: '48px',
      height: '48px',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    statValue: {
      fontSize: '24px',
      fontWeight: 'bold',
      color: '#1f2937',
      margin: '0 0 4px 0'
    },
    statLabel: {
      fontSize: '14px',
      color: '#6b7280',
      margin: 0
    },
    contentGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '20px'
    },
    card: {
      background: 'white',
      borderRadius: '16px',
      padding: '24px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
    },
    cardTitle: {
      fontSize: '20px',
      fontWeight: 'bold',
      color: '#1f2937',
      marginBottom: '16px',
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    },
    list: {
      listStyle: 'none',
      padding: 0,
      margin: 0
    },
    listItem: {
      padding: '12px',
      borderBottom: '1px solid #e5e7eb',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    leaderboardItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      padding: '12px',
      borderBottom: '1px solid #e5e7eb'
    },
    rank: {
      width: '32px',
      height: '32px',
      borderRadius: '50%',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontWeight: 'bold'
    },
    button: {
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      border: 'none',
      borderRadius: '12px',
      padding: '12px 24px',
      fontSize: '14px',
      fontWeight: '500',
      cursor: 'pointer',
      marginTop: '16px'
    }
  };

  const attendanceRate = attendance.length > 0 
    ? Math.round((attendance.filter(a => a.status === 'present').length / attendance.length) * 100)
    : 0;

  return (
    <div style={styles.container}>
      <div style={styles.innerContainer}>
        {/* Header with Logout */}
        <div style={styles.header}>
          <div style={styles.headerLeft}>
            <h1 style={styles.welcomeText}>Welcome back, {user.name}! 👋</h1>
            <p style={styles.subtitle}>Keep up the great work attending classes!</p>
          </div>
          <button 
            style={styles.logoutButton}
            onClick={handleLogout}
            onMouseEnter={(e) => e.target.style.background = '#dc2626'}
            onMouseLeave={(e) => e.target.style.background = '#ef4444'}
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>

        {/* Stats Cards */}
        <div style={styles.statsContainer}>
          <div style={styles.statCard}>
            <div style={{ ...styles.iconCircle, background: '#fef3c7' }}>
              <Star size={24} color="#f59e0b" />
            </div>
            <div>
              <p style={styles.statValue}>{user.points}</p>
              <p style={styles.statLabel}>Total Points</p>
            </div>
          </div>

          <div style={styles.statCard}>
            <div style={{ ...styles.iconCircle, background: '#dbeafe' }}>
              <Calendar size={24} color="#3b82f6" />
            </div>
            <div>
              <p style={styles.statValue}>{attendance.length}</p>
              <p style={styles.statLabel}>Days Tracked</p>
            </div>
          </div>

          <div style={styles.statCard}>
            <div style={{ ...styles.iconCircle, background: '#dcfce7' }}>
              <TrendingUp size={24} color="#22c55e" />
            </div>
            <div>
              <p style={styles.statValue}>{attendanceRate}%</p>
              <p style={styles.statLabel}>Attendance Rate</p>
            </div>
          </div>
        </div>

        {/* Content Grid */}
        <div style={styles.contentGrid}>
          {/* Recent Attendance */}
          <div style={styles.card}>
            <h2 style={styles.cardTitle}>
              <Calendar size={20} />
              Recent Attendance
            </h2>
            <ul style={styles.list}>
              {attendance.slice(0, 5).map((record, index) => (
                <li key={index} style={styles.listItem}>
                  <span>{new Date(record.date).toLocaleDateString()}</span>
                  <span style={{
                    padding: '4px 12px',
                    borderRadius: '12px',
                    fontSize: '12px',
                    fontWeight: '500',
                    background: record.status === 'present' ? '#dcfce7' : '#fee2e2',
                    color: record.status === 'present' ? '#22c55e' : '#ef4444'
                  }}>
                    {record.status.toUpperCase()}
                  </span>
                </li>
              ))}
            </ul>
            {attendance.length === 0 && (
              <p style={{ textAlign: 'center', color: '#6b7280', padding: '20px' }}>
                No attendance records yet
              </p>
            )}
          </div>

          {/* Leaderboard */}
          <div style={styles.card}>
            <h2 style={styles.cardTitle}>
              <Trophy size={20} />
              Top Students
            </h2>
            <ul style={styles.list}>
              {leaderboard.map((student, index) => (
                <li key={student._id} style={styles.leaderboardItem}>
                  <div style={styles.rank}>#{index + 1}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: '500', color: '#1f2937' }}>{student.name}</div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#f59e0b' }}>
                    <Star size={16} />
                    <span style={{ fontWeight: 'bold' }}>{student.points}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div style={styles.card}>
            <h2 style={styles.cardTitle}>Your Desk</h2>
            <img 
                src={`/images/${deskImage}`} 
                alt="Desk"
                style={{ width: "100%", borderRadius: "16px" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}