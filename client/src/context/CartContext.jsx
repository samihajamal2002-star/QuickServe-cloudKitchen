import { createContext, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {

    const [cart, setCart] = useState([]);

    const addToCart = (food) => {

        const exist = cart.find(item => item._id === food._id);

        if (exist) {

            setCart(

                cart.map(item =>

                    item._id === food._id

                        ? { ...item, qty: item.qty + 1 }

                        : item
                )

            );

        } else {

            setCart([

                ...cart,

                {

                    ...food,

                    qty: 1

                }

            ]);

        }

    };

    const removeItem = (id) => {

        setCart(cart.filter(item => item._id !== id));

    };

    const increaseQty = (id) => {

        setCart(

            cart.map(item =>

                item._id === id

                    ? { ...item, qty: item.qty + 1 }

                    : item

            )

        );

    };

    const decreaseQty = (id) => {

        setCart(

            cart.map(item =>

                item._id === id

                    ? {

                          ...item,

                          qty: Math.max(item.qty - 1, 1)

                      }

                    : item

            )

        );

    };

    const clearCart = () => {

        setCart([]);

    };

    return (

        <CartContext.Provider

            value={{

                cart,

                addToCart,

                removeItem,

                increaseQty,

                decreaseQty,

                clearCart

            }}

        >

            {children}

        </CartContext.Provider>

    );

};