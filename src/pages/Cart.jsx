import { useCart } from "../context/CartContext";

export default function Cart() {
  const { cartItems, dispatch } = useCart();
  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const incrementQty = (id) => {
    dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity: getQty(id) + 1 } });
  };

  const decrementQty = (id) => {
    const currentQty = getQty(id);
    if (currentQty > 1) {
      dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity: currentQty - 1 } });
    }
  };

  const getQty = (id) => {
    return cartItems.find(item => item.id === id)?.quantity || 1;
  };

  const removeFromCart = (id) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: id });
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-[#cbdcf3] to-[#edf4fb] py-10 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-indigo-800 mb-10 drop-shadow-sm">
          Your Cart
        </h1>

        {cartItems.length === 0 ? (
          <p className="text-center text-gray-600 text-lg mt-12">🛒 Your cart is empty.</p>
        ) : (
          <div className="space-y-6">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-6 bg-white/60 backdrop-blur-md shadow-md rounded-2xl p-5 border border-indigo-100 transition-transform hover:scale-[1.01]"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-24 h-24 object-contain bg-white p-2 rounded-xl shadow"
                />
                <div className="flex-1">
                  <h2 className="text-xl font-semibold text-indigo-900">{item.title}</h2>
                  <p className="text-indigo-600 font-medium">${item.price}</p>
                  <div className="mt-2 flex items-center gap-2">
                    <button
                      onClick={() => decrementQty(item.id)}
                      className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded hover:bg-indigo-200"
                    >
                      –
                    </button>
                    <span className="font-medium text-indigo-800">{item.quantity}</span>
                    <button
                      onClick={() => incrementQty(item.id)}
                      className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded hover:bg-indigo-200"
                    >
                      +
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="bg-red-100 text-red-600 px-4 py-2 rounded-lg hover:bg-red-200 transition"
                >
                  Remove
                </button>
              </div>
            ))}

            <div className="text-right mt-8">
              <span className="text-2xl font-bold text-indigo-700">
                Total: ${total.toFixed(2)}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
