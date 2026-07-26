import { useState } from "react";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaSpinner, FaCheckCircle, FaExclamationCircle } from "react-icons/fa";
import { motion } from "motion/react";

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: ""
  });
  
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: "", message: "" });

    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.message || "Failed to send message");
      }
      
      setStatus({ type: "success", message: "Message sent successfully! We'll get back to you soon." });
      setFormData({ firstName: "", lastName: "", email: "", message: "" }); // Reset form
      
    } catch (err) {
      setStatus({ type: "error", message: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="contact" className="mb-20 scroll-mt-24">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-center mb-10 text-center"
      >
        <div className="flex items-center gap-2 mb-2">
          <div className="w-1 h-3 bg-gradient-to-r from-red-600 to-orange-500 rounded-full"></div>
          <span className="text-xs font-bold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-500 uppercase font-ubuntu">
            GET IN TOUCH
          </span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold font-outfit text-gray-900 dark:text-white tracking-tight">
          Contact Us
        </h2>
      </motion.div>

      <div className="flex flex-col lg:flex-row gap-10">
        {/* Contact Info */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="lg:w-1/3 bg-gradient-to-br from-red-600 to-orange-500 text-white rounded-3xl p-8 shadow-2xl shadow-red-200/50 dark:shadow-gray-950/80 hover:-translate-y-2 transition-transform duration-500"
        >
          <h3 className="font-bold text-2xl font-outfit mb-6">Contact Information</h3>
          <p className="text-red-100 font-medium text-sm mb-10">
            Fill up the form and our Team will get back to you within 24 hours.
          </p>
          
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <FaPhoneAlt className="text-red-200 text-lg" />
              <span className="font-medium text-sm">+1 (555) 123-4567</span>
            </div>
            <div className="flex items-center gap-4">
              <FaEnvelope className="text-red-200 text-lg" />
              <span className="font-medium text-sm">support@rentora.com</span>
            </div>
            <div className="flex items-center gap-4">
              <FaMapMarkerAlt className="text-red-200 text-lg" />
              <span className="font-medium text-sm">123 Vacation Lane, Suite 400<br/>San Francisco, CA 94107</span>
            </div>
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="lg:w-2/3 bg-white dark:bg-gray-900 rounded-3xl p-8 border border-gray-100 dark:border-gray-800 shadow-sm"
        >
          
          {status.message && (
            <div className={`mb-6 p-4 rounded-xl flex items-center gap-3 text-sm font-bold ${status.type === 'success' ? 'bg-green-50 dark:bg-green-950/40 text-green-700 dark:text-green-300 border border-green-200 dark:border-green-800' : 'bg-red-50 dark:bg-red-950/40 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-800'}`}>
              {status.type === 'success' ? <FaCheckCircle className="text-lg" /> : <FaExclamationCircle className="text-lg" />}
              {status.message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 font-ubuntu">First Name</label>
              <input 
                type="text" 
                name="firstName"
                required
                value={formData.firstName}
                onChange={handleChange}
                disabled={loading}
                className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-1 focus:ring-red-500 text-sm font-medium text-gray-800 dark:text-white disabled:opacity-50" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 font-ubuntu">Last Name</label>
              <input 
                type="text" 
                name="lastName"
                required
                value={formData.lastName}
                onChange={handleChange}
                disabled={loading}
                className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-1 focus:ring-red-500 text-sm font-medium text-gray-800 dark:text-white disabled:opacity-50" 
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 font-ubuntu">Email</label>
              <input 
                type="email" 
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                disabled={loading}
                className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-1 focus:ring-red-500 text-sm font-medium text-gray-800 dark:text-white disabled:opacity-50" 
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 font-ubuntu">Message</label>
              <textarea 
                rows="4" 
                name="message"
                required
                value={formData.message}
                onChange={handleChange}
                disabled={loading}
                className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-1 focus:ring-red-500 text-sm font-medium text-gray-800 dark:text-white resize-none disabled:opacity-50"
              ></textarea>
            </div>
            <div className="md:col-span-2 flex justify-end mt-2">
              <button 
                type="submit" 
                disabled={loading}
                className="bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-500 hover:to-orange-400 disabled:from-gray-400 disabled:to-gray-400 disabled:cursor-not-allowed text-white font-bold text-sm px-8 py-3.5 rounded-full transition-all duration-300 shadow-lg shadow-red-200/50 hover:shadow-xl hover:-translate-y-1 flex items-center gap-2"
              >
                {loading ? (
                  <>
                    <FaSpinner className="animate-spin" /> Sending...
                  </>
                ) : (
                  "Send Message"
                )}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;
