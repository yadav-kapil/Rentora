const Privacy = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-extrabold font-outfit text-gray-900 dark:text-white mb-8">Privacy Policy</h1>
      <div className="prose prose-red text-gray-600 dark:text-slate-300 font-inter max-w-none">
        <p className="mb-4 text-gray-500 dark:text-slate-400">Last updated: {new Date().toLocaleDateString()}</p>
        <h2 className="text-2xl font-bold font-outfit text-gray-900 dark:text-white mt-8 mb-4">1. Information We Collect</h2>
        <p className="mb-4">We collect information you provide directly to us when you create an account, make a booking, or communicate with us.</p>
        <h2 className="text-2xl font-bold font-outfit text-gray-900 dark:text-white mt-8 mb-4">2. How We Use Information</h2>
        <p className="mb-4">We use the information we collect to provide, maintain, and improve our services, as well as to process your transactions.</p>
        <h2 className="text-2xl font-bold font-outfit text-gray-900 dark:text-white mt-8 mb-4">3. Information Sharing</h2>
        <p className="mb-4">We may share your information with hosts to facilitate your bookings or as required by law.</p>
      </div>
    </div>
  );
};

export default Privacy;
