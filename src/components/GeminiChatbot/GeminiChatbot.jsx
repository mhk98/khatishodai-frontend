// import React, { useState, useCallback, useRef, useEffect } from 'react';
// import { Send, Loader, Zap, User, MessageSquare, X } from 'lucide-react';

// const GeminiChatbot = () => {
//   const apiKey = "AIzaSyBTbcgjPKZPGHE_B15jOFpnVvIOzLVdL04"; // API Key is provided by the environment
//   const GEMINI_MODEL = 'gemini-2.5-flash-preview-09-2025';
//   const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${apiKey}`;

//   const CUSTOMER_SUPPORT_SYSTEM_PROMPT = "You are 'Khatishodai AI', a friendly and professional customer support assistant for a fictional e-commerce company, 'Khatishodai'. Your goal is to provide concise, accurate, and helpful answers to customer inquiries about products, orders, or policies. Always maintain a positive, supportive, and slightly enthusiastic tone. Keep your responses brief unless a detailed explanation is required.";

//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const [isChatOpen, setIsChatOpen] = useState(false);
//   const messagesEndRef = useRef(null);

//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   };

//   useEffect(scrollToBottom, [messages]);

//   const fetchWithBackoff = async (url, options, retries = 0) => {
//     try {
//       const response = await fetch(url, options);
//       if (!response.ok) {
//         if (response.status === 429 && retries < 3) {
//           const delay = 1000 * Math.pow(2, retries) + Math.random() * 1000;
//           await new Promise(resolve => setTimeout(resolve, delay));
//           return fetchWithBackoff(url, options, retries + 1);
//         }
//         throw new Error(`API Error: ${response.statusText}`);
//       }
//       return response;
//     } catch (error) {
//       if (retries < 3) {
//         const delay = 1000 * Math.pow(2, retries) + Math.random() * 1000;
//         await new Promise(resolve => setTimeout(resolve, delay));
//         return fetchWithBackoff(url, options, retries + 1);
//       }
//       throw error;
//     }
//   };

//   const handleSendMessage = async (e) => {
//     e.preventDefault();
//     if (!input.trim() || isLoading) return;

//     const userMessage = input.trim();
//     setInput('');
//     const newUserMessage = { role: 'user', content: userMessage };
//     const chatHistory = [...messages, newUserMessage].map(msg => ({
//       role: msg.role === 'user' ? 'user' : 'model',
//       parts: [{ text: msg.content }],
//     }));

//     setMessages(prevMessages => [...prevMessages, newUserMessage]);
//     setIsLoading(true);

//     try {
//       const payload = {
//         contents: chatHistory,
//         systemInstruction: { parts: [{ text: CUSTOMER_SUPPORT_SYSTEM_PROMPT }] }
//       };

//       const response = await fetchWithBackoff(apiUrl, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(payload),
//       });

//       const result = await response.json();
//       const aiText = result.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I couldn't process your request right now. Please try again.";
//       const newAiMessage = { role: 'ai', content: aiText };
//       setMessages(prevMessages => [...prevMessages, newAiMessage]);

//     } catch (error) {
//       console.error('Error:', error);
//       const errorMessage = {
//         role: 'ai',
//         content: 'I am currently having trouble connecting to my service. Please try again later.',
//       };
//       setMessages(prevMessages => [...prevMessages, errorMessage]);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Initial greeting message when chat opens
//   useEffect(() => {
//     if (isChatOpen && messages.length === 0) {
//       setMessages([{
//         role: 'ai',
//         content: "Hello! I'm Khatishodai AI, your friendly customer support assistant for Khatishodai. How can I assist you today?"
//       }]);
//     }
//   }, [isChatOpen, messages.length]);

//   return (
//     <div className="chatbot-container">
//       {/* Floating Chat Button */}
//       {!isChatOpen && (
//         <button
//           onClick={() => setIsChatOpen(true)}
//           className="chatbot-button"
//         >
//           <MessageSquare className="chatbot-icon" />
//         </button>
//       )}

//       {/* Chat Window */}
//       {isChatOpen && (
//         <div className="chat-window">
//           {/* Header */}
//           <div className="chat-header">
//             <div className="header-left">
//               <Zap className="header-icon" />
//               <h4 style={{color:"white"}}>Khatishodai AI Assistant</h4>
//             </div>
//             <button onClick={() => setIsChatOpen(false)} className="close-button">
//               <X style={{color:"white"}} className="close-icon" />
//             </button>
//           </div>

