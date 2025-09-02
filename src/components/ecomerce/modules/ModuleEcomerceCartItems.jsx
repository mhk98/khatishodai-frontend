// import React, { useEffect, useMemo, useState } from 'react';
// import { useSelector } from 'react-redux';
// import useEcomerce from '~/hooks/useEcomerce';
// import { Result } from 'antd';
// import CartProduct from '~/components/elements/products/CartProduct';
// import { useDeleteCartMutation, useGetAllCartQuery } from '~/react-redux/features/cart/cart';

// const ModuleEcomerceCartItems = ({ products }) => {
    
//     // Safely parse the cart items from localStorage
//         const cartItems = useMemo(() => {
//             try {
//                 return JSON.parse(localStorage.getItem('cart')) || [];
//             } catch {
//                 return [];
//             }
//         }, []);

//     const userId =
//     typeof window !== "undefined" ? localStorage.getItem("userId") : null;
//   const { data, isLoading, isError, error } = useGetAllCartQuery();
//   const [cart, setCart] = useState([]);

//   useEffect(() => {
//     if (isError) {
//       // Handle error, you can log it or display an error message.
//       console.error("Error fetching cart data:", error);
//     } else if (!isLoading) {
//       // Only set the cart if there is data and it's not already set to avoid infinite re-renders.
//       if (data && data.data) {
//         setCart(data.data);
//       }
//     }
//   }, [data, isLoading, isError, error]);

//   // Function to update the cart item quantity and update local storage
//   const updateQuantity = (id, newQuantity) => {
//     setCart((prevCart) =>
//       prevCart.map((item) => {
//         if (item.Cart_Id === id) {
//           // Update the quantity of the specific item
//           return { ...item, quantity: newQuantity };
//         }
//         return item;
//       })
//     );

//     // Recalculate and update the subtotal, discount, and total
//     const updatedSubtotal = calculateTotal();

//     const updatedDiscount = appliedDiscount; // You might need to recalculate the discount based on the updated cart.
//     const updatedTotal = updatedSubtotal - updatedDiscount;
//     setCartTotal(updatedTotal);

//     // Update the local storage with the new cart data after changing the state
//     const updatedCart = JSON.stringify(cart);
//     localStorage.setItem("cart", updatedCart);
//   };

//   // Function to calculate the subtotal of an item
//   const calculateSubtotal = (price, quantity) => price * quantity;

//   // Function to calculate the total cart price
//   const calculateTotal = () =>
//     cart.reduce(
//       (total, item) => total + calculateSubtotal(item.price, item.quantity),
//       0
//     );

//   const [deleteCart] = useDeleteCartMutation();
//   const handleDelete = async (id) => {
//     if (id) {
//       if (window.confirm("Do you want to delete?")) {
//         // First, update the state by filtering the item

//         console.log("productId", id);
//         const res = await deleteCart(id);

//         const updatedCart = cart.filter((item) => item.Cart_Id !== id);
//         setCart(updatedCart);

//         // Recalculate and update the subtotal, discount, and total
//         const updatedSubtotal = calculateTotal();
//         const updatedDiscount = appliedDiscount; // You might need to recalculate the discount based on the updated cart.
//         const updatedTotal = updatedSubtotal - updatedDiscount;
//         setCartTotal(updatedTotal);

//         // Update the local storage with the new cart data after removing the item
//         const updatedCartJSON = JSON.stringify(updatedCart);
//         localStorage.setItem("cart", updatedCartJSON);
//       }
//     }
//   };

//   const [couponCode, setCouponCode] = useState("");
//   const [appliedDiscount, setAppliedDiscount] = useState(0);
//   const [cartTotal, setCartTotal] = useState(calculateTotal());

//   // Function to handle changes in the coupon code input field
//   const handleCouponCodeChange = (e) => {
//     setCouponCode(e.target.value);
//   };

//   // Function to apply the coupon and calculate the discount
//   const applyCoupon = () => {
//     // You can add logic here to validate the coupon code and calculate the discount.
//     // For this example, we'll apply a fixed 20% discount if the coupon is "OCT".

//     if (couponCode === "OCT20") {
//       const totalBeforeDiscount = calculateTotal();
//       const discount = (totalBeforeDiscount * 20) / 100; // 20% discount
//       const discountedTotal = totalBeforeDiscount - discount;

//       setAppliedDiscount(discount);
//       setCartTotal(discountedTotal);
//     }
//   };

//   const handleProceedToCheckout = () => {
//     // Calculate the subtotal and total one more time
//     const subtotal = calculateTotal();
//     const total = subtotal - appliedDiscount;

//     // Store the values in localStorage
//     localStorage.setItem("subtotal", subtotal.toFixed(2));
//     localStorage.setItem("total", total.toFixed(2));

//     // router.push("/dark/shop-checkout/", { scroll: false });
//   };

//   const handleAlertCheckout = () => {
//     const confirmed = window.confirm(
//       "Please login first. Do you want to go to the login page?"
//     );

//     if (confirmed) {
//       router.push("/dark/login");
//     }
//   };
// //   const [createOrder] = useCreateOrderMutation();
// //   const handleCreateOrder = async () => {
// //     const subtotal = calculateTotal();
// //     const total = subtotal - appliedDiscount;
// //     const data = {
// //       orderDetails: cart,
// //       subtotal: subtotal.toFixed(2),
// //       total: total.toFixed(2),
// //     };
// //     const res = await createOrder(data);
// //     if (res) {
// //       toast.success("Now you are ready for proceed checkout");
// //       router.push("/dark/shop-checkout");
// //     }
// //   };

