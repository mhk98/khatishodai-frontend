// import React, { useEffect, useMemo, useState } from 'react';
// import { Result } from 'antd';
// import CartProduct from '~/components/elements/products/CartProduct';
// import { useDeleteCartMutation, useGetAllCartQuery } from '~/react-redux/features/cart/cart';

// const ModuleEcomerceCartItems = ({ products }) => {
//     const [cart, setCart] = useState([]);
//     const { data, isLoading, isError, error } = useGetAllCartQuery();
//     const [deleteCart] = useDeleteCartMutation();

//     useEffect(() => {
//         // Sync with API cart data on load
//         if (!isLoading && !isError && data?.data) {
//             setCart(data.data);
//         } else if (isError) {
//             console.error('Error fetching cart data:', error);
//         }
//     }, [data, isLoading, isError, error]);

//     // Sync localStorage with cart state
//     useEffect(() => {
//         try {
//             const localCart = JSON.parse(localStorage.getItem('cart')) || [];
//             setCart((prev) => (prev.length ? prev : localCart));
//         } catch (err) {
//             console.error('Failed to parse cart from localStorage:', err);
//         }
//     }, []);

//     useEffect(() => {
//         // Update localStorage whenever the cart state changes
//         localStorage.setItem('cart', JSON.stringify(cart));
//     }, [cart]);

//     // Update quantity
//     const updateQuantity = (productId, newQuantity) => {
//         setCart((prevCart) =>
//             prevCart.map((item) =>
//                 item.product_id === productId
//                     ? { ...item, quantity: Math.max(newQuantity, 1) }
//                     : item
//             )
//         );
//     };

//     // Remove item from cart
//     const handleRemoveItem = async (e, productId) => {
//         e.preventDefault();
//         if (window.confirm('Do you want to delete this item?')) {
//             try {
//                 // API call to delete
//                 await deleteCart(productId).unwrap();
//                 // Update cart state and localStorage
//                 setCart((prevCart) =>
//                     prevCart.filter((item) => item.product_id !== productId)
//                 );
//             } catch (err) {
//                 console.error('Failed to delete cart item:', err);
//                 alert('Failed to remove item. Please try again.');
//             }
//         }
//     };

//     const cartItemsContent = useMemo(() => {
//         if (cart.length === 0) {
//             return <Result status="warning" title="No product in cart." />;
//         }
//         return (
//             <table className="table ps-table--shopping-cart ps-table--responsive">
//                 <thead>
//                     <tr>
//                         <th>Product</th>
//                         <th>Price</th>
//                         <th>Quantity</th>
//                         <th>Total</th>
//                         <th>Action</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {cart.map((item) => (
//                         <tr key={item.product_id}>
//                             <td>
//                                 <CartProduct product={item} />
//                             </td>
//                             <td data-label="price" className="price">
//                                 ৳{item.price}
//                             </td>
//                             <td data-label="quantity">
//                                 <div className="form-group--number">
//                                     <button
//                                         className="up"
//                                         onClick={() =>
//                                             updateQuantity(
//                                                 item.product_id,
//                                                 item.quantity + 1
//                                             )
//                                         }
//                                     >
//                                         +
//                                     </button>
//                                     <button
//                                         className="down"
//                                         onClick={() =>
//                                             updateQuantity(
//                                                 item.product_id,
//                                                 item.quantity - 1
//                                             )
//                                         }
//                                     >
//                                         -
//                                     </button>
//                                     <input
//                                         className="form-control"
//                                         type="text"
//                                         value={item.quantity}
//                                         readOnly
//                                     />
//                                 </div>
//                             </td>
//                             <td data-label="total">
//                                 <strong>
//                                     ৳{(item.price * item.quantity).toFixed(2)}
//                                 </strong>
//                             </td>
//                             <td>
//                                 <a
//                                     href="#"
//                                     onClick={(e) =>
//                                         handleRemoveItem(e, item.product_id)
//                                     }
//                                 >
//                                     <i className="icon-cross" />
//                                 </a>
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         );
//     }, [cart]);

//     return <>{cartItemsContent}</>;
// };

