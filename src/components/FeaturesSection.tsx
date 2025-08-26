'use client';

import React from 'react';

const FeaturesSection: React.FC = () => {
  const features = [
    {
      icon: 'fas fa-chart-line',
      title: 'Mood Tracking',
      description: 'Track your daily emotions with intuitive emoji-based logging and see patterns emerge over time.',
      color: 'primary'
    },
    {
      icon: 'fas fa-robot',
      title: 'AI Companion',
      description: 'Get personalized insights and emotional support from your intelligent wellness companion.',
      color: 'success'
    },
    {
      icon: 'fas fa-watch',
      title: 'Wearable Integration',
      description: 'Connect fitness devices for comprehensive health monitoring including heart rate and stress levels.',
      color: 'warning'
    },
    {
      icon: 'fas fa-brain',
      title: 'Smart Insights',
      description: 'AI-powered analytics reveal patterns between activities, mood, and overall mental wellness.',
      color: 'info'
    },
    {
      icon: 'fas fa-shield-alt',
      title: 'Privacy First',
      description: 'Your data is encrypted and stored securely with optional offline-first functionality.',
      color: 'secondary'
    },
    {
      icon: 'fas fa-mobile-alt',
      title: 'PWA Ready',
      description: 'Install as an app on any device. Works offline and syncs automatically when connected.',
      color: 'danger'
    }
  ];

  return (
    <section id="features" className="py-5">
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="display-5 fw-bold mb-4">Everything you need for mental wellness</h2>
          <p className="lead text-muted">
            Comprehensive tools powered by AI and modern technology
          </p>
        </div>

        <div className="row g-4">
          {features.map((feature, index) => (
            <div key={index} className="col-lg-4 col-md-6">
              <div className="card h-100 border-0 shadow">
                <div className="card-body p-4 text-center">
                  <div className={`rounded-circle bg-${feature.color} bg-opacity-10 mx-auto mb-3 d-flex align-items-center justify-content-center`} style={{ width: '80px', height: '80px' }}>
                    <i className={`${feature.icon} fs-2 text-${feature.color}`}></i>
                  </div>
                  <h5 className="card-title fw-bold mb-3">{feature.title}</h5>
                  <p className="card-text text-muted">{feature.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-5">
          <a href="/signup" className="btn btn-primary btn-lg">
            <i className="fas fa-rocket me-2"></i>Start Your Wellness Journey
          </a>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
