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

// function CartContent() {
//   const router = useRouter();
//     const userLoggedIn = isLoggedIn();
  
//         const token = getUserInfo()
//         const id = token.userId
//   const { data, isLoading, isError, error } = useGetCartDataByIdQuery(id);

//   const [cart, setCart] = useState([]);
//   const [couponCode, setCouponCode] = useState("");
//   const [appliedDiscount, setAppliedDiscount] = useState(0);

//   console.log("productCart", cart)

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
//         const updatedCart = cart.filter((item) => item.product_id !== id);
//         setCart(updatedCart);
//         notification.success({
//                     message: "Success",
//                     description: "Item removed from cart",
//                   });
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
//       toast.success("Coupon applied successfully!");
//     } else {
//       toast.error("Invalid coupon code!");
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
                                   
//                                     onClick={() => handleDelete(item.product_id)}
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


import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  useDeleteCartMutation,
  useGetCartDataByIdQuery,
} from "~/react-redux/features/cart/cart";
import { getUserInfo, isLoggedIn } from "../services/auth.service";
import { useCreateOrderMutation } from "~/react-redux/features/order/order";
import CartProduct from "../elements/products/CartProduct";
import { notification } from "antd";

function CartContent() {
  const router = useRouter();
  const userLoggedIn = isLoggedIn();
  const token = getUserInfo();
  const id = token?.userId;

  const { data, isLoading, isError, error } = useGetCartDataByIdQuery(id);
  const [cart, setCart] = useState([]);
  const [couponCode, setCouponCode] = useState("");
  const [appliedDiscount, setAppliedDiscount] = useState(0);

  const [deleteCart] = useDeleteCartMutation();
  const [createOrder] = useCreateOrderMutation();

  // ✅ Load data from API and sync to localStorage
  useEffect(() => {
    if (isError) {
      console.error("Error fetching cart data:", error);
    } else if (!isLoading && data?.data) {
      setCart(data.data);
      localStorage.setItem("cart", JSON.stringify(data.data));
    }
  }, [data, isLoading, isError, error]);

  const calculateSubtotal = (price, quantity) => price * quantity;
  const calculateTotal = () =>
    cart.reduce(
      (total, item) => total + calculateSubtotal(item.price, item.quantity),
      0
    );

  // ✅ Remove from API + localStorage
  const handleDelete = async (product_id) => {
    if (product_id && window.confirm("Do you want to delete this item?")) {
      try {
        const res = await deleteCart(product_id);

        if (res?.data?.success) {
          // ✅ Remove from local state
          const updatedCart = cart.filter(
            (item) => item.product_id !== product_id
          );
          setCart(updatedCart);

          // ✅ Remove from localStorage
          const localCart = JSON.parse(localStorage.getItem("cart")) || [];
          const updatedLocalCart = localCart.filter(
            (item) => item.product_id !== product_id
          );
          localStorage.setItem("cart", JSON.stringify(updatedLocalCart));

          notification.success({
            message: "Removed",
            description: "Item removed from cart successfully.",
          });
        } else {
          notification.error({
            message: "Failed",
            description: "Could not remove item from cart.",
          });
        }
      } catch (err) {
        console.error("Error deleting cart item:", err);
        notification.error({
          message: "Error",
          description: "Something went wrong while removing item.",
        });
      }
    }
  };

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );

    // ✅ Update quantity in localStorage too
    const localCart = JSON.parse(localStorage.getItem("cart")) || [];
    const updatedLocalCart = localCart.map((item) =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    );
    localStorage.setItem("cart", JSON.stringify(updatedLocalCart));
  };

  const applyCoupon = () => {
    if (couponCode === "OCT20") {
      const discount = (calculateTotal() * 20) / 100;
      setAppliedDiscount(discount);
      toast.success("Coupon applied successfully!");
    } else {
      toast.error("Invalid coupon code!");
    }
  };

  const handleCreateOrder = async () => {
    const subtotal = calculateTotal();
    const total = subtotal - appliedDiscount;
    const orderData = {
      orderDetails: cart,
      subtotal: subtotal.toFixed(2),
      total: total.toFixed(2),
    };

    try {
      const res = await createOrder(orderData);
      if (res?.data?.success) {
        toast.success("Order created successfully!");
        // Optionally clear cart after order creation
        setCart([]);
        localStorage.removeItem("cart");
      } else {
        toast.error("Failed to create order!");
      }
    } catch (error) {
      console.error("Order creation error:", error);
      toast.error("Error while creating order!");
    }
  };

  const handleAlertCheckout = () => {
    if (
      window.confirm("Please login first. Do you want to go to the login page?")
    ) {
      router.push("/dark/login");
    }
  };

  return (
    <section className="shop-cart section-padding">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-11">
            <div className="cart-table">
              <table className="table ps-table--shopping-cart ps-table--responsive">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Total</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map((item) => (
                    <tr key={item.id}>
                      <td>
                        <CartProduct product={item} />
                      </td>
                      <td data-label="price" className="price">
                        ৳{item.price}
                      </td>
                      <td>
                        <div className="quantity-controls">
                          <button
                            className="quantity-btn decrement"
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                          >
                            -
                          </button>
                          <input
                            type="text"
                            value={item.quantity}
                            readOnly
                            className="quantity-input"
                          />
                          <button
                            className="quantity-btn increment"
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td data-label="total">
                        <strong>
                          ৳{(item.price * item.quantity).toFixed(2)}
                        </strong>
                      </td>
                      <td>
                        <a onClick={() => handleDelete(item.product_id)}>
                          <i className="icon-cross" />
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="row mt-80">
              <div className="col-lg-6">
                <figure>
                  <figcaption>Coupon Discount</figcaption>
                  <div className="form-group">
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Enter coupon here..."
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <button
                      className="ps-btn ps-btn--outline"
                      onClick={applyCoupon}
                    >
                      Apply
                    </button>
                  </div>
                </figure>
              </div>
              <div className="col-lg-4 offset-lg-2">
                {cart.length > 0 && (
                  <div className="cart-totals">
                    <h4>Cart Total</h4>

                    <div className="ps-block--shopping-total">
                      <div className="ps-block__header">
                        <p>
                          Subtotal:{" "}
                          <span>৳{calculateTotal().toFixed(2)}</span>
                        </p>
                      </div>
                      <div className="ps-block__header">
                        <p>
                          Discount:{" "}
                          <span>৳{appliedDiscount.toFixed(2)}</span>
                        </p>
                      </div>
                      <div className="ps-block__content">
                        <h3>
                          Total:{" "}
                          <span>
                            ৳{(calculateTotal() - appliedDiscount).toFixed(2)}
                          </span>
                        </h3>
                      </div>
                    </div>
                    {userLoggedIn ? (
                      <Link
                        href="/account/checkout"
                        onClick={handleCreateOrder}
                        className="ps-btn ps-btn--fullwidth"
                      >
                        Proceed to checkout
                      </Link>
                    ) : (
                      <button
                        onClick={handleAlertCheckout}
                        className="ps-btn ps-btn--fullwidth"
                      >
                        Login to proceed
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CartContent;
