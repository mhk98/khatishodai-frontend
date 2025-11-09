"use client";
import React, { useState } from "react";
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
  const id = token?.userId; // user id যদি থাকে

  console.log("ModuleDetailActionsMobile", product)
  const handleAddItemToCart = async (product) => {
    if (cart.some((item) => item.product_id === product.id)) {
      notification.warning({
        message: "Already in cart",
        description: "This product is already in your cart.",
      });
    } else if (!userLoggedIn) {
      router.push("/account/login");
    } else {
      const newCartItem = {
        title: product.title,
        price: product.price,
        default_image: product.default_image,
        weight: 1,
        quantity: 1,
        product_id: product.id, // product_id ফিল্ড backend এর সাথে match করানো হলো
        user_id: id,
      };

      const updatedCart = [...cart, newCartItem];
      setCart(updatedCart);

      try {
        const res = await createCart(newCartItem);
        console.log("createCart response:", res);

        if (res?.data?.success) {
          localStorage.setItem("cart", JSON.stringify(updatedCart));

          notification.success({
            message: "Success",
            description: "Product added to your cart successfully!",
          });
        } else {
          notification.error({
            message: "Error",
            description:
              res?.error?.data?.message || "Failed to add product to cart.",
          });
        }
      } catch (err) {
        console.error("Cart add error:", err);
        notification.error({
          message: "Error",
          description: "Something went wrong while adding to cart.",
        });
      }
    }
  };

  return (
    <div className="ps-product__actions-mobile">
      <button
        type="button"
        className="ps-btn ps-btn--black"
        onClick={() => handleAddItemToCart(product)}
      >
        Add to cart
      </button>
    </div>
  );
};

export default ModuleDetailActionsMobile;
