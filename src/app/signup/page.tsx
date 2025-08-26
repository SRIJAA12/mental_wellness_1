// src/app/signup/page.tsx
'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { auth, googleProvider, facebookProvider } from '@/lib/firebase';
import { createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth';

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      router.push('/dashboard');
    } catch (error: any) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSocialSignup = async (provider: string) => {
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
            <h2 className="text-center mb-4">Sign Up for Mental Wellness</h2>
            <form onSubmit={handleSignup}>
              <div className="mb-3">
                <label className="form-label">Full Name</label>
                <input 
                  className="form-control" 
                  type="text" 
                  value={fullName} 
                  onChange={e => setFullName(e.target.value)} 
                  required 
                />
              </div>
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
                  minLength={6}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Confirm Password</label>
                <input 
                  className="form-control" 
                  type="password" 
                  value={confirmPassword} 
                  onChange={e => setConfirmPassword(e.target.value)} 
                  required 
                  minLength={6}
                />
              </div>
              <button 
                type="submit" 
                className="btn btn-primary w-100 mb-3"
                disabled={loading}
              >
                {loading ? 'Creating Account...' : 'Sign Up'}
              </button>
              <div className="text-center mb-3">or sign up with</div>
              <div className="d-flex justify-content-between">
                <button 
                  type="button" 
                  className="btn btn-outline-danger w-50 me-2" 
                  onClick={() => handleSocialSignup('Google')}
                  disabled={loading}
                >
                  Google
                </button>
                <button 
                  type="button" 
                  className="btn btn-outline-primary w-50 ms-2" 
                  onClick={() => handleSocialSignup('Facebook')}
                  disabled={loading}
                >
                  Facebook
                </button>
              </div>
              <p className="text-center mt-3">
                Already have an account? <Link href="/login" className="text-decoration-none">Login</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}