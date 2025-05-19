import React from "react";
import "../styles/FAQ.css";

const FAQ = () => {
  const faqs = [
    {
      question: "How do I start a quiz?",
      answer: "Log in, choose a topic, select a mode, and start playing."
    },
    {
      question: "Can I edit my profile?",
      answer: "Yes! Navigate to your profile and click 'Edit Profile'."
    },
    {
      question: "Is there a leaderboard?",
      answer: "Yes, check the leaderboard from the navigation menu."
    },
    {
      question: "What are the available quiz modes?",
      answer: "Modes include Single Player and Multiplayer for now."
    }
  ];

  return (
    <div className="faq-container">
      <h2>Frequently Asked Questions</h2>
      {faqs.map((faq, index) => (
        <div className="faq-item" key={index}>
          <h3>{faq.question}</h3>
          <p>{faq.answer}</p>
        </div>
      ))}
    </div>
  );
};

export default FAQ;
