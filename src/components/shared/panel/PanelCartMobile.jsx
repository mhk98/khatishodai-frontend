// import React, { useMemo } from 'react';
// import Link from 'next/link';
// import { notification } from 'antd';
// import { useDeleteCartMutation, useGetCartDataByIdQuery } from '~/react-redux/features/cart/cart';
// import { calculateAmount } from '~/utilities/ecomerce-helpers';
// import { getUserInfo, isLoggedIn } from '~/components/services/auth.service';
// import OnCartProduct from '~/components/elements/products/OnCartProduct';

// const PanelCartMobile = () => {
//     const userLoggedIn = isLoggedIn();
//     const token = getUserInfo();
//     const userId = token?.userId;

//     const { data, isLoading } = useGetCartDataByIdQuery(userId);
//     const carts = data?.data || [];

//     const [deleteCart] = useDeleteCartMutation();

//     // 🗑️ Remove item from server + localStorage
//     const handleRemoveItem = async (e, product_id) => {
//         e.preventDefault();

//         try {
//             const res = await deleteCart(product_id);

//             if (res.data?.success) {
//                 // ✅ Remove item from localStorage
//                 const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
//                 const updatedCart = existingCart.filter(
//                     (item) => item.product_id !== product_id
//                 );
//                 localStorage.setItem("cart", JSON.stringify(updatedCart));

//                 // 🔁 Optional: Trigger UI update if you sync with localStorage
//                 window.dispatchEvent(new Event("storage"));

//                 notification.open({
//                     message: 'Item Removed',
//                     description: 'This product has been removed from your cart',
//                     duration: 2,
//                 });
//             }
//         } catch (err) {
//             console.error("Error deleting cart item:", err);
//             notification.error({
//                 message: 'Error',
//                 description: 'Failed to remove item. Please try again.',
//                 duration: 2,
//             });
//         }
//     };

//     const cartProducts = useMemo(() => {
//         return carts.map((cart) => ({
//             id: cart.id,
//             title: cart.title || 'Untitled Product',
//             default_image: cart.default_image || null,
//             price: cart.price || 0,
//             quantity: cart.quantity || 1,
//             product_id: cart.product_id,
//         }));
//     }, [carts]);

//     const cartAmount = useMemo(() => calculateAmount(cartProducts), [cartProducts]);

//     return (
//         <div className="ps-cart--mobile-panel">
//             <div className="ps-cart__header">
//                 <h3>Your Cart ({carts.length} items)</h3>
//             </div>

//             <div className="ps-cart__content">
//                 {carts.length === 0 ? (
//                     <div className="ps-cart__empty">
//                         <p>Your cart is empty</p>
//                         <Link href="/shops" className="ps-btn ps-btn--fullwidth">
//                             Shop Now
//                         </Link>
//                     </div>
//                 ) : (
//                     <>
//                         <div className="ps-cart__items">
//                             {cartProducts.map((item) => (
//                                 <OnCartProduct product={item} key={item.id}>
//                                     <a
//                                         className="ps-product__remove"
//                                         onClick={(e) => handleRemoveItem(e, item.product_id)}
//                                     >
//                                         <i className="icon-cross" />
//                                     </a>
//                                 </OnCartProduct>
//                             ))}
//                         </div>

//                         <div className="ps-cart__footer">
//                             <h3>
//                                 Subtotal: <strong>৳{cartAmount}</strong>
//                             </h3>
//                             <figure>
//                                 <Link href="/account/shopping-cart" className="ps-btn ps-btn--fullwidth">
//                                     View Cart
//                                 </Link>
//                                 {userLoggedIn ? (
//                                     <Link
//                                         href="/account/checkout"
//                                         className="ps-btn ps-btn--fullwidth mt-3"
//                                     >
//                                         Checkout
//                                     </Link>
//                                 ) : (
//                                     <Link
//                                         href="/account/login?redirect=/account/checkout"
//                                         className="ps-btn ps-btn--fullwidth"
//                                     >
//                                         Checkout
//                                     </Link>
//                                 )}
//                             </figure>
//                         </div>
//                     </>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default PanelCartMobile;


