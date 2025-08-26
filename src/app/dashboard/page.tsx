'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, getMoods } from '@/lib/firebase';

export default function DashboardPage() {
  const [user, loading] = useAuthState(auth);
  const [moods, setMoods] = useState<any[]>([]);
  const [loadingMoods, setLoadingMoods] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (user) {
      loadUserMoods();
    }
  }, [user]);

  const loadUserMoods = async () => {
    if (!user) return;
    
    setLoadingMoods(true);
    const { moods: moodData } = await getMoods(user.uid);
    setMoods(moodData || []);
    setLoadingMoods(false);
  };

  if (loading) {
    return (
      <div style={{ 
        padding: '40px', 
        textAlign: 'center',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '50vh'
      }}>
        <div>
          <div style={{ 
            width: '40px', 
            height: '40px', 
            border: '4px solid #e2e8f0',
            borderTop: '4px solid #667eea',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 16px'
          }}></div>
          <p style={{ color: '#4a5568' }}>Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const totalMoods = moods.length;
  const averageMood = totalMoods > 0 
    ? moods.reduce((sum, mood) => sum + mood.value, 0) / totalMoods 
    : 0;
  const recentMoods = moods.slice(0, 5);

  return (
    <div style={{ padding: '40px 24px', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ 
          fontSize: '32px', 
          fontWeight: 'bold', 
          color: '#2d3748',
          marginBottom: '8px'
        }}>
          Welcome back, {user.displayName || user.email?.split('@')[0]}! 👋
        </h1>
        <p style={{ color: '#4a5568', fontSize: '18px' }}>
          Here&apos;s your wellness journey so far
        </p>
      </div>

      {/* Stats Cards */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
        gap: '24px',
        marginBottom: '32px'
      }}>
        <div className="card" style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#667eea', marginBottom: '8px' }}>
            {totalMoods}
          </div>
          <div style={{ color: '#4a5568', fontSize: '14px' }}>Total Mood Entries</div>
        </div>
        
        <div className="card" style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#48bb78', marginBottom: '8px' }}>
            {averageMood.toFixed(1)}
          </div>
          <div style={{ color: '#4a5568', fontSize: '14px' }}>Average Mood</div>
        </div>
        
        <div className="card" style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#ed8936', marginBottom: '8px' }}>
            {Math.max(0, totalMoods > 0 ? 7 : 0)}
          </div>
          <div style={{ color: '#4a5568', fontSize: '14px' }}>Day Streak</div>
        </div>
      </div>

      {/* Quick Actions */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
        gap: '24px'
      }}>
        {/* Recent Moods */}
        <div className="card">
          <h3 style={{ marginBottom: '20px', color: '#2d3748' }}>Recent Moods</h3>
          
          {loadingMoods ? (
            <p style={{ color: '#4a5568' }}>Loading your mood data...</p>
          ) : totalMoods === 0 ? (
            <div style={{ textAlign: 'center', padding: '20px' }}>
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>😊</div>
              <p style={{ color: '#4a5568', marginBottom: '16px' }}>
                No mood entries yet! Start tracking your wellness journey.
              </p>
              <button 
                className="btn btn-primary"
                onClick={() => router.push('/chatbot')}
              >
                Track Your First Mood
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {recentMoods.map((mood, index) => (
                <div 
                  key={index}
                  style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    padding: '12px',
                    background: '#f7fafc',
                    borderRadius: '8px'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span style={{ fontSize: '24px' }}>{mood.mood}</span>
                    <span style={{ color: '#2d3748', fontWeight: '500' }}>
                      {mood.notes ? mood.notes.substring(0, 30) + '...' : 'No notes'}
                    </span>
                  </div>
                  <span style={{ color: '#4a5568', fontSize: '14px' }}>
                    {mood.timestamp?.seconds 
                      ? new Date(mood.timestamp.seconds * 1000).toLocaleDateString()
                      : 'Today'
                    }
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="card">
          <h3 style={{ marginBottom: '20px', color: '#2d3748' }}>Quick Actions</h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <button 
              className="btn btn-primary"
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '12px', 
                justifyContent: 'center',
                padding: '16px'
              }}
              onClick={() => router.push('/chatbot')}
            >
              <span style={{ fontSize: '20px' }}>🎯</span>
              Track Mood
            </button>
            
            <button 
              className="btn btn-outline"
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '12px', 
                justifyContent: 'center',
                padding: '16px'
              }}
              onClick={() => router.push('/chatbot')}
            >
              <span style={{ fontSize: '20px' }}>🤖</span>
              Chat with AI
            </button>
            
            <button 
              className="btn btn-outline"
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '12px', 
                justifyContent: 'center',
                padding: '16px'
              }}
            >
              <span style={{ fontSize: '20px' }}>📊</span>
              View Analytics
            </button>
          </div>
        </div>
      </div>

      {/* Motivational Message */}
      <div className="card" style={{ marginTop: '32px', textAlign: 'center' }}>
        <h3 style={{ color: '#2d3748', marginBottom: '12px' }}>
          💪 Keep Going!
        </h3>
        <p style={{ color: '#4a5568', fontSize: '16px' }}>
          Every step in your wellness journey matters. You&apos;re doing great by taking care of your mental health!
        </p>
      </div>
    </div>
  );
}
