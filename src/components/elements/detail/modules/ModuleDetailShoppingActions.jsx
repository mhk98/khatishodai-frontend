

// "use client";
// import React, { useEffect, useState } from 'react';
// import { useCreateCartMutation, useGetAllCartQuery } from '~/react-redux/features/cart/cart';
// import { getUserInfo, isLoggedIn } from '~/components/services/auth.service';
// import { useRouter } from 'next/navigation';
// import { notification } from 'antd';

// const ModuleDetailShoppingActions = ({ product }) => {
//     const router = useRouter();
//     const userLoggedIn = isLoggedIn();
//     const token = getUserInfo();
//     const id = token?.userId;

//     const { data, isLoading, isError, error, refetch } = useGetAllCartQuery();
//     const [cart, setCart] = useState([]);
//     const [createCart] = useCreateCartMutation();

//     // Quantity state
//     const [quantity, setQuantity] = useState(1);

//     // Load cart from LocalStorage
//     useEffect(() => {
//         const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
//         setCart(storedCart);
//     }, []);

//     // Increase Quantity
//     const handleIncreaseItemQty = () => {
//         setQuantity((prev) => prev + 1);
//     };

//     // Decrease Quantity
//     const handleDecreaseItemQty = () => {
//         if (quantity > 1) {
//             setQuantity((prev) => prev - 1);
//         }
//     };

//     // Add to Cart
//     const handleAddItemToCart = async (product) => {
//         // if (!userLoggedIn) {
//         //     router.push("/account/login");
//         //     return;
//         // }

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

//         const newCartItem = {
//             title: product.title,
//             price: product.price,
//             default_image: product.default_image,
//             weight: quantity,
//             quantity: quantity,
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

//                 setCart((prev) => [...prev, newCartItem]);

//                 await refetch();
//             } else {
//                 notification.error({
//                     message: "Error",
//                     description:
//                         res?.error?.data?.message || "Failed to add product to cart.",
//                 });
//             }
//         } catch (err) {
//             console.error("Cart add error:", err);
//         }
//     };

//     return (
//         <div className="ps-product__shopping">
//             <figure>
//                 <figcaption>Quantity</figcaption>
//                 <div className="form-group--number">
//                     <button className="up" onClick={handleIncreaseItemQty}>
//                         <i className="fa fa-plus" />
//                     </button>

//                     <button className="down" onClick={handleDecreaseItemQty}>
//                         <i className="fa fa-minus" />
//                     </button>

//                     <input
//                         className="form-control"
//                         type="text"
//                         value={quantity}
//                         readOnly
//                     />
//                 </div>
//             </figure>

//             <a
//                 className="ps-btn ps-btn--black"
//                 onClick={() => handleAddItemToCart(product)}
//             >
//                 Add to cart
//             </a>
//         </div>
//     );
// };

// export default ModuleDetailShoppingActions;


"use client";
import React, { useEffect, useState } from "react";
import { useCreateCartMutation } from "~/react-redux/features/cart/cart";
import { getUserInfo, isLoggedIn } from "~/components/services/auth.service";
import { notification } from "antd";

const ModuleDetailShoppingActions = ({ product }) => {
  const userLoggedIn = isLoggedIn();
  const token = getUserInfo();
  const id = token?.userId;

  const [cart, setCart] = useState([]);
  const [createCart] = useCreateCartMutation();
  const [quantity, setQuantity] = useState(1);

  // Load cart from localStorage
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("local_cart")) || [];
    setCart(storedCart);
  }, []);

  const handleIncreaseItemQty = () => setQuantity(prev => prev + 1);
  const handleDecreaseItemQty = () => quantity > 1 && setQuantity(prev => prev - 1);

  const handleAddItemToCart = async (product) => {
    if (!product?.id) return;

    const storedCart = JSON.parse(localStorage.getItem("local_cart")) || [];
    if (storedCart.some(item => Number(item.product_id) === Number(product.id))) {
      notification.warning({
        message: "Already in Cart",
        description: "This product is already in your cart."
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
      user_id: id
    };

    // Update localStorage & state
    const updatedCart = [...storedCart, newCartItem];
    localStorage.setItem("local_cart", JSON.stringify(updatedCart));
    setCart(updatedCart);

     // 🔥 dispatch event to update MiniCart instantly
            window.dispatchEvent(new Event("local_cart_updated"));

    if (userLoggedIn) {
      try {
        await createCart(newCartItem).unwrap();
        notification.success({
          message: "Success",
          description: "Product added to your cart successfully!"
        });
            window.dispatchEvent(new Event("local_cart_updated"));

      } catch (err) {
        console.error(err);
        notification.error({
          message: "Error",
          description: "Failed to sync with server."
        });
      }
    } else {
      notification.success({
        message: "Added to Cart",
        description: "Product added to your cart!"
      });
    }
  };

  return (
    <div className="ps-product__shopping">
      <figure>
        <figcaption>Quantity</figcaption>
        <div className="form-group--number">
          <button className="up" onClick={handleIncreaseItemQty}><i className="fa fa-plus" /></button>
          <button className="down" onClick={handleDecreaseItemQty}><i className="fa fa-minus" /></button>
          <input className="form-control" type="text" value={quantity} readOnly />
        </div>
      </figure>

      <button className="ps-btn ps-btn--black" onClick={() => handleAddItemToCart(product)}>
        Add to cart
      </button>
    </div>
  );
};

export default ModuleDetailShoppingActions;
