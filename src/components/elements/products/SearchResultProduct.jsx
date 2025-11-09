import React from 'react';
import Link from 'next/link';
import Rating from '~/components/elements/Rating';
import useProduct from '~/hooks/useProduct';
import Image from 'next/image';

const SearchResultProduct = ({ product }) => {
    // const { thumbnailImage, price, title } = useProduct(
    //     product.attributes,
    //     product.id
    // );

    const { title, price, default_image } = product;

    console.log('search result product', product);
    return (
        <div className="ps-product ps-product--wide ps-product--search-result">
            <div className="ps-product__thumbnail">
                <Link href={'/product/[pid]'} as={`/product/${product.id}`}>
                    <img
                        src={`https://backend.eaconsultancy.info/${default_image}`}
                        width={120}
                        height={80}
                    />
                </Link>
            </div>
            <Link href={'/product/[pid]'} as={`/product/${product.id}`}>
                <div className="ps-product__content">
                    {title}
                    <div className="ps-product__rating">
                        <Rating />
                        <span>{product.ratingCount || 0}</span>
                    </div>
                    ৳{price}
                </div>
            </Link>
        </div>
    );
};
export default SearchResultProduct;
