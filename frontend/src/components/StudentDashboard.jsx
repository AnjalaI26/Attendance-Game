import React, { useState, useEffect } from 'react';
import { Trophy, Calendar, Gift, Star, TrendingUp, LogOut, Code } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function StudentDashboard({ user: propUser, setUser: propSetUser }) {
  const navigate = useNavigate();
  
  // Use props if provided, otherwise use mock data for demo
  const [user, setUser] = useState(propUser || {
    name: 'Alex',
    points: 150,
    _id: '123',
    home: 'desk.png'
  });
  
  const [attendance, setAttendance] = useState([
    { date: new Date(), status: 'present' },
    { date: new Date(Date.now() - 86400000), status: 'present' },
    { date: new Date(Date.now() - 172800000), status: 'absent' }
  ]);
  
  const [activeTab, setActiveTab] = useState('dashboard'); // 'dashboard' or 'quiz'
  const [quizCode, setQuizCode] = useState('');
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const deskImage = user.home || "desk.png";

  // Mock quiz questions - replace with API call
  const quizQuestions = {
    'MATH101': {
      question: 'What is 15 × 8?',
      answers: ['120', '125', '115'],
      correct: '120'
    },
    'SCI202': {
      question: 'What is the chemical symbol for salt?',
      answers: ['H2O', 'CO2', 'NaCl'],
      correct: 'NaCl'
    }
  };

  const handleCodeSubmit = () => {
    const question = quizQuestions[quizCode.toUpperCase()];
    if (question) {
      setCurrentQuestion(question);
      setShowResult(false);
      setSelectedAnswer('');
    } else {
      alert('Invalid code! Try MATH101 or SCI202');
    }
  };

  const handleAnswerSubmit = async () => {
    const correct = selectedAnswer === currentQuestion.correct;
    setIsCorrect(correct);
    setShowResult(true);
    
    if (correct) {
      // Update user's desk to show lamp
      const updatedUser = { ...user, home: 'lamp.png', points: user.points + 10 };
      setUser(updatedUser);
      
      // In real app, make API call to update user
      // fetch(`http://localhost:5000/api/users/${user._id}`, {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ home: 'lamp.png', points: updatedUser.points })
      // });
    }
  };

  const handleLogout = () => {
    if (propSetUser) {
      propSetUser(null);
      navigate('/');
    } else {
      alert('Logout clicked (demo mode - pass setUser prop)');
    }
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
      height: '100%',
      padding: '20px',
      display: 'flex',
      flexDirection: 'column'
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
    tabContainer: {
      display: 'flex',
      gap: '8px',
      marginRight: '20px'
    },
    tab: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      padding: '10px 20px',
      background: 'transparent',
      color: '#6b7280',
      border: '2px solid #e5e7eb',
      borderRadius: '12px',
      fontSize: '14px',
      fontWeight: '500',
      cursor: 'pointer',
      transition: 'all 0.2s'
    },
    activeTab: {
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      border: '2px solid transparent'
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
    mainContent: {
      flex: 1,
      display: 'flex',
      gap: '20px',
      minHeight: 0
    },
    leftHalf: {
      flex: 1,
      background: 'white',
      borderRadius: '16px',
      padding: '24px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
      display: 'flex',
      flexDirection: 'column'
    },
    rightHalf: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      gap: '20px',
      overflow: 'auto'
    },
    deskTitle: {
      fontSize: '24px',
      fontWeight: 'bold',
      color: '#1f2937',
      marginBottom: '16px',
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    },
    deskImageContainer: {
      flex: 1,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: 0
    },
    deskImage: {
      maxWidth: '100%',
      maxHeight: '100%',
      objectFit: 'contain',
      borderRadius: '16px'
    },
    statsContainer: {
      display: 'flex',
      flexDirection: 'column',
      gap: '16px'
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
    quizCard: {
      background: 'white',
      borderRadius: '16px',
      padding: '32px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
      maxWidth: '600px',
      margin: '0 auto',
      width: '100%'
    },
    input: {
      width: '100%',
      padding: '12px 16px',
      borderRadius: '12px',
      border: '2px solid #e5e7eb',
      fontSize: '16px',
      marginBottom: '16px',
      boxSizing: 'border-box'
    },
    button: {
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      border: 'none',
      borderRadius: '12px',
      padding: '12px 24px',
      fontSize: '16px',
      fontWeight: '500',
      cursor: 'pointer',
      width: '100%'
    },
    questionText: {
      fontSize: '20px',
      fontWeight: 'bold',
      color: '#1f2937',
      marginBottom: '24px'
    },
    answerOption: {
      padding: '16px',
      borderRadius: '12px',
      border: '2px solid #e5e7eb',
      marginBottom: '12px',
      cursor: 'pointer',
      transition: 'all 0.2s',
      color: '#1f2937',
      fontWeight: '500'
    },
    selectedAnswer: {
      borderColor: '#667eea',
      background: '#f0f4ff'
    },
    result: {
      padding: '20px',
      borderRadius: '12px',
      marginTop: '20px',
      textAlign: 'center',
      fontSize: '18px',
      fontWeight: 'bold'
    },
    correctResult: {
      background: '#dcfce7',
      color: '#22c55e'
    },
    incorrectResult: {
      background: '#fee2e2',
      color: '#ef4444'
    }
  };

  const attendanceRate = attendance.length > 0 
    ? Math.round((attendance.filter(a => a.status === 'present').length / attendance.length) * 100)
    : 0;

  return (
    <div style={styles.container}>
      <div style={styles.innerContainer}>
        {/* Header with Tabs and Logout */}
        <div style={styles.header}>
          <div style={styles.headerLeft}>
            <h1 style={styles.welcomeText}>Welcome back, {user.name}! 👋</h1>
            <p style={styles.subtitle}>Keep up the great work!</p>
          </div>
          <div style={styles.tabContainer}>
            <button 
              style={{...styles.tab, ...(activeTab === 'dashboard' ? styles.activeTab : {})}}
              onClick={() => setActiveTab('dashboard')}
            >
              Dashboard
            </button>
            <button 
              style={{...styles.tab, ...(activeTab === 'quiz' ? styles.activeTab : {})}}
              onClick={() => setActiveTab('quiz')}
            >
              <Code size={18} />
              Quiz
            </button>
          </div>
          <button 
            style={styles.logoutButton}
            onClick={handleLogout}
            onMouseEnter={(e) => e.target.style.background = '#47484fff'}
            onMouseLeave={(e) => e.target.style.background = '#5a5555ff'}
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>

        {/* Main Content */}
        {activeTab === 'dashboard' ? (
          <div style={styles.mainContent}>
            {/* Left Half - Desk */}
            <div style={styles.leftHalf}>
              <h2 style={styles.deskTitle}>
                <Gift size={24} />
                Your Desk
              </h2>
              <div style={styles.deskImageContainer}>
                <img 
                  src={`/images/${deskImage}`} 
                  alt="Your Desk"
                  style={styles.deskImage}
                />
              </div>
            </div>

            {/* Right Half - Stats */}
            <div style={styles.rightHalf}>
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
            </div>
          </div>
        ) : (
          <div style={styles.mainContent}>
            <div style={styles.quizCard}>
              <h2 style={{ ...styles.deskTitle, justifyContent: 'center' }}>
                <Code size={24} />
                Enter Quiz Code
              </h2>
              
              {!currentQuestion ? (
                <div>
                  <p style={{ color: '#6b7280', marginBottom: '16px', textAlign: 'center' }}>
                    Enter your question set code to begin
                  </p>
                  <input 
                    type="text"
                    placeholder="Enter code (e.g., MATH101)"
                    value={quizCode}
                    onChange={(e) => setQuizCode(e.target.value)}
                    style={styles.input}
                  />
                  <button onClick={handleCodeSubmit} style={styles.button}>
                    Start Quiz
                  </button>
                </div>
              ) : (
                <div>
                  <p style={styles.questionText}>{currentQuestion.question}</p>
                  
                  {currentQuestion.answers.map((answer, index) => (
                    <div
                      key={index}
                      style={{
                        ...styles.answerOption,
                        ...(selectedAnswer === answer ? styles.selectedAnswer : {})
                      }}
                      onClick={() => !showResult && setSelectedAnswer(answer)}
                    >
                      {answer}
                    </div>
                  ))}
                  
                  {!showResult && (
                    <button 
                      onClick={handleAnswerSubmit} 
                      style={{...styles.button, marginTop: '20px'}}
                      disabled={!selectedAnswer}
                    >
                      Submit Answer
                    </button>
                  )}
                  
                  {showResult && (
                    <div>
                      <div style={{
                        ...styles.result,
                        ...(isCorrect ? styles.correctResult : styles.incorrectResult)
                      }}>
                        {isCorrect ? '🎉 Correct! You earned a lamp for your desk!' : '❌ Incorrect. Try again!'}
                      </div>
                      <button 
                        onClick={() => {
                          setCurrentQuestion(null);
                          setQuizCode('');
                          setShowResult(false);
                        }}
                        style={{...styles.button, marginTop: '16px'}}
                      >
                        Try Another Question
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}