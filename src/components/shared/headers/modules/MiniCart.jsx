// import React, { useEffect, useMemo, useState } from "react";
// import { useSelector } from "react-redux";
// import Link from "next/link";
// import OnCartProduct from "~/components/elements/products/OnCartProduct";
// import { calculateAmount } from "~/utilities/ecomerce-helpers";
// import {
//     useDeleteCartMutation,
//     useGetCartDataByIdQuery,
// } from "~/react-redux/features/cart/cart";
// import { notification } from "antd";
// import { getUserInfo, isLoggedIn } from "~/components/services/auth.service";

// const MiniCart = () => {
//     const userLoggedIn = isLoggedIn();
//     const token = getUserInfo();
//     const id = token?.userId;

//     const { data, isLoading, isError, error, refetch } = useGetCartDataByIdQuery(id);

//     const [deleteCart] = useDeleteCartMutation();
//     const [carts, setCarts] = useState([]);

//     // ✅ Sync API data & localStorage when fetched
//     useEffect(() => {
//         if (!isLoading && data?.data) {
//             setCarts(data.data);
//             localStorage.setItem("cart", JSON.stringify(data.data));
//         }
//     }, [data, isLoading]);

//     // ✅ Handle item remove
//     const handleRemoveItem = async (e, product_id) => {
//         e.preventDefault();
//         try {
//             const res = await deleteCart(product_id);

//             if (res?.data?.success === true) {
//                 // ✅ Remove from local state
//                 const updatedCart = carts.filter(
//                     (item) => item.product_id !== product_id
//                 );
//                 setCarts(updatedCart);

//                 // ✅ Remove from localStorage
//                 localStorage.setItem("cart", JSON.stringify(updatedCart));

//                 // ✅ Optional: Refetch latest cart data from API
//                 refetch();

//                 // ✅ Notify user
//                 notification.success({
//                     message: "Item Removed",
//                     description: "This product has been removed from your cart.",
//                     duration: 2,
//                 });
//             } else {
//                 notification.error({
//                     message: "Failed to Remove",
//                     description:
//                         res?.error?.data?.message ||
//                         "Could not remove item from cart.",
//                     duration: 2,
//                 });
//             }
//         } catch (error) {
//             console.error("Error removing cart item:", error);
//             notification.error({
//                 message: "Error",
//                 description: "Something went wrong while removing the item.",
//                 duration: 2,
//             });
//         }
//     };

//     // ✅ Prepare cart products
//     const cartProducts = useMemo(() => {
//         return carts.map((cart) => ({
//             id: cart.id,
//             title: cart.title || "Untitled Product",
//             default_image: cart.default_image || null,
//             price: cart.price || 0,
//             quantity: cart.quantity || 0,
//             product_id: cart.product_id,
//         }));
//     }, [carts]);

//     const cartAmount = useMemo(() => calculateAmount(cartProducts), [cartProducts]);

//     // ✅ Render cart UI
//     const cartItemsContent = useMemo(() => {
//         if (carts.length === 0) {
//             return (
//                 <div className="ps-cart__content">
//                     <div className="ps-cart__items">
//                         <span>No products in cart</span>
//                     </div>
//                 </div>
//             );
//         }

//         return (
//             <div className="ps-cart__content">
//                 <div className="ps-cart__items">
//                     {cartProducts.map((item) => (
//                         <OnCartProduct product={item} key={item.id}>
//                             <a
//                                 className="ps-product__remove"
//                                 onClick={(e) => handleRemoveItem(e, item.product_id)}
//                             >
//                                 <i className="icon-cross" />
//                             </a>
//                         </OnCartProduct>
//                     ))}
//                 </div>
//                 <div className="ps-cart__footer">
//                     <h3>
//                         Sub Total: <strong>৳{cartAmount}</strong>
//                     </h3>
//                     <figure>
//                         <Link href={"/account/shopping-cart"} className="ps-btn">
//                             View Cart
//                         </Link>
//                         {userLoggedIn ? (
//                             <Link href={"/account/checkout"} className="ps-btn">
//                                 Checkout
//                             </Link>
//                         ) : (
//                             <Link
//                                 href={`/account/login?redirect=/account/checkout`}
//                                 className="ps-btn"
//                             >
//                                 Checkout
//                             </Link>
//                         )}
//                     </figure>
//                 </div>
//             </div>
//         );
//     }, [cartProducts, carts]);

