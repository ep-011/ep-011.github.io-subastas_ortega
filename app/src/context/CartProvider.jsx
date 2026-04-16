// context/CartProvider.jsx
import { useReducer, useEffect } from "react";
import { CartContext } from "./CartContext";

const initialState = JSON.parse(localStorage.getItem("cart")) || [];

function cartReducer(state, action) {
    switch (action.type) {
        case "ADD_ITEM": {
            const existing = state.find(item => item.id === action.payload.id);
            if (existing) {
                // Si ya existe, aumenta los días y recalcula subtotal
                return state.map(item =>
                    item.id === action.payload.id
                        ? {
                            ...item,
                            days: item.days + 1,
                            subtotal: Number(item.price) * (item.days + 1),
                        }
                        : item
                );
            }
            // Si es nueva película, se agrega con subtotal inicial
            return [
                ...state,
                {
                    ...action.payload,
                    days: 1,
                    subtotal: Number(action.payload.price),
                },
            ];
        }
        case "REMOVE_ITEM": {
            return state.filter(item => item.id !== action.payload);
        }

        case "CLEAR_CART": {
            return [];
        }

        default:
            return state;
    }
}

export function CartProvider({ children }) {
    const [cart, dispatch] = useReducer(cartReducer, initialState);

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    const totalItems = cart.reduce((acc, item) => acc + item.days, 0);
    const totalPrice = cart.reduce((acc, item) => acc + item.price * item.days, 0);

    return (
        <CartContext.Provider value={{ cart, dispatch, totalItems, totalPrice }}>
            {children}
        </CartContext.Provider>
    );
}
