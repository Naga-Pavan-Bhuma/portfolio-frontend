import React, { useState } from "react";
import { motion } from "framer-motion";

const inputVariants = {
  focused: { borderColor: "#6366F1", boxShadow: "0 0 8px #8b5cf6" }, // purple glow
  blurred: { borderColor: "#4b5563", boxShadow: "none" }, // darker border
};

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobileNumber: "",
    message: "",
  });

  const [focused, setFocused] = useState({
    name: false,
    email: false,
    mobileNumber: false,
    message: false,
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleFocus = (field) => {
    setFocused((prev) => ({ ...prev, [field]: true }));
  };

  const handleBlur = (field) => {
    setFocused((prev) => ({ ...prev, [field]: false }));
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (errors[e.target.name]) {
      setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email is invalid";
    if (!formData.mobileNumber.trim()) newErrors.mobileNumber = "Mobile number is required";
    else if (!/^\d{10}$/.test(formData.mobileNumber)) newErrors.mobileNumber = "Must be 10 digits";
    if (!formData.message.trim()) newErrors.message = "Message cannot be empty";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to submit");

      setSubmitted(true);
      setFormData({ name: "", email: "", mobileNumber: "", message: "" });
    } catch (err) {
      console.error("Submission error:", err);
      alert("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-md mx-auto p-6 bg-gray-900 rounded-2xl shadow-lg shadow-indigo-900/50"
    >
      {submitted ? (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-green-400 text-center"
        >
          ✅ Thank you for contacting me!
        </motion.p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {["name", "email", "mobileNumber", "message"].map((field) => (
            <motion.div
              key={field}
              animate={focused[field] ? "focused" : "blurred"}
              variants={inputVariants}
            >
              {field === "message" ? (
                <textarea
                  name="message"
                  rows="4"
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={handleChange}
                  onFocus={() => handleFocus("message")}
                  onBlur={() => handleBlur("message")}
                  className="w-full px-4 py-2 bg-gray-800 text-gray-100 border border-gray-700 rounded-lg outline-none transition-all placeholder-gray-500"
                />
              ) : (
                <input
                  type={field === "email" ? "email" : field === "mobileNumber" ? "tel" : "text"}
                  name={field}
                  placeholder={
                    field === "mobileNumber"
                      ? "Mobile Number"
                      : field.charAt(0).toUpperCase() + field.slice(1)
                  }
                  value={formData[field]}
                  onChange={handleChange}
                  onFocus={() => handleFocus(field)}
                  onBlur={() => handleBlur(field)}
                  className="w-full px-4 py-2 bg-gray-800 text-gray-100 border border-gray-700 rounded-lg outline-none transition-all placeholder-gray-500"
                />
              )}
              {errors[field] && (
                <p className="text-red-500 text-sm mt-1">{errors[field]}</p>
              )}
            </motion.div>
          ))}

          <button
            type="submit"
            disabled={loading}
            style={{ backgroundColor: "#38b6ff" }}
            className="w-full  hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg transition disabled:opacity-60"
          >
            {loading ? "Sending..." : "Submit"}
          </button>
        </form>
      )}
    </motion.div>
  );
}
