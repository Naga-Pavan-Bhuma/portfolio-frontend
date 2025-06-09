import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const inputVariants = {
  focused: { borderColor: "#4F46E5", boxShadow: "0 0 8px #6366F1" },
  blurred: { borderColor: "#d1d5db", boxShadow: "none" },
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
    else if (!/^\d{10}$/.test(formData.mobileNumber)) newErrors.mobileNumber = "Mobile number must be 10 digits";
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

    // Fake API call for demo - replace with your real POST call
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setFormData({ name: "", email: "", mobileNumber: "", message: "" });
    }, 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg"
    >
      {submitted ? (
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          className="text-center text-green-600 font-semibold text-lg"
        >
          Thanks for reaching out! We’ll get back to you soon.
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} noValidate>
          {["name", "email", "mobileNumber", "message"].map((field) => (
            <div key={field} className="relative mb-6">
              <motion.label
                htmlFor={field}
                className="absolute bg-white px-1 cursor-text select-none"
                style={{
                  left: "14px",
                  top: formData[field] || focused[field] ? "-8px" : "14px",
                  fontSize: formData[field] || focused[field] ? "12px" : "16px",
                  color: focused[field] ? "#4F46E5" : "#6b7280",
                  transition: "all 0.3s ease",
                }}
                onClick={() => document.getElementById(field).focus()}
              >
                {field === "mobileNumber" ? "Mobile Number" : field.charAt(0).toUpperCase() + field.slice(1)}
              </motion.label>
              {field !== "message" ? (
                <motion.input
                  id={field}
                  name={field}
                  type={field === "email" ? "email" : "text"}
                  value={formData[field]}
                  onFocus={() => handleFocus(field)}
                  onBlur={() => handleBlur(field)}
                  onChange={handleChange}
                  className={`w-full border rounded-md px-4 py-3 outline-none ${
                    errors[field] ? "border-red-500" : "border-gray-300"
                  }`}
                  initial="blurred"
                  animate={focused[field] ? "focused" : "blurred"}
                  variants={inputVariants}
                  transition={{ duration: 0.3 }}
                />
              ) : (
                <motion.textarea
                  id={field}
                  name={field}
                  value={formData[field]}
                  onFocus={() => handleFocus(field)}
                  onBlur={() => handleBlur(field)}
                  onChange={handleChange}
                  rows={4}
                  className={`w-full border rounded-md px-4 py-3 outline-none resize-none ${
                    errors[field] ? "border-red-500" : "border-gray-300"
                  }`}
                  initial="blurred"
                  animate={focused[field] ? "focused" : "blurred"}
                  variants={inputVariants}
                  transition={{ duration: 0.3 }}
                />
              )}
              <AnimatePresence>
                {errors[field] && (
                  <motion.p
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    className="text-red-500 text-sm mt-1 select-none"
                  >
                    {errors[field]}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          ))}
          <motion.button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-md font-semibold flex justify-center items-center gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={loading}
          >
            {loading ? (
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8H4z"
                />
              </svg>
            ) : (
              "Send Message"
            )}
          </motion.button>
        </form>
      )}
    </motion.div>
  );
}