//     const cartItemsContent = useMemo(() => {
//         if (products.length === 0) {
//             return <Result status="warning" title="No product in cart." />;
//         }
//         return (
//             <table className="table  ps-table--shopping-cart ps-table--responsive">
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
//                     {products.map((item) => (
//                         <tr key={item.id}>
//                             <td>
//                                 {' '}
//                                 <CartProduct product={item} />
//                             </td>
//                             <td data-label="price" className="price">
//                                 ${item.price}
//                             </td>
//                             <td data-label="quantity">
//                                 <div className="form-group--number">
//                                     <button
//                                         className="up"
//                                         onClick={() =>
//                                             updateQuantity(item.id, item.quantity + 1)
//                                           }
//                                         >
//                                         +
//                                     </button>
//                                     <button
//                                         className="down"
//                                         onClick={() =>
//                                             updateQuantity(item.id, item.quantity - 1)
//                                           }
//                                         >
//                                         -
//                                     </button>
//                                     <input
//                                         className="form-control"
//                                         type="text"
//                                         placeholder={
//                                             cartItems.find(
//                                                 (i) => i.id === item.product_id
//                                             )?.quantity
//                                         }
//                                         disabled={true}
//                                     />
//                                 </div>
//                             </td>
//                             <td data-label="total">
//                                 <strong>
//                                     ${(item.price * item.quantity).toFixed(2)}
//                                 </strong>
//                             </td>
//                             <td>
//                                 <a
//                                     href="#"
//                                     onClick={(e) =>
//                                         handleRemoveItem(e, item.id)
//                                     }>
//                                     <i className="icon-cross" />
//                                 </a>
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         );
//     }, [ products]);

//     // View
//     return <>{cartItemsContent}</>;
// };

// export default ModuleEcomerceCartItems;





import React, { useEffect, useMemo, useState } from 'react';
import { Result } from 'antd';
import CartProduct from '~/components/elements/products/CartProduct';
import { useDeleteCartMutation, useGetAllCartQuery } from '~/react-redux/features/cart/cart';

const ModuleEcomerceCartItems = ({ products }) => {
    const [cart, setCart] = useState([]);
    const { data, isLoading, isError, error } = useGetAllCartQuery();
    const [deleteCart] = useDeleteCartMutation();

    useEffect(() => {
        // Sync with API cart data on load
        if (!isLoading && !isError && data?.data) {
            setCart(data.data);
        } else if (isError) {
            console.error('Error fetching cart data:', error);
        }
    }, [data, isLoading, isError, error]);

    // Sync localStorage with cart state
    useEffect(() => {
        try {
            const localCart = JSON.parse(localStorage.getItem('cart')) || [];
            setCart((prev) => (prev.length ? prev : localCart));
        } catch (err) {
            console.error('Failed to parse cart from localStorage:', err);
        }
    }, []);

    useEffect(() => {
        // Update localStorage whenever the cart state changes
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    // Update quantity
    const updateQuantity = (productId, newQuantity) => {
        setCart((prevCart) =>
            prevCart.map((item) =>
                item.product_id === productId
                    ? { ...item, quantity: Math.max(newQuantity, 1) }
                    : item
            )
        );
    };

    // Remove item from cart
    const handleRemoveItem = async (e, productId) => {
        e.preventDefault();
        if (window.confirm('Do you want to delete this item?')) {
            try {
                // API call to delete
                await deleteCart(productId).unwrap();
                // Update cart state and localStorage
                setCart((prevCart) =>
                    prevCart.filter((item) => item.product_id !== productId)
                );
            } catch (err) {
                console.error('Failed to delete cart item:', err);
                alert('Failed to remove item. Please try again.');
            }
        }
    };

    const cartItemsContent = useMemo(() => {
        if (cart.length === 0) {
            return <Result status="warning" title="No product in cart." />;
        }
        return (
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
                        <tr key={item.product_id}>
                            <td>
                                <CartProduct product={item} />
                            </td>
                            <td data-label="price" className="price">
                                ৳{item.price}
                            </td>
                            <td data-label="quantity">
                                <div className="form-group--number">
                                    <button
                                        className="up"
                                        onClick={() =>
                                            updateQuantity(
                                                item.product_id,
                                                item.quantity + 1
                                            )
                                        }
                                    >
                                        +
                                    </button>
                                    <button
                                        className="down"
                                        onClick={() =>
                                            updateQuantity(
                                                item.product_id,
                                                item.quantity - 1
                                            )
                                        }
                                    >
                                        -
                                    </button>
                                    <input
                                        className="form-control"
                                        type="text"
                                        value={item.quantity}
                                        readOnly
                                    />
                                </div>
                            </td>
                            <td data-label="total">
                                <strong>
                                    ৳{(item.price * item.quantity).toFixed(2)}
                                </strong>
                            </td>
                            <td>
                                <a
                                    href="#"
                                    onClick={(e) =>
                                        handleRemoveItem(e, item.product_id)
                                    }
                                >
                                    <i className="icon-cross" />
                                </a>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    }, [cart]);

    return <>{cartItemsContent}</>;
};

export default ModuleEcomerceCartItems;
