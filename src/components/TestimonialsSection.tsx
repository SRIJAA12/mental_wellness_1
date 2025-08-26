'use client';

import React from 'react';

const TestimonialsSection: React.FC = () => {
  const testimonials = [
    {
      icon: 'fas fa-lock',
      title: 'Privacy & Security',
      description: 'Your mental health data is encrypted end-to-end and never shared without your explicit consent.',
      highlight: 'HIPAA Compliant',
      color: 'success'
    },
    {
      icon: 'fas fa-brain',
      title: 'AI-Powered Support',
      description: 'Our advanced AI provides personalized insights while maintaining the human touch you need.',
      highlight: '24/7 Available',
      color: 'primary'
    },
    {
      icon: 'fas fa-universal-access',
      title: 'Accessible Design',
      description: 'Built with accessibility in mind, supporting screen readers and keyboard navigation.',
      highlight: 'WCAG 2.1 AA',
      color: 'info'
    }
  ];

  return (
    <section id="about" className="py-5 bg-light">
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="display-5 fw-bold mb-4">Trusted by millions worldwide</h2>
          <p className="lead text-muted">
            Built with privacy, accessibility, and your wellbeing at heart
          </p>
        </div>

        <div className="row g-4 mb-5">
          {testimonials.map((item, index) => (
            <div key={index} className="col-lg-4">
              <div className="card h-100 border-0 shadow">
                <div className="card-body p-4 text-center">
                  <div className={`rounded-circle bg-${item.color} bg-opacity-10 mx-auto mb-3 d-flex align-items-center justify-content-center`} style={{ width: '80px', height: '80px' }}>
                    <i className={`${item.icon} fs-2 text-${item.color}`}></i>
                  </div>
                  <h5 className="card-title fw-bold mb-3">{item.title}</h5>
                  <p className="card-text text-muted mb-3">{item.description}</p>
                  <span className={`badge bg-${item.color} fs-6 px-3 py-2`}>{item.highlight}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="row">
          <div className="col-12">
            <div className="card border-0 shadow">
              <div className="card-body p-5 text-center">
                <h4 className="card-title fw-bold mb-4">Join thousands on their wellness journey</h4>
                <div className="row">
                  <div className="col-md-3 col-6 mb-3">
                    <div className="display-4 fw-bold text-primary">10M+</div>
                    <div className="text-muted">Users Helped</div>
                  </div>
                  <div className="col-md-3 col-6 mb-3">
                    <div className="display-4 fw-bold text-success">95%</div>
                    <div className="text-muted">Report Improvement</div>
                  </div>
                  <div className="col-md-3 col-6 mb-3">
                    <div className="display-4 fw-bold text-info">150+</div>
                    <div className="text-muted">Countries</div>
                  </div>
                  <div className="col-md-3 col-6 mb-3">
                    <div className="display-4 fw-bold text-warning">4.9/5</div>
                    <div className="text-muted">User Rating</div>
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

export default TestimonialsSection;
