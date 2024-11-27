import React, { useState, useEffect, useRef } from "react";
import { Input, Button, Avatar } from "antd";
import { SendOutlined, UserOutlined } from "@ant-design/icons";
import axios from "axios";

const AdminChat = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {    
    const fetchMessages = async () => {
      try {
        const response = await axios.get("https://back-endt.onrender.com/messages");
        setMessages(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des messages :", error);
      }
    };
    fetchMessages();
  }, []);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (inputValue.trim() !== "") {
      try {
        await axios.post("https://back-endt.onrender.com/messages", {
          user_role: "admin",
          message: inputValue,
        });
        setMessages([...messages, { user_role: "admin", message: inputValue }]);
        setInputValue("");
      } catch (error) {
        console.error("Erreur lors de l'envoi du message :", error);
      }
    }
  };

  const handleResponse = async (id, response) => {
    try {
      await axios.put(`https://back-endt.onrender.com/messages/${id}`, { response });
      setMessages(
        messages.map((msg) =>
          msg.id === id ? { ...msg, response } : msg
        )
      );
    } catch (error) {
      console.error("Erreur lors de l'envoi de la réponse :", error);
    }
  };

  return (
    <div className="chat-container" style={{ background: "#fff", padding: "1rem" }}>
      <div className="chat-header" style={{ marginBottom: "1rem" }}>
        <Avatar icon={<UserOutlined />} />
        <span className="chat-name" style={{ marginLeft: "1rem", fontWeight: "bold" }}>
          Mr Lanto
        </span>
      </div>

      <div
        className="chat-messages"
        style={{
          marginBottom: "1rem",
          maxHeight: "400px", 
          overflowY: "auto", 
        }}
      >
        {messages.map((message) => (
          <div
            key={message.id}
            className="chat-message"
            style={{
              marginBottom: "1rem",
              padding: "0.5rem",
              background: message.user_role === "admin" ? "#bae7ff" : "#fff1f0",
              borderRadius: "5px",
            }}
          >
            <p>{message.message}</p>
            {message.user_role !== "admin" && (
              <div>
                <Button
                  type="primary"
                  style={{ marginRight: "0.5rem" }}
                  onClick={() => handleResponse(message.id, "oui")}
                >
                  Fait
                </Button>
                <Button onClick={() => handleResponse(message.id, "non")}>
                En attente
                </Button>
              </div>
            )}
            {message.response && (
              <p style={{ color: "green" }}>
                Réponse : {message.response}
              </p>
            )}
          </div>
        ))}
        <div ref={messagesEndRef} /> {/* Élément pour scroller jusqu'à la fin */}
      </div>

      <div className="chat-input">
        <Input
          placeholder="Écrire un message..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onPressEnter={handleSendMessage}
          style={{ width: "80%" }}
        />
        <Button
          type="primary"
          icon={<SendOutlined />}
          onClick={handleSendMessage}
          style={{ marginLeft: "1rem" }}
        />
      </div>
    </div>
  );
};

export default AdminChat;

