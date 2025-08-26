'use client';

import React from 'react';
import Navbar from '../../components/Navbar';
import ChatInterface from "../chatbot/ChatInterface"

export default function ChatbotPage() {
  return (
    <>
      <Navbar />
      <div className="container-fluid bg-light min-vh-100" style={{ paddingTop: '80px' }}>
        <div className="container py-4">
          <div className="row justify-content-center">
            <div className="col-lg-10 col-xl-8">
              <div className="text-center mb-4">
                <div className="display-4 mb-3">🤖</div>
                <h1 className="mb-3">AI Wellness Companion</h1>
                <p className="lead text-muted">
                  Your personal AI companion for mental wellness support, guidance, and emotional check-ins.
                </p>
              </div>
              
              <ChatInterface />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
