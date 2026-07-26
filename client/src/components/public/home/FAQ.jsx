import { useState } from "react";
import { FaChevronDown, FaArrowRightLong } from "react-icons/fa6";
import { motion } from "motion/react";

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`border rounded-xl mb-4 overflow-hidden bg-white dark:bg-gray-900 shadow-sm transition-all duration-300 hover:shadow-md hover:border-red-200 dark:hover:border-red-900/50 ${isOpen ? 'border-red-200 dark:border-red-900/50' : 'border-gray-100 dark:border-gray-800'}`}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-5 flex justify-between items-center bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800/60 transition-colors text-left"
      >
        <span className={`font-bold text-sm transition-colors ${isOpen ? 'text-red-600 dark:text-red-400' : 'text-gray-900 dark:text-white'}`}>{question}</span>
        <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${isOpen ? 'bg-red-50 dark:bg-red-950/50' : 'bg-gray-50 dark:bg-gray-800'}`}>
          <FaChevronDown className={`text-xs transition-transform duration-300 ${isOpen ? "rotate-180 text-red-500 dark:text-red-400" : "text-gray-400 dark:text-gray-500"}`} />
        </div>
      </button>
      <div 
        className={`px-6 text-gray-500 dark:text-gray-400 text-sm font-medium transition-all duration-300 ease-in-out overflow-hidden ${
          isOpen ? "max-h-40 pb-4 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        {answer}
      </div>
    </div>
  );
};

const FAQ = () => {
  const faqs = [
    {
      question: "What is Rentora?",
      answer: "Rentora is a premium platform for discovering and booking unique handpicked homes and stays for your next adventure."
    },
    {
      question: "How do I book a home?",
      answer: "Booking is easy! Simply search for your destination, choose your dates, select a home, and follow the secure checkout process."
    },
    {
      question: "Can I cancel my booking?",
      answer: "Yes, you can cancel your booking according to the cancellation policy specified by the host for that specific property."
    },
    {
      question: "Are the homes verified?",
      answer: "Absolutely. Every home listed on Rentora undergoes a strict verification process to ensure quality, safety, and accuracy."
    }
  ];

  return (
    <div id="faqs" className="mb-20 scroll-mt-24">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="flex justify-between items-end mb-8"
      >
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-1 h-3 bg-gradient-to-r from-red-600 to-orange-500 rounded-full"></div>
            <span className="text-xs font-bold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-500 uppercase font-ubuntu">
              FAQ
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-outfit text-gray-900 dark:text-white tracking-tight">
            Frequently Asked Questions
          </h2>
        </div>
      </motion.div>

      <div className="max-w-3xl mx-auto">
        {faqs.map((faq, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <FAQItem question={faq.question} answer={faq.answer} />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
