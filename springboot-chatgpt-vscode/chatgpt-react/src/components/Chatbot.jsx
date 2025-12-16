import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const ChatBot = () => {
    const [input, setInput] = useState(""); // Stores user input
    const [messages, setMessages] = useState([]); // Stores chat messages
    const chatEndRef = useRef(null); // Used to auto-scroll chat to the latest message

    // Function to send user message to ChatGPT API
    const sendMessage = async () => {
        if (!input.trim()) return;

        const userMessage = { text: input, sender: "user" };
        setMessages([...messages, userMessage]);
        
        setInput(""); //Clear input after sending message

        try {
            const res = await axios.post("http://localhost:8080/api/chat", { prompt: input }, {
                headers: { "Content-Type": "application/json" }, 
            });

            const botMessage = { text: res.data, sender: "bot" };
            setMessages([...messages, userMessage, botMessage]);
        } catch (error) {
            console.error("Error fetching response", error);
            setMessages([...messages, userMessage, { text: "Error retrieving response", sender: "bot" }]);
        }
    };

    // Scroll chat to bottom automatically when new messages arrive
    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth"});
    }, [messages]);

    return (
        <div className="container mt-5">
            <div className="card shadow-lg">
                <div className="card-header bg-primary text-white text-center">
                    <h4>ChatGPT Chatbot</h4>
                </div>

                <div className="card-body chat-box" style={{ height: "400px", overflowY: "auto"}}>
                    {messages.map((msg, index) => (
                        <div key={index} className={`d-flex ${msg.sender === "user" ? "justify-content-end" : "justify-content-start"} mb-2`}>
                            <div className={`p-3 rounded shadow ${msg.sender === "user" ? "bg-primary text-white" : "bg-light"}`} style ={{ maxWidth: "70%" }}>
                                {msg.text}
                            </div>
                        </div>    
                        ))}
                    <div ref={chatEndRef}/>
                </div>
                
                <div className="card-footer">
                    <div className="input-group">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Type your message..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                        />
                        <button className="btn btn-primary" onClick={sendMessage}>
                            Send
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChatBot;