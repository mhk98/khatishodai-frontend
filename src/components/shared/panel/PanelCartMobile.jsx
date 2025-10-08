// import React, { useEffect } from 'react';
// import { connect, useSelector } from 'react-redux';
// import Link from 'next/link';
// import useEcomerce from '~/hooks/useEcomerce';
// import useProduct from '~/hooks/useProduct';
// import { calculateAmount } from '~/utilities/ecomerce-helpers';
// import useGetProducts from '~/hooks/useGetProducts';
// import MobileCartProduct from '~/components/elements/products/MobileCartProduct';

// const PanelCartMobile = ({ ecomerce }) => {
//     const cartItems = useSelector(({ ecomerce }) => ecomerce.cartItems);
//     const { getStrapiProducts, products } = useGetProducts();

//     function getCartProducts() {
//         if (cartItems.length > 0) {
//             const query = {
//                 filters: {
//                     id: {
//                         $in: cartItems.map((item) => item.id),
//                     },
//                 },
//             };
//             getStrapiProducts(query);
//         }
//     }

//     useEffect(() => {
//         getCartProducts();
//     }, [cartItems]);

//     function handleRemoveCartItem(e, product) {
//         e.preventDefault();
//         removeItem(product, ecomerce.cartItems, 'cart');
//     }

//     const cartItemsView = React.useMemo(() => {
//         if (products && products.length > 0) {
//             const items = products.map((item) => (
//                 <MobileCartProduct product={item} />
//             ));
//             return <div className="ps-cart__items">{items}</div>;
//         } else {
//             return <p>Cart empty!</p>;
//         }
//     }, [products]);

//     const footerView = React.useMemo(() => {
//         if (products && products.length > 0) {
//             const amount = calculateAmount(products);
//             return (
//                 <div className="ps-cart__footer">
//                     <h3>
//                         Sub Total:
//                         <strong>
//                             ${amount ? amount : Math.floor(Math.random() * 100)}
//                         </strong>
//                     </h3>
//                     <figure>
//                         <Link href="/account/shopping-cart" className="ps-btn">
//                             View Cart
//                         </Link>
//                         <Link href="/account/checkout" className="ps-btn">
//                             Checkout
//                         </Link>
//                     </figure>
//                 </div>
//             );
//         } else {
//             return (
//                 <div className="ps-cart__footer">
//                     <Link href={'/shop'} className="ps-btn ps-btn--fullwidth">
//                         Shop now
//                     </Link>
//                 </div>
//             );
//         }
//     }, [products]);
//     return (
//         <div className="ps-cart--mobile">
//             <div className="ps-cart__content">
//                 {cartItemsView}
//                 {footerView}
//             </div>
//         </div>
//     );
// };
// export default connect((state) => state)(PanelCartMobile);



import React, { useMemo } from 'react';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { notification } from 'antd';
import { useDeleteCartMutation, useGetCartDataByIdQuery } from '~/react-redux/features/cart/cart';
import { calculateAmount } from '~/utilities/ecomerce-helpers';
import { getUserInfo, isLoggedIn } from '~/components/services/auth.service';
import OnCartProduct from '~/components/elements/products/OnCartProduct';

const PanelCartMobile = () => {
    const userLoggedIn = isLoggedIn();
    const token = getUserInfo();
    const userId = token?.userId;

    const { data, isLoading } = useGetCartDataByIdQuery(userId);
    const carts = data?.data || [];

    const [deleteCart] = useDeleteCartMutation();

    const handleRemoveItem = async (e, product_id) => {
        e.preventDefault();
        const res = await deleteCart(product_id);
        if (res.data?.success) {
            notification.open({
                message: 'Item Removed',
                description: 'This product has been removed from your cart',
                duration: 2,
            });
        }
    };

    const cartProducts = useMemo(() => {
        return carts.map((cart) => ({
            id: cart.id,
            title: cart.title || 'Untitled Product',
            thumbnailImage: cart.default_image || null,
            price: cart.price || 0,
            quantity: cart.quantity || 1,
            product_id: cart.product_id,
        }));
    }, [carts]);

    const cartAmount = useMemo(() => calculateAmount(cartProducts), [cartProducts]);

    return (
        <div className="ps-cart--mobile-panel">
            <div className="ps-cart__header">
                <h3>Your Cart ({carts.length} items)</h3>
            </div>

            <div className="ps-cart__content">
                {carts.length === 0 ? (
                    <div className="ps-cart__empty">
                        <p>Your cart is empty</p>
                        <Link href="/shops" className="ps-btn ps-btn--fullwidth">
                            Shop Now
                        </Link>
                    </div>
                ) : (
                    <>
                        <div className="ps-cart__items">
                            {cartProducts.map((item) => (
                                <OnCartProduct product={item} key={item.id}>
                                    <a
                                        className="ps-product__remove"
                                        onClick={(e) =>
                                            handleRemoveItem(e, item.product_id)
                                        }>
                                        <i className="icon-cross" />
                                    </a>
                                </OnCartProduct>
                            ))}
                        </div>

                        <div className="ps-cart__footer">
                            <h3>
                                Subtotal: <strong>৳{cartAmount}</strong>
                            </h3>
                            <figure>
                                <Link href="/account/shopping-cart" className="ps-btn ps-btn--fullwidth">
                                    View Cart
                                </Link>
                                {userLoggedIn ? (
                                    <Link href="/account/checkout" className="ps-btn ps-btn--fullwidth">
                                        Checkout
                                    </Link>
                                ) : (
                                    <Link
                                        href="/account/login?redirect=/account/checkout"
                                        className="ps-btn ps-btn--fullwidth">
                                        Checkout
                                    </Link>
                                )}
                            </figure>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default PanelCartMobile;
