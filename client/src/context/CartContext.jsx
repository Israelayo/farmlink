import { createContext, useEffect, useState } from "react";

export const CartContext = createContext();

function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [isCartLoaded, setIsCartLoaded] = useState(false);
  useEffect(() => {
    const savedCart = localStorage.getItem("farmLinkCart");

    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
    setIsCartLoaded(true);
  }, []);
  useEffect(() => {
    if (isCartLoaded) {
      localStorage.setItem("farmLinkCart", JSON.stringify(cart));
    }
  }, [cart, isCartLoaded]);

  const addToCart = (product) => {
    setCart((currentCart) => {
      const existingProduct = currentCart.find(
        (item) => item.id === product.id,
      );

      if (existingProduct) {
        return currentCart.map((item) => {
          if (item.id === product.id && item.cartQuantity < item.quantity) {
            return {
              ...item,
              cartQuantity: item.cartQuantity + 1,
            };
          }

          return item;
        });
      }

      return [
        ...currentCart,
        {
          ...product,
          cartQuantity: 1,
        },
      ];
    });
  };
  const increaseQuantity = (productId) => {
    setCart((currentCart) => {
      return currentCart.map((item) => {
        if (item.id === productId && item.cartQuantity < item.quantity) {
          return {
            ...item,
            cartQuantity: item.cartQuantity + 1,
          };
        }

        return item;
      });
    });
  };

  const decreaseQuantity = (productId) => {
    setCart((currentCart) => {
      return currentCart.map((item) => {
        if (item.id === productId && item.cartQuantity > 1) {
          return {
            ...item,
            cartQuantity: item.cartQuantity - 1,
          };
        }

        return item;
      });
    });
  };

  const removeFromCart = (productId) => {
    setCart((currentCart) => {
      return currentCart.filter((item) => item.id !== productId);
    });
  };
  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export default CartProvider;
