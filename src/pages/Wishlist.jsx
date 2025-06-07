import { useWishlist } from "../context/WishlistContext";

export default function Wishlist() {
  const { wishlistItems, dispatch } = useWishlist();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f3f7ff] to-[#e0ecf8] py-10 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-indigo-800 mb-10">My Wishlist</h1>

        {wishlistItems.length === 0 ? (
          <p className="text-center text-gray-600 text-lg mt-12">💔 Your wishlist is empty.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishlistItems.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl shadow-lg p-4 flex flex-col items-center justify-between"
              >
                <img src={item.image} alt={item.title} className="w-28 h-28 object-contain mb-4" />
                <h2 className="text-lg font-semibold text-center">{item.title}</h2>
                <p className="text-indigo-600 font-bold">${item.price}</p>
                <button
                  onClick={() => dispatch({ type: "REMOVE_FROM_WISHLIST", payload: item.id })}
                  className="mt-4 px-4 py-2 bg-red-100 text-red-600 rounded hover:bg-red-200"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
