import React, { useState } from "react";
import "./Contact.css";
import emailjs from "@emailjs/browser";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";

function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate(); // Initialize the navigate hook

  const handleSubmit = (e) => {
    e.preventDefault();

    const serviceId = "service_dlgucv3";
    const templateId = "template_reeo151";
    const publicKey = "Leqv6_KtNJI1mVSAV";

    const templateParams = {
      from_name: name,
      from_email: email,
      to_name: "Farhan",
      message: message,
    };

    emailjs
      .send(serviceId, templateId, templateParams, publicKey)
      .then((response) => {
        console.log("SUCCESS!");
        setName("");
        setEmail("");
        setMessage("");

        // Navigate to home page after successful email sending
        navigate("/");

        // Alert the user that the email has been sent successfully
        alert("Your message has been sent successfully!");
      })
      .catch((error) => {
        console.log("Error Sending Email", error);
      });
  };

  return (
    <div className="form">
      <Header />
      <form onSubmit={handleSubmit} className="emailForm">
        <label>Your Name</label>
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>Message</label>
        <textarea
          rows="6"
          name="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type Your message Here"
        />
        <button type="submit" className="btn">
          Submit
        </button>
      </form>
    </div>
  );
}

export default Contact;
