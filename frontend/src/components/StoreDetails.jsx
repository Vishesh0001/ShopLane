import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { MapPin, User, Phone, BadgeIndianRupee, Package, FileText, PlusCircle, Edit, Trash2 } from "lucide-react";

export default function StoreDetails() {
  const navigate = useNavigate();
  const { storeId } = useParams();
  const [store, setStore] = useState(null);
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  async function deleteProduct(productId) {
    try {
      if (!window.confirm("Are you sure you want to delete this product?")) return;

      const response = await fetch(`${API_BASE_URL}/deleteproduct/${productId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setStore((prevStore) => ({
          ...prevStore,
          products: prevStore.products.filter((product) => product._id !== productId),
        }));
      } else {
        alert("Failed to delete product");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Error deleting product");
    }
  }

  useEffect(() => {
    const fetchStore = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/stores/${storeId}`);
        if (response.ok) {
          const data = await response.json();
          setStore(data);
        }
      } catch (error) {
        console.error("Error fetching store:", error);
      }
    };

    fetchStore();
  }, [storeId]);

  if (!store) return <p className="text-center mt-20 text-gray-600">Loading store...</p>;

  return (
    <div className="max-w-screen-lg mx-auto mt-24 px-4">
      {/* Store Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-extrabold text-accent">{store.storeName}</h1>
        <button
          className="flex items-center gap-2 px-4 py-2 bg-accent text-white font-medium rounded-lg hover:bg-accent/80 transition"
          onClick={() => navigate(`/addproduct/${storeId}`)}
        >
          <PlusCircle size={18} /> Add Product
        </button>
      </div>

      {/* Store Info */}
      <div className="bg-accent shadow-md rounded-xl p-6 mb-10 text-sage">
        <h2 className="text-2xl font-semibold mb-4 text-sage">Store Details</h2>
        <div className="space-y-2 text-sage">
          <p className="flex items-center gap-2">
            <MapPin size={18} className="text-neutral-600" /> 
            <span className="font-semibold">Location:</span> {store.storeLocation}
          </p>
          <p className="flex items-center gap-2">
            <User size={18} className="text-neutral-600" /> 
            <span className="font-semibold">Owner:</span> {store.ownerName}
          </p>
          <p className="flex items-center gap-2">
            <Phone size={18} className="text-neutral-600" /> 
            <span className="font-semibold">Contact:</span> {store.contactNumber}
          </p>
        </div>
      </div>

      {/* Products Section */}
      <h2 className="text-2xl font-semibold mb-4">Products</h2>
      {(!store.products || store.products.length === 0) ? (
        <p className="text-center text-gray-500 italic">No products found for this store.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {store.products.map((product) => (
            <div
              key={product._id}
              className="bg-sage shadow-md rounded-xl p-5 hover:shadow-lg transition text-base"
            >
              <h3 className="text-xl font-bold text-accent mb-3">{product.productName}</h3>
              <p className="flex items-center gap-2 text-base">
                <BadgeIndianRupee size={16} className="text-green-600" /> 
                <span className="font-medium">Price:</span> INR {product.price}
              </p>
              <p className="flex items-center gap-2 text-base">
                <Package size={16} className="text-blue-600" /> 
                <span className="font-medium">Stock:</span> {product.quantity}
              </p>
              <p className="flex items-center gap-2 text-base mb-4">
                <FileText size={16} className="text-gray-500" /> 
                {product.description}
              </p>

              <div className="flex space-x-3">
                <button
                  className="flex items-center gap-1 px-3 py-1 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                  onClick={() => navigate(`/editproduct/${product._id}`)}
                >
                  <Edit size={14} /> Edit
                </button>
                <button
                  className="flex items-center gap-1 px-3 py-1 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                  onClick={() => deleteProduct(product._id)}
                >
                  <Trash2 size={14} /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
