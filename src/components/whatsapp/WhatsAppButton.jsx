// components/WhatsAppButton.jsx
"use client"; // এটি একটি ক্লায়েন্ট কম্পোনেন্ট

import React from "react";
import { FaWhatsapp } from "react-icons/fa"; // WhatsApp আইকন ইমপোর্ট

const WhatsAppButton = () => {
  // আপনার WhatsApp নাম্বারটি এখানে দিন (কান্ট্রি কোড সহ, '+' চিহ্ন ছাড়া)
  // উদাহরণস্বরূপ, বাংলাদেশের জন্য: 8801XXXXXXXXX
  const phoneNumber = "8801624021826"; 

  // ডিফল্ট মেসেজ (অপশনাল)
  const message = encodeURIComponent("হ্যালো! আমি আপনার ওয়েবসাইট থেকে সাপোর্ট চাচ্ছি।");

  // WhatsApp এর অফিসিয়াল লিংক তৈরির লজিক
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      // আমি এখানে Tailwind CSS ক্লাস ব্যবহার করেছি।
      // আপনি যদি Tailwind ব্যবহার না করেন, তাহলে নিচের স্টাইলিং অংশটি দেখুন।
      className="fixed bottom-6 right-6 z-50 text-white p-4 "
      style={{
        // অতিরিক্ত কিছু ইনলাইন স্টাইল
        boxShadow: "0px 4px 15px rgba(0,0,0,0.2)",
        backgroundColor:"#00DB40",
        borderRadius:"10px",
        transition:"all 0.3s ease" 
      }}
    >
      <FaWhatsapp size={32} />
    </a>
  );
};

export default WhatsAppButton;