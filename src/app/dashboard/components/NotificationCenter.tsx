'use client';

import React from 'react';

const NotificationCenter: React.FC = () => {
  const notifications = [
    {
      id: 1,
      message: "Great job tracking your mood for 7 days straight!",
      type: "success",
      time: "2 hours ago"
    },
    {
      id: 2,
      message: "Don't forget your evening reflection",
      type: "reminder",
      time: "4 hours ago"
    }
  ];

  return (
    <div className="card border-0 shadow">
      <div className="card-header">
        <h6 className="mb-0 fw-bold">
          <i className="fas fa-bell text-primary me-2"></i>
          Notifications
        </h6>
      </div>
      <div className="card-body">
        {notifications.length > 0 ? (
          <div className="space-y-2">
            {notifications.map((notification) => (
              <div key={notification.id} className="alert alert-light d-flex align-items-start py-2">
                <div className="flex-grow-1">
                  <div className="small mb-1">{notification.message}</div>
                  <small className="text-muted">{notification.time}</small>
                </div>
                <button className="btn btn-sm btn-outline-secondary ms-2">
                  <i className="fas fa-times"></i>
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-4">
            <p className="text-muted">No new notifications</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationCenter;
