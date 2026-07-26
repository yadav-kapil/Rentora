const Terms = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-extrabold font-outfit text-gray-900 dark:text-white mb-8">Terms of Service</h1>
      <div className="prose prose-red text-gray-600 dark:text-slate-300 font-inter max-w-none">
        <p className="mb-4 text-gray-500 dark:text-slate-400">Last updated: {new Date().toLocaleDateString()}</p>
        <h2 className="text-2xl font-bold font-outfit text-gray-900 dark:text-white mt-8 mb-4">1. Agreement to Terms</h2>
        <p className="mb-4">By accessing or using our website, you agree to be bound by these Terms.</p>
        <h2 className="text-2xl font-bold font-outfit text-gray-900 dark:text-white mt-8 mb-4">2. User Accounts</h2>
        <p className="mb-4">You are responsible for safeguarding the password that you use to access the Service and for any activities or actions under your password.</p>
        <h2 className="text-2xl font-bold font-outfit text-gray-900 dark:text-white mt-8 mb-4">3. Booking and Cancellations</h2>
        <p className="mb-4">All bookings are subject to availability and the specific cancellation policy of each host.</p>
      </div>
    </div>
  );
};

export default Terms;
