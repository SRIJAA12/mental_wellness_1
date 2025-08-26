// src/app/login/page.tsx
'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { auth, googleProvider, facebookProvider } from '@/lib/firebase';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/dashboard');
    } catch (error: any) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = async (provider: string) => {
    setLoading(true);
    try {
      if (provider === "Google") await signInWithPopup(auth, googleProvider);
      else if (provider === "Facebook") await signInWithPopup(auth, facebookProvider);
      router.push('/dashboard');
    } catch (error: any) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5">
          <div className="card shadow-sm p-4">
            <h2 className="text-center mb-4">Login to Mental Wellness</h2>
            <form onSubmit={handleLogin}>
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input 
                  className="form-control" 
                  type="email" 
                  value={email} 
                  onChange={e => setEmail(e.target.value)} 
                  required 
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Password</label>
                <input 
                  className="form-control" 
                  type="password" 
                  value={password} 
                  onChange={e => setPassword(e.target.value)} 
                  required 
                />
              </div>
              <div className="d-flex justify-content-between mb-3">
                <div className="form-check">
                  <input 
                    type="checkbox" 
                    className="form-check-input" 
                    checked={rememberMe} 
                    onChange={e => setRememberMe(e.target.checked)} 
                  />
                  <label className="form-check-label">Remember Me</label>
                </div>
                <a href="#" className="text-decoration-none">Forgot Password?</a>
              </div>
              <button 
                type="submit" 
                className="btn btn-primary w-100 mb-3"
                disabled={loading}
              >
                {loading ? 'Logging in...' : 'Login'}
              </button>
              <div className="text-center mb-3">or login with</div>
              <div className="d-flex justify-content-between">
                <button 
                  type="button" 
                  className="btn btn-outline-danger w-50 me-2" 
                  onClick={() => handleSocialLogin('Google')}
                  disabled={loading}
                >
                  Google
                </button>
                <button 
                  type="button" 
                  className="btn btn-outline-primary w-50 ms-2" 
                  onClick={() => handleSocialLogin('Facebook')}
                  disabled={loading}
                >
                  Facebook
                </button>
              </div>
              <p className="text-center mt-3">
                Don't have an account? <Link href="/signup" className="text-decoration-none">Sign Up</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}