'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, signOutUser } from '../lib/firebase';

const Navbar: React.FC = () => {
  const [user, loading] = useAuthState(auth);
  const [isScrolled, setIsScrolled] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = async () => {
    try {
      await signOutUser();
      router.push('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <nav className={`navbar navbar-expand-lg navbar-light bg-white fixed-top ${isScrolled ? 'shadow' : ''}`}>
      <div className="container">
        <Link className="navbar-brand d-flex align-items-center" href="/">
          <span className="me-2" style={{ fontSize: '1.5rem' }}>🧘</span>
          <span className="fw-bold text-primary">WellnessAI</span>
        </Link>

        <button
          className="navbar-toggler border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mx-auto">
            <li className="nav-item">
              <Link className="nav-link fw-semibold" href="/">
                <i className="fas fa-home me-1"></i>Home
              </Link>
            </li>
            <li className="nav-item">
              <a className="nav-link fw-semibold" href="#mood-tracker">
                <i className="fas fa-heart me-1"></i>Mood Tracker
              </a>
            </li>
            <li className="nav-item">
              <Link className="nav-link fw-semibold" href="/chatbot">
                <i className="fas fa-robot me-1"></i>AI Chatbot
              </Link>
            </li>
            <li className="nav-item">
              <a className="nav-link fw-semibold" href="#features">
                <i className="fas fa-chart-line me-1"></i>Insights
              </a>
            </li>
            {user && (
              <li className="nav-item">
                <Link className="nav-link fw-semibold" href="/dashboard">
                  <i className="fas fa-tachometer-alt me-1"></i>Dashboard
                </Link>
              </li>
            )}
          </ul>

          <div className="d-flex align-items-center">
            {loading ? (
              <div className="spinner-border spinner-border-sm text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            ) : user ? (
              <div className="dropdown">
                <button
                  className="btn btn-outline-primary dropdown-toggle"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <i className="fas fa-user me-2"></i>
                  {user.email?.split('@')[0] || 'User'}
                </button>
                <ul className="dropdown-menu dropdown-menu-end shadow">
                  <li><Link className="dropdown-item" href="/dashboard">
                    <i className="fas fa-tachometer-alt me-2"></i>Dashboard
                  </Link></li>
                  <li><Link className="dropdown-item" href="/profile">
                    <i className="fas fa-user-circle me-2"></i>Profile
                  </Link></li>
                  <li><hr className="dropdown-divider" /></li>
                  <li><button className="dropdown-item text-danger" onClick={handleLogout}>
                    <i className="fas fa-sign-out-alt me-2"></i>Logout
                  </button></li>
                </ul>
              </div>
            ) : (
              <>
                <Link className="btn btn-outline-primary me-2" href="/login">
                  <i className="fas fa-sign-in-alt me-1"></i>Login
                </Link>
                <Link className="btn btn-primary" href="/signup">
                  <i className="fas fa-user-plus me-1"></i>Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
