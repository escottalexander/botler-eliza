'use client';
import { useState, useRef, useEffect } from "react";

interface Message {
  text: string;
  sender: 'user' | 'agent';
}

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const hasVisited = sessionStorage.getItem('hasVisitedBefore');
    const initialMessage = hasVisited
      ? "Welcome back! How can I help you explore the Ethereum ecosystem today?"
      : "I am Botler, here to help you learn about and interact with the Ethereum ecosystem. What do you want to explore?";
    
    setMessages([{ text: initialMessage, sender: 'agent' }]);
    sessionStorage.setItem('hasVisitedBefore', 'true');
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    // Add user message to chat
    const userMessage: Message = { text: inputText, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setInputText('');

    try {
      const response = await fetch(`http://localhost:3000/Botler/message`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: inputText,
          userId: 'user',
          userName: 'User',
        }),
      });

      const data = await response.json();
      // Add agent messages to chat
      data.forEach((message: { text: string }) => {
        setMessages(prev => [...prev, { text: message.text, sender: 'agent' }]);
      });
    } catch (error) {
      console.error('Error fetching response:', error);
      setMessages(prev => [...prev, { 
        text: 'Sorry, there was an error connecting to the agent.', 
        sender: 'agent' 
      }]);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100 dark:bg-gray-900">
      {/* Chat messages area */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="max-w-3xl mx-auto space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${
                message.sender === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`max-w-sm rounded-lg px-4 py-2 ${
                  message.sender === 'user'
                    ? 'bg-blue-500 text-white'
                    : 'bg-white dark:bg-gray-800 dark:text-white'
                }`}
              >
                {message.text}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input form */}
      <div className="border-t dark:border-gray-800 p-4">
        <form onSubmit={handleSubmit} className="max-w-3xl mx-auto flex gap-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="flex-1 rounded-lg border dark:border-gray-700 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
            placeholder="Type your message..."
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
