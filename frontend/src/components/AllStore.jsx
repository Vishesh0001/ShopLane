import { useEffect, useState } from "react";

const AllStoresWithProducts = () => {
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  // Fetch all stores (adjust your API endpoint accordingly)
  useEffect(() => {
    async function fetchStores() {
      try {
        const response = await fetch(`${API_BASE_URL}/getallstores`);
        if (response.ok) {
          const data = await response.json();
          setStores(data.stores || []);
        }
      } catch (error) {
        console.error("Failed to fetch stores:", error);
      }
      setLoading(false);
    }
    fetchStores();
  }, []);

  if (loading) return <div className="text-center mt-10 text-xl">Loading stores...</div>;

  return (
    <div className="max-w-screen-lg mx-auto px-4 py-8 mt-20">
      <h1 className="text-4xl font-bold mb-8 text-center">All Stores</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 w-100% mx-auto">
        {stores.length === 0 && (
          <p className="col-span-full text-center text-gray-600">No stores found.</p>
        )}
        {stores.map((store) => (
          <div key={store._id} className="bg-sage rounded-lg shadow-accent-lg p-4 hover:shadow-2xl transition-shadow hover:scale-105 ">
                  <img
              src="https://placehold.co/600x400?text=Store"
              alt="Store"
              className="w-full h-40 object-cover"
            />
            <h2 className="text-lg font-semibold mb-2">{store.storeName}</h2>
            <div className="text-sm text-base  mb-1">Owner: {store.ownerName}</div>
            <div className="text-sm text-base mb-3">Location: {store.storeLocation}</div>
            <div>
              <h3 className="font-semibold mb-1">Products:</h3>
              {store.products && store.products.length > 0 ? (
                <>
                  {store.products.slice(0, 2).map((product) => (
                    <div key={product._id} className="mb-3 p-2 border rounded text-white bg-accent/20">
                      <div className="font-medium">{product.productName}</div>
                      <div>Price: ₹{product.price}</div>
                      <div>Description: {product.description}</div>
                      <div>Quantity: {product.quantity}</div>
                    </div>
                  ))}
                </>
              ) : (
                <div className="text-gray-400">No products yet.</div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllStoresWithProducts;
