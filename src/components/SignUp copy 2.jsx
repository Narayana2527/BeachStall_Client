import React, { useState } from "react";


export default function Signup(){
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    // Every keystroke triggers a state change in the parent
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log("Entire Form Rendering!"); 
  };

  return (
    <form className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
      {/* Imagine 30 of these inputs */}
      {[...Array(30)].map((_, i) => (
        <div key={i} className="flex flex-col">
          <label>Field {i + 1}</label>
          <input
            name={`field${i}`}
            className="border p-2"
            value={formData[`field${i}`] || ""}
            onChange={handleChange}
          />
        </div>
      ))}
    </form>
  );
}