"use client";
import React, { useMemo, useState, useEffect } from 'react';
import Link from 'next/link';
import { notification } from 'antd';
import { useDeleteCartMutation, useGetCartDataByIdQuery } from '~/react-redux/features/cart/cart';
import { calculateAmount } from '~/utilities/ecomerce-helpers';
import { getUserInfo, isLoggedIn } from '~/components/services/auth.service';
import OnCartProduct from '~/components/elements/products/OnCartProduct';

const PanelCartMobile = () => {
    const userLoggedIn = isLoggedIn();
    const token = getUserInfo();
    const userId = token?.userId;

    const { data, isLoading } = useGetCartDataByIdQuery(userId, { skip: !userLoggedIn });
    const [cart, setCart] = useState([]);

    const [deleteCart] = useDeleteCartMutation();

    // Load cart from API (logged-in) or localStorage (guest)
    useEffect(() => {
        if (userLoggedIn) {
            if (!isLoading && data?.data) {
                setCart(data.data);
                localStorage.setItem("local_cart", JSON.stringify(data.data));
            }
        } else {
            const localCart = JSON.parse(localStorage.getItem("local_cart")) || [];
            setCart(localCart);
        }
    }, [data, isLoading, userLoggedIn]);

    // Listen for cart updates from Add-to-Cart buttons
    useEffect(() => {
        const handleCartUpdated = () => {
            const localCart = JSON.parse(localStorage.getItem("local_cart")) || [];
            setCart(localCart);
        };
        window.addEventListener("cart_updated", handleCartUpdated);
        return () => window.removeEventListener("cart_updated", handleCartUpdated);
    }, []);

    // Remove item from cart
    const handleRemoveItem = async (e, product_id) => {
        e.preventDefault();

        if (!window.confirm("Do you want to remove this item?")) return;

        try {
            if (userLoggedIn) {
                const res = await deleteCart(product_id);
                if (!res.data?.success) {
                    notification.error({ message: 'Failed', description: 'Could not remove item.' });
                    return;
                }
            }

            const updatedCart = cart.filter((item) => item.product_id !== product_id);
            setCart(updatedCart);
            localStorage.setItem("local_cart", JSON.stringify(updatedCart));
            window.dispatchEvent(new Event("cart_updated"));

            notification.success({
                message: 'Removed',
                description: 'Item removed from cart successfully.',
            });
        } catch (err) {
            console.error("Error removing cart item:", err);
            notification.error({ message: 'Error', description: 'Something went wrong.' });
        }
    };

    const cartProducts = useMemo(() => {
        return cart.map((item) => ({
            id: item.id || item.product_id,
            title: item.title || 'Untitled Product',
            default_image: item.default_image || null,
            price: item.price || 0,
            quantity: item.quantity || 1,
            product_id: item.product_id,
        }));
    }, [cart]);

    const cartAmount = useMemo(() => calculateAmount(cartProducts), [cartProducts]);

    return (
        <div className="ps-cart--mobile-panel">
            <div className="ps-cart__header">
                <h3>Your Cart ({cart.length} items)</h3>
            </div>

            <div className="ps-cart__content">
                {cart.length === 0 ? (
                    <div className="ps-cart__empty">
                        <p>Your cart is empty</p>
                        <Link href="/shops" className="ps-btn ps-btn--fullwidth">
                            Shop Now
                        </Link>
                    </div>
                ) : (
                    <>
                        <div className="ps-cart__items">
                            {cartProducts.map((item) => (
                                <OnCartProduct product={item} key={item.id}>
                                    <a
                                        className="ps-product__remove"
                                        onClick={(e) => handleRemoveItem(e, item.product_id)}
                                    >
                                        <i className="icon-cross" />
                                    </a>
                                </OnCartProduct>
                            ))}
                        </div>

                        <div className="ps-cart__footer">
                            <h3>Subtotal: <strong>৳{cartAmount}</strong></h3>
                            <figure>
                                <Link href="/account/shopping-cart" className="ps-btn ps-btn--fullwidth">
                                    View Cart
                                </Link>
                                {userLoggedIn ? (
                                    <Link
                                        href="/account/checkout"
                                        className="ps-btn ps-btn--fullwidth mt-3"
                                    >
                                        Checkout
                                    </Link>
                                ) : (
                                    <Link
                                        href="/account/login?redirect=/account/checkout"
                                        className="ps-btn ps-btn--fullwidth mt-3"
                                    >
                                        Checkout
                                    </Link>
                                )}
                            </figure>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default PanelCartMobile;
