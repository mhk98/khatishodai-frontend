// import React, { useEffect, useMemo, useState } from 'react';
// import Link from 'next/link';
// import { calculateAmount } from '~/utilities/ecomerce-helpers';
// import { getUserInfo } from '~/components/services/auth.service';
// import { useGetOrderByIdQuery } from '~/react-redux/features/order/order';

// const ModulePaymentOrderSummary = ({  shipping }) => {
//     // const cartItems = useSelector(({ ecomerce }) => ecomerce.cartItems);
//     // const { getStrapiProducts, products } = useGetProducts();
// const token = getUserInfo();
//     const userId = token?.userId;

//    const [products, setProducts] = useState()

//     const { data, isLoading, isError, error } = useGetOrderByIdQuery(userId);

//     useEffect(() => {
//     if (isError) {
//       console.error("Error fetching product data", error);
//     } else if (!isLoading && data) {
//       setProducts(data.data);
//     }
//   }, [data, isLoading, isError, error]);


//   console.log("cartProducts", products)

//     const cartProducts = useMemo(() => {
//         // if (cartItems.length === 0) return [];
//         return products.map((product) => {
//             return {
//                 id: product.id,
//                 title: product.title || 'Untitled Product',
//                 // slug: product.slug || 'untitled-product',
//                 thumbnailImage: product.default_image || null,
//                 price: product.price || 0,
//                 // sale_price: product.attributes.sale_price || 0,
//                 // quantity:
//                 //     cartItems.find((item) => item.id === product.product_id)
//                 //         ?.quantity ?? 0,
//             quantity: product?.quantity || 0,

//             };
//         });
//     }, [products]);

//     const amount = useMemo(() => {
//         if (cartProducts && cartProducts.length > 0) {
//             return calculateAmount(cartProducts);
//         }
//         return 0;
//     }, [cartProducts]);

//     const listItemsView = useMemo(() => {
//         if (cartProducts && cartProducts.length > 0) {
//             return cartProducts.map((item) => (
//                 <Link href="/" key={item.id}>
//                     <strong>
//                         {item.title}
//                         <span>x{item.quantity}</span>
//                     </strong>
//                     <small>৳{item.quantity * item.price}</small>
//                 </Link>
//             ));
//         } else {
//             return <p>No Product.</p>;
//         }
//     }, [cartProducts]);

//     // const totalView = useMemo(() => {
//     //     const totalAmount = shipping ? parseInt(amount) + 20 : parseInt(amount);
//     //     return (
//     //         <figure className="ps-block__total">
//     //             <h3>
//     //                 Total
//     //                 <strong>${totalAmount}.00</strong>
//     //             </h3>
//     //         </figure>
//     //     );
//     // }, [amount, shipping]);
//     // const shippingView = useMemo(() => {
//     //     if (shipping === true) {
//     //         return (
//     //             <figure>
//     //                 <figcaption>
//     //                     <strong>Shipping Fee</strong>
//     //                     <small>$20.00</small>
//     //                 </figcaption>
//     //             </figure>
//     //         );
//     //     }
//     //     return null;
//     // }, [shipping]);

//         const totalAmount =  parseInt(amount);

//     return (
//         <div className="ps-block--checkout-order">
//             <div className="ps-block__content">
//                 <figure>
//                     <figcaption>
//                         <strong>Product</strong>
//                         <strong>total</strong>
//                     </figcaption>
//                 </figure>
//                 <figure className="ps-block__items">{listItemsView}</figure>
//                 <figure>
//                     <figcaption>
//                         <strong>Subtotal</strong>
//                         <small>৳{amount}</small>
//                     </figcaption>
//                 </figure>
//                 {/* {shippingView}
//                 {totalView} */}
//                  {/* <figure>
//                     <figcaption>
//                         <strong>Shipping Fee</strong>
//                         <small>$20.00</small>
//                     </figcaption>
//                 </figure> */}
//                 <figure className="ps-block__total">
//                 <h3>
//                     Total
//                     <strong>৳{totalAmount}.00</strong>
//                 </h3>
//             </figure>

//            </div>
//         </div>
//     );
// };
// export default ModulePaymentOrderSummary;



"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { calculateAmount } from "~/utilities/ecomerce-helpers";
import { getUserInfo } from "~/components/services/auth.service";
import { useGetOrderByIdQuery } from "~/react-redux/features/order/order";

const ModulePaymentOrderSummary = ({ shipping }) => {
  const token = getUserInfo();
  const userId = token?.userId;

  const [products, setProducts] = useState([]);

  const { data, isLoading, isError, error } = useGetOrderByIdQuery(userId);

  useEffect(() => {
    if (isError) {
      console.error("Error fetching product data", error);
    } else if (!isLoading && data) {
      try {
        // 🔥 cartProducts string → JSON convert
        const parsedProducts = JSON.parse(data.data.cartProducts);
        setProducts(parsedProducts);
      } catch (e) {
        console.error("JSON Parse Error", e);
      }
    }
  }, [data, isLoading, isError, error]);

  const cartProducts = useMemo(() => {
    if (!products || products.length === 0) return [];

    return products.map((product) => ({
      id: product.product_id,
      title: product.title,
      thumbnailImage: product.default_image,
      price: parseFloat(product.price) || 0,
      quantity: product.quantity,
    }));
  }, [products]);

  const amount = useMemo(() => {
    if (cartProducts.length > 0) {
      return calculateAmount(cartProducts);
    }
    return 0;
  }, [cartProducts]);

  const listItemsView = useMemo(() => {
    if (cartProducts.length > 0) {
      return cartProducts.map((item) => (
        <Link href="/" key={item.id}>
          <strong>
            {item.title}
            <span>x{item.quantity}</span>
          </strong>
          <small>৳{item.quantity * item.price}</small>
        </Link>
      ));
    }
    return <p>No Product.</p>;
  }, [cartProducts]);

//   const totalAmount = parseInt(amount);

  return (
    <div className="ps-block--checkout-order">
      <div className="ps-block__content">
        <figure>
          <figcaption>
            <strong>Product</strong>
            <strong>Total</strong>
          </figcaption>
        </figure>

        <figure className="ps-block__items">{listItemsView}</figure>

        <figure>
          <figcaption>
            <strong>Discount</strong>
            <small>৳{data?.data?.discount}</small>
          </figcaption>
        </figure>
        <figure>
          <figcaption>
            <strong>Subtotal</strong>
            <small>৳{data?.data?.subTotal}</small>
          </figcaption>
        </figure>

        <figure className="ps-block__total">
          <h3>
            Total <strong>৳{data?.data?.total}.00</strong>
          </h3>
        </figure>
      </div>
    </div>
  );
};

export default ModulePaymentOrderSummary;
