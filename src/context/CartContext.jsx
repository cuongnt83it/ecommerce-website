import { createContext, useContext, useState } from 'react';
import { getProductById } from '../data/products';
import { set } from 'react-hook-form';

const CartContext = createContext(null);

const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);  //{id:2, quantity:10}

    const addToCart = (productid) => {
        setCartItems(prevItems => {
            const existingItem = prevItems.find(item => item.id === productid);
            if (existingItem) {
                return prevItems.map(item =>
                    item.id === productid ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            return [...prevItems, { id: productid, quantity: 1 }];
        });
    }
    const removeFromCart = (productid) => {
        setCartItems(cartItems.filter(item => item.id !== productid));
    }

    const updateCartItemQuantity = (productid, quantity) => {
        if (quantity <= 0) {
            removeFromCart(productid);
            return;
        }
        setCartItems(
            cartItems.map(item =>
                item.id === productid ? { ...item, quantity } : item
            )
        );
    }

    const getCartTotal = () => {
        const total = cartItems.reduce((total, cartItem) => {
            const product = getProductById(cartItem.id);
            return total + (product ? product.price * cartItem.quantity : 0);
        }, 0);
        return total;
    }
    const getCartItemWithProductDetails = () => {
        return cartItems.map(cartItem => {
            const product = getProductById(cartItem.id);
            return {
                ...cartItem,
                name: product.name,
                price: product.price,
                image: product.image
            }
        });
    }
    const clearCart = () => {
        setCartItems([]);
    }
    return <CartContext.Provider value={{
        addToCart, cartItems,
        getCartItemWithProductDetails,
        removeFromCart,
        updateCartItemQuantity,
        getCartTotal,
        clearCart,
    }}>
        {children}
    </CartContext.Provider>
}


const userCart = () => {
    const context = useContext(CartContext);
    return context;
}

export default CartProvider;

export { userCart };
