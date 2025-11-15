import React, { useState, useEffect } from 'react';
import { LogOut, Code, Plus, Trash2, Gift, TrendingUp, Users } from 'lucide-react';

export default function ProfessorDashboard({ user, setUser, navigate }) {
  const [quizSets, setQuizSets] = useState([
    {
      "id": "s1",
      "code": "TEST01",
      "topic": "CS",
      "professorId": user?._id,
      "startTime": "2025-01-01T00:00:00Z",
      "endTime": "2030-12-31T23:59:59Z",
      "questions": [
        {
          "id": "q1",
          "text": "What is the professor's favorite animal?",
          "options": ["squirrel", "panda", "cat"],
          "correct": 0
        }
      ],
      "rewards": ["i2"],
      "attempts": 10,
      "correctAttempts": 7
    }
  ]);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newSet, setNewSet] = useState({
    code: '',
    topic: '',
    startTime: '',
    endTime: '',
    questions: [{ text: '', options: ['', '', ''], correct: 0 }],
    rewards: []
  });

  const deskImage = user?.home || "/images/final.png";

  const items = [
    { "id": "i1", "name": "Algorithm Book" },
    { "id": "i2", "name": "Desk Plant" },
    { "id": "i4", "name": "Desk Lamp" },
    { "id": "i8", "name": "Poster" }
  ];

  const handleLogout = () => {
    if (setUser && navigate) {
      setUser(null);
      navigate('/');
    }
  };

  const handleCreateSet = () => {
    const set = {
      id: `s${Date.now()}`,
      code: newSet.code.toUpperCase(),
      topic: newSet.topic,
      professorId: user._id,
      startTime: new Date(newSet.startTime).toISOString(),
      endTime: new Date(newSet.endTime).toISOString(),
      questions: newSet.questions.map((q, i) => ({
        id: `q${Date.now()}_${i}`,
        text: q.text,
        options: q.options,
        correct: q.correct
      })),
      rewards: newSet.rewards,
      attempts: 0,
      correctAttempts: 0
    };

    setQuizSets([...quizSets, set]);
    
    setShowCreateModal(false);
    setNewSet({
      code: '',
      topic: '',
      startTime: '',
      endTime: '',
      questions: [{ text: '', options: ['', '', ''], correct: 0 }],
      rewards: []
    });
  };

  const handleDeleteSet = (setId) => {
    if (window.confirm('Are you sure you want to delete this quiz set?')) {
      setQuizSets(quizSets.filter(s => s.id !== setId));
    }
  };

  const addQuestion = () => {
    setNewSet({
      ...newSet,
      questions: [...newSet.questions, { text: '', options: ['', '', ''], correct: 0 }]
    });
  };

  const updateQuestion = (index, field, value) => {
    const updated = [...newSet.questions];
    updated[index][field] = value;
    setNewSet({ ...newSet, questions: updated });
  };

  const updateOption = (qIndex, optIndex, value) => {
    const updated = [...newSet.questions];
    updated[qIndex].options[optIndex] = value;
    setNewSet({ ...newSet, questions: updated });
  };

  const toggleReward = (itemId) => {
    if (newSet.rewards.includes(itemId)) {
      setNewSet({ ...newSet, rewards: newSet.rewards.filter(id => id !== itemId) });
    } else {
      setNewSet({ ...newSet, rewards: [...newSet.rewards, itemId] });
    }
  };

  // Calculate overall class accuracy
  const overallAccuracy = quizSets.reduce((acc, set) => {
    return acc + (set.attempts > 0 ? (set.correctAttempts / set.attempts) * 100 : 0);
  }, 0) / (quizSets.length || 1);

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
      alignItems: 'center',
      flexWrap: 'wrap',
      gap: '16px'
    },
    headerLeft: {
      flex: 1,
      minWidth: '200px'
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
      overflow: 'auto',
      gap: '20px'
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
    statsCard: {
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
      justifyContent: 'center',
      flexShrink: 0
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
    quizSetsContainer: {
      flex: 1,
      overflow: 'auto'
    },
    quizSetsHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '16px'
    },
    addButton: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      padding: '12px 20px',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      border: 'none',
      borderRadius: '12px',
      fontSize: '14px',
      fontWeight: '500',
      cursor: 'pointer',
      transition: 'all 0.2s'
    },
    quizSetCard: {
      background: 'white',
      borderRadius: '16px',
      padding: '20px',
      marginBottom: '16px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
    },
    quizSetHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'start',
      marginBottom: '12px'
    },
    quizSetCode: {
      fontSize: '20px',
      fontWeight: 'bold',
      color: '#1f2937',
      marginBottom: '4px'
    },
    quizSetTopic: {
      fontSize: '14px',
      color: '#6b7280',
      marginBottom: '12px'
    },
    quizSetInfo: {
      fontSize: '14px',
      color: '#6b7280',
      marginBottom: '4px'
    },
    accuracyBadge: {
      display: 'inline-block',
      padding: '4px 12px',
      borderRadius: '12px',
      fontSize: '13px',
      fontWeight: '600',
      marginTop: '8px'
    },
    questionsList: {
      marginTop: '12px',
      paddingTop: '12px',
      borderTop: '1px solid #e5e7eb'
    },
    questionItem: {
      fontSize: '13px',
      color: '#374151',
      marginBottom: '6px',
      paddingLeft: '8px'
    },
    iconButtons: {
      display: 'flex',
      gap: '8px'
    },
    iconButton: {
      padding: '8px',
      background: '#f3f4f6',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      transition: 'all 0.2s'
    },
    modal: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0,0,0,0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '20px'
    },
    modalContent: {
      background: 'white',
      borderRadius: '16px',
      padding: '32px',
      maxWidth: '600px',
      width: '100%',
      maxHeight: '90vh',
      overflow: 'auto'
    },
    modalTitle: {
      fontSize: '24px',
      fontWeight: 'bold',
      color: '#1f2937',
      marginBottom: '24px'
    },
    formGroup: {
      marginBottom: '20px'
    },
    label: {
      display: 'block',
      fontSize: '14px',
      fontWeight: '600',
      color: '#1f2937',
      marginBottom: '8px'
    },
    input: {
      width: '100%',
      padding: '10px 12px',
      borderRadius: '8px',
      border: '2px solid #e5e7eb',
      fontSize: '14px',
      boxSizing: 'border-box',
      color: '#1f2937'
    },
    questionCard: {
      background: '#f9fafb',
      borderRadius: '12px',
      padding: '16px',
      marginBottom: '16px'
    },
    optionInput: {
      marginBottom: '8px'
    },
    radioGroup: {
      display: 'flex',
      gap: '12px',
      marginTop: '8px'
    },
    radioLabel: {
      display: 'flex',
      alignItems: 'center',
      gap: '6px',
      fontSize: '14px',
      fontWeight: '500',
      color: '#374151',
      cursor: 'pointer'
    },
    rewardsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: '8px',
      marginTop: '8px'
    },
    rewardCheckbox: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      padding: '8px',
      background: '#f9fafb',
      borderRadius: '8px',
      cursor: 'pointer',
      fontSize: '14px',
      fontWeight: '500',
      color: '#374151'
    },
    buttonGroup: {
      display: 'flex',
      gap: '12px',
      marginTop: '24px'
    },
    button: {
      flex: 1,
      padding: '12px',
      borderRadius: '12px',
      fontSize: '14px',
      fontWeight: '500',
      cursor: 'pointer',
      border: 'none',
      transition: 'all 0.2s'
    },
    primaryButton: {
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white'
    },
    secondaryButton: {
      background: '#e5e7eb',
      color: '#374151'
    },
    addQuestionButton: {
      width: '100%',
      padding: '10px',
      background: '#f3f4f6',
      border: '2px dashed #d1d5db',
      borderRadius: '8px',
      fontSize: '14px',
      fontWeight: '500',
      color: '#6b7280',
      cursor: 'pointer',
      marginBottom: '16px'
    }
  };

  const getAccuracyColor = (accuracy) => {
    if (accuracy >= 80) return { bg: '#dcfce7', color: '#22c55e' };
    if (accuracy >= 60) return { bg: '#fef3c7', color: '#f59e0b' };
    return { bg: '#fee2e2', color: '#ef4444' };
  };

  return (
    <div style={styles.container}>
      <div style={styles.innerContainer}>
        <div style={styles.header}>
          <div style={styles.headerLeft}>
            <h1 style={styles.welcomeText}>Welcome, Professor {user?.name}! 👨‍🏫</h1>
            <p style={styles.subtitle}>Manage quiz sets and track student progress</p>
          </div>
          <button 
            style={styles.logoutButton}
            onClick={handleLogout}
            onMouseEnter={(e) => e.target.style.background = '#47484fff'}
            onMouseLeave={(e) => e.target.style.background = '#57555bff'}
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>

        <div style={styles.mainContent}>
          {/* Left Half - Desk */}
          <div style={styles.leftHalf}>
            <h2 style={styles.deskTitle}>
              <Gift size={24} />
              Your Desk
            </h2>
            <div style={styles.deskImageContainer}>
              <img 
                src={deskImage}
                alt="Your Desk"
                style={styles.deskImage}
              />
            </div>
          </div>

          {/* Right Half - Stats & Quiz Sets */}
          <div style={styles.rightHalf}>
            {/* Overall Class Accuracy */}
            <div style={styles.statsCard}>
              <div style={{ ...styles.iconCircle, background: '#dcfce7' }}>
                <TrendingUp size={24} color="#22c55e" />
              </div>
              <div>
                <p style={styles.statValue}>{Math.round(overallAccuracy)}%</p>
                <p style={styles.statLabel}>Overall Class Accuracy</p>
              </div>
            </div>

            <div style={styles.quizSetsContainer}>
              <div style={styles.quizSetsHeader}>
                <h2 style={styles.deskTitle}>
                  <Code size={24} />
                  Quiz Sets
                </h2>
                <button 
                  style={styles.addButton}
                  onClick={() => setShowCreateModal(true)}
                >
                  <Plus size={18} />
                  Create New Set
                </button>
              </div>

              {quizSets.map(set => {
                const accuracy = set.attempts > 0 ? Math.round((set.correctAttempts / set.attempts) * 100) : 0;
                const colors = getAccuracyColor(accuracy);
                
                return (
                  <div key={set.id} style={styles.quizSetCard}>
                    <div style={styles.quizSetHeader}>
                      <div style={{ flex: 1 }}>
                        <div style={styles.quizSetCode}>{set.code}</div>
                        <div style={styles.quizSetTopic}>Topic: {set.topic}</div>
                        <div style={styles.quizSetInfo}>
                          📝 {set.questions.length} question(s) • 🎁 {set.rewards.length} reward(s)
                        </div>
                        <div style={styles.quizSetInfo}>
                          📅 {new Date(set.startTime).toLocaleDateString()} - {new Date(set.endTime).toLocaleDateString()}
                        </div>
                        <div style={{ ...styles.accuracyBadge, background: colors.bg, color: colors.color }}>
                          {set.attempts > 0 ? `${accuracy}% accuracy (${set.attempts} attempts)` : 'No attempts yet'}
                        </div>
                        
                        <div style={styles.questionsList}>
                          {set.questions.map((q, idx) => (
                            <div key={q.id} style={styles.questionItem}>
                              • {q.text}
                            </div>
                          ))}
                        </div>
                      </div>
                      <div style={styles.iconButtons}>
                        <button 
                          style={styles.iconButton}
                          onClick={() => handleDeleteSet(set.id)}
                          onMouseEnter={(e) => e.target.style.background = '#fee2e2'}
                          onMouseLeave={(e) => e.target.style.background = '#f3f4f6'}
                        >
                          <Trash2 size={16} color="#ef4444" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}

              {quizSets.length === 0 && (
                <div style={{ ...styles.quizSetCard, textAlign: 'center', color: '#6b7280' }}>
                  No quiz sets created yet. Click "Create New Set" to get started!
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Create Modal */}
      {showCreateModal && (
        <div style={styles.modal} onClick={(e) => {
          if (e.target === e.currentTarget) setShowCreateModal(false);
        }}>
          <div style={styles.modalContent}>
            <h2 style={styles.modalTitle}>Create New Quiz Set</h2>

            <div style={styles.formGroup}>
              <label style={styles.label}>Quiz Code</label>
              <input 
                type="text"
                placeholder="e.g., MATH101"
                value={newSet.code}
                onChange={(e) => setNewSet({ ...newSet, code: e.target.value })}
                style={styles.input}
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Topic</label>
              <input 
                type="text"
                placeholder="e.g., Mathematics"
                value={newSet.topic}
                onChange={(e) => setNewSet({ ...newSet, topic: e.target.value })}
                style={styles.input}
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Start Date</label>
              <input 
                type="datetime-local"
                value={newSet.startTime}
                onChange={(e) => setNewSet({ ...newSet, startTime: e.target.value })}
                style={styles.input}
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>End Date</label>
              <input 
                type="datetime-local"
                value={newSet.endTime}
                onChange={(e) => setNewSet({ ...newSet, endTime: e.target.value })}
                style={styles.input}
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Questions</label>
              {newSet.questions.map((q, qIndex) => (
                <div key={qIndex} style={styles.questionCard}>
                  <label style={{ ...styles.label, fontSize: '13px', marginBottom: '8px' }}>Question {qIndex + 1}</label>
                  <input 
                    type="text"
                    placeholder="Enter question"
                    value={q.text}
                    onChange={(e) => updateQuestion(qIndex, 'text', e.target.value)}
                    style={{ ...styles.input, marginBottom: '12px' }}
                  />
                  
                  {q.options.map((opt, optIndex) => (
                    <div key={optIndex} style={styles.optionInput}>
                      <input 
                        type="text"
                        placeholder={`Option ${optIndex + 1}`}
                        value={opt}
                        onChange={(e) => updateOption(qIndex, optIndex, e.target.value)}
                        style={styles.input}
                      />
                    </div>
                  ))}
                  
                  <label style={{ ...styles.label, fontSize: '13px', marginTop: '12px', marginBottom: '8px' }}>Correct Answer</label>
                  <div style={styles.radioGroup}>
                    {q.options.map((_, optIndex) => (
                      <label key={optIndex} style={styles.radioLabel}>
                        <input 
                          type="radio"
                          checked={q.correct === optIndex}
                          onChange={() => updateQuestion(qIndex, 'correct', optIndex)}
                        />
                        Option {optIndex + 1}
                      </label>
                    ))}
                  </div>
                </div>
              ))}
              <button 
                style={styles.addQuestionButton}
                onClick={addQuestion}
              >
                + Add Another Question
              </button>
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Rewards (select items)</label>
              <div style={styles.rewardsGrid}>
                {items.map(item => (
                  <label key={item.id} style={styles.rewardCheckbox}>
                    <input 
                      type="checkbox"
                      checked={newSet.rewards.includes(item.id)}
                      onChange={() => toggleReward(item.id)}
                    />
                    {item.name}
                  </label>
                ))}
              </div>
            </div>

            <div style={styles.buttonGroup}>
              <button 
                style={{ ...styles.button, ...styles.secondaryButton }}
                onClick={() => setShowCreateModal(false)}
              >
                Cancel
              </button>
              <button 
                style={{ ...styles.button, ...styles.primaryButton }}
                onClick={handleCreateSet}
              >
                Create Quiz Set
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}