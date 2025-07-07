import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Send, Bot, User, Clock, Trash, RotateCcw } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

const Chat: React.FC = () => {
  const { userProfile } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Demo AI responses
  const demoResponses = [
    "In machine learning, a neural network is a computational model inspired by the structure of the human brain. It consists of interconnected nodes (neurons) organized in layers that process and transform input data to produce an output.",
    "Linear regression is a supervised learning algorithm used to predict continuous values. It works by finding the best-fitting straight line through a set of data points, minimizing the sum of squared differences between predicted and actual values.",
    "K-means clustering is an unsupervised learning algorithm that groups similar data points together. It works by iteratively assigning points to the nearest cluster center and then recalculating those centers until convergence.",
    "A convolutional neural network (CNN) is a specialized neural network architecture designed primarily for image recognition tasks. Its key components include convolutional layers that apply filters to input data, pooling layers that reduce dimensionality, and fully connected layers for final classification.",
    "I'm currently in offline mode, but I'd be happy to help you understand AI concepts based on my pre-loaded knowledge. Feel free to ask about machine learning algorithms, neural networks, or data preprocessing techniques."
  ];

  useEffect(() => {
    // Add initial welcome message
    if (messages.length === 0) {
      setMessages([
        {
          id: 'welcome',
          text: `Hi ${userProfile?.displayName || 'there'}! I'm your AI learning assistant. How can I help you with your AI/ML studies today?`,
          sender: 'ai',
          timestamp: new Date()
        }
      ]);
    }

    // Add online/offline event listeners
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [userProfile]);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!inputValue.trim()) return;
    
    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setLoading(true);
    setError(null);
    
    try {
      // Check if we're online first
      if (isOnline) {
        try {
          // Try to use the real backend API
          const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3001'}/api/chat`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              message: inputValue,
              userId: userProfile?.uid || 'anonymous'
            }),
            signal: AbortSignal.timeout(5000) // 5 second timeout
          });
          
          if (response.ok) {
            const data = await response.json();
            
            const aiMessage: Message = {
              id: Date.now().toString(),
              text: data.response,
              sender: 'ai',
              timestamp: new Date()
            };
            
            setMessages(prev => [...prev, aiMessage]);
            return;
          }
        } catch (err) {
          console.warn('Could not connect to AI service, using demo responses');
        }
      }
      
      // Fallback to demo responses if offline or API failed
      // Simulate thinking time
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Select a demo response or use a default offline response
      const randomIndex = Math.floor(Math.random() * demoResponses.length);
      const responseText = isOnline 
        ? demoResponses[randomIndex] 
        : "I'm currently in offline mode. I'll be able to answer your questions when you're back online.";
      
      const aiMessage: Message = {
        id: Date.now().toString(),
        text: responseText,
        sender: 'ai',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiMessage]);
      
    } catch (err) {
      console.error('Error sending message:', err);
      setError('Failed to send message. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const clearConversation = () => {
    setMessages([
      {
        id: 'welcome',
        text: `Hi ${userProfile?.displayName || 'there'}! I'm your AI learning assistant. How can I help you with your AI/ML studies today?`,
        sender: 'ai',
        timestamp: new Date()
      }
    ]);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
            <Bot className="mr-2 h-6 w-6" /> AI Learning Assistant
          </h1>
          
          <div className="flex items-center space-x-2">
            {isOnline ? (
              <span className="text-sm text-green-600 dark:text-green-400 flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-1"></span> Online
              </span>
            ) : (
              <span className="text-sm text-amber-600 dark:text-amber-400 flex items-center">
                <span className="w-2 h-2 bg-amber-500 rounded-full mr-1"></span> Offline Mode
              </span>
            )}
            
            <button 
              onClick={clearConversation}
              className="p-2 text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400 transition-colors"
              title="Clear conversation"
            >
              <Trash className="h-5 w-5" />
            </button>
          </div>
        </div>
        
        {/* Chat container */}
        <div className="bg-white dark:bg-gray-800 rounded-t-xl shadow-sm border border-gray-200 dark:border-gray-700 h-[calc(100vh-300px)] overflow-y-auto p-4">
          <div className="space-y-4">
            {messages.map(message => (
              <div 
                key={message.id} 
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                    message.sender === 'user' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                  }`}
                >
                  <div className="flex items-center mb-1">
                    {message.sender === 'user' ? (
                      <User className="h-4 w-4 mr-1" />
                    ) : (
                      <Bot className="h-4 w-4 mr-1" />
                    )}
                    <span className="text-xs opacity-70">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <p className="whitespace-pre-wrap">{message.text}</p>
                </div>
              </div>
            ))}
            
            {loading && (
              <div className="flex justify-start">
                <div className="max-w-[80%] rounded-2xl px-4 py-3 bg-gray-100 dark:bg-gray-700">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-gray-400 dark:bg-gray-300 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 dark:bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 dark:bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
        </div>
        
        {/* Input form */}
        <div className="bg-white dark:bg-gray-800 rounded-b-xl shadow-sm border-t-0 border border-gray-200 dark:border-gray-700 p-4">
          <form onSubmit={handleSendMessage} className="flex space-x-2">
            <input
              type="text"
              value={inputValue}
              onChange={e => setInputValue(e.target.value)}
              placeholder="Ask anything about AI, ML, or algorithms..."
              className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              disabled={loading}
            />
            <button
              type="submit"
              disabled={loading || !inputValue.trim()}
              className={`px-4 py-2 rounded-lg bg-blue-600 text-white flex items-center ${
                loading || !inputValue.trim() ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'
              }`}
            >
              {loading ? <Clock className="h-5 w-5" /> : <Send className="h-5 w-5" />}
            </button>
          </form>
          
          {error && (
            <div className="mt-2 text-red-500 dark:text-red-400 text-sm">
              {error}
              <button 
                onClick={() => handleSendMessage(new Event('submit') as unknown as React.FormEvent)}
                className="ml-2 text-blue-500 dark:text-blue-400 hover:underline"
              >
                Retry
              </button>
            </div>
          )}
          
          <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
            {isOnline 
              ? "This AI assistant can help with algorithms and concepts. Type your question above." 
              : "You're currently offline. Some features may be limited."}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Chat;
