'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

const HeroSection: React.FC = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const scrollToMoodTracker = () => {
    const element = document.getElementById('mood-tracker');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (!isClient) {
    return (
      <section className="hero-section">
        <div className="container">
          <div className="row align-items-center min-vh-100">
            <div className="col-lg-6">
              <div className="text-center">
                <div className="spinner-border text-light" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="hero-section">
      <div className="container">
        <div className="row align-items-center min-vh-100">
          <div className="col-lg-6 hero-content">
            <div className="mb-4">
              <span className="badge bg-light text-primary px-3 py-2 rounded-pill fs-6">
                <i className="fas fa-sparkles me-2"></i>
                AI-Powered Mental Wellness Platform
              </span>
            </div>
            
            <h1 className="display-4 fw-bold mb-4">
              Your Companion for
              <span className="gradient-text d-block">Mental Wellness</span>
            </h1>
            
            <p className="lead mb-4 opacity-75">
              Track your emotions, discover patterns, and embark on a transformative journey 
              with AI-powered insights, wearable device integration, and personalized micro-interventions.
            </p>
            
            <div className="row mb-5">
              <div className="col-4 text-center">
                <div className="display-6 fw-bold text-warning">10M+</div>
                <div className="small opacity-75">Users Helped</div>
              </div>
              <div className="col-4 text-center">
                <div className="display-6 fw-bold text-success">95%</div>
                <div className="small opacity-75">Report Improvement</div>
              </div>
              <div className="col-4 text-center">
                <div className="display-6 fw-bold text-info">24/7</div>
                <div className="small opacity-75">AI Support</div>
              </div>
            </div>
            
            <div className="d-flex flex-wrap gap-3 mb-4">
              <Link href="/signup" className="btn btn-secondary btn-lg">
                <i className="fas fa-rocket me-2"></i>Start Your Journey
              </Link>
              <button onClick={scrollToMoodTracker} className="btn btn-outline-light btn-lg">
                <i className="fas fa-play-circle me-2"></i>Try Mood Tracker
              </button>
            </div>
            
            <div className="d-flex align-items-center flex-wrap gap-4 opacity-75">
              <small className="d-flex align-items-center">
                <i className="fas fa-shield-alt me-2 text-success"></i>HIPAA Compliant
              </small>
              <small className="d-flex align-items-center">
                <i className="fas fa-lock me-2 text-info"></i>End-to-End Encrypted
              </small>
              <small className="d-flex align-items-center">
                <i className="fas fa-mobile-alt me-2 text-warning"></i>PWA Ready
              </small>
            </div>
          </div>
          
          <div className="col-lg-6">
            <div className="position-relative" style={{ height: '600px' }}>
              <div className="position-absolute floating-card" style={{ top: '10%', left: '10%' }}>
                <div className="card shadow-lg" style={{ width: '280px' }}>
                  <div className="card-body p-4">
                    <h6 className="card-title text-primary mb-3">
                      <i className="fas fa-heart me-2"></i>Daily Check-in
                    </h6>
                    <div className="d-flex justify-content-around mb-3">
                      <span className="mood-emoji selected">😊</span>
                      <span className="mood-emoji">🙂</span>
                      <span className="mood-emoji">😐</span>
                      <span className="mood-emoji">😔</span>
                    </div>
                    <div className="progress mb-2" style={{ height: '6px' }}>
                      <div className="progress-bar bg-success" style={{ width: '75%' }}></div>
                    </div>
                    <small className="text-muted">Weekly Average: Good</small>
                  </div>
                </div>
              </div>
              
              <div className="position-absolute floating-card" style={{ top: '45%', right: '10%' }}>
                <div className="card shadow-lg" style={{ width: '300px' }}>
                  <div className="card-body p-4">
                    <div className="d-flex align-items-start mb-2">
                      <div className="rounded-circle bg-primary bg-opacity-10 p-2 me-3 flex-shrink-0">
                        <i className="fas fa-brain text-primary"></i>
                      </div>
                      <div>
                        <h6 className="card-title mb-1 text-primary">AI Insight</h6>
                        <p className="card-text small text-muted mb-0">
                          Your mood improves 23% after morning exercise sessions
                        </p>
                      </div>
                    </div>
                    <div className="d-flex justify-content-between align-items-center mt-3">
                      <span className="badge bg-success">Verified Pattern</span>
                      <small className="text-muted">
                        <i className="fas fa-clock me-1"></i>2 min ago
                      </small>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="position-absolute floating-card" style={{ bottom: '15%', left: '25%' }}>
                <div className="card shadow-lg" style={{ width: '250px' }}>
                  <div className="card-body p-4">
                    <h6 className="card-title text-primary mb-3">
                      <i className="fas fa-heartbeat me-2"></i>Live Data
                    </h6>
                    <div className="row text-center mb-3">
                      <div className="col-6">
                        <div className="h4 text-danger mb-1">72</div>
                        <div className="small text-muted">BPM</div>
                      </div>
                      <div className="col-6">
                        <div className="h4 text-success mb-1">8.5K</div>
                        <div className="small text-muted">Steps</div>
                      </div>
                    </div>
                    <div className="d-flex align-items-end justify-content-center gap-1" style={{ height: '40px' }}>
                      <div className="bg-primary rounded" style={{ height: '15px', width: '6px' }}></div>
                      <div className="bg-primary rounded" style={{ height: '25px', width: '6px' }}></div>
                      <div className="bg-primary rounded" style={{ height: '10px', width: '6px' }}></div>
                      <div className="bg-primary rounded" style={{ height: '35px', width: '6px' }}></div>
                      <div className="bg-primary rounded" style={{ height: '20px', width: '6px' }}></div>
                      <div className="bg-success rounded" style={{ height: '40px', width: '6px' }}></div>
                    </div>
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

export default HeroSection;
