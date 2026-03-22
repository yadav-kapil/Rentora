import { Form, useLoaderData } from "react-router";
import { redirect } from "react-router-dom";


const EditHome = () => {

  const home = useLoaderData();

  return (
    <div className="max-w-xl mx-auto px-6 py-10">
      {/* Title */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold font-outfit text-gray-800">
          Add a New Home
        </h1>
        <p className="text-sm text-gray-500">
          Fill the details to list your property
        </p>
      </div>

      {/* Form */}
      <Form className="space-y-5" method="POST">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium mb-1">Title</label>
          <input
            type="text"
            name="title"
            defaultValue={home.title}
            placeholder="Luxury Apartment"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            rows="3"
            defaultValue={home.description}
            name="description"
            placeholder="Describe your property"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>

        {/* Image URL */}
        <div>
          <label className="block text-sm font-medium mb-1">Image URL</label>
          <input
            type="text"
            defaultValue={home.imageUrl}
            name='imageUrl'
            placeholder="https://..."
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>

        {/* Price */}
        <div>
          <label className="block text-sm font-medium mb-1">Price</label>
          <input
            type="number"
            defaultValue={home.price}
            name='price'
            placeholder="2500"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>

        {/* Location */}
        <div>
          <label className="block text-sm font-medium mb-1">Location</label>
          <input
            type="text"
            name='location'
            defaultValue={home.location}
            placeholder="Mumbai"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>

        {/* Submit */}
        <button className="w-full bg-red-600 text-white cursor-pointer py-2 rounded-lg font-semibold hover:bg-red-500 transition">
          Update
        </button>
      </Form>
    </div>
  );
};

export default EditHome;



export const editHomeLoader = async ({ params }) => {

  const res = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/api/homes/${params.id}`
  );

  if (!res.ok) {
    throw new Error("Home Not Found");
  }

  return res.json();
};


export const editHomeAction = async ({ request, params}) => {
  const formData = await request.formData();

  const home = Object.fromEntries(formData);

  const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/homes/${params.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ home }),
  });

  if (!res.ok) {
    throw new Error("Failed to Update home");
  }
  return redirect("/");
};
