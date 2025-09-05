import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { Pencil, Eye, Trash2 } from "lucide-react"; // ✅ import icons

export default function Dashboard() {
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const token = Cookies.get("token");
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  if (!token) {
    navigate("/login");
  }

  async function deleteStore(storeId) {
    try {
      if (!window.confirm("Are you sure you want to delete this store?")) {
        return;
      }
      const response = await fetch(
        `${API_BASE_URL}/deletestore/${storeId}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        }
      );
      if (response.ok) {
        setStores((prevStores) =>
          prevStores.filter((store) => store._id !== storeId)
        );
      } else {
        alert("Failed to delete store");
        console.error("Failed to delete store");
      }
    } catch (error) {
      console.error("Error deleting store:", error);
      alert("Error deleting store");
    }
  }

  const fetchStores = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/stores`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          token: token, // attach token here
        },
      });
      if (response.ok) {
        const data = await response.json();
        setStores(data.stores || []);
      } else {
        console.error("Failed to fetch stores");
      }
    } catch (error) {
      console.error("Error fetching stores:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStores();
  }, []);

  if (loading) {
    return <div className="text-center mt-10 text-xl">Loading stores...</div>;
  }

  return (
    <div className="max-w-screen-xl mx-auto px-4 py-8 mt-15">
      <h1 className="text-4xl font-bold mb-8 text-center">My Stores</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {stores.length === 0 && (
          <p className="col-span-full text-center text-gray-600">
            No stores found.
          </p>
        )}
        {stores.map((store) => (
          <div
            key={store._id}
            className="bg-sage rounded-lg shadow-accent-lg p-4 hover:shadow-2xl transition-shadow hover:scale-105"
          >
            <img
              src="https://placehold.co/600x400?text=Store"
              alt="Store"
              className="w-full h-40 object-cover"
            />
            <div className="p-4">
              <h2 className="text-lg font-semibold mb-2">
                {store.storeName}
              </h2>
              <p className="text-sm text-base">{store.storeLocation}</p>
              <p className="text-sm text-base">Owner: {store.ownerName}</p>
              <p className="text-sm text-base">
                Total Products: {store.products.length}
              </p>
              <div className="flex items-center justify-center mt-2 space-x-5">
                <button
                  className="flex items-center gap-1 border-base bg-accent text-sage text-sm px-2 py-1 rounded-2xl hover:bg-emerald-500"
                  onClick={() => navigate(`/editstore/${store._id}`)}
                >
                  <Pencil size={16} /> Edit
                </button>
                <button
                  className="flex items-center gap-1 border-base bg-accent text-sage rounded-2xl text-sm px-2 py-1 hover:bg-emerald-500"
                  onClick={() => navigate(`/stores/${store._id}`)}
                >
                  <Eye size={16} /> View
                </button>
                <button
                  className="flex items-center gap-1 border-base bg-accent text-sage rounded-2xl text-sm px-2 py-1 hover:bg-red-500"
                  onClick={() => deleteStore(store._id)}
                >
                  <Trash2 size={16} /> Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
