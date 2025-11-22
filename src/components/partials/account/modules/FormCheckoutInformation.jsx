import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import { Form, Input, Checkbox, Radio } from 'antd'; 
import { useRouter } from 'next/navigation';
import { useCreateOrderMutation } from '~/react-redux/features/order/order';
import { useGetCartDataByIdQuery } from '~/react-redux/features/cart/cart';
import { getUserInfo } from '~/components/services/auth.service';

export default function FormCheckoutInformation() {
    const token = getUserInfo();
    const id = token.userId;
    const router = useRouter();

    const [method, setMethod] = useState(1); // Initialize the method state with default value

    const handleChangeMethod = (e) => {
        setMethod(e.target.value);
    };

    const paymentMethod = method === 1 ? 'Cash On Delivery' : 'Online Payment';

    // const { data } = useGetAllCartQuery();
    // const products = data?.data || [];

            const { data, refetch } = useGetCartDataByIdQuery(id);
    
    const products = data?.data || [];


    const cartProducts = useMemo(() => {
        return products.map((product) => {
            const price = product.price || 0;
            const quantity = product?.quantity || 0;
            const subTotal = price * quantity;

            return {
                id: product.id,
                title: product.title || 'Untitled Product',
                thumbnailImage: product.default_image || null,
                price,
                quantity,
                subTotal,
            };
        });
    }, [products]);

    const amount = useMemo(() => {
        return cartProducts.reduce((total, product) => total + product.subTotal, 0);
    }, [cartProducts]);

    const [createOrder, { isLoading, isError, isSuccess }] = useCreateOrderMutation();


//     const handleSubmit = async (values) => {
//     try {
//         const data = {
//             ...values,
//             cartProducts,
//             total: amount,
//             paymentMethod,
//             user_id: token.userId,
//         };

//         console.log('Submitted Data:', data);

//         const res = await createOrder(data).unwrap();
//         console.log('res', res);

//         if (res.success) {
//             alert('Order created successfully!');
//             localStorage.removeItem('cart'); // ✅ Corrected
//             refetch(); // Refetch cart data to update the UI
//             router.push('/account/order-success');
//         }
//     } catch (error) {
//         console.error('Error creating order:', error);
//         alert('Failed to create the order. Please try again.');
//     }
// };



const handleSubmit = async (values) => {
    try {
        // 🔵 If Online Payment selected → Show Not Available
        if (method === 2) {
            alert("Online payment is not available right now.");
            return; // ❌ Stop Submission
        }

        // 🟢 Cash on Delivery → Create Order
        const data = {
            ...values,
            cartProducts,
            total: amount,
            paymentMethod: "Cash On Delivery",
            user_id: token.userId,
        };

        console.log("Submitted Data:", data);

        const res = await createOrder(data).unwrap();

        if (res.success) {
            alert("Order created successfully!");
            localStorage.removeItem("cart");
            refetch();
            router.push("/account/order-success");
        }
    } catch (error) {
        console.error("Error creating order:", error);
        alert("Failed to create the order. Please try again.");
    }
};



    return (
        <Form className="ps-form__billing-info" onFinish={handleSubmit}>
            <h3 className="ps-form__heading">Contact information</h3>
            <div className="form-group">
                <Form.Item
                    name="emailOrPhone"
                    rules={[{ required: true, message: 'Enter an email or mobile phone number!' }]}
                >
                    <Input className="form-control" type="text" placeholder="Email or phone number" />
                </Form.Item>
            </div>
            <div className="form-group">
                <Form.Item name="keepUpdate" valuePropName="checked">
                    <Checkbox id="keep-update">Keep me up to date on news and exclusive offers?</Checkbox>
                </Form.Item>
            </div>

            <h3 className="ps-form__heading">Shipping address</h3>
            <div className="row">
                <div className="col-sm-6">
                    <Form.Item
                        name="firstName"
                        rules={[{ required: true, message: 'Enter your first name!' }]}
                    >
                        <Input className="form-control" type="text" placeholder="First Name" />
                    </Form.Item>
                </div>
                <div className="col-sm-6">
                    <Form.Item
                        name="lastName"
                        rules={[{ required: true, message: 'Enter your last name!' }]}
                    >
                        <Input className="form-control" type="text" placeholder="Last Name" />
                    </Form.Item>
                </div>
            </div>

            <Form.Item name="address" rules={[{ required: true, message: 'Enter an address!' }]}>
                <Input className="form-control" type="text" placeholder="Address" />
            </Form.Item>
            <Form.Item name="apartment">
                <Input className="form-control" type="text" placeholder="Apartment, suite, etc. (optional)" />
            </Form.Item>

            <div className="row">
                <div className="col-sm-6">
                    <Form.Item
                        name="city"
                        rules={[{ required: true, message: 'Enter a city!' }]}
                    >
                        <Input className="form-control" type="text" placeholder="City" />
                    </Form.Item>
                </div>
                <div className="col-sm-6">
                    <Form.Item
                        name="postalCode"
                        rules={[{ required: true, message: 'Enter a postal code!' }]}
                    >
                        <Input className="form-control" type="text" placeholder="Postal Code" />
                    </Form.Item>
                </div>
            </div>

            <h3>Payment Methods</h3>
            {/* <Radio.Group onChange={handleChangeMethod} value={method}>
                <Radio value={1}>Cash On Delivery</Radio>
                <Radio value={2}>Online Payment</Radio>
            </Radio.Group> */}


            <div className="ps-block--payment-method">
                            <div className="ps-block__header">
                                <Radio.Group onChange={handleChangeMethod} value={method}>
                                    <Radio value={1}>Cash On Delivery</Radio>
                                    <Radio value={2}>Online Payment</Radio>
                                </Radio.Group>
                            </div>
                        </div>

            <div className="form-group">
                <Form.Item name="saveInfo" valuePropName="checked">
                    <Checkbox id="save-information">Save this information for next time</Checkbox>
                </Form.Item>
            </div>

            <div className="ps-form__submit">
                <Link href={'/account/shopping-cart'}>
                    <i className="icon-arrow-left mr-2" /> Return to shopping cart
                </Link>

                <div className="ps-block__footer">
                    <button
                        type="submit"
                        className="ps-btn"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Processing...' : 'Place an order'}
                    </button>
                </div>
            </div>
        </Form>
    );
}
