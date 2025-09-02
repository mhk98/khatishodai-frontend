import React, { useMemo } from 'react';
import Link from 'next/link';
import { calculateAmount } from '~/utilities/ecomerce-helpers';

const ModuleCartSummary = ({ source }) => {
    // Calculate subtotal and ensure it's a valid number
    const subtotal = useMemo(() => {
        if (!Array.isArray(source) || source.length === 0) {
            console.log('Source is empty or invalid:', source);
            return 0;
        }
        const amount = calculateAmount(source);
        console.log('Calculated Subtotal:', amount);
        return Number.isFinite(amount) ? amount : 0; // Ensure the result is a number
    }, [source]);

    const productContent = useMemo(() => {
        if (!Array.isArray(source) || source.length === 0) {
            return <li>No items in the cart</li>;
        }

        return source.map((item) => (
            <li key={item.product_id || item.id}>
                <span className="ps-block__estimate">
                    <Link
                        href={`/product/${item.product_id}`}
                        className="ps-product__title">
                        {item.title} <br /> x{item.quantity}
                    </Link>
                </span>
            </li>
        ));
    }, [source]);

    return (
        <div className="ps-block--shopping-total">
            <div className="ps-block__header">
                <p>
                    Subtotal: <span>৳{subtotal.toFixed(2)}</span>
                </p>
            </div>
            <div className="ps-block__content">
                <ul className="ps-block__product">{productContent}</ul>
                <h3>
                    Total: <span>৳{subtotal.toFixed(2)}</span>
                </h3>
            </div>
        </div>
    );
};

export default ModuleCartSummary;
