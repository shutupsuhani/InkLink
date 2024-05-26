import Chatbot from "react-chatbot-kit";
import "react-chatbot-kit/build/main.css";
import config from "../Chatbot/config.jsx";
import MessageParser from "../Chatbot/MessageParser.jsx";
import ActionProvider from "../Chatbot/ActionProvider.jsx";
import "./style.css";
import { useState } from "react";

const ChatAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className="chatbot chatbot-scroll">
      <img
        className="Logo"
        src="chatlogo.avif"
        alt="Logo"
        onClick={toggleChatbot}
      />
      {isOpen && (
        <Chatbot
          config={config}
          messageParser={MessageParser}
          actionProvider={ActionProvider}
        />
      )}
    </div>
  );
};

export default ChatAssistant;
