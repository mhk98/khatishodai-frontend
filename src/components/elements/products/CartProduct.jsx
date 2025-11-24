// import React from 'react';
// import Link from 'next/link';


// const CartProduct = ({ product }) => {

//     console.log("cartProduct", product)
//     return (
//         <div className="ps-product--cart">
//             <div className="ps-product__thumbnail">
//                 <Link href={'/product/[pid]'} as={`/product/${product.id}`}>
//                             <img
//                             src={`https://backend.eaconsultancy.info${product.default_image}`}
//                             alt={product.title || 'Product Image'}
//                             width={80}
//                             height={80}
//                             layout="responsive"
//                         />
//                 </Link>
//             </div>
//             <div className="ps-product__content">{product.title}</div>
//         </div>
//     );
// };

// export default CartProduct;


import React from 'react';
import Link from 'next/link';

const CartProduct = ({ product }) => {

    return (
        <div className="ps-product--cart flex items-center gap-3">
            <div className="ps-product__thumbnail min-w-[80px]">
                <Link href={`/product/${product.id}`}>
                    <img
                        src={`https://backend.eaconsultancy.info${product.default_image}`}
                        alt={product.title || 'Product Image'}
                        width={80}
                        height={80}
                    />
                </Link>
            </div>

            {/* TRUNCATED TITLE HERE */}
            <div className="ps-product__content w-full">
                <p className="text-sm font-medium truncate max-w-[140px] sm:max-w-[140px] md:max-w-[250px] lg:max-w-[300px]">
                    {product.title}
                </p>
            </div>
        </div>
    );
};

export default CartProduct;
