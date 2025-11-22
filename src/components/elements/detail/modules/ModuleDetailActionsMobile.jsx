// "use client";
// import React, { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { notification } from "antd";
// import { useCreateCartMutation } from "~/react-redux/features/cart/cart";
// import { getUserInfo, isLoggedIn } from "~/components/services/auth.service";

// const ModuleDetailActionsMobile = ({ product }) => {
//   const [cart, setCart] = useState([]);
//   const [createCart] = useCreateCartMutation();
//   const router = useRouter();

//   const userLoggedIn = isLoggedIn();
//   const token = getUserInfo();
//   const id = token?.userId;

//   // ✅ Load existing cart from localStorage on component mount
//   useEffect(() => {
//     const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
//     setCart(storedCart);
//   }, []);

//   // ✅ Handle Add to Cart
//   const handleAddItemToCart = async (product) => {
//     if (!product?.id) {
//       notification.error({
//         message: "Invalid Product",
//         description: "Product information is missing.",
//       });
//       return;
//     }

//     const storedCart = JSON.parse(localStorage.getItem("cart")) || [];

//     // ✅ Check if already in cart (from storedCart, not just state)
//     if (storedCart.some((item) => Number(item.product_id) === Number(product.id))) {
//       notification.warning({
//         message: "Already in cart",
//         description: "This product is already in your cart.",
//       });
//       return;
//     }

//     // ✅ Redirect to login if not logged in
// // if (!userLoggedIn) {
// //   alert("Please login first!");
// //   router.push("/account/login");
// //   return;
// // }


//     const newCartItem = {
//       title: product.title,
//       price: product.price,
//       default_image: product.default_image,
//       weight: 1,
//       quantity: 1,
//       product_id: product.id,
//       user_id: id,
//     };

//     const updatedCart = [...storedCart, newCartItem];
//     setCart(updatedCart);
//     localStorage.setItem("cart", JSON.stringify(updatedCart));

//     try {
//       // ✅ Use unwrap() for cleaner async handling
//       await createCart(newCartItem).unwrap();

//       notification.success({
//         message: "Success",
//         description: "Product added to your cart successfully!",
//       });
//     } catch (err) {
//       console.error("Cart add error:", err);
//       // notification.error({
//       //   message: "Error",
//       //   description: err?.data?.message || "Failed to add product to cart.",
//       // });
//     }
//   };

//   return (
//     <div className="ps-product__actions-mobile">
//       <button
//         type="button"
//         className="ps-btn ps-btn--black"
//         onClick={() => handleAddItemToCart(product)}
//       >
//         Add to Cart
//       </button>
//     </div>
//   );
// };

// export default ModuleDetailActionsMobile;


"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { notification } from "antd";
import { useCreateCartMutation } from "~/react-redux/features/cart/cart";
import { getUserInfo, isLoggedIn } from "~/components/services/auth.service";

const ModuleDetailActionsMobile = ({ product }) => {
  const [cart, setCart] = useState([]);
  const [createCart] = useCreateCartMutation();
  const router = useRouter();

  const userLoggedIn = isLoggedIn();
  const token = getUserInfo();
  const id = token?.userId;

  /* ---------------------------------------------------
      LOAD CART FROM LOCAL STORAGE
  --------------------------------------------------- */
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("local_cart")) || [];
    setCart(storedCart);
  }, []);

  /* ---------------------------------------------------
      ADD TO CART
  --------------------------------------------------- */
  const handleAddItemToCart = async (product) => {
    if (!product?.id) {
      notification.error({
        message: "Invalid Product",
        description: "Product information is missing.",
      });
      return;
    }

    const storedCart = JSON.parse(localStorage.getItem("local_cart")) || [];

    // Already in cart?
    if (storedCart.some((item) => Number(item.product_id) === Number(product.id))) {
      notification.warning({
        message: "Already in Cart",
        description: "This product is already in your cart.",
      });
      return;
    }

    const newCartItem = {
      title: product.title,
      price: product.price,
      default_image: product.default_image,
      weight: 1,
      quantity: 1,
      product_id: product.id,
      user_id: id,
    };

    const updatedCart = [...storedCart, newCartItem];

    // Save to state + localStorage
    setCart(updatedCart);
    localStorage.setItem("local_cart", JSON.stringify(updatedCart));

    // 🔥 VERY IMPORTANT — notify all cart components
        window.dispatchEvent(new Event("local_cart_updated"));


    // If logged-in → API call
    if (userLoggedIn) {
      try {
        await createCart(newCartItem).unwrap();
        notification.success({
          message: "Success",
          description: "Product added to your cart!",
        });
          window.dispatchEvent(new Event("local_cart_updated"));

      } catch (err) {
        console.error("Cart add error:", err);
      }
    } else {
      notification.success({
        message: "Added to Cart",
        description: "Product added to your cart!",
      });
    }
  };

  return (
    <div className="ps-product__actions-mobile">
      <button
        type="button"
        className="ps-btn ps-btn--black"
        onClick={() => handleAddItemToCart(product)}
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ModuleDetailActionsMobile;
