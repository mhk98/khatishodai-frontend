import React, { useState } from 'react';
import { Radio } from 'antd';
import { useRouter } from 'next/navigation';
import { useUpdateOrderMutation } from '~/react-redux/features/order/order';
import { getUserInfo } from '~/components/services/auth.service';

const ModulePaymentMethods = () => {
    const Router = useRouter();
    const [method, setMethod] = useState(1);

    const token = getUserInfo();
    const id = token?.userId; // Ensure userId is valid

    const [updateOrder] = useUpdateOrderMutation();

    const handleChangeMethod = (e) => {
        setMethod(e.target.value);
    };

    
    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    
    //     if (!id) {
    //         console.error('User ID not found.');
    //         return;
    //     }
    
    //     const paymentMethod = method === 1 ? 'Cash On Delivery' : 'Online Payment';
    
    //     try {
    //         // Make sure you're sending the string as part of the payload
    //         const res = await updateOrder({
    //             id,
    //             data: { paymentMethod },  // The paymentMethod is sent as a string
    //         }).unwrap();
    //         console.log('Order update response:', res);
    //         Router.push('/account/payment-success');
    //     } catch (error) {
    //         console.error('Order update failed:', error);
    //     }
    // };
    


    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (!id) {
            console.error('User ID not found.');
            return;
        }
    
        const paymentMethod = method === 1 ? 'Cash On Delivery' : 'Online Payment';
    
        try {
            const res = await updateOrder({
                id,
                data: { paymentMethod },  // Correct payload (paymentMethod is a string)
            }).unwrap();
            console.log('Order update response:', res);
            Router.push('/account/payment-success');
        } catch (error) {
            console.error('Order update failed:', error);
        }
    };
    

    

    
    return (
        <>
            <h4>Payment Methods</h4>
            <div className="ps-block--payment-method">
                <div className="ps-block__header">
                    <Radio.Group onChange={handleChangeMethod} value={method}>
                        <Radio value={1}>Cash On Delivery</Radio>
                        <Radio value={2}>Online Payment</Radio>
                    </Radio.Group>
                </div>

                <div className="ps-block__content">
                    {method === 1 ? (
                        <div className="ps-block__tab">
                            <div className="form-group">
                                <button className="ps-btn ps-btn--fullwidth" onClick={handleSubmit}>
                                    Submit
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="ps-block__tab">
                            <button className="ps-btn ps-btn--fullwidth" onClick={handleSubmit}>
                                    Submit
                                </button>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default ModulePaymentMethods;