//     return (
//         <div className="ps-cart--mini">
//             <a className="header__extra" href="#">
//                 <i className="icon-bag2" />
//                 <span>
//                     <i>{carts.length}</i>
//                 </span>
//             </a>
//             {cartItemsContent}
//         </div>
//     );
// };

// export default MiniCart;


import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import OnCartProduct from "~/components/elements/products/OnCartProduct";
import { calculateAmount } from "~/utilities/ecomerce-helpers";
import {
    useDeleteCartMutation,
    useGetCartDataByIdQuery,
} from "~/react-redux/features/cart/cart";
import { notification } from "antd";
import { getUserInfo, isLoggedIn } from "~/components/services/auth.service";

const MiniCart = () => {
    const userLoggedIn = isLoggedIn();
    const token = getUserInfo();
    const userId = token?.userId;

    // DB cart only if logged in
    const { data, isLoading, refetch } = useGetCartDataByIdQuery(userId, {
        skip: !userLoggedIn,
    });

    const [deleteCart] = useDeleteCartMutation();
    const [carts, setCarts] = useState([]);

    // =====================================================
    // LOAD CART DATA
    // =====================================================
    const loadCart = () => {
        if (userLoggedIn) {
            if (!isLoading && data?.data) {
                setCarts(data.data);
                localStorage.setItem("local_cart", JSON.stringify(data.data));
            }
        } else {
            const localCart = JSON.parse(localStorage.getItem("local_cart")) || [];
            setCarts(localCart);
        }
    };

    useEffect(() => {
        loadCart();
    }, [userLoggedIn, data, isLoading]);

    // =====================================================
    // LISTEN FOR LOCAL CART UPDATES (NO RELOAD NEEDED)
    // =====================================================
    useEffect(() => {
        const updateCart = () => loadCart();

        window.addEventListener("local_cart_updated", updateCart);
        window.addEventListener("storage", updateCart);

        return () => {
            window.removeEventListener("local_cart_updated", updateCart);
            window.removeEventListener("storage", updateCart);
        };
    }, []);

    // =====================================================
    // REMOVE ITEM
    // =====================================================
    const handleRemoveItem = async (e, product_id) => {
        e.preventDefault();

        // Guest user → remove from localStorage
        if (!userLoggedIn) {
            const updated = carts.filter(item => item.product_id !== product_id);
            setCarts(updated);
            localStorage.setItem("local_cart", JSON.stringify(updated));
            window.dispatchEvent(new Event("local_cart_updated"));

            return notification.success({
                message: "Removed",
                description: "Item removed from cart.",
            });
        }

        // Logged in → Database remove
        const res = await deleteCart(product_id);

        if (res?.data?.success) {
            const updated = carts.filter(item => item.product_id !== product_id);
            setCarts(updated);
            localStorage.setItem("local_cart", JSON.stringify(updated));
            refetch();

            window.dispatchEvent(new Event("local_cart_updated"));

            return notification.success({
                message: "Removed",
                description: "Item removed from cart.",
            });
        }

        notification.error({
            message: "Error",
            description: "Failed to remove item.",
        });
    };

    // =====================================================
    // PREPARE CART PRODUCT
    // =====================================================
    const cartProducts = useMemo(() => {
        return carts.map(cart => ({
            id: cart.id,
            title: cart.title,
            default_image: cart.default_image,
            price: cart.price,
            quantity: cart.quantity,
            product_id: cart.product_id,
        }));
    }, [carts]);

    const cartAmount = useMemo(() => calculateAmount(cartProducts), [cartProducts]);

    return (
        <div className="ps-cart--mini">
            <a className="header__extra" href="#">
                <i className="icon-bag2" />
                <span>
                    <i>{carts.length}</i>
                </span>
            </a>

            <div className="ps-cart__content">
                {carts.length === 0 ? (
                    <div className="ps-cart__items">
                        <span>No products in cart</span>
                    </div>
                ) : (
                    <>
                        <div className="ps-cart__items">
                            {cartProducts.map((item) => (
                                <OnCartProduct product={item} key={item.product_id}>
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
                            <h3>
                                Sub Total: <strong>৳{cartAmount}</strong>
                            </h3>
                            <figure>
                                <Link href={"/account/shopping-cart"} className="ps-btn">
                                    View Cart
                                </Link>

                                {userLoggedIn ? (
                                    <Link href={"/account/checkout"} className="ps-btn">
                                        Checkout
                                    </Link>
                                ) : (
                                    <Link
                                        href={`/account/login?redirect=/account/checkout`}
                                        className="ps-btn"
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

export default MiniCart;
