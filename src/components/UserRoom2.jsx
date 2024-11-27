import React, { useState, useEffect, useRef } from "react";
import { Input, Button, Avatar } from "antd";
import { SendOutlined, UserOutlined } from "@ant-design/icons";
import axios from "axios";
import BtnDeconnect from "./Deconnection";

const UserChat2 = () => {
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const messagesEndRef = useRef(null);

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const response = await axios.get("https://back-endt.onrender.com/messages2");
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
                await axios.post("https://back-endt.onrender.com/messages2", {
                    user_role: "user",
                    message: inputValue,
                });
                setMessages([...messages, { user_role: "user", message: inputValue }]);
                setInputValue("");
            } catch (error) {
                console.error("Erreur lors de l'envoi du message :", error);
            }
        }
    };

    return (
        <div
            className="chat-container"
            style={{
                background: "#fff",
                display: "flex",
                flexDirection: "column",
                height: "95vh",
                width: "99vw", // Occuper toute la largeur de l'écran
                padding: "1rem",
                boxSizing: "border-box",
            }}
        >
            <BtnDeconnect />

            {/* Header */}
            <div
                className="chat-header"
                style={{
                    marginBottom: "1rem",
                    display: "flex",
                    alignItems: "center",
                }}
            >
                <Avatar icon={<UserOutlined />} />
                <span
                    className="chat-name"
                    style={{
                        marginLeft: "1rem",
                        fontWeight: "bold",
                    }}
                >
                    Nivo Randriambololona
                </span>
            </div>

            {/* Messages */}
            <div
                className="chat-messages"
                style={{
                    flex: 1, 
                    marginBottom: "1rem",
                    overflowY: "auto",
                    padding: "1rem",
                    backgroundColor: "#fff",
                    borderRadius: "8px",
                }}
            >
                {messages.map((message) => (
                    <div
                        key={message.id}
                        className="chat-message"
                        style={{
                            marginBottom: "1rem",
                            padding: "0.5rem",
                            background: message.user_role === "admin" ? "#bae7ff" : "#1677ff14",
                            borderRadius: "5px",
                        }}
                    >
                        <p>{message.message}</p>
                        {message.response && (
                            <p style={{ color: "green" }}>Réponse : {message.response}</p>
                        )}
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div
                className="chat-input"
                style={{
                    display: "flex",
                    alignItems: "center",
                }}
            >
                <Input
                    placeholder="Écrire un message..."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onPressEnter={handleSendMessage}
                    style={{ flex: 1, marginRight: "1rem" }}
                />
                <Button
                    type="primary"
                    icon={<SendOutlined />}
                    onClick={handleSendMessage}
                />
            </div>
        </div>
    );
};

export default UserChat2;

