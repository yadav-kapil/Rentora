import { useLoaderData } from "react-router-dom";

const Home = () => {

  const home = useLoaderData();

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">

      {/* Title Section */}
      <div className="mb-6">
        <h1 className="text-3xl font-semibold font-outfit text-gray-800">
          {home.title}
        </h1>

        <p className="text-gray-500 mt-1">
          {home.location}
        </p>
      </div>

      {/* Image */}
      <div className="w-full h-[400px] rounded-xl overflow-hidden mb-8">
        <img
          src={home.imageUrl}
          alt={home.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Details */}
      <div className="grid md:grid-cols-2 gap-8">

        {/* Description */}
        <div>
          <h2 className="text-xl font-semibold mb-2">
            Description
          </h2>

          <p className="text-gray-600 leading-relaxed">
            {home.description}
          </p>
        </div>

        {/* Price Card */}
        <div className="border rounded-xl p-6 shadow-sm h-fit">

          <p className="text-gray-500 text-sm mb-1">
            Price
          </p>

          <p className="text-2xl font-semibold text-red-600 mb-4">
            ₹ {home.price}
          </p>

          <button className="w-full bg-red-600 cursor-pointer text-white py-2 rounded-lg hover:bg-red-500 hover:scale-105 transition">
            Book Now
          </button>

        </div>

      </div>

    </div>
  );
};

export default Home;



export const homeLoader = async ({ params }) => {

  const res = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/api/homes/${params.id}`
  );

  if (!res.ok) {
    throw new Error("Home Not Found");
  }

  return res.json();
};