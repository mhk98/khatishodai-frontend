import React, { useMemo } from 'react';
import Link from 'next/link';
import Rating from '~/components/elements/Rating';

const ModuleDetailTopInformation = ({ product }) => {
    const { sale, sale_price, title, price, brand_title } =
        product;

    const productBrandName = useMemo(() => {
        return brand_title;
    }, [brand_title]);

    const productPrice = useMemo(() => {
        if (sale) {
            return (
                <h4 className="ps-product__price sale">
                    <del className="mr-2">
                        &
                        {price.toLocaleString('en-US', {
                            minimumFractionDigits: 2,
                        })}
                    </del>
                    ৳
                    {sale_price.toLocaleString('en-US', {
                        minimumFractionDigits: 2,
                    })}
                </h4>
            );
        } else {
            return (
                <h4 className="ps-product__price">
                    ৳ 
                    {price.toLocaleString('en-US', {
                        minimumFractionDigits: 2,
                    })}
                </h4>
            );
        }
    }, [sale, price]);

    const productTitle = useMemo(() => {
        return title || 'Untitled Product';
    }, [title]);

    return (
        <header>
            <h1>{productTitle}</h1>
            <div className="ps-product__meta">
                <p>
                    Brand:
                    <Link href={'/shop'} className="ml-2 text-capitalize">
                        {productBrandName}
                    </Link>
                </p>
                <div className="ps-product__rating">
                    <Rating />
                    <span>(1 review)</span>
                </div>
            </div>
             {productPrice}
        </header>
    );
};

export default ModuleDetailTopInformation;
