'use client';

import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { collection, query, orderBy, limit, onSnapshot, where } from 'firebase/firestore';
import { db, saveMoodEntry } from '../lib/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../lib/firebase';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

interface MoodEntry {
  mood: string;
  value: number;
  label: string;
  timestamp: Date;
  userId: string;
  notes?: string;
}

const MoodWidget: React.FC = () => {
  const [user] = useAuthState(auth);
  const [selectedMood, setSelectedMood] = useState<any>(null);
  const [moodData, setMoodData] = useState<MoodEntry[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isClient, setIsClient] = useState(false);

  const moods = [
    { emoji: '😊', value: 4, label: 'Happy', color: '#48bb78', description: 'Feeling great!' },
    { emoji: '🙂', value: 3, label: 'Good', color: '#4299e1', description: 'Pretty good day' },
    { emoji: '😐', value: 2, label: 'Neutral', color: '#ed8936', description: 'Just okay' },
    { emoji: '😔', value: 1, label: 'Sad', color: '#f56565', description: 'Not feeling great' }
  ];

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!user || !isClient) return;

    const q = query(
      collection(db, 'moods'),
      where('userId', '==', user.uid),
      orderBy('timestamp', 'desc'),
      limit(7)
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const moods: MoodEntry[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        moods.push({
          mood: data.mood,
          value: data.value,
          label: data.label,
          timestamp: data.timestamp.toDate(),
          userId: data.userId,
          notes: data.notes || '',
        });
      });
      setMoodData(moods.reverse());
    });

    return () => unsubscribe();
  }, [user, isClient]);

  const handleMoodSelect = async (mood: any) => {
    if (!user) return;
    
    setSelectedMood(mood);
    setIsLoading(true);

    try {
      const result = await saveMoodEntry(user.uid, {
        mood: mood.emoji,
        value: mood.value,
        label: mood.label,
        notes: `Feeling ${mood.description.toLowerCase()}`
      });

      if (result.error) {
        console.error('Error saving mood:', result.error);
      } else {
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
      }
    } catch (error) {
      console.error('Error saving mood:', error);
    } finally {
      setTimeout(() => {
        setSelectedMood(null);
        setIsLoading(false);
      }, 1500);
    }
  };

  if (!isClient) {
    return (
      <section id="mood-tracker" className="py-5 bg-light">
        <div className="container">
          <div className="text-center">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const chartData = {
    labels: moodData.map(entry => 
      entry.timestamp.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    ),
    datasets: [{
      label: 'Mood Level',
      data: moodData.map(entry => entry.value),
      borderColor: '#667eea',
      backgroundColor: 'rgba(102, 126, 234, 0.1)',
      borderWidth: 3,
      fill: true,
      tension: 0.4,
      pointBackgroundColor: '#667eea',
      pointBorderColor: '#fff',
      pointBorderWidth: 2,
      pointRadius: 6,
    }],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: 'white',
        bodyColor: 'white',
        borderColor: '#667eea',
        borderWidth: 1,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 4,
        ticks: {
          stepSize: 1,
          callback: function(value: any) {
            const labels = ['', '😔', '😐', '🙂', '😊'];
            return labels[value];
          },
        },
      },
    },
  };

  return (
    <section id="mood-tracker" className="py-5 bg-light">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <div className="text-center mb-5">
              <h2 className="display-5 fw-bold mb-4">How are you feeling today?</h2>
              <p className="lead text-muted">
                Track your daily mood and discover patterns in your emotional wellness journey
              </p>
            </div>

            <div className="row">
              <div className="col-lg-6 mb-4">
                <div className="card h-100 shadow">
                  <div className="card-body p-4">
                    <div className="text-center mb-4">
                      <h5 className="card-title fw-bold text-primary mb-3">
                        <i className="fas fa-heart text-danger me-2"></i>Quick Mood Check-in
                      </h5>
                      <p className="text-muted">Select how you're feeling right now</p>
                    </div>
                    
                    <div className="row g-3 justify-content-center">
                      {moods.map((mood, index) => (
                        <div key={index} className="col-6 col-sm-3">
                          <div
                            className={`text-center p-3 rounded-3 border cursor-pointer ${
                              selectedMood?.emoji === mood.emoji 
                                ? 'border-primary text-white' 
                                : 'border-light bg-white text-dark'
                            }`}
                            onClick={() => handleMoodSelect(mood)}
                            style={{ 
                              cursor: 'pointer',
                              transition: 'all 0.3s ease',
                              backgroundColor: selectedMood?.emoji === mood.emoji ? mood.color : undefined
                            }}
                          >
                            <div style={{ fontSize: '2.5rem' }} className="mb-2">{mood.emoji}</div>
                            <div className="fw-semibold mb-1">{mood.label}</div>
                            <div className="small opacity-75">{mood.description}</div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {isLoading && (
                      <div className="text-center mt-4">
                        <div className="wellness-spinner mb-2"></div>
                        <p className="text-muted mb-0">Saving your mood...</p>
                      </div>
                    )}

                    {showSuccess && (
                      <div className="alert alert-success mt-4 d-flex align-items-center">
                        <i className="fas fa-check-circle me-2"></i>
                        <span>Mood saved successfully! Keep up the great work! 🎉</span>
                      </div>
                    )}

                    {!user && (
                      <div className="alert alert-info mt-4">
                        <div className="d-flex align-items-center">
                          <i className="fas fa-info-circle me-2"></i>
                          <div>
                            Please <a href="/login" className="alert-link">sign in</a> to track your mood and see your progress over time.
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="col-lg-6 mb-4">
                <div className="card h-100 shadow">
                  <div className="card-body p-4">
                    <div className="d-flex justify-content-between align-items-center mb-4">
                      <h5 className="card-title fw-bold text-primary mb-0">
                        <i className="fas fa-chart-line me-2"></i>Your 7-Day Mood Trend
                      </h5>
                      {moodData.length > 0 && (
                        <span className="badge bg-primary">
                          {moodData.length} {moodData.length === 1 ? 'entry' : 'entries'}
                        </span>
                      )}
                    </div>
                    
                    {moodData.length > 0 ? (
                      <div className="chart-container">
                        <Line data={chartData} options={chartOptions} />
                      </div>
                    ) : (
                      <div className="text-center py-5">
                        <div className="mb-4">
                          <i className="fas fa-chart-line display-1 text-muted opacity-25"></i>
                        </div>
                        <h6 className="text-muted mb-2">No mood data yet</h6>
                        <p className="text-muted mb-4">
                          Start tracking your mood to see your progress and patterns!
                        </p>
                        {user && (
                          <button className="btn btn-primary">
                            <i className="fas fa-heart me-2"></i>Log Your First Mood
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MoodWidget;
