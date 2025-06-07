import { Link } from "react-router-dom";
import { useWishlist } from "../context/WishlistContext";

export default function ProductCard({ product }) {
  const { wishlistItems, dispatch } = useWishlist();

  const isSaved = wishlistItems.some(item => item.id === product.id);

  const toggleWishlist = () => {
  if (isSaved) {
    dispatch({ type: "REMOVE_FROM_WISHLIST", payload: product.id });
  } else {
    dispatch({ type: "ADD_TO_WISHLIST", payload: product });
  }
};

  return (
    <div className="border rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition duration-300 flex flex-col">
      <img
        src={product.image}
        alt={product.title}
        className="w-full h-48 object-contain bg-white"
      />
      <div className="p-4 flex flex-col flex-grow">
        <h2 className="text-lg font-semibold mb-1">{product.title}</h2>
        <p className="text-gray-600 mb-1">${product.price}</p>

        {/* Optional availability */}
        {product.available !== undefined && (
          <p className={`mb-2 text-sm font-medium ${product.available ? "text-green-600" : "text-red-500"}`}>
            {product.available ? "In Stock" : "Out of Stock"}
          </p>
        )}

        <div className="mt-auto">
          <Link
            to={`/product/${product.id}`}
            className="text-blue-500 hover:underline text-sm"
          >
            View Details
          </Link>

          <button
            onClick={toggleWishlist}
            className={`block text-sm mt-2 transition-all duration-200 transform hover:scale-110 active:scale-95 ${
              isSaved ? "text-red-500" : "text-gray-400"
            }`}
          >
            {isSaved ? "❤️ Remove" : "🤍 Save"}
          </button>
        </div>
      </div>
    </div>
  );
}
