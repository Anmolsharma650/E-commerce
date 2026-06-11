import { createContext, useContext, useState } from "react";
import { toast } from "react-toastify";

export const CartContext = createContext(null);

export const Cartprovider = ({ children }) => {
  const [CartItem, setCartItem] = useState([]);

  const addToCart = (product) => {
    const ItemInCart = CartItem.find(
      (item) => item.id === product.id
    );

    if (ItemInCart) {
      const updatedCart = CartItem.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );

      setCartItem(updatedCart);
    } else {
      setCartItem([
        ...CartItem,
        { ...product, quantity: 1 }
      ]);
    }

    toast.success("Product Added To Cart!");
  };

  const updateQuantity = (productId, action) => {
    const updatedCart = CartItem
      .map((item) => {
        if (item.id === productId) {
          let newUnit = item.quantity;

          if (action === "increase") {
            newUnit++;
          } else if (action === "decrease") {
            newUnit--;
          }

          return newUnit > 0
            ? { ...item, quantity: newUnit }
            : null;
        }

        return item;
      })
      .filter((item) => item !== null);

    setCartItem(updatedCart);

    if (action === "increase") {
      toast.success("Product Added To Cart!");
    } else if (action === "decrease") {
      toast.error("Product Removed From Cart!");
    }
  };

  const removeFromCart = (productId) => {
    const updatedCart = CartItem.filter(
      (item) => item.id !== productId
    );

    setCartItem(updatedCart);

    toast.error("Product Removed From Cart!");
  };

  return (
    <CartContext.Provider
      value={{
        CartItem,
        setCartItem,
        addToCart,
        removeFromCart,
        updateQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);