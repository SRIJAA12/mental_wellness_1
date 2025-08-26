'use client';

import React, { useState, useEffect } from 'react';
import { Line, Doughnut } from 'react-chartjs-2';
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
  ArcElement,
} from 'chart.js';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '@/lib/firebase';
import { collection, query, where, orderBy, limit, onSnapshot } from 'firebase/firestore';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ArcElement
);

interface MoodEntry {
  id: string;
  mood: string;
  value: number;
  label: string;
  timestamp: Date;
  activities?: string[];
  energyLevel?: number;
  notes?: string;
}

const MoodAnalytics: React.FC = () => {
  const [user] = useAuthState(auth);
  const [moodData, setMoodData] = useState<MoodEntry[]>([]);
  const [timeRange, setTimeRange] = useState('7');
  const [isClient, setIsClient] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!user || !isClient) return;

    const days = parseInt(timeRange);
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    const q = query(
      collection(db, 'moods'),
      where('userId', '==', user.uid),
      where('timestamp', '>=', startDate),
      orderBy('timestamp', 'desc'),
      limit(100)
    );

    setLoading(true);

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const moods = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        timestamp: doc.data().timestamp.toDate()
      } as MoodEntry));
      
      // **FIX: Safe array reversal with proper type checking**
      const reversedMoods = Array.isArray(moods) ? [...moods].reverse() : [];
      setMoodData(reversedMoods);
      setLoading(false);
    }, (error) => {
      console.error('Error fetching mood data:', error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user, timeRange, isClient]);

  if (!isClient) {
    return (
      <div className="card">
        <div className="card-body text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="card">
        <div className="card-header">
          <h5 className="mb-0">
            <i className="fas fa-chart-line text-primary me-2"></i>
            Mood Analytics
          </h5>
        </div>
        <div className="card-body text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-2 text-muted">Loading your mood insights...</p>
        </div>
      </div>
    );
  }

  // Calculate analytics with safe array handling
  const totalEntries = Array.isArray(moodData) ? moodData.length : 0;
  const averageMood = totalEntries > 0 
    ? (moodData.reduce((sum, entry) => sum + (entry?.value || 0), 0) / totalEntries)
    : 0;

  const moodDistribution = moodData.reduce((acc: { [key: string]: number }, entry) => {
    if (entry && entry.label) {
      acc[entry.label] = (acc[entry.label] || 0) + 1;
    }
    return acc;
  }, {});

  const bestDay = moodData.length > 0
    ? moodData.reduce((best, current) => 
        (current?.value || 0) > (best?.value || 0) ? current : best
      )
    : null;

  // **FIX: Safe array slicing for chart data**
  const last14Entries = moodData.slice(-14);
  
  // Chart data
  const lineChartData = {
    labels: last14Entries.map(entry => 
      entry?.timestamp ? entry.timestamp.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric' 
      }) : ''
    ),
    datasets: [{
      label: 'Mood Level',
      data: last14Entries.map(entry => entry?.value || 0),
      borderColor: '#667eea',
      backgroundColor: 'rgba(102, 126, 234, 0.1)',
      borderWidth: 3,
      fill: true,
      tension: 0.4,
      pointBackgroundColor: '#667eea',
      pointBorderColor: '#fff',
      pointBorderWidth: 2,
      pointRadius: 6,
      pointHoverRadius: 8,
    }]
  };

  const doughnutData = {
    labels: Object.keys(moodDistribution),
    datasets: [{
      data: Object.values(moodDistribution),
      backgroundColor: [
        '#48bb78', // Happy - Green
        '#4299e1', // Good - Blue
        '#ed8936', // Neutral - Orange
        '#f56565'  // Sad - Red
      ],
      borderWidth: 3,
      borderColor: '#fff',
      hoverBorderWidth: 4,
      hoverOffset: 10
    }]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'bottom' as const,
        labels: {
          padding: 20,
          usePointStyle: true,
          font: {
            size: 12
          }
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: 'white',
        bodyColor: 'white',
        borderColor: '#667eea',
        borderWidth: 1,
        cornerRadius: 8,
        displayColors: true,
        callbacks: {
          title: (context: any) => {
            const dataIndex = context[0]?.dataIndex;
            const entry = last14Entries[dataIndex];
            return entry?.timestamp ? entry.timestamp.toLocaleDateString('en-US', {
              weekday: 'long',
              month: 'short',
              day: 'numeric'
            }) : '';
          },
          afterBody: (context: any) => {
            const dataIndex = context[0]?.dataIndex;
            const entry = last14Entries[dataIndex];
            if (entry?.notes) {
              return `Note: ${entry.notes}`;
            }
            return '';
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 4,
        ticks: {
          stepSize: 1,
          callback: function(value: any) {
            const labels = ['', '😔 Sad', '😐 Neutral', '🙂 Good', '😊 Happy'];
            return labels[value] || '';
          },
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.1)'
        }
      },
      x: {
        grid: {
          display: false
        }
      }
    },
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          padding: 15,
          usePointStyle: true,
          font: {
            size: 11
          }
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: 'white',
        bodyColor: 'white',
        callbacks: {
          label: (context: any) => {
            const label = context.label;
            const value = context.raw;
            const percentage = totalEntries > 0 ? ((value / totalEntries) * 100).toFixed(1) : '0';
            return `${label}: ${value} entries (${percentage}%)`;
          }
        }
      }
    },
    cutout: '60%'
  };

  return (
    <div className="card border-0 shadow">
      <div className="card-header bg-light border-0">
        <div className="row align-items-center">
          <div className="col">
            <h5 className="mb-0 fw-bold">
              <i className="fas fa-chart-line text-primary me-2"></i>
              Mood Analytics
            </h5>
          </div>
          <div className="col-auto">
            <select 
              className="form-select form-select-sm"
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
            >
              <option value="7">Last 7 days</option>
              <option value="30">Last 30 days</option>
              <option value="90">Last 3 months</option>
            </select>
          </div>
        </div>
      </div>
      
      <div className="card-body">
        {totalEntries > 0 ? (
          <>
            {/* Summary Stats */}
            <div className="row mb-4">
              <div className="col-md-3 col-6 text-center">
                <div className="p-3 bg-primary bg-opacity-10 rounded-3">
                  <div className="h4 text-primary fw-bold mb-1">{totalEntries}</div>
                  <small className="text-muted">Total Entries</small>
                </div>
              </div>
              <div className="col-md-3 col-6 text-center">
                <div className="p-3 bg-success bg-opacity-10 rounded-3">
                  <div className="h4 text-success fw-bold mb-1">{averageMood.toFixed(1)}/4</div>
                  <small className="text-muted">Average Mood</small>
                </div>
              </div>
              <div className="col-md-3 col-6 text-center mt-3 mt-md-0">
                <div className="p-3 bg-warning bg-opacity-10 rounded-3">
                  <div className="h4 text-warning fw-bold mb-1">
                    {bestDay?.timestamp ? bestDay.timestamp.getDate() : 'N/A'}
                  </div>
                  <small className="text-muted">Best Day</small>
                </div>
              </div>
              <div className="col-md-3 col-6 text-center mt-3 mt-md-0">
                <div className="p-3 bg-info bg-opacity-10 rounded-3">
                  <div className="h4 text-info fw-bold mb-1">
                    {Object.keys(moodDistribution).length > 0 ? Math.max(...Object.values(moodDistribution)) : 0}
                  </div>
                  <small className="text-muted">Top Mood Count</small>
                </div>
              </div>
            </div>

            {/* Charts */}
            <div className="row g-4">
              {/* Line Chart */}
              <div className="col-lg-8">
                <div className="mb-3">
                  <h6 className="text-muted mb-3">
                    <i className="fas fa-trending-up me-2"></i>
                    Mood Trend (Last {Math.min(14, totalEntries)} entries)
                  </h6>
                  <div style={{ height: '350px' }}>
                    <Line data={lineChartData} options={chartOptions} />
                  </div>
                </div>
              </div>
              
              {/* Doughnut Chart & Additional Stats */}
              <div className="col-lg-4">
                <div className="mb-4">
                  <h6 className="text-muted mb-3">
                    <i className="fas fa-chart-pie me-2"></i>
                    Mood Distribution
                  </h6>
                  <div style={{ height: '200px' }}>
                    <Doughnut data={doughnutData} options={doughnutOptions} />
                  </div>
                </div>
                
                {/* Insights */}
                <div className="mt-4">
                  <h6 className="text-muted mb-3">
                    <i className="fas fa-lightbulb me-2"></i>
                    Quick Insights
                  </h6>
                  <div className="small">
                    {averageMood >= 3 && (
                      <div className="alert alert-success py-2 mb-2">
                        <i className="fas fa-smile me-2"></i>
                        You're having a great period! Keep it up! 🌟
                      </div>
                    )}
                    {averageMood < 2 && (
                      <div className="alert alert-info py-2 mb-2">
                        <i className="fas fa-heart me-2"></i>
                        Remember, tough times don't last. You're stronger than you think! 💙
                      </div>
                    )}
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <span className="text-muted">Most Common Mood:</span>
                      <strong className="text-primary">
                        {Object.keys(moodDistribution).length > 0 
                          ? Object.entries(moodDistribution).reduce((a, b) => a[1] > b[1] ? a : b)[0]
                          : 'N/A'
                        }
                      </strong>
                    </div>
                    {bestDay && (
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <span className="text-muted">Best Day:</span>
                        <strong className="text-success">
                          {bestDay.timestamp.toLocaleDateString()}
                        </strong>
                      </div>
                    )}
                    <div className="d-flex justify-content-between align-items-center">
                      <span className="text-muted">Tracking Since:</span>
                      <strong className="text-info">
                        {moodData.length > 0 && moodData[0]?.timestamp 
                          ? moodData[0].timestamp.toLocaleDateString()
                          : 'N/A'
                        }
                      </strong>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="text-center py-5">
            <div className="mb-4">
              <i className="fas fa-chart-line fa-4x text-muted opacity-25"></i>
            </div>
            <h6 className="text-muted mb-2">No mood data yet</h6>
            <p className="text-muted mb-4">
              Start tracking your mood to see beautiful analytics and insights about your mental wellness journey!
            </p>
            <div className="d-flex justify-content-center gap-2">
              <button className="btn btn-primary" onClick={() => window.location.href = '#mood-tracker'}>
                <i className="fas fa-heart me-2"></i>
                Track Your First Mood
              </button>
              <button className="btn btn-outline-secondary">
                <i className="fas fa-question-circle me-2"></i>
                Learn More
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MoodAnalytics;
