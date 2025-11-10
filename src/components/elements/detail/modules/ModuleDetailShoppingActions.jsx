// import React, { useEffect, useState } from 'react';
// import { useCreateCartMutation, useGetAllCartQuery } from '~/react-redux/features/cart/cart';
// import { getUserInfo, isLoggedIn } from '~/components/services/auth.service';
// import { useRouter } from 'next/navigation';
// import { notification } from 'antd';

// const ModuleDetailShoppingActions = ({product}) => {
//     // const [quantity, setQuantity] = useState(1);
//     const router = useRouter();
//       const userLoggedIn = isLoggedIn();
//     const token = getUserInfo();
//     const id = token?.userId; // user id যদি থাকে


//     const { data, isLoading, isError, error } = useGetAllCartQuery();
//     const [cart, setCart] = useState([]);
  
//     useEffect(() => {
//       if (isError) {
//         // Handle error, you can log it or display an error message.
//         console.error2("Error fetching cart data:", error);
//       } else if (!isLoading) {
//         // Only set the cart if there is data and it's not already set to avoid infinite re-renders.
//         if (data && data.data) {
//           setCart(data.data);
//         }
//       }
//     }, [data, isLoading, isError, error]);
  
//     const [createCart] = useCreateCartMutation();
    
//  const handleAddItemToCart = async(product) => {
//     console.log('productAction', product)
//     if (cart.some((item) => Number(item.product_id) === Number(product.id))) {
//       notification.warning({
//               message: "Already in cart",
//               description: "This product is already in your cart.",
//             });
//     } else if(!userLoggedIn){
//       router.push("/account/login");

//     }else {
//       // Create a new cart with the added product
//       const updatedCart = [...cart, product];

//       setCart(updatedCart);
//       const data = {
//         title: product.title,
//         price: product.price,
//         default_image: product.default_image,
//         weight:1,
//         product_id:product.id,
//         user_id:id,
       
//       };


//        try {
//               const res = await createCart(data);
//               console.log("createCart response:", res);
      
//               if (res?.data?.success) {
//                 localStorage.setItem("cart", JSON.stringify(updatedCart));
      
//                 notification.success({
//                   message: "Success",
//                   description: "Product added to your cart successfully!",
//                 });
//               } else {
//                 notification.error({
//                   message: "Error",
//                   description:
//                     res?.error?.data?.message || "Failed to add product to cart.",
//                 });
//               }
//             } catch (err) {
//               console.error("Cart add error:", err);
//               notification.error({
//                 message: "Error",
//                 description: "Something went wrong while adding to cart.",
//               });
//             }
//     }
//   };


//     return (
//         <div className="ps-product__shopping extend">
//             <div className="ps-product__btn-group">
//                 <a
//                     className="ps-btn ps-btn--black"
//                             type="button"

//                     // onClick={() => handleAddItemToCart(product)}
//                     onClick={() => handleAddItemToCart(product)}>
                    
//                     Add to cart
//                 </a>
//                 {/* <div className="ps-product__actions">
//                     <a href="#" onClick={(e) => handleAddItemToWishlist(e)}>
//                         <i className="icon-heart" />
//                     </a>
//                     <a href="#" onClick={(e) => handleAddItemToCompare(e)}>
//                         <i className="icon-chart-bars" />
//                     </a>
//                 </div> */}
//             </div>
//         </div>
//     );
// };

// // export default connect((state) => state)(ModuleDetailShoppingActions);


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

  const { data, isLoading, isError, error } = useGetAllCartQuery();
  const [cart, setCart] = useState([]);
  const [createCart] = useCreateCartMutation();

  // Load cart from API or localStorage
  // useEffect(() => {
  //   if (isError) {
  //     console.error("Error fetching cart data:", error);
  //   } else if (!isLoading) {
  //     const apiCart = data?.data || [];
  //     const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
  //     // Merge API cart and localStorage cart (remove duplicates)
  //     const mergedCart = [...apiCart];
  //     storedCart.forEach(item => {
  //       if (!mergedCart.some(i => Number(i.product_id) === Number(item.product_id))) {
  //         mergedCart.push(item);
  //       }
  //     });
  //     setCart(mergedCart);
  //     localStorage.setItem("cart", JSON.stringify(mergedCart));
  //   }
  // }, [data, isLoading, isError, error]);

   // ✅ LocalStorage থেকে cart লোড করো
    useEffect(() => {
      const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
      setCart(storedCart);
    }, []);

  // const handleAddItemToCart = async (product) => {
  //   if (!product?.id) {
  //     notification.error({
  //       message: "Invalid Product",
  //       description: "Product information is missing.",
  //     });
  //     return;
  //   }

  //   const storedCart = JSON.parse(localStorage.getItem("cart")) || [];

  //   // Already in cart check
  //   if (storedCart.some(item => Number(item.product_id) === Number(product.id))) {
  //     notification.warning({
  //       message: "Already in cart",
  //       description: "This product is already in your cart.",
  //     });
  //     return;
  //   }

  //   // Login check
  //   if (!userLoggedIn) {
  //     router.push("/account/login");
  //     return;
  //   }

  //   const newCartItem = {
  //     title: product.title,
  //     price: product.price,
  //     default_image: product.default_image,
  //     weight: 1,
  //     quantity: 1,
  //     product_id: product.id,
  //     user_id: id,
  //   };

  //   const updatedCart = [...storedCart, newCartItem];
  //   setCart(updatedCart);
  //   localStorage.setItem("cart", JSON.stringify(updatedCart));

  //   try {
  //     await createCart(newCartItem).unwrap();
  //     notification.success({
  //       message: "Success",
  //       description: "Product added to your cart successfully!",
  //     });
  //   } catch (err) {
  //     console.error("Cart add error:", err);
  //     notification.error({
  //       message: "Error",
  //       description: err?.data?.message || "Failed to add product to cart.",
  //     });
  //   }
  // };


     const handleAddItemToCart = async (product) => {
          // ✅ Check login first
          if (!userLoggedIn) {
              router.push("/account/login");
              return;
          }
  
          // ✅ Ensure same ID type (int comparison)
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
  
          // ✅ New cart item
          const newCartItem = {
              title: product.title,
              price: product.price,
              default_image: product.default_image,
              weight: 1,
              quantity: 1,
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
  
                  // ✅ Update local state instantly
                  setCart((prev) => [...prev, newCartItem]);
  
                  // ✅ Refresh data from server to stay synced
                  await refetch();
              } else {
                  notification.error({
                      message: "Error",
                      description:
                          res?.error?.data?.message ||
                          "Failed to add product to cart.",
                  });
              }
          } catch (err) {
              console.error("Cart add error:", err);
              // notification.error({
              //     message: "Error",
              //     description: "Something went wrong while adding to cart.",
              // });
          }
      };
  return (
    <div className="ps-product__shopping extend">
      <div className="ps-product__btn-group">
        <button
          className="ps-btn ps-btn--black"
          type="button"
          onClick={() => handleAddItemToCart(product)}
        >
          Add to cart
        </button>
      </div>
    </div>
  );
};

export default ModuleDetailShoppingActions;
