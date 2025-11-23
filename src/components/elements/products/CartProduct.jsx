import React from 'react';
import Link from 'next/link';
import useProduct from '~/hooks/useProduct';
import Image from 'next/image';

const CartProduct = ({ product }) => {
    const { thumbnailImage } = useProduct(product.attributes, product.id);

    console.log("cartProduct", product)
    return (
        <div className="ps-product--cart">
            <div className="ps-product__thumbnail">
                <Link href={'/product/[pid]'} as={`/product/${product.id}`}>
                    {/* {thumbnailImage} */}
                     {/* <Image
                            src={`http://localhost:5000${product.default_image}`}
                            alt={product.title}
                            width={80}
                            height={80}
                          /> */}
                            <img
                            src={`http://localhost:5000${product.default_image}`}
                            alt={product.title || 'Product Image'}
                            width={80}
                            height={80}
                            layout="responsive"
                        />
                </Link>
            </div>
            <div className="ps-product__content">{product.title}</div>
        </div>
    );
};

export default CartProduct;
