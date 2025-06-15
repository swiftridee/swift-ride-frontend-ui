
import { useState, useRef, useEffect } from "react";
import { toast } from "@/components/ui/sonner";

interface Message {
  id: string;
  sender: 'user' | 'system';
  text: string;
  timestamp: string;
}

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'system',
      text: 'Hello! Welcome to Swift Ride. How can I assist you today?',
      timestamp: new Date().toISOString()
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const toggleChat = () => setIsOpen(prev => !prev);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: input,
      timestamp: new Date().toISOString()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);
    
    // Simulate bot typing
    setTimeout(() => {
      // Add bot response
      let response = "Thanks for your message! Our customer service team will get back to you soon.";
      
      // Simple pattern matching for common queries
      const lowerCaseInput = input.toLowerCase();
      
      if (lowerCaseInput.includes('booking') || lowerCaseInput.includes('reserve')) {
        response = "To make a booking, please go to our vehicle pages and select the vehicle you want to rent. Then click 'Book Now' to start the booking process.";
      } else if (lowerCaseInput.includes('price') || lowerCaseInput.includes('cost') || lowerCaseInput.includes('rate')) {
        response = "Our prices vary depending on the vehicle type and rental duration. You can find detailed pricing information on each vehicle's page.";
      } else if (lowerCaseInput.includes('cancel') || lowerCaseInput.includes('refund')) {
        response = "Cancellations made 48 hours before the scheduled pickup time will receive a full refund. Cancellations within 48 hours may be subject to a cancellation fee.";
      } else if (lowerCaseInput.includes('contact') || lowerCaseInput.includes('phone') || lowerCaseInput.includes('email')) {
        response = "You can contact us at contactswiftride@gmail.com or call +92 (21) 1234-5678. Our office hours are Monday to Saturday 9:00 AM - 10:00 PM and Sunday 10:00 AM - 8:00 PM.";
      }
      
      const botMessage: Message = {
        id: Date.now().toString(),
        sender: 'system',
        text: response,
        timestamp: new Date().toISOString()
      };
      
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
      
      // If user asked about booking success
      if (lowerCaseInput.includes('booked') || lowerCaseInput.includes('successful')) {
        toast.success("Your booking has been confirmed!");
      }
    }, 1000);
  };
  
  const clearConversation = () => {
    setMessages([
      {
        id: '1',
        sender: 'system',
        text: 'Hello! Welcome to Swift Ride. How can I assist you today?',
        timestamp: new Date().toISOString()
      }
    ]);
  };
  
  // Auto scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  if (!isOpen) {
    return (
      <button
        onClick={toggleChat}
        className="fixed bottom-6 right-6 bg-primary text-white p-3 rounded-full shadow-lg hover:bg-primary-dark transition-colors z-50"
        aria-label="Open chat"
      >
        <i className="fas fa-comments text-2xl"></i>
      </button>
    );
  }
  
  return (
    <div className="fixed bottom-6 right-6 w-80 sm:w-96 bg-white rounded-lg shadow-xl z-50 flex flex-col overflow-hidden max-h-[80vh]">
      {/* Chat Header */}
      <div className="bg-primary text-white p-4 flex justify-between items-center">
        <h3 className="font-semibold">Swift Ride Support</h3>
        <button 
          onClick={toggleChat}
          className="text-white hover:text-gray-200 transition-colors"
          aria-label="Close chat"
        >
          <i className="fas fa-times"></i>
        </button>
      </div>
      
      {/* Chat Messages */}
      <div className="flex-1 p-4 overflow-y-auto max-h-[400px]">
        {messages.map((message) => (
          <div 
            key={message.id} 
            className={`mb-4 flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div 
              className={`max-w-[80%] p-3 rounded-lg ${
                message.sender === 'user' 
                  ? 'bg-primary text-white rounded-br-none' 
                  : 'bg-gray-100 text-gray-800 rounded-bl-none'
              }`}
            >
              <p className="text-sm">{message.text}</p>
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="mb-4 flex justify-start">
            <div className="max-w-[80%] p-3 rounded-lg bg-gray-100 text-gray-800 rounded-bl-none">
              <div className="flex space-x-1">
                <div className="w-2 h-2 rounded-full bg-gray-500 animate-bounce"></div>
                <div className="w-2 h-2 rounded-full bg-gray-500 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-2 h-2 rounded-full bg-gray-500 animate-bounce" style={{ animationDelay: '0.4s' }}></div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef}></div>
      </div>

      {/* Clear Chat Button - Moved to bottom */}
      <div className="px-4 pb-2">
        <button
          onClick={clearConversation}
          className="w-full text-sm opacity-50 hover:opacity-100 text-center py-1 text-gray-500"
        >
          Clear Conversation
        </button>
      </div>
      
      {/* Chat Input */}
      <form onSubmit={handleSubmit} className="border-t p-4 flex items-center">
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          placeholder="Type a message..."
          className="flex-1 border border-gray-300 rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        />
        <button
          type="submit"
          className="bg-primary text-white px-4 py-2 rounded-r-lg hover:bg-primary-dark transition-colors"
          disabled={!input.trim()}
        >
          <i className="fas fa-paper-plane"></i>
        </button>
      </form>
    </div>
  );
};

export default ChatWidget;
