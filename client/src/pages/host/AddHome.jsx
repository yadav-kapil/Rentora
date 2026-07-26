import { Form, Navigate } from "react-router";
import { redirect } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const AddHome = () => {
  const { isLoggedin } = useAuth();
  if (!isLoggedin) {
  return <Navigate to="/login" />;
}
  return (
    <div className="max-w-xl mx-auto px-4 py-8 sm:py-12">
      <div className="bg-white dark:bg-slate-800/80 rounded-2xl p-6 sm:p-8 shadow-lg shadow-gray-150/40 dark:shadow-black/40 border dark:border-slate-700/60">
        {/* Title */}
        <div className="mb-8 text-center sm:text-left">
          <h1 className="text-2xl sm:text-3xl font-extrabold font-outfit text-gray-900 dark:text-white tracking-tight">
            Add a New Home
          </h1>
          <p className="text-sm text-gray-405 dark:text-slate-400 mt-1.5 font-medium">
            Fill the details to list your property on Rentora
          </p>
        </div>

        {/* Form */}
        <Form className="space-y-6" method="POST">
          {/* Title */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-slate-400 mb-1.5 font-ubuntu">Title</label>
            <input
              type="text"
              name="title"
              placeholder="e.g. Cozy Apartment in Bandra"
              className="w-full border border-gray-100 dark:border-slate-600 rounded-xl px-4 py-2.5 text-gray-800 dark:text-slate-100 bg-gray-50/50 dark:bg-slate-700/60 focus:bg-white dark:focus:bg-slate-700 focus:outline-none focus:ring-4 focus:ring-red-500/10 focus:border-red-500 transition-all duration-200 font-inter text-sm"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-slate-400 mb-1.5 font-ubuntu">Description</label>
            <textarea
              rows="3"
              name="description"
              placeholder="Provide a detailed description of your property..."
              className="w-full border border-gray-100 dark:border-slate-600 rounded-xl px-4 py-2.5 text-gray-800 dark:text-slate-100 bg-gray-50/50 dark:bg-slate-700/60 focus:bg-white dark:focus:bg-slate-700 focus:outline-none focus:ring-4 focus:ring-red-500/10 focus:border-red-500 transition-all duration-200 font-inter text-sm resize-none"
              required
            />
          </div>

          {/* Image URL */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-slate-400 mb-1.5 font-ubuntu">Image URL</label>
            <input
              type="url"
              name="imageUrl"
              placeholder="https://images.unsplash.com/..."
              className="w-full border border-gray-100 dark:border-slate-600 rounded-xl px-4 py-2.5 text-gray-800 dark:text-slate-100 bg-gray-50/50 dark:bg-slate-700/60 focus:bg-white dark:focus:bg-slate-700 focus:outline-none focus:ring-4 focus:ring-red-500/10 focus:border-red-500 transition-all duration-200 font-inter text-sm"
              required
            />
          </div>

            {/* Price and Location */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-slate-400 mb-1.5 font-ubuntu">Price (₹ / night)</label>
                <input
                  type="number"
                  name="price"
                  placeholder="2500"
                  className="w-full border border-gray-100 dark:border-slate-600 rounded-xl px-4 py-2.5 text-gray-800 dark:text-slate-100 bg-gray-50/50 dark:bg-slate-700/60 focus:bg-white dark:focus:bg-slate-700 focus:outline-none focus:ring-4 focus:ring-red-500/10 focus:border-red-500 transition-all duration-200 font-inter text-sm"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-slate-400 mb-1.5 font-ubuntu">Location</label>
                <input
                  type="text"
                  name="location"
                  placeholder="Mumbai, Maharashtra"
                  className="w-full border border-gray-100 dark:border-slate-600 rounded-xl px-4 py-2.5 text-gray-800 dark:text-slate-100 bg-gray-50/50 dark:bg-slate-700/60 focus:bg-white dark:focus:bg-slate-700 focus:outline-none focus:ring-4 focus:ring-red-500/10 focus:border-red-500 transition-all duration-200 font-inter text-sm"
                  required
                />
              </div>
            </div>

            {/* Category, Bedrooms, Guests */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-slate-400 mb-1.5 font-ubuntu">Category</label>
                <select
                  name="category"
                  className="w-full border border-gray-100 dark:border-slate-600 rounded-xl px-4 py-2.5 text-gray-800 dark:text-slate-100 bg-gray-50/50 dark:bg-slate-700/60 focus:bg-white dark:focus:bg-slate-700 focus:outline-none focus:ring-4 focus:ring-red-500/10 focus:border-red-500 transition-all duration-200 font-inter text-sm"
                  required
                >
                  <option value="">Select Category</option>
                  <option value="Apartment">Apartment</option>
                  <option value="Villa">Villa</option>
                  <option value="Cabin">Cabin</option>
                  <option value="Beachfront">Beachfront</option>
                  <option value="Farmhouse">Farmhouse</option>
                </select>
              </div>
              
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-slate-400 mb-1.5 font-ubuntu">Bedrooms</label>
                <input
                  type="number"
                  name="bedrooms"
                  placeholder="2"
                  className="w-full border border-gray-100 dark:border-slate-600 rounded-xl px-4 py-2.5 text-gray-800 dark:text-slate-100 bg-gray-50/50 dark:bg-slate-700/60 focus:bg-white dark:focus:bg-slate-700 focus:outline-none focus:ring-4 focus:ring-red-500/10 focus:border-red-500 transition-all duration-200 font-inter text-sm"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-slate-400 mb-1.5 font-ubuntu">Guests</label>
                <input
                  type="number"
                  name="guestNumbers"
                  placeholder="4"
                  className="w-full border border-gray-100 dark:border-slate-600 rounded-xl px-4 py-2.5 text-gray-800 dark:text-slate-100 bg-gray-50/50 dark:bg-slate-700/60 focus:bg-white dark:focus:bg-slate-700 focus:outline-none focus:ring-4 focus:ring-red-500/10 focus:border-red-500 transition-all duration-200 font-inter text-sm"
                  required
                />
              </div>
            </div>

            {/* Amenities */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-slate-400 mb-1.5 font-ubuntu">Amenities (comma-separated)</label>
              <input
                type="text"
                name="amenities"
                placeholder="WiFi, Pool, Gym, Free Parking"
                className="w-full border border-gray-100 dark:border-slate-600 rounded-xl px-4 py-2.5 text-gray-800 dark:text-slate-100 bg-gray-50/50 dark:bg-slate-700/60 focus:bg-white dark:focus:bg-slate-700 focus:outline-none focus:ring-4 focus:ring-red-500/10 focus:border-red-500 transition-all duration-200 font-inter text-sm"
              />
            </div>

          {/* Submit */}
          <button className="w-full bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-500 hover:to-orange-400 text-white py-3 rounded-xl cursor-pointer font-bold transition duration-200 text-sm font-outfit mt-4 shadow-sm">
            Add Home
          </button>
        </Form>
      </div>
    </div>
  );
};

export default AddHome;

export const addHomeAction = async ({ request }) => {
  try {
    const formData = await request.formData();
    const home = Object.fromEntries(formData);
    
    // Cast numeric fields (FormData gives strings)
    if (home.price) home.price = Number(home.price);
    if (home.bedrooms) home.bedrooms = Number(home.bedrooms);
    if (home.guestNumbers) home.guestNumbers = Number(home.guestNumbers);
    
    // Parse amenities from comma-separated string to array
    if (home.amenities && typeof home.amenities === "string") {
      home.amenities = home.amenities.split(",").map(item => item.trim()).filter(Boolean);
    } else {
      home.amenities = [];
    }

    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/homes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({home}), 
    });

    // 🔥 Unauthorized
    if (res.status === 401) {
      return redirect("/login");
    }

    if (!res.ok) {
      throw new Error("Failed to create home");
    }
    return redirect("/host/homes", { replace: true });
  } catch (error) {
    console.log(error.message); 
    return redirect("/host/homes", { replace: true });
  } 
};
