'use client';

import React from 'react';
import Link from 'next/link';

const Footer: React.FC = () => {
  return (
    <footer className="bg-dark text-light py-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-4 mb-4">
            <div className="d-flex align-items-center mb-3">
              <span className="me-2" style={{ fontSize: '1.5rem' }}>🧘</span>
              <span className="h4 fw-bold text-primary mb-0">WellnessAI</span>
            </div>
            <p className="text-muted mb-3">
              Empowering mental wellness through AI-powered insights, 
              wearable integration, and personalized support.
            </p>
            <div className="d-flex gap-2">
              <a href="#" className="btn btn-primary btn-sm rounded-circle">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="btn btn-primary btn-sm rounded-circle">
                <i className="fab fa-facebook"></i>
              </a>
              <a href="#" className="btn btn-primary btn-sm rounded-circle">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="btn btn-primary btn-sm rounded-circle">
                <i className="fab fa-linkedin"></i>
              </a>
            </div>
          </div>

          <div className="col-lg-2 col-md-6 mb-4">
            <h6 className="text-primary mb-3">Product</h6>
            <ul className="list-unstyled">
              <li><Link href="#features" className="text-muted text-decoration-none">Features</Link></li>
              <li><Link href="/pricing" className="text-muted text-decoration-none">Pricing</Link></li>
              <li><Link href="/api" className="text-muted text-decoration-none">API</Link></li>
            </ul>
          </div>

          <div className="col-lg-2 col-md-6 mb-4">
            <h6 className="text-primary mb-3">Resources</h6>
            <ul className="list-unstyled">
              <li><Link href="/docs" className="text-muted text-decoration-none">Documentation</Link></li>
              <li><Link href="/blog" className="text-muted text-decoration-none">Blog</Link></li>
              <li><Link href="/support" className="text-muted text-decoration-none">Support</Link></li>
            </ul>
          </div>

          <div className="col-lg-2 col-md-6 mb-4">
            <h6 className="text-primary mb-3">Company</h6>
            <ul className="list-unstyled">
              <li><Link href="/about" className="text-muted text-decoration-none">About</Link></li>
              <li><Link href="/contact" className="text-muted text-decoration-none">Contact</Link></li>
            </ul>
          </div>

          <div className="col-lg-2 col-md-6 mb-4">
            <h6 className="text-primary mb-3">Legal</h6>
            <ul className="list-unstyled">
              <li><Link href="/privacy" className="text-muted text-decoration-none">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-muted text-decoration-none">Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        <hr className="my-4" />

        <div className="row align-items-center">
          <div className="col-md-8">
            <p className="text-muted mb-0">
              &copy; 2025 WellnessAI. All rights reserved. Built with ❤️ for mental wellness.
            </p>
          </div>
          <div className="col-md-4 text-md-end">
            <div className="d-flex justify-content-md-end align-items-center">
              <span className="text-muted me-2">Made with</span>
              <i className="fas fa-heart text-danger"></i>
              <span className="text-muted ms-2">in India</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
