import React from 'react';
import Link from 'next/link';
import useProduct from '~/hooks/useProduct';
import Image from 'next/image';

const OnCartProduct = ({ product, children }) => {
    const { thumbnailImage } = useProduct(product.attributes, product.id);

    console.log("default_image", product.default_image)


    return (
        <div className="ps-product--cart-mobile">
            <div className="ps-product__thumbnail">
                <Link href={'/product/[pid]'} as={`/product/${product.id}`}>
                    {/* <Image
                                                src={`https://backend.eaconsultancy.info/${product.default_image}`}
                                                alt={product.title}
                                                width={80}
                                                height={80}
                                              /> */}

                                                  <img
                            src={`https://backend.eaconsultancy.info${product.default_image}`}
                            alt={product.title || 'Product Image'}
                            width={80}
                            height={80}
                            layout="responsive"
                        />
                </Link>
            </div>
            <div className="ps-product__content">
                {product.title}
                <p>
                    <small>
                        ৳{product.price} x {product.quantity}
                    </small>
                </p>
                {children}
            </div>
        </div>
    );
};

export default OnCartProduct;