//           {/* Messages Area */}
//           <div className="messages-area">
//             {messages.map((msg, index) => (
//               <div key={index} className={`message ${msg.role === 'user' ? 'user-message' : 'ai-message'}`}>
//                 <div style={{color:"white"}} className={`avatar ${msg.role === 'user' ? 'user-avatar' : 'ai-avatar'}`}>
//                   {msg.role === 'user' ? <User  className="avatar-icon" /> : <Zap className="avatar-icon" />}
//                 </div>
//                 <div className={`message-content ${msg.role === 'user' ? 'user-message-content' : 'ai-message-content'}`}>
//                   <div className="message-text">{msg.content}</div>
//                 </div>
//               </div>
//             ))}
//             {isLoading && (
//               <div className="loading-message">
//                 <Loader className="loader" />
//                 <span>Khatishodai AI is typing...</span>
//               </div>
//             )}
//             <div ref={messagesEndRef} />
//           </div>

//           {/* Input Area */}
//           <form onSubmit={handleSendMessage} className="input-area">
//             <input
//               type="text"
//               value={input}
//               onChange={(e) => setInput(e.target.value)}
//               placeholder="Ask about your order, products, or policies..."
//               className="message-input"
//               disabled={isLoading}
//             />
//             <button
//               type="submit"
//               className={`send-button ${isLoading || !input.trim() ? 'disabled' : ''}`}
//               disabled={isLoading || !input.trim()}
//             >
//               <Send className="send-icon" />
//             </button>
//           </form>
//         </div>
//       )}

//       {/* Internal CSS */}
//       <style jsx>{`
//         .chatbot-container {
//           position: fixed;
//           bottom: 20px;
//           right: 20px;
//           z-index: 50;
//         }

//         .chatbot-button {
//           background-color: #5FA30F;
//           color: white;
//           padding: 16px;
//           border-radius: 50%;
//           box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
//           transition: transform 0.3s ease;
//         }

//         .chatbot-button:hover {
//           transform: scale(1.05);
//         }

//         .chatbot-icon {
//           width: 24px;
//           height: 24px;
//         }

//         .chat-window {
//           background-color: white;
//           border-radius: 12px;
//           box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
//           width: 320px;
//           max-height: 450px;
//           display: flex;
//           flex-direction: column;
//         }

//         .chat-header {
//           display: flex;
//           justify-content: space-between;
//           align-items: center;
//           background-color: #5FA30F;
//           color: white;
//           padding: 12px;
//           border-radius: 12px 12px 0 0;
//         }

//         .header-left {
//           display: flex;
//         }

//         .header-icon {
//           width: 20px;
//           height: 20px;
//           margin-right: 8px;
//         }

//         .close-button {
//           background: none;
//           border: none;
//           cursor: pointer;
//         }

//         .close-icon {
//           width: 20px;
//           height: 20px;
//           color: white;
//         }

//         .messages-area {
//           flex: 1;
//           overflow-y: auto;
//           padding: 12px;
//           background-color: #f5f5f5;
//         }

//         .message {
//           display: flex;
//           margin-bottom: 16px;
//         }

//         .user-message {
//           justify-content: flex-end;
//         }

//         .ai-message {
//           justify-content: flex-start;
//         }

//         .avatar {
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           width: 40px;
//           height: 40px;
//           border-radius: 50%;
//           background-color: #5FA30F;
//           margin-right: 8px;
//         }

//         .user-avatar {
//           background-color: #36643D;
//         }

//         .message-content {
//           max-width: 70%;
//         }

//         .user-message-content {
//           background-color: #36643D;
//           color: white;
//           padding: 12px;
//           border-radius: 16px 16px 0 16px;
//         }

//         .ai-message-content {
//           background-color: #e8eaf6;
//           color: #333;
//           padding: 12px;
//           border-radius: 16px 16px 16px 0;
//         }

//         .loading-message {
//           display: flex;
//           align-items: center;
//           margin-top: 12px;
//         }

//         .loader {
//           width: 18px;
//           height: 18px;
//           margin-right: 8px;
//           color: #5FA30F;
//           animation: spin 1s linear infinite;
//         }

//         .input-area {
//           display: flex;
//           padding: 12px;
//           border-top: 1px solid #e0e0e0;
//           background-color: white;
//         }

//         .message-input {
//           flex: 1;
//           padding: 12px;
//           font-size: 14px;
//           border: none;
//           border-radius: 24px;
//           background-color: #f5f5f5;
//         }

//         .send-button {
//           background-color: #5FA30F;
//           color: white;
//           border-radius: 50%;
//           padding: 12px;
//           margin-left: 8px;
//           cursor: pointer;
//           transition: background-color 0.3s ease;
//         }

//         .send-button:hover {
//           background-color: #5FA30F;
//         }

