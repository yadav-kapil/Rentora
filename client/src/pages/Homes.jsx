import { NavLink, useLoaderData, useNavigate, useRevalidator } from "react-router-dom";

const Homes = () => {
  const homes = useLoaderData();
  const revalidator = useRevalidator();
  const navigate = useNavigate();


  const handleEdit = async (id) => {
    navigate(`/homes/${id}/edit`);
  }

  const handleDelete = async (id) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/homes/${id}`,
        {
          method: "DELETE",
        }
      );
      if (!res.ok) throw new Error("Failed to delete home");
      revalidator.revalidate(); // reload data
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-4">
      {/* Page Title */}
      <div className="mb-8">
        <h1 className="text-3xl font-semibold font-outfit text-gray-800">
          Your Homes
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          Manage and view all listed properties
        </p>
      </div>

      {/* Homes Grid */}
      <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-6">
        {homes.map((home) => (
          <div
            key={home._id}
            className="bg-white rounded-xl shadow-sm hover:shadow-md transition overflow-hidden"
          >
            {/* Clickable Card */}
            <NavLink to={`/homes/${home._id}`}>
              {/* Image */}
              <div className="h-48 w-full overflow-hidden">
                <img
                  src={home.imageUrl}
                  alt={home.title}
                  className="w-full h-full object-cover hover:scale-105 transition duration-300"
                />
              </div>

              {/* Content */}
              <div className="p-4 space-y-2">
                <h2 className="font-semibold text-lg text-gray-800">
                  {home.title}
                </h2>

                <p className="text-sm text-gray-500 line-clamp-2">
                  {home.description}
                </p>

                <div className="flex justify-between items-center pt-2">
                  <span className="text-red-600 font-semibold">
                    ₹ {home.price}
                  </span>

                  <span className="text-sm text-gray-500">
                    {home.location}
                  </span>
                </div>
              </div>
            </NavLink>

            {/* Actions OUTSIDE NavLink */}
            <div onClick={() => handleEdit(home._id)} className="flex justify-left gap-4 p-4">
              <button className="rounded-lg bg-black text-white px-2 py-1 hover:scale-95 hover:bg-gray-700 transition-all cursor-pointer">
                Edit
              </button>

              <button
                onClick={() => handleDelete(home._id)}
                className="rounded-lg bg-red-600 text-white px-2 py-1 hover:scale-95 hover:bg-red-500 cursor-pointer"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Homes;

export const getHomes = async () => {
  const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/homes`);

  if (!res.ok) {
    throw new Error("Internal Server Error");
  }

  return res.json();
};