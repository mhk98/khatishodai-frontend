// "use client";
// import React, { useState, useEffect } from "react";
// import Link from "next/link";
// import { notification } from "antd";
// import { useRouter } from "next/navigation";
// import { useCreateCartMutation } from "~/react-redux/features/cart/cart";
// import { getUserInfo, isLoggedIn } from "~/components/services/auth.service";

// const OnHeaderProduct = ({ product }) => {
//   const router = useRouter();
//   const [cart, setCart] = useState([]);
//   const [createCart] = useCreateCartMutation();

//   const userLoggedIn = isLoggedIn();
//   const token = getUserInfo();
//   const id = token?.userId; // ✅ user_id fix করা হলো

//   // ✅ LocalStorage থেকে cart লোড করো
//   useEffect(() => {
//     const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
//     setCart(storedCart);
//   }, []);

//   const handleAddItemToCart = async (product) => {
//     if (!product?.id) {
//       notification.error({
//         message: "Invalid Product",
//         description: "Product information is missing.",
//       });
//       return;
//     }

//     const storedCart = JSON.parse(localStorage.getItem("cart")) || [];

//     // ✅ Already in cart চেক করা হলো storedCart থেকে
//     if (storedCart.some((item) => Number(item.product_id) === Number(product.id))) {
//       notification.warning({
//         message: "Already in cart",
//         description: "This product is already in your cart.",
//       });
//       return;
//     }

//    // ✅ Redirect to login if not logged in
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
//       // ✅ unwrap() ব্যবহার
//       await createCart(newCartItem).unwrap();

//       notification.success({
//         message: "Success",
//         description: "Product added to your cart successfully!",
//       });
//     } catch (err) {
//       console.error("Cart add error:", err);
//     //   notification.error({
//     //     message: "Error",
//     //     description: err?.data?.message || "Failed to add product to cart.",
//     //   });
//     }
//   };

//   return (
//     <div className="ps-product--header-sticky">
//       <div className="ps-product__thumbnail">
//         <Link href={`/product/${product.id}`}>
//           <img
//             src={`https://backend.eaconsultancy.info/${product?.default_image}`}
//             alt={product.title}
//           />
//         </Link>
//       </div>
//       <div className="ps-product__wrapper">
//         <div className="ps-product__content">{product.title}</div>
//         <div className="ps-product__shopping">
//           ৳{product.price}
//           <button
//             className="ps-btn"
//             style={{
//               marginLeft: "10px",
//               backgroundColor: "#333",
//               color: "#fff",
//             }}
//             type="button"
//             onClick={() => handleAddItemToCart(product)}
//           >
//             Add to Cart
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default OnHeaderProduct;

"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { notification } from "antd";
import { useRouter } from "next/navigation";
import { useCreateCartMutation } from "~/react-redux/features/cart/cart";
import { getUserInfo, isLoggedIn } from "~/components/services/auth.service";

const OnHeaderProduct = ({ product }) => {
  const router = useRouter();
  const [cart, setCart] = useState([]);
  const [createCart] = useCreateCartMutation();

  const userLoggedIn = isLoggedIn();
  const token = getUserInfo();
  const id = token?.userId;

  /* ---------------------------------------------------
      LOAD CART ON MOUNT
  --------------------------------------------------- */
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("local_cart")) || [];
    setCart(stored);
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

    // Already in Cart?
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

    // Save to localStorage & state
    setCart(updatedCart);
    localStorage.setItem("local_cart", JSON.stringify(updatedCart));

    // 🔥 Notify all cart components (MiniCart, Cart Page, Header Cart)
          window.dispatchEvent(new Event("local_cart_updated"));

    // API call only if user logged-in
    // if (userLoggedIn) {
    //   try {
    //     await createCart(newCartItem).unwrap();
    //     notification.success({
    //       message: "Success",
    //       description: "Product added to your cart successfully!",
    //     });
    //       window.dispatchEvent(new Event("local_cart_updated"));
    //   } catch (err) {
    //     console.error("Cart add error:", err);
    //   }
    // } else {
      notification.success({
        message: "Added to Cart",
        description: "Product added to your cart!",
      });
    // }
  };

  return (
    <div className="ps-product--header-sticky">
      <div className="ps-product__thumbnail">
        <Link href={`/product/${product.id}`}>
          <img
            src={`https://backend.eaconsultancy.info/${product?.default_image}`}
            alt={product.title}
          />
        </Link>
      </div>

      <div className="ps-product__wrapper">
        <div className="ps-product__content">{product.title}</div>
        <div className="ps-product__shopping">
          ৳{product.price}
          <button
            className="ps-btn"
            style={{
              marginLeft: "10px",
              backgroundColor: "#333",
              color: "#fff",
            }}
            type="button"
            onClick={() => handleAddItemToCart(product)}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default OnHeaderProduct;
