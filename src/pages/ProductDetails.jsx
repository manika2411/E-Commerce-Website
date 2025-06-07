import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useCart } from '../context/CartContext';

export default function ProductDetails() {
  const { id } = useParams();
  const { dispatch, cartItems } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [added, setAdded] = useState(false);

  const alreadyInCart = cartItems.some(item => item.id === Number(id));

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then(res => res.json())
      .then(data => {
        // Simulate availability
        const withStock = {
          ...data,
          available: Math.random() > 0.05, // 70% in stock
        };
        setProduct(withStock);
        setLoading(false);
      });
  }, [id]);

  const handleAddToCart = () => {
    dispatch({ type: "ADD_TO_CART", payload: product });
    setAdded(true);
  };

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (!product) return <div className="text-center mt-10">Product not found.</div>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Link to="/shop" className="text-blue-500 hover:underline">&larr; Back to Shop</Link>

      <div className="grid md:grid-cols-2 gap-10 mt-6">
        <img src={product.image} alt={product.title} className="w-full h-80 object-contain bg-white" />

        <div>
          <h2 className="text-2xl font-bold mb-2">{product.title}</h2>
          <p className="text-gray-700 mb-4">{product.description}</p>
          <div className="text-xl font-semibold mb-4">${product.price}</div>

          {/* ✅ Your existing button */}
          {product && (
            <button
              onClick={handleAddToCart}
              disabled={!product.available || added || alreadyInCart}
              className={`px-6 py-2 rounded font-semibold transition duration-300 ${
                !product.available
                  ? "bg-gray-400 text-white cursor-not-allowed"
                  : added || alreadyInCart
                    ? "bg-green-600 text-white"
                    : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
            >
              <span className="inline-flex items-center gap-1">
                {!product.available
                  ? "Out of Stock"
                  : added || alreadyInCart
                    ? "✓ Added"
                    : <>🛒 Add to Cart</>}
              </span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
