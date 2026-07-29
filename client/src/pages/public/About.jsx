import { motion } from "motion/react";
import { FaHome, FaGlobeAmericas, FaUsers, FaHeart, FaShieldAlt, FaMapMarkedAlt, FaStar } from "react-icons/fa";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } }
};

const About = () => {
  return (
    <div className="min-h-screen relative overflow-hidden bg-white dark:bg-[#080c14]">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 -mr-40 -mt-40 w-96 h-96 bg-red-100 dark:bg-red-950/20 rounded-full blur-3xl opacity-50 pointer-events-none"></div>
      <div className="absolute top-[40%] left-0 -ml-40 w-96 h-96 bg-orange-100 dark:bg-orange-950/20 rounded-full blur-3xl opacity-50 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 py-16 sm:py-24 relative z-10">
        {/* Hero Section */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="text-center max-w-4xl mx-auto mb-24"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-50 dark:bg-red-950/40 text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-500 mb-6 shadow-sm border border-red-100 dark:border-red-900/50">
            <span className="w-2 h-2 rounded-full bg-gradient-to-r from-red-600 to-orange-500 animate-pulse"></span>
            <span className="text-xs font-bold tracking-widest uppercase font-ubuntu">
              Our Story
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold font-outfit text-gray-900 dark:text-white tracking-tight mb-8 leading-[1.1]">
            Reimagining How The <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-500">World Travels</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-slate-400 font-medium leading-relaxed max-w-2xl mx-auto">
            Rentora was founded on a simple idea: that no matter where you go, you should be able to feel at home. We connect travelers with unique spaces and incredible hosts around the globe.
          </p>
        </motion.div>

        {/* Dynamic Image Grid */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-32"
        >
          <motion.div variants={fadeIn} className="md:col-span-7 h-[300px] md:h-[500px] rounded-[2rem] overflow-hidden shadow-2xl shadow-gray-200/50 dark:shadow-black/70 group relative">
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/40 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <img 
              src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80" 
              alt="Beautiful Home" 
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
            />
            <div className="absolute bottom-6 left-6 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 text-white font-outfit">
              <p className="font-bold text-xl">Modern Villas</p>
              <p className="text-sm font-medium text-white/80">Experience luxury living</p>
            </div>
          </motion.div>
          <div className="md:col-span-5 grid grid-rows-2 gap-6 h-[400px] md:h-[500px]">
            <motion.div variants={fadeIn} className="rounded-[2rem] overflow-hidden shadow-xl shadow-gray-200/50 dark:shadow-black/70 group relative h-full">
              <img 
                src="https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80" 
                alt="Cozy Interior" 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
              />
            </motion.div>
            <motion.div variants={fadeIn} className="rounded-[2rem] overflow-hidden shadow-xl shadow-gray-200/50 dark:shadow-black/70 group relative h-full">
              <img 
                src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80" 
                alt="Modern Living" 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
              />
            </motion.div>
          </div>
        </motion.div>

        {/* Floating Stats */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-white/70 dark:bg-[#0e1422]/80 backdrop-blur-xl rounded-[3rem] p-10 md:p-16 mb-32 border border-white dark:border-slate-800/80 shadow-2xl shadow-gray-200/50 dark:shadow-black/70 relative"
        >
          {/* Subtle grid pattern inside stats box */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] rounded-[3rem] opacity-30 pointer-events-none z-0"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center relative z-10">
            {[
              { icon: <FaGlobeAmericas />, count: "100+", label: "Countries Available", color: "text-blue-500 dark:text-blue-400", bg: "bg-blue-50 dark:bg-blue-950/40" },
              { icon: <FaHome />, count: "5M+", label: "Active Listings", color: "text-red-500 dark:text-red-400", bg: "bg-red-50 dark:bg-red-950/40" },
              { icon: <FaUsers />, count: "10M+", label: "Happy Travelers", color: "text-green-500 dark:text-green-400", bg: "bg-green-50 dark:bg-green-950/40" },
            ].map((stat, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ y: -10 }}
                className="flex flex-col items-center"
              >
                <div className={`w-20 h-20 rounded-2xl flex items-center justify-center ${stat.color} ${stat.bg} text-3xl shadow-sm mb-6 rotate-3 hover:rotate-0 transition-transform duration-300`}>
                  {stat.icon}
                </div>
                <h3 className="text-4xl md:text-5xl font-extrabold font-outfit text-gray-900 dark:text-white mb-2 tracking-tight">{stat.count}</h3>
                <p className="text-gray-500 dark:text-slate-400 font-medium text-lg">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Mission & Values */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-extrabold font-outfit text-gray-900 dark:text-white tracking-tight mb-8">
              Why Choose <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-500">Rentora?</span>
            </h2>
            <div className="space-y-8">
              {[
                { icon: <FaHeart />, title: "Community First", desc: "We build global communities based on trust, respect, and shared love for authentic travel experiences." },
                { icon: <FaShieldAlt />, title: "Verified Security", desc: "Every host and guest goes through a robust verification process. Your safety is our highest priority." },
                { icon: <FaMapMarkedAlt />, title: "Belong Anywhere", desc: "Immerse yourself in local cultures. Experience cities not just as a tourist, but as a temporary local." }
              ].map((value, idx) => (
                <div key={idx} className="flex gap-6 group cursor-pointer">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-14 h-14 bg-gray-50 dark:bg-slate-800/60 text-gray-400 dark:text-slate-400 group-hover:bg-red-50 dark:group-hover:bg-red-950/40 group-hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-red-600 hover:to-orange-500 rounded-2xl flex items-center justify-center text-xl transition-all duration-300 group-hover:scale-110 shadow-sm">
                      {value.icon}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-xl font-bold font-outfit text-gray-900 dark:text-white mb-2 group-hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-red-600 hover:to-orange-500 transition-colors">{value.title}</h4>
                    <p className="text-gray-500 dark:text-slate-400 font-medium leading-relaxed">
                      {value.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-red-200 to-orange-100 dark:from-red-950/30 dark:to-orange-950/30 rounded-[3rem] transform rotate-3 scale-105 opacity-50"></div>
            <div className="relative rounded-[3rem] overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1488085061387-422e29b40080?auto=format&fit=crop&w=1000&q=80" 
                alt="Travelers" 
                className="w-full h-full object-cover"
              />
            </div>
            {/* Overlay card */}
            <div className="absolute -bottom-10 -left-10 bg-white dark:bg-[#0e1422] p-6 rounded-2xl shadow-xl shadow-gray-200/50 dark:shadow-black/70 border border-gray-100 dark:border-slate-800/80 animate-bounce" style={{ animationDuration: '3s' }}>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-950/40 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center">
                  <FaStar className="text-xl" />
                </div>
                <div>
                  <p className="font-bold font-outfit text-gray-900 dark:text-white">4.9/5 Rating</p>
                  <p className="text-xs text-gray-500 dark:text-slate-400 font-medium">From 10k+ reviews</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default About;