// export default ModuleEcomerceCartItems;


import React, { useEffect, useMemo, useState } from 'react';
import { Result } from 'antd';
import CartProduct from '~/components/elements/products/CartProduct';
import { useDeleteCartMutation, useGetAllCartQuery } from '~/react-redux/features/cart/cart';

const ModuleEcomerceCartItems = () => {
    const [cart, setCart] = useState([]);

    const { data, isLoading, isError, error } = useGetAllCartQuery();
    const [deleteCart] = useDeleteCartMutation();

    /* -------------------------------
       LOAD CART (API + LocalStorage Sync)
    --------------------------------*/
    useEffect(() => {
        if (!isLoading && !isError && data?.data) {
            // Logged-in user's API cart
            setCart(data.data);
            localStorage.setItem("cart", JSON.stringify(data.data));
        } 
        else {
            // Guest user local cart load
            try {
                const localCart = JSON.parse(localStorage.getItem("cart")) || [];
                setCart(localCart);
            } catch {
                console.error("Error parsing local cart");
            }
        }
    }, [data, isLoading, isError]);

    /* --------------------------------
       LISTEN FOR CART UPDATE EVENTS
    --------------------------------*/
    useEffect(() => {
        const syncCart = () => {
            const localCart = JSON.parse(localStorage.getItem("cart")) || [];
            setCart(localCart);
        };

        window.addEventListener("cart_updated", syncCart);

        return () => {
            window.removeEventListener("cart_updated", syncCart);
        };
    }, []);

    /* --------------------------------
       UPDATE QUANTITY
    --------------------------------*/
    const updateQuantity = (productId, newQuantity) => {
        const updated = cart.map((item) =>
            item.product_id === productId
                ? { ...item, quantity: Math.max(newQuantity, 1) }
                : item
        );

        setCart(updated);
        localStorage.setItem("cart", JSON.stringify(updated));
        window.dispatchEvent(new Event("cart_updated"));
    };

    /* --------------------------------
       REMOVE ITEM
    --------------------------------*/
    const handleRemoveItem = async (e, productId) => {
        e.preventDefault();

        if (!window.confirm("Do you want to delete this item?")) return;

        try {
            await deleteCart(productId).unwrap();
        } catch {
            console.warn("Not logged in or API delete failed. Removing from local only.");
        }

        const updated = cart.filter((item) => item.product_id !== productId);

        setCart(updated);
        localStorage.setItem("cart", JSON.stringify(updated));
        window.dispatchEvent(new Event("cart_updated"));
    };

    /* --------------------------------
       RENDER VIEW
    --------------------------------*/
    const cartItemsContent = useMemo(() => {
        if (cart.length === 0) {
            return <Result status="warning" title="No product in cart." />;
        }

        return (
            <table className="table ps-table--shopping-cart ps-table--responsive">
                <thead>
                    <tr>
                        <th>Product</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Total</th>
                        <th>Action</th>
                    </tr>
                </thead>

                <tbody>
                    {cart.map((item) => (
                        <tr key={item.product_id}>
                            <td>
                                <CartProduct product={item} />
                            </td>

                            <td data-label="price">৳{item.price}</td>

                            <td data-label="quantity">
                                <div className="form-group--number">
                                    <button
                                        className="up"
                                        onClick={() => updateQuantity(item.product_id, item.quantity + 1)}
                                    >
                                        +
                                    </button>

                                    <button
                                        className="down"
                                        onClick={() => updateQuantity(item.product_id, item.quantity - 1)}
                                    >
                                        -
                                    </button>

                                    <input
                                        className="form-control"
                                        type="text"
                                        value={item.quantity}
                                        readOnly
                                    />
                                </div>
                            </td>

                            <td data-label="total">
                                <strong>৳{(item.price * item.quantity).toFixed(2)}</strong>
                            </td>

                            <td>
                                <a href="#" onClick={(e) => handleRemoveItem(e, item.product_id)}>
                                    <i className="icon-cross" />
                                </a>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    }, [cart]);

    return <>{cartItemsContent}</>;
};

export default ModuleEcomerceCartItems;
