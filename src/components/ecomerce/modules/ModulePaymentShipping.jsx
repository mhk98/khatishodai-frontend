import React from 'react';
import Link from 'next/link';
import { useGetOrderByIdQuery, useUpdateOrderMutation } from '~/react-redux/features/order/order';
import { getUserInfo } from '~/components/services/auth.service';

const ModulePaymentShipping = () => {
    
    const token = getUserInfo()
    const id = token.userId

    const {data} = useGetOrderByIdQuery(id)

    const order = data?.data || []
    
    console.log('orderInfo', order)


    return (
        <>
             <div className="ps-block__panel">
                <figure>
                    <small>Contact</small>
                    <p>{order.emailOrPhone}</p>
                    {/* <Link href="/account/checkout">Change</Link> */}
                </figure>
                <figure>
                    <small>Ship to</small>
                    <p>{order.address}</p>
                    {/* <Link href="/account/checkout">Change</Link> */}
                </figure>
            </div>
            {/* <h4>Shipping Method</h4>
            <div className="ps-block__panel">
                <figure>
                    <small>International Shipping</small>
                    <strong>$20.00</strong>
                </figure>
            </div> */}
        </>
    );
};

export default ModulePaymentShipping;
