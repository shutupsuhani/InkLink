import React from 'react';
import {createChatBotMessage} from 'react-chatbot-kit'

const ActionProvider = ({ createChatBotMessage, setState, children }) => {
  const questions = [
    "What services do you offer?",
    "Can you tell me about your Website?",
    "How can I contact your support team?",
    "What is the mission of your company?",
    "How to Create an Account ?",
    ""
  ];

  const updateState = (message) => {
    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, message],
    }));
  };

  const handleHello = () => {
    const message = createChatBotMessage('Hello, I am InkLink-Advisor, type in your query.');
    updateState(message);
  };

  const companyDetails = () => {
    const message = createChatBotMessage('At InkLink , our mission is to provide user a support system for storing and managing their documents which may need during any important documentional work');
    updateState(message);
  };

  const contactUs = () => {
    const message = createChatBotMessage('Contact details can be viewed on our CONTACT US section. Feel free to drop us your query.');
    updateState(message);
  };

  const defaultResponse = () => {
    const message = createChatBotMessage("I'm not sure about that. Can you ask something else? Or You can feel free to checkout Frequently asked questions") ;
    updateState(message) ;
  }

  const suggestQuestions = () => {
    const questionsMessage = questions.map((question, idx) => `${idx + 1}. ${question}`).join('\n');
    const message = createChatBotMessage(`Here are some questions you can ask:\n\n${questionsMessage}`);
    updateState(message);
  };

  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          actions: {
            handleHello,
            companyDetails,
            contactUs,
            suggestQuestions ,
            defaultResponse
          },
        });
      })}
    </div>
  );
};

export default ActionProvider;