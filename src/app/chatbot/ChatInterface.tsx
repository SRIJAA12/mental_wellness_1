'use client';

import { useState, useEffect, useRef } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, saveMood } from '../../lib/firebase';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  mood?: string;
}

interface WellnessResponse {
  text: string;
  mood?: string;
  suggestions?: string[];
}

export default function ChatInterface() {
  const [user] = useAuthState(auth);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi! I'm your wellness companion. I'm here to listen and support you. How are you feeling today? 😊",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const generateWellnessResponse = (userInput: string): WellnessResponse => {
    const input = userInput.toLowerCase();
    
    // Mood detection and responses
    if (input.includes('sad') || input.includes('depressed') || input.includes('down') || input.includes('upset')) {
      return {
        text: "I hear that you're feeling sad, and I want you to know that it's completely okay to feel this way. These emotions are valid and temporary. Would you like to try a quick breathing exercise, or would you prefer to talk about what's making you feel down? 🫂",
        mood: '😔',
        suggestions: ['Try breathing exercise', 'Talk about it', 'Listen to calming music']
      };
    }
    
    if (input.includes('happy') || input.includes('great') || input.includes('wonderful') || input.includes('amazing')) {
      return {
        text: "That's fantastic! I love hearing that you're feeling happy. Happiness is such a beautiful emotion. What specifically made you feel this way today? I'd love to celebrate this moment with you! 🎉",
        mood: '😊',
        suggestions: ['Share more details', 'Set a positive goal', 'Practice gratitude']
      };
    }
    
    if (input.includes('anxious') || input.includes('worried') || input.includes('stress') || input.includes('nervous')) {
      return {
        text: "I understand you're feeling anxious. Anxiety can be overwhelming, but you're not alone. Let's work through this together. Try the 4-7-8 breathing technique: breathe in for 4, hold for 7, exhale for 8. Would you like me to guide you through more calming strategies? 🧘‍♀️",
        mood: '😰',
        suggestions: ['Breathing exercise', 'Mindfulness tips', 'Progressive muscle relaxation']
      };
    }
    
    if (input.includes('angry') || input.includes('frustrated') || input.includes('mad')) {
      return {
        text: "I can sense your frustration, and that's completely understandable. Anger often signals that something important to you isn't being honored. Take a deep breath with me. What's triggering these feelings? Let's work through this step by step. 💪",
        mood: '😠',
        suggestions: ['Count to 10', 'Physical exercise', 'Write it down']
      };
    }
    
    if (input.includes('tired') || input.includes('exhausted') || input.includes('sleep')) {
      return {
        text: "Feeling tired can really affect our mood and wellbeing. Good rest is essential for mental health. Are you getting enough sleep? I can share some tips for better sleep hygiene or relaxation techniques. Your wellbeing matters! 😴",
        suggestions: ['Sleep hygiene tips', 'Relaxation techniques', 'Energy-boosting activities']
      };
    }
    
    if (input.includes('meditation') || input.includes('mindful')) {
      return {
        text: "Mindfulness and meditation are wonderful tools for mental wellness! Even just 5 minutes of daily practice can make a significant difference. Would you like me to guide you through a quick mindfulness exercise? 🧘",
        suggestions: ['5-minute meditation', 'Mindful breathing', 'Body scan exercise']
      };
    }
    
    if (input.includes('goal') || input.includes('improve') || input.includes('better')) {
      return {
        text: "I love that you're thinking about improvement and setting goals! Small, consistent steps lead to big changes in mental wellness. What specific area would you like to focus on? Remember, progress isn't always linear, and that's perfectly normal. 🎯",
        suggestions: ['Set daily mood goal', 'Create wellness routine', 'Track progress']
      };
    }
    
    // Default supportive responses
    const supportiveResponses = [
      "Thank you for sharing that with me. Your feelings are valid and important. What would be most helpful for you right now? 🌟",
      "I appreciate you opening up. It takes courage to talk about our feelings. How can I best support you today? ✨",
      "I'm here to listen without judgment. What's on your mind, and how are you taking care of yourself today? 💙",
      "Your mental health journey is unique and valuable. What would help you feel more centered right now? 🌈"
    ];
    
    return {
      text: supportiveResponses[Math.floor(Math.random() * supportiveResponses.length)],
      suggestions: ['Tell me more', 'Ask for advice', 'Practice gratitude']
    };
  };

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input.trim(),
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    const currentInput = input.trim();
    setInput('');
    setLoading(true);
    setIsTyping(true);

    // Simulate typing delay for more natural feel
    setTimeout(async () => {
      const response = generateWellnessResponse(currentInput);
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response.text,
        sender: 'bot',
        timestamp: new Date(),
        mood: response.mood
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
      setLoading(false);

      // Save mood if detected and user is authenticated
      if (response.mood && user) {
        const moodValue = getMoodValue(response.mood);
        if (moodValue > 0) {
          await saveMood(user.uid, response.mood, moodValue, currentInput);
        }
      }
    }, 1500);
  };

  const getMoodValue = (mood: string): number => {
    switch (mood) {
      case '😊': return 4; // Happy
      case '🙂': return 3; // Good
      case '😐': return 2; // Neutral
      case '😔': return 1; // Sad
      case '😰': return 1; // Anxious
      case '😠': return 1; // Angry
      default: return 0;
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  if (!user) {
    return (
      <div style={{ 
        padding: '40px', 
        textAlign: 'center',
        maxWidth: '400px',
        margin: '0 auto'
      }}>
        <div className="card">
          <h3 style={{ marginBottom: '16px' }}>🤖 Wellness Chatbot</h3>
          <p style={{ color: '#4a5568', marginBottom: '20px' }}>
            Please sign in to start chatting with your wellness companion.
          </p>
          <a href="/login" className="btn btn-primary">
            Sign In to Chat
          </a>
        </div>
      </div>
    );
  }

  return (
    <div style={{ 
      maxWidth: '800px', 
      margin: '0 auto', 
      padding: '24px',
      height: 'calc(100vh - 120px)',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <div className="card" style={{ 
        flex: 1, 
        display: 'flex', 
        flexDirection: 'column',
        padding: '20px'
      }}>
        {/* Header */}
        <div style={{ 
          borderBottom: '1px solid #e2e8f0',
          paddingBottom: '16px',
          marginBottom: '20px'
        }}>
          <h2 style={{ 
            margin: 0, 
            color: '#2d3748',
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            🤖 Wellness Companion
            <span style={{ 
              fontSize: '12px', 
              color: '#48bb78',
              background: '#f0fff4',
              padding: '4px 8px',
              borderRadius: '12px',
              fontWeight: 'normal'
            }}>
              Online
            </span>
          </h2>
          <p style={{ 
            margin: '8px 0 0 0', 
            color: '#4a5568', 
            fontSize: '14px' 
          }}>
            Your personal mental health support companion
          </p>
        </div>

        {/* Messages Container */}
        <div style={{ 
          flex: 1, 
          overflowY: 'auto',
          marginBottom: '20px',
          padding: '0 4px'
        }}>
          {messages.map((message) => (
            <div 
              key={message.id}
              style={{ 
                marginBottom: '16px',
                display: 'flex',
                justifyContent: message.sender === 'user' ? 'flex-end' : 'flex-start'
              }}
            >
              <div style={{ 
                maxWidth: '70%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: message.sender === 'user' ? 'flex-end' : 'flex-start'
              }}>
                <div style={{
                  padding: '12px 16px',
                  borderRadius: '18px',
                  background: message.sender === 'user' ? '#667eea' : '#f7fafc',
                  color: message.sender === 'user' ? 'white' : '#2d3748',
                  fontSize: '15px',
                  lineHeight: '1.4',
                  boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)'
                }}>
                  {message.mood && (
                    <span style={{ fontSize: '20px', marginRight: '8px' }}>
                      {message.mood}
                    </span>
                  )}
                  {message.text}
                </div>
                <span style={{ 
                  fontSize: '12px', 
                  color: '#a0aec0',
                  marginTop: '4px',
                  marginLeft: message.sender === 'user' ? '0' : '16px',
                  marginRight: message.sender === 'user' ? '16px' : '0'
                }}>
                  {message.timestamp.toLocaleTimeString([], { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </span>
              </div>
            </div>
          ))}
          
          {/* Typing Indicator */}
          {isTyping && (
            <div style={{ 
              marginBottom: '16px',
              display: 'flex',
              justifyContent: 'flex-start'
            }}>
              <div style={{
                padding: '12px 16px',
                borderRadius: '18px',
                background: '#f7fafc',
                color: '#4a5568',
                fontSize: '14px'
              }}>
                <span>🤖 Wellness Companion is typing</span>
                <span className="typing-dots">...</span>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div style={{ 
          borderTop: '1px solid #e2e8f0',
          paddingTop: '16px'
        }}>
          <div style={{ 
            display: 'flex', 
            gap: '12px',
            alignItems: 'flex-end'
          }}>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Share how you're feeling today..."
              disabled={loading}
              rows={2}
              style={{
                flex: 1,
                padding: '12px 16px',
                border: '2px solid #e2e8f0',
                borderRadius: '12px',
                fontSize: '15px',
                resize: 'none',
                outline: 'none',
                transition: 'border-color 0.2s',
                fontFamily: 'inherit'
              }}
              onFocus={(e) => e.target.style.borderColor = '#667eea'}
              onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
            />
            <button
              onClick={sendMessage}
              disabled={!input.trim() || loading}
              style={{
                padding: '12px 20px',
                background: input.trim() && !loading ? '#667eea' : '#e2e8f0',
                color: input.trim() && !loading ? 'white' : '#a0aec0',
                border: 'none',
                borderRadius: '12px',
                cursor: input.trim() && !loading ? 'pointer' : 'not-allowed',
                fontSize: '14px',
                fontWeight: '500',
                transition: 'all 0.2s'
              }}
            >
              {loading ? '...' : 'Send'}
            </button>
          </div>
          
          <div style={{ 
            marginTop: '8px',
            fontSize: '12px',
            color: '#a0aec0',
            textAlign: 'center'
          }}>
            Press Enter to send • Shift+Enter for new line
          </div>
        </div>
      </div>
    </div>
  );
}
