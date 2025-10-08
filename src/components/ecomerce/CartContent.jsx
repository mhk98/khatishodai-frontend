import React, { useEffect, useMemo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import ModuleEcomerceCartItems from '~/components/ecomerce/modules/ModuleEcomerceCartItems';
import ModuleCartSummary from '~/components/ecomerce/modules/ModuleCartSummary';
import { isLoggedIn } from '../services/auth.service';
import { useDeleteCartMutation, useGetAllCartQuery } from '~/react-redux/features/cart/cart';

export default function CartContent() {
    const userLoggedIn = isLoggedIn();

    const { data, refetch } = useGetAllCartQuery();
    const [deleteCart] = useDeleteCartMutation();
    const products = data?.data || [];

    // Safely parse the cart items from localStorage
    const cartItems = useMemo(() => {
        try {
            return JSON.parse(localStorage.getItem('cart')) || [];
        } catch {
            return [];
        }
    }, []);

    // Combine API and localStorage data
    const cartProducts = useMemo(() => {
        if (cartItems.length === 0) return [];
        return products.map((product) => {
            return {
                id: product.id,
                title: product.title || 'Untitled Product',
                thumbnailImage: product.default_image || null,
                price: product.price || 0,
                quantity:
                    cartItems.find((item) => item.product_id === product.product_id)
                        ?.quantity ?? 0,
            };
        });
    }, [products, cartItems]);

    // Handle delete operation
    const handleDelete = useCallback(
        async (productId) => {
            try {
                // Delete product from API
                const response = await deleteCart(productId);
                if (response.error) {
                    console.error('Failed to delete item from API:', response.error);
                    return;
                }

                // Remove item from localStorage
                const updatedCart = cartItems.filter(
                    (item) => item.product_id !== productId
                );
                localStorage.setItem('cart', JSON.stringify(updatedCart));

                // Refetch the cart items from API
                refetch();
            } catch (error) {
                console.error('Error deleting item:', error);
            }
        },
        [cartItems, deleteCart, refetch]
    );

    // Render content based on cart state
    const content = useMemo(() => {
        if (products.length === 0) {
            return (
                <div className="ps-section__content">
                    <div className="alert alert-info">
                        <p className="mb-0">Your cart is currently empty.</p>
                    </div>
                    <div className="ps-section__cart-actions">
                        <Link href={'/shops'} className="ps-btn">
                            Back to Shop
                        </Link>
                    </div>
                </div>
            );
        }
        return (
            <>
                <div className="ps-section__content">
                    <ModuleEcomerceCartItems
                        products={cartProducts}
                        onDelete={handleDelete} // Pass delete handler
                    />
                    <div className="ps-section__cart-actions">
                        <Link href={'/shops'} className="ps-btn">
                            Back to Shop
                        </Link>
                    </div>
                </div>
                <div className="ps-section__footer">
                    <div className="row justify-space-between">
                        <div className="col-xl-8 col-lg-4 col-md-12 col-sm-12 col-12">
                            <div className="row">
                                <div className="col-lg-6">
                                    <figure>
                                        <figcaption>Coupon Discount</figcaption>
                                        <div className="form-group">
                                            <input
                                                className="form-control"
                                                type="text"
                                                placeholder="Enter coupon here..."
                                            />
                                        </div>
                                        <div className="form-group">
                                            <button className="ps-btn ps-btn--outline">
                                                Apply
                                            </button>
                                        </div>
                                    </figure>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12">
                            <ModuleCartSummary source={cartProducts} />
                            {userLoggedIn ? (
                                <Link
                                    href={'/account/checkout'}
                                    className="ps-btn ps-btn--fullwidth"
                                >
                                    Proceed to checkout
                                </Link>
                            ) : (
                                <Link
                                    href={`/account/login?redirect=/account/checkout`}
                                    className="ps-btn ps-btn--fullwidth"
                                >
                                    Proceed to checkout
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </>
        );
    }, [products, cartProducts, handleDelete]);

    return <section>{content}</section>;
}



// import Image from "next/image";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { useEffect, useState } from "react";
// import toast from "react-hot-toast";
// import {
//   useDeleteCartMutation,
//   useGetAllCartQuery,
//   useGetCartDataByIdQuery,
// } from "~/react-redux/features/cart/cart";
// import { getUserInfo, isLoggedIn } from "../services/auth.service";
// import { useCreateOrderMutation } from "~/react-redux/features/order/order";
// import CartProduct from "../elements/products/CartProduct";
// import { notification } from "antd";

// function CartContent() {
//   const router = useRouter();
//     const userLoggedIn = isLoggedIn();
  
//         const token = getUserInfo()
//         const id = token.userId
//   const { data, isLoading, isError, error } = useGetCartDataByIdQuery(id);

//   const [cart, setCart] = useState([]);
//   const [couponCode, setCouponCode] = useState("");
//   const [appliedDiscount, setAppliedDiscount] = useState(0);

//   useEffect(() => {
//     if (isError) {
//       console.error("Error fetching cart data:", error);
//     } else if (!isLoading && data?.data) {
//       setCart(data.data);
//     }
//   }, [data, isLoading, isError, error]);

//   const calculateSubtotal = (price, quantity) => price * quantity;

//   const calculateTotal = () =>
//     cart.reduce(
//       (total, item) => total + calculateSubtotal(item.price, item.quantity),
//       0
//     );

//   const [deleteCart] = useDeleteCartMutation();
//   const handleDelete = async (id) => {
//     if (id && window.confirm("Do you want to delete?")) {
//       const res = await deleteCart(id);
//       if (res) {
//         const updatedCart = cart.filter((item) => item.id !== id);
//         setCart(updatedCart);
//         notification.success({
//           message: "Success",
//           description: "Product removed from your cart successfully!",
//         });
//       }
//     }
//   };

//   const updateQuantity = (id, newQuantity) => {
//     if (newQuantity < 1) return;
//     setCart((prevCart) =>
//       prevCart.map((item) =>
//         item.id === id ? { ...item, quantity: newQuantity } : item
//       )
//     );
//   };

//   const applyCoupon = () => {
//     if (couponCode === "OCT20") {
//       const discount = (calculateTotal() * 20) / 100;
//       setAppliedDiscount(discount);
//       notification.success({
//           message: "Success",
//           description: "Coupon applied successfully!",
//         });
//     } else {
//       notification.error({
//         message: "Error",
//         description: "Invalid coupon code!",
//       });
//     }
//   };

//   const handleCreateOrder = async () => {
//     const subtotal = calculateTotal();
//     const total = subtotal - appliedDiscount;
//     const orderData = {
//       orderDetails: cart,
//       subtotal: subtotal.toFixed(2),
//       total: total.toFixed(2),
//     };

//     const res = await createOrder(orderData);
//     if (res) {
//       toast.success("Order created successfully!");
//       router.push("/dark/shop-checkout");
//     }
//   };

//   const handleAlertCheckout = () => {
//     if (window.confirm("Please login first. Do you want to go to the login page?")) {
//       router.push("/dark/login");
//     }
//   };

//   return (
//     <section className="shop-cart section-padding">
//       <div className="container">
//         <div className="row justify-content-center">
//           <div className="col-lg-11">
//             <div className="cart-table">
//               {/* <table>
//                 <thead>
//                   <tr>
//                     <th>Product</th>
//                     <th>Price</th>
//                     <th>Quantity</th>
//                     <th>Subtotal</th>
//                     <th>&nbsp;</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {cart.map((item) => (
//                     <tr key={item.Cart_Id}>
//                       <td>
//                         <div className="product-info">
//                           <Image
//                             src={item.image}
//                             alt={item.title}
//                             width={80}
//                             height={80}
//                           />
//                           <Link href={`/product/${item.product_id}`}>
//                             <h5>{item.title}</h5>
//                           </Link>
//                         </div>
//                       </td>
//                       <td>${item.price.toFixed(2)}</td>
//                       <td>
//                         <div className="quantity-controls">
//                           <button
//                             onClick={() =>
//                               updateQuantity(item.Cart_Id, item.quantity - 1)
//                             }
//                           >
//                             -
//                           </button>
//                           <input
//                             type="text"
//                             value={item.quantity}
//                             readOnly
//                           />
//                           <button
//                             onClick={() =>
//                               updateQuantity(item.Cart_Id, item.quantity + 1)
//                             }
//                           >
//                             +
//                           </button>
//                         </div>
//                       </td>
//                       <td>${calculateSubtotal(item.price, item.quantity).toFixed(2)}</td>
//                       <td>
//                         <button
//                           onClick={() => handleDelete(item.Cart_Id)}
//                           className="remove-btn"
//                         >
//                           X
//                         </button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table> */}

// <table className="table  ps-table--shopping-cart ps-table--responsive">
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
//                         <tr key={item.id}>
//                             <td>
                                
//                                 <CartProduct product={item} />
//                             </td>
//                             <td data-label="price" className="price">
//                                 ৳{item.price}
//                             </td>
//                             <td>
//   <div className="quantity-controls">
//     <button
//       className="quantity-btn decrement"
//       onClick={() => updateQuantity(item.id, item.quantity - 1)}
//     >
//       -
//     </button>
//     <input
//       type="text"
//       value={item.quantity}
//       readOnly
//       className="quantity-input"
//     />
//     <button
//       className="quantity-btn increment"
//       onClick={() => updateQuantity(item.id, item.quantity + 1)}
//     >
//       +
//     </button>
//   </div>
// </td>

//                             <td data-label="total">
//                                 <strong>
//                                     ৳{(item.price * item.quantity).toFixed(2)}
//                                 </strong>
//                             </td>
//                             <td>
//                                 <a
                                   
//                                     onClick={() => handleDelete(item.id)}
//                                     >
//                                     <i className="icon-cross" />
//                                 </a>
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//             </div>

//             <div className="row mt-80">
//               <div className="col-lg-6">
              
//                                     <figure>
//                                         <figcaption>Coupon Discount</figcaption>
//                                         <div className="form-group">
//                                             <input
//                                              className="form-control"
//                                                 type="text"
//                                                 placeholder="Enter coupon here..."
//                                                 value={couponCode}
//                                         onChange={(e) => setCouponCode(e.target.value)}
                     
//                                            />
//                                        </div>
//                                        <div className="form-group">
//                                            <button className="ps-btn ps-btn--outline" onClick={applyCoupon}>
//                                               Apply
//                                            </button>
//                                         </div>
//                                     </figure>
                              
//               </div>
//               <div className="col-lg-4 offset-lg-2">
//                 {cart.length > 0 && (
//                   <div className="cart-totals">
//                     <h4>Cart Total</h4>

// <div className="ps-block--shopping-total">
//             <div className="ps-block__header">
//                 <p>
//                     Subtotal: <span>৳{calculateTotal().toFixed(2)}</span>
//                 </p>
//             </div>
//             <div className="ps-block__header">
//                 <p>
//                     Discount: <span>৳{appliedDiscount.toFixed(2)}</span>
//                 </p>
//             </div>
//             <div className="ps-block__content">
//                 <h3>
//                     Total: <span>৳{(calculateTotal() - appliedDiscount).toFixed(2)}</span>
//                 </h3>
//             </div>
//         </div>
//                     {userLoggedIn ? (
                      
//                       <Link href="/account/checkout"
//                       onClick={handleCreateOrder}
//                       className="ps-btn ps-btn--fullwidth">
//                       Proceed to checkout
//                   </Link>
//                     ) : (
//                       <button 
//                       // onClick={handleAlertCheckout} 
//                       href={`/account/login?redirect=/account/checkout`}
//                       className="ps-btn ps-btn--fullwidth">
//                         Login to proceed
//                       </button>
//                     )}
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

// export default CartContent;