//         .send-button.disabled {
//           background-color: #dcdcdc;
//           cursor: not-allowed;
//         }

//         .send-icon {
//           width: 20px;
//           height: 20px;
//         }

//         @keyframes spin {
//           0% { transform: rotate(0deg); }
//           100% { transform: rotate(360deg); }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default GeminiChatbot;


import React, { useState, useCallback, useRef, useEffect } from 'react';
import { Send, Loader, Zap, User, MessageSquare, X } from 'lucide-react';

const GeminiChatbot = () => {
  const apiKey = "AIzaSyBTbcgjPKZPGHE_B15jOFpnVvIOzLVdL04"; // API Key is provided by the environment
  const GEMINI_MODEL = 'gemini-2.5-flash-preview-09-2025';
  const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${apiKey}`;

  const CUSTOMER_SUPPORT_SYSTEM_PROMPT = "You are 'Khatishodai AI', a friendly and professional customer support assistant for a fictional e-commerce company, 'Khatishodai'. Your goal is to provide concise, accurate, and helpful answers to customer inquiries about products, orders, or policies. Always maintain a positive, supportive, and slightly enthusiastic tone. Keep your responses brief unless a detailed explanation is required.";

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const fetchWithBackoff = async (url, options, retries = 0) => {
    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        if (response.status === 429 && retries < 3) {
          const delay = 1000 * Math.pow(2, retries) + Math.random() * 1000;
          await new Promise(resolve => setTimeout(resolve, delay));
          return fetchWithBackoff(url, options, retries + 1);
        }
        throw new Error(`API Error: ${response.statusText}`);
      }
      return response;
    } catch (error) {
      if (retries < 3) {
        const delay = 1000 * Math.pow(2, retries) + Math.random() * 1000;
        await new Promise(resolve => setTimeout(resolve, delay));
        return fetchWithBackoff(url, options, retries + 1);
      }
      throw error;
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    const newUserMessage = { role: 'user', content: userMessage };
    const chatHistory = [...messages, newUserMessage].map(msg => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.content }],
    }));

    setMessages(prevMessages => [...prevMessages, newUserMessage]);
    setIsLoading(true);

    try {
      const payload = {
        contents: chatHistory,
        systemInstruction: { parts: [{ text: CUSTOMER_SUPPORT_SYSTEM_PROMPT }] }
      };

      const response = await fetchWithBackoff(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      const aiText = result.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I couldn't process your request right now. Please try again.";
      const newAiMessage = { role: 'ai', content: aiText };
      setMessages(prevMessages => [...prevMessages, newAiMessage]);

    } catch (error) {
      console.error('Error:', error);
      const errorMessage = {
        role: 'ai',
        content: 'I am currently having trouble connecting to my service. Please try again later.',
      };
      setMessages(prevMessages => [...prevMessages, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  // Initial greeting message when chat opens
  useEffect(() => {
    if (isChatOpen && messages.length === 0) {
      setMessages([{
        role: 'ai',
        content: "Hello! I'm Khatishodai AI, your friendly customer support assistant for Khatishodai. How can I assist you today?"
      }]);
    }
  }, [isChatOpen, messages.length]);

  return (
    <div className="chatbot-container">
      {/* Floating Chat Button */}
      {!isChatOpen && (
        <button
          onClick={() => setIsChatOpen(true)}
          className="chatbot-button"
        >
          <MessageSquare className="chatbot-icon" />
        </button>
      )}

      {/* Chat Window */}
      {isChatOpen && (
        <div className="chat-window">
          {/* Header */}
          <div className="chat-header">
            <div className="header-left">
              <Zap className="header-icon" />
              <h4 style={{color:"white"}}>Khatishodai AI Assistant</h4>
            </div>
            <button onClick={() => setIsChatOpen(false)} className="close-button">
              <X style={{color:"white"}} className="close-icon" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="messages-area">
            {messages.map((msg, index) => (
              <div key={index} className={`message ${msg.role === 'user' ? 'user-message' : 'ai-message'}`}>
                <div style={{color:"white"}} className={`avatar ${msg.role === 'user' ? 'user-avatar' : 'ai-avatar'}`} >
                  {msg.role === 'user' ? <User className="avatar-icon" /> : <Zap className="avatar-icon" />}
                </div>
                <div className={`message-content ${msg.role === 'user' ? 'user-message-content' : 'ai-message-content'}`}>
                  <div className="message-text">{msg.content}</div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="loading-message">
                <Loader className="loader" />
                <span>Khatishodai AI is typing...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <form onSubmit={handleSendMessage} className="input-area">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about your order, products, or policies..."
              className="message-input"
              disabled={isLoading}
            />
            <button
              type="submit"
              className={`send-button ${isLoading || !input.trim() ? 'disabled' : ''}`}
              disabled={isLoading || !input.trim()}
            >
              <Send className="send-icon" />
            </button>
          </form>
        </div>
      )}

   <style jsx>{`
  /* ===========================
     MAIN CONTAINER (Floating)
  ============================ */
  .chatbot-container {
    position: fixed;
    bottom: 20px;
    right: 20px;
    z-index: 9999;
  }

  /* ===========================
     FLOATING CHAT BUTTON
  ============================ */
  .chatbot-button {
    background-color: #5FA30F;
    color: white;
    padding: 16px;
    border-radius: 50%;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease;
    cursor: pointer;
  }

  .chatbot-button:hover {
    transform: scale(1.05);
  }

  .chatbot-icon {
    width: 24px;
    height: 24px;
  }

  /* ===========================
     CHAT WINDOW
  ============================ */
  .chat-window {
    background-color: white;
    border-radius: 12px;
    width: 320px;
    max-height: 460px;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    box-shadow: 0 4px 20px rgba(0,0,0,0.15);
  }

  /* ===========================
     CHAT HEADER
  ============================ */
  .chat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #5FA30F;
    color: white;
    padding: 12px;
    border-radius: 12px 12px 0 0;
  }

  .header-left {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .header-icon {
    width: 20px;
    height: 20px;
  }

  .close-button {
    background: none;
    border: none;
    cursor: pointer;
  }

  .close-icon {
    width: 20px;
    height: 20px;
  }

  /* ===========================
     MESSAGES AREA
  ============================ */
  .messages-area {
    flex: 1;
    overflow-y: auto;
    padding: 12px;
    background-color: #f5f5f5;
  }

  .message {
    display: flex;
    margin-bottom: 16px;
    align-items: flex-start;
  }

  .user-message {
    justify-content: flex-end;
  }

  .ai-message {
    justify-content: flex-start;
  }

  .avatar {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 38px;
    height: 38px;
    border-radius: 50%;
    margin-right: 8px;
  }

  .ai-avatar {
    background-color: #5FA30F;
  }

  .user-avatar {
    background-color: #36643D;
  }

  .message-content {
    max-width: 70%;
  }

  .user-message-content {
    background-color: #36643D;
    color: white;
    padding: 10px 14px;
    border-radius: 16px 16px 0 16px;
  }

  .ai-message-content {
    background-color: #eaeaf6;
    color: #333;
    padding: 10px 14px;
    border-radius: 16px 16px 16px 0;
  }

  .message-text {
    font-size: 14px;
    line-height: 1.4;
  }

  /* ===========================
     LOADING INDICATOR
  ============================ */
  .loading-message {
    display: flex;
    align-items: center;
    margin-top: 12px;
  }

  .loader {
    width: 18px;
    height: 18px;
    margin-right: 8px;
    animation: spin 1s linear infinite;
    color: #5FA30F;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  /* ===========================
     INPUT AREA
  ============================ */
  .input-area {
    display: flex;
    padding: 12px;
    background-color: white;
    border-top: 1px solid #e0e0e0;
  }

  .message-input {
    flex: 1;
    padding: 12px;
    font-size: 14px;
    border: none;
    border-radius: 24px;
    background-color: #f5f5f5;
    outline: none;
  }

  .send-button {
    background-color: #5FA30F;
    color: white;
    border-radius: 50%;
    padding: 12px;
    margin-left: 8px;
    cursor: pointer;
    transition: 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .send-button.disabled {
    background-color: #dcdcdc;
    cursor: not-allowed;
  }

  .send-icon {
    width: 20px;
    height: 20px;
  }

  /* ===========================
           RESPONSIVE CSS
  ============================ */

  /* Phone Screens */
  @media (max-width: 480px) {
    .chatbot-container {
      bottom: 15px;
      right: 15px;
    }

    .chat-window {
      width: 92vw;
      max-height: 75vh;
    }

    .chatbot-button {
      padding: 14px;
    }
  }

  /* Tablets */
  @media (min-width: 481px) and (max-width: 768px) {
    .chatbot-container {
      bottom: 18px;
      right: 18px;
    }

    .chat-window {
      width: 360px;
      max-height: 80vh;
    }
  }

  /* Small Laptops */
  @media (min-width: 769px) and (max-width: 1024px) {
    .chatbot-container {
      bottom: 20px;
      right: 20px;
    }
  }
`}</style>

      
    </div>
  );
};

export default GeminiChatbot;
