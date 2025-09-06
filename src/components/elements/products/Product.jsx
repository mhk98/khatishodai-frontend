import React from 'react';
import Link from 'next/link';
import ProductActions from '~/components/elements/products/modules/ProductActions';
import useProduct from '~/hooks/useProduct';
import Rating from '~/components/elements/Rating';
import Image from 'next/image';

const Product = ({ product }) => {
    const { thumbnailImage, badge } = useProduct(
        product.attributes
    );

    const {title, price, default_image} = product;
    console.log('productInfo', default_image)
    return (
        <div>
              <div className="ps-product">
            <div className="ps-product__thumbnail">
                
                    {/* <img src={`https://backend.eaconsultancy.info/${default_image}`} alt="" /> */}
        
 <Link href={'/product/[pid]'} as={`/product/${product.id}`}>
            <Image
    src={`https://backend.eaconsultancy.info${default_image}`}
    alt={title || 'Product Image'}
    width={200}
    height={200}
    layout="responsive"
/>
            </Link>
                    {/* {thumbnailImage} */}
           
                {/* {badge(product)} */}
                <ProductActions product={product} />
            </div>
            <div className="ps-product__container">
                <Link href={'/shop'} className="ps-product__vendor">
                    Young Shop
                </Link>
                <div className="ps-product__content">
                    {title}
                    <div className="ps-product__rating">
                        <Rating />
                        <span>02</span>
                    </div>
                    ৳ {price}
                </div>
                <div className="ps-product__content hover">
                    <Link href={'/product/[pid]'} as={`/product/${product.id}`}>
                    {title} <br/>
                    ৳ {price}
                    </Link>
                    
                </div>
            </div>
        </div>
           
          
        </div>
    );
};

export default Product;
