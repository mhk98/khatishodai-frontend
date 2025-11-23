

// 'use client';
// import React, { useEffect, useState } from 'react';
// import { Button, Modal, notification } from 'antd';
// import { useSelector } from 'react-redux';
// import ProductDetailQuickView from '~/components/elements/detail/ProductDetailQuickView';
// import { useCreateCartMutation, useGetCartDataByIdQuery } from '~/react-redux/features/cart/cart';
// import { getUserInfo, isLoggedIn } from '~/components/services/auth.service';
// import { useRouter } from 'next/navigation';

// const ProductActions = ({ product }) => {
//     const [isQuickView, setIsQuickView] = useState(false);
//     const router = useRouter();

//     const userLoggedIn = isLoggedIn();
//     const token = getUserInfo();
//     const id = token?.userId;

//     // ✅ Fetch cart by user ID
//     const { data, isLoading, isError, error, refetch } = useGetCartDataByIdQuery(id, {
//         skip: !id, // prevent fetching if not logged in
//     });

//     const [cart, setCart] = useState([]);
//     const [createCart] = useCreateCartMutation();

//     // ✅ Update local cart state when data changes
//     useEffect(() => {
//         if (isError) {
//             console.error("Error fetching cart data:", error);
//         } else if (!isLoading && data?.data) {
//             setCart(data.data);
//         }
//     }, [data, isLoading, isError, error]);

//     const handleAddItemToCart = async (product) => {
//        // ✅ Redirect to login if not logged in
// // if (!userLoggedIn) {
// //   alert("Please login first!");
// //   router.push("/account/login");
// //   return;
// // }


//         // ✅ Ensure same ID type (int comparison)
//         const alreadyInCart = cart.some(
//             (item) => Number(item.product_id) === Number(product.id)
//         );

//         if (alreadyInCart) {
//             notification.warning({
//                 message: "Already in cart",
//                 description: "This product is already in your cart.",
//             });
//             return;
//         }

//         // ✅ New cart item
//         const newCartItem = {
//             title: product.title,
//             price: product.price,
//             default_image: product.default_image,
//             weight: 1,
//             quantity: 1,
//             product_id: product.id,
//             user_id: id,
//         };

//         try {
//             const res = await createCart(newCartItem);

//             if (res?.data?.success) {
//                 notification.success({
//                     message: "Success",
//                     description: "Product added to your cart successfully!",
//                 });

//                 // ✅ Update local state instantly
//                 setCart((prev) => [...prev, newCartItem]);

//                 // ✅ Refresh data from server to stay synced
//                 await refetch();
//             } else {
//                 notification.error({
//                     message: "Error",
//                     description:
//                         res?.error?.data?.message ||
//                         "Failed to add product to cart.",
//                 });
//             }
//         } catch (err) {
//             console.error("Cart add error:", err);
//             // notification.error({
//             //     message: "Error",
//             //     description: "Something went wrong while adding to cart.",
//             // });
//         }
//     };

//     return (
//         <ul className="ps-product__actions">
//             <li>
//                 <Button
//                     title="Add To Cart"
//                     onClick={() => handleAddItemToCart(product)}
//                 >
//                     <i className="icon-bag2" />
//                 </Button>
//             </li>

//             <li>
//                 <Button
//                     title="Quick View"
//                     onClick={() => setIsQuickView(true)}
//                 >
//                     <i className="icon-eye" />
//                 </Button>
//             </li>

//             <Modal
//                 centered
//                 footer={null}
//                 width={1024}
//                 onCancel={() => setIsQuickView(false)}
//                 open={isQuickView}
//                 closeIcon={<i className="icon icon-cross2" />}
//             >
//                 <h3>Quickview</h3>
//                 <ProductDetailQuickView product={product} />
//             </Modal>
//         </ul>
//     );
// };

// export default ProductActions;


'use client';
import React, { useEffect, useState } from 'react';
import { Button, Modal, notification } from 'antd';
import ProductDetailQuickView from '~/components/elements/detail/ProductDetailQuickView';
import { useCreateCartMutation } from '~/react-redux/features/cart/cart';
import { getUserInfo, isLoggedIn } from '~/components/services/auth.service';
import { useRouter } from 'next/navigation';

const ProductActions = ({ product }) => {
    const [isQuickView, setIsQuickView] = useState(false);
    const router = useRouter();

    const userLoggedIn = isLoggedIn();
    const token = getUserInfo();
    const userId = token?.userId;

    const [createCart] = useCreateCartMutation();

    // ============================
    // ADD TO CART
    // ============================
    const handleAddItemToCart = async () => {
        // Product item body
        const newItem = {
            title: product.title,
            price: product.price,
            default_image: product.default_image,
            weight: 1,
            quantity: 1,
            product_id: product.id,
        };

        // ============================
        // 1) NOT LOGGED IN → LOCAL STORAGE
        // ============================
        if (!userLoggedIn) {
            let localCart = JSON.parse(localStorage.getItem("local_cart")) || [];

            const alreadyExists = localCart.some(
                item => Number(item.product_id) === Number(product.id)
            );

            if (alreadyExists) {
                return notification.warning({
                    message: "Already Added",
                    description: "Product is already in cart.",
                });
            }

            localCart.push(newItem);
            localStorage.setItem("local_cart", JSON.stringify(localCart));

            // 🔥 dispatch event to update MiniCart instantly
            window.dispatchEvent(new Event("local_cart_updated"));

            return notification.success({
                message: "Added to Cart",
                description: "Product added successfully!",
            });
        }

        // ============================
        // 2) LOGGED IN → DATABASE CART
        // ============================
        // const dbItem = { ...newItem, user_id: userId };

        // try {
        //     const res = await createCart(dbItem);

        //     if (res?.data?.success) {
        //         notification.success({
        //             message: "Success",
        //             description: "Product added to cart!",
        //         });

        //         // Sync MiniCart
        //         window.dispatchEvent(new Event("local_cart_updated"));
        //     } else {
        //         notification.error({
        //             message: "Error",
        //             description: "Failed to add product!",
        //         });
        //     }
        // } catch (err) {
        //     notification.error({
        //         message: "Error",
        //         description: "Something went wrong!",
        //     });
        // }
    };

    return (
        <ul className="ps-product__actions">
            <li>
                <Button title="Add To Cart" onClick={handleAddItemToCart}>
                    <i className="icon-bag2" />
                </Button>
            </li>

            <li>
                <Button title="Quick View" onClick={() => setIsQuickView(true)}>
                    <i className="icon-eye" />
                </Button>
            </li>

            <Modal
                centered
                footer={null}
                width={1024}
                onCancel={() => setIsQuickView(false)}
                open={isQuickView}
                closeIcon={<i className="icon icon-cross2" />}
            >
                <h3>Quickview</h3>
                <ProductDetailQuickView product={product} />
            </Modal>
        </ul>
    );
};

export default ProductActions;
