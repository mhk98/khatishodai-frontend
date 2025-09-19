// import React from 'react';

// const OrderTracking = () => (
//     <div className="ps-order-tracking">
//         <div className="container">
//             <div className="ps-section__header">
//                 <h3>Order Tracking</h3>
//                 <p>
//                     To track your order please enter your Order ID in the box
//                     below and press the "Track" button. This was given to youon
//                     your receipt and in the confirmation email you should have
//                     received.
//                 </p>
//             </div>
//             <div className="ps-section__content">
//                 <form
//                     className="ps-form--order-tracking"
//                     action="/"
//                     method="get">
//                     <div className="form-group">
//                         <label>Order ID</label>
//                         <input
//                             className="form-control"
//                             type="text"
//                             placeholder="Found in your order confimation email"
//                         />
//                     </div>
//                     <div className="form-group">
//                         <label>Billing Email</label>
//                         <input
//                             className="form-control"
//                             type="text"
//                             placeholder=""
//                         />
//                     </div>
//                     <div className="form-group">
//                         <button className="ps-btn ps-btn--fullwidth">
//                             Track Your Order
//                         </button>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     </div>
// );

// export default OrderTracking;



import React, { useEffect, useState } from 'react';
import { useGetOrderTrackingByIdQuery } from '~/react-redux/features/order/order';
import { Form, Input } from 'antd';

const OrderTracking = () => {
    const [orderId, setOrderId] = useState(""); // State to store the order ID
    const [order, setOrder] = useState(null); // Store order data in state

    // Track the API call status: loading, data, and error.
    const { data, isError, error, isLoading } = useGetOrderTrackingByIdQuery(orderId);

    const handleOrderTracking = (values) => {
        // Trigger the API call by setting the orderId state
        console.log('Tracking order ID:', values.orderId);
        setOrderId(values.orderId); // Update the orderId in state, this triggers the hook to refetch
    };

    useEffect(() => {
        if (isError) {
            console.error("Error fetching order tracking data", error);
        } else if (!isLoading) {
            if (data && data.data) {
                // Ensure that 'data.data' exists before setting it
                console.log("order", data)
                setOrder(data.data);
            } else {
                console.log("No data found for order tracking.");
            }
        }
    }, [data, isLoading, isError, error]);



    return (
        <div className="ps-order-tracking">
            <div className="container">
                <div className="ps-section__header">
                    <h3>Order Tracking</h3>
                    <p>
                        To track your order, please enter your Order ID in the box
                        below and press the "Track" button. This was given to you on
                        your receipt and in the confirmation email you should have
                        received.
                    </p>
                </div>
                <div className="ps-section__content">
                    <Form
                        onFinish={handleOrderTracking} // Handle form submission
                        className="ps-form--order-tracking"
                        layout="vertical"
                    >
                        <Form.Item
                            label="Order ID"
                            name="orderId"
                            rules={[{ required: true, message: 'Please enter your order ID!' }]}
                        >
                            <Input
                                className="form-control"
                                type="text"
                                placeholder="Please enter your order ID"
                            />
                        </Form.Item>

                        {/* You can include an additional field like Billing Email if needed */}

                        <Form.Item>
                            <div className="form-group">
                                <button 
                                    htmlType="submit"
                                    className="ps-btn ps-btn--fullwidth"
                                    loading={isLoading} // Show loading state while fetching data
                                >
                                    Track Your Order
                                </button>
                            </div>
                        </Form.Item>
                    </Form>

                    {/* Display order tracking status if available */}
                    {order && order.orderStatus ? (
                        <div className="ps-order-status text-center">
                            <h4>Order Status:</h4>
                            <p 
                            
                    //         className={`px-3 py-1 rounded-full inline-block ${
                    //   order.orderStatus === "Processing"
                    //     ? "text-yellow-500"
                    //     : order.orderStatus === "Shipped"
                    //     ? "text-blue-500"
                    //     : order.orderStatus === "Completed"
                    //     ? "text-green-600"
                    //     : order.orderStatus === "Cancelled"
                    //     ? "text-red-500"
                    //     : "text-gray-400"
                    // }`}

                    style={{
                padding: '0.25rem 0.5rem',
                borderRadius: '0.25rem',
                fontWeight: '600',
                color:
                    order.orderStatus === "Processing"
                        ? '#D97706' // yellow-500
                        : order.orderStatus === "Shipped"
                        ? '#3B82F6' // blue-500
                        : order.orderStatus === "Completed"
                        ? '#16A34A' // green-600
                        : order.orderStatus === "Cancelled"
                        ? '#EF4444' // red-500
                        : '#9CA3AF' // gray-400
            }}
                            >Order {order.orderStatus}</p> {/* Safely access orderStatus */}
                        </div>
                    ) : (
                        <p className='text-center'>No order status available.</p>
                    )}
                    {isError && <p style={{ color: 'red' }}>Failed to fetch order status. Please try again.</p>}
                </div>
            </div>
        </div>
    );
};

export default OrderTracking;
