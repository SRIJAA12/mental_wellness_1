'use client';

import React from 'react';

const ActivityTracker: React.FC = () => {
  const activities = [
    { name: 'Exercise', completed: true, icon: '🏃‍♂️' },
    { name: 'Meditation', completed: false, icon: '🧘‍♀️' },
    { name: 'Water Intake', completed: true, icon: '💧' },
    { name: 'Sleep 8h', completed: false, icon: '😴' }
  ];

  return (
    <div className="card border-0 shadow">
      <div className="card-header">
        <h6 className="mb-0 fw-bold">
          <i className="fas fa-chart-bar text-info me-2"></i>
          Daily Activities
        </h6>
      </div>
      <div className="card-body">
        <div className="row g-3">
          {activities.map((activity, index) => (
            <div key={index} className="col-6">
              <div className={`p-3 rounded-3 text-center ${activity.completed ? 'bg-success bg-opacity-10' : 'bg-light'}`}>
                <div className="h3 mb-2">{activity.icon}</div>
                <div className="small fw-semibold">{activity.name}</div>
                {activity.completed ? (
                  <i className="fas fa-check-circle text-success mt-2"></i>
                ) : (
                  <i className="fas fa-circle text-muted mt-2"></i>
                )}
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-3">
          <small className="text-muted">2/4 activities completed today</small>
        </div>
      </div>
    </div>
  );
};

export default ActivityTracker;
