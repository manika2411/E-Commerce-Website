import { createContext, useContext, useReducer, useEffect } from "react";

const WishlistContext = createContext();

const initialState = {
  wishlistItems: JSON.parse(localStorage.getItem("wishlistItems")) || [],
};

const wishlistReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_WISHLIST":
      if (state.wishlistItems.find(item => item.id === action.payload.id)) return state;
      return {
        ...state,
        wishlistItems: [...state.wishlistItems, action.payload],
      };

    case "REMOVE_FROM_WISHLIST":
      return {
        ...state,
        wishlistItems: state.wishlistItems.filter(item => item.id !== action.payload),
      };

    default:
      return state;
  }
};

export const WishlistProvider = ({ children }) => {
  const [state, dispatch] = useReducer(wishlistReducer, initialState);

  useEffect(() => {
    localStorage.setItem("wishlistItems", JSON.stringify(state.wishlistItems));
  }, [state.wishlistItems]);

  return (
    <WishlistContext.Provider value={{ wishlistItems: state.wishlistItems, dispatch }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);
