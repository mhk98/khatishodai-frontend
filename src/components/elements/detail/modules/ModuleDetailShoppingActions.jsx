// "use client";
// import React, { useEffect, useState } from 'react';
// import { useCreateCartMutation, useGetAllCartQuery } from '~/react-redux/features/cart/cart';
// import { getUserInfo, isLoggedIn } from '~/components/services/auth.service';
// import { useRouter } from 'next/navigation';
// import { notification } from 'antd';

// const ModuleDetailShoppingActions = ({ product }) => {
//   const router = useRouter();
//   const userLoggedIn = isLoggedIn();
//   const token = getUserInfo();
//   const id = token?.userId;

//   const { data, isLoading, isError, error } = useGetAllCartQuery();
//   const [cart, setCart] = useState([]);
//   const [createCart] = useCreateCartMutation();

//   // Load cart from API or localStorage
//   // useEffect(() => {
//   //   if (isError) {
//   //     console.error("Error fetching cart data:", error);
//   //   } else if (!isLoading) {
//   //     const apiCart = data?.data || [];
//   //     const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
//   //     // Merge API cart and localStorage cart (remove duplicates)
//   //     const mergedCart = [...apiCart];
//   //     storedCart.forEach(item => {
//   //       if (!mergedCart.some(i => Number(i.product_id) === Number(item.product_id))) {
//   //         mergedCart.push(item);
//   //       }
//   //     });
//   //     setCart(mergedCart);
//   //     localStorage.setItem("cart", JSON.stringify(mergedCart));
//   //   }
//   // }, [data, isLoading, isError, error]);

//    // ✅ LocalStorage থেকে cart লোড করো
//     useEffect(() => {
//       const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
//       setCart(storedCart);
//     }, []);


//      const handleAddItemToCart = async (product) => {
//           // ✅ Check login first
//           if (!userLoggedIn) {
//               router.push("/account/login");
//               return;
//           }
  
//           // ✅ Ensure same ID type (int comparison)
//           const alreadyInCart = cart.some(
//               (item) => Number(item.product_id) === Number(product.id)
//           );
  
//           if (alreadyInCart) {
//               notification.warning({
//                   message: "Already in cart",
//                   description: "This product is already in your cart.",
//               });
//               return;
//           }
  
//           // ✅ New cart item
//           const newCartItem = {
//               title: product.title,
//               price: product.price,
//               default_image: product.default_image,
//               weight: 1,
//               quantity: 1,
//               product_id: product.id,
//               user_id: id,
//           };
  
//           try {
//               const res = await createCart(newCartItem);
  
//               if (res?.data?.success) {
//                   notification.success({
//                       message: "Success",
//                       description: "Product added to your cart successfully!",
//                   });
  
//                   // ✅ Update local state instantly
//                   setCart((prev) => [...prev, newCartItem]);
  
//                   // ✅ Refresh data from server to stay synced
//                   await refetch();
//               } else {
//                   notification.error({
//                       message: "Error",
//                       description:
//                           res?.error?.data?.message ||
//                           "Failed to add product to cart.",
//                   });
//               }
//           } catch (err) {
//               console.error("Cart add error:", err);
//           }
//       };
//   return (
//      <div className="ps-product__shopping">
//                 <figure>
//                     <figcaption>Quantity</figcaption>
//                     <div className="form-group--number">
//                         <button
//                             className="up"
//                             onClick={(e) => handleIncreaseItemQty(e)}>
//                             <i className="fa fa-plus" />
//                         </button>
//                         <button
//                             className="down"
//                             onClick={(e) => handleDecreaseItemQty(e)}>
//                             <i className="fa fa-minus" />
//                         </button>
//                         <input
//                             className="form-control"
//                             type="text"
//                             placeholder={quantity}
//                             disabled
//                         />
//                     </div>
//                 </figure>
//                 <a
//                     className="ps-btn ps-btn--black"
//                     type="button"
//                     onClick={() => handleAddItemToCart(product)}
//                     >
//                     Add to cart
//                 </a>
//             </div>
//   );
// };

// export default ModuleDetailShoppingActions;


"use client";
import React, { useEffect, useState } from 'react';
import { useCreateCartMutation, useGetAllCartQuery } from '~/react-redux/features/cart/cart';
import { getUserInfo, isLoggedIn } from '~/components/services/auth.service';
import { useRouter } from 'next/navigation';
import { notification } from 'antd';

const ModuleDetailShoppingActions = ({ product }) => {
    const router = useRouter();
    const userLoggedIn = isLoggedIn();
    const token = getUserInfo();
    const id = token?.userId;

    const { data, isLoading, isError, error, refetch } = useGetAllCartQuery();
    const [cart, setCart] = useState([]);
    const [createCart] = useCreateCartMutation();

    // Quantity state
    const [quantity, setQuantity] = useState(1);

    // Load cart from LocalStorage
    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
        setCart(storedCart);
    }, []);

    // Increase Quantity
    const handleIncreaseItemQty = () => {
        setQuantity((prev) => prev + 1);
    };

    // Decrease Quantity
    const handleDecreaseItemQty = () => {
        if (quantity > 1) {
            setQuantity((prev) => prev - 1);
        }
    };

    // Add to Cart
    const handleAddItemToCart = async (product) => {
        if (!userLoggedIn) {
            router.push("/account/login");
            return;
        }

        const alreadyInCart = cart.some(
            (item) => Number(item.product_id) === Number(product.id)
        );

        if (alreadyInCart) {
            notification.warning({
                message: "Already in cart",
                description: "This product is already in your cart.",
            });
            return;
        }

        const newCartItem = {
            title: product.title,
            price: product.price,
            default_image: product.default_image,
            weight: quantity,
            quantity: quantity,
            product_id: product.id,
            user_id: id,
        };

        try {
            const res = await createCart(newCartItem);

            if (res?.data?.success) {
                notification.success({
                    message: "Success",
                    description: "Product added to your cart successfully!",
                });

                setCart((prev) => [...prev, newCartItem]);

                await refetch();
            } else {
                notification.error({
                    message: "Error",
                    description:
                        res?.error?.data?.message || "Failed to add product to cart.",
                });
            }
        } catch (err) {
            console.error("Cart add error:", err);
        }
    };

    return (
        <div className="ps-product__shopping">
            <figure>
                <figcaption>Quantity</figcaption>
                <div className="form-group--number">
                    <button className="up" onClick={handleIncreaseItemQty}>
                        <i className="fa fa-plus" />
                    </button>

                    <button className="down" onClick={handleDecreaseItemQty}>
                        <i className="fa fa-minus" />
                    </button>

                    <input
                        className="form-control"
                        type="text"
                        value={quantity}
                        readOnly
                    />
                </div>
            </figure>

            <a
                className="ps-btn ps-btn--black"
                onClick={() => handleAddItemToCart(product)}
            >
                Add to cart
            </a>
        </div>
    );
};

export default ModuleDetailShoppingActions;
