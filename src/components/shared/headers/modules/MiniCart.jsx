import React, { useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import OnCartProduct from '~/components/elements/products/OnCartProduct';
import useEcomerce from '~/hooks/useEcomerce';
import { calculateAmount } from '~/utilities/ecomerce-helpers';
import useGetProducts from '~/hooks/useGetProducts';
import { useDeleteCartMutation, useGetAllCartQuery, useGetCartDataByIdQuery } from '~/react-redux/features/cart/cart';
import { notification } from 'antd';
import { getUserInfo, isLoggedIn } from '~/components/services/auth.service';

const MiniCart = () => {


        const userLoggedIn = isLoggedIn();

        // console.log('userLoggedIn', userLoggedIn)

        const token = getUserInfo()
        const id = token.userId
    
        const { data, isLoading, isError, error } = useGetCartDataByIdQuery(id);

        const carts = data?.data || [];

  

    const [deleteCart] = useDeleteCartMutation()

const handleRemoveItem = async (e, product_id) => {
    e.preventDefault();

    // Call the API to remove the item from the backend
 const res = await deleteCart(product_id);

 console.log('cartProductDeleteRes', res.data.success)

 if(res.data.success===true){
 // Notify the user
 notification.open({
    message: 'Item Removed',
    description: 'This product has been removed from your cart',
    duration: 500,
});

 }
   
};

// Ensure `cartProducts` maps `cartItems` properly
const cartProducts = useMemo(() => {
    return carts.map((cart) => {
        // const cartItem = cartItems.find((item) => item.productId === product.productId);
        return {
            id: cart.id,
            title: cart.title || 'Untitled Product',
            default_image: cart.default_image || null,
            price: cart.price || 0,
            quantity: cart?.quantity || 0,
            product_id: cart?.product_id,
        };
    });
}, [carts]);


    const cartAmount = useMemo(() => {
        return calculateAmount(cartProducts);
    }, [cartProducts]);

    const cartItemsContent = useMemo(() => {
        if (carts.length === 0) {
            return (
                <div className="ps-cart__content">
                    <div className="ps-cart__items">
                        <span>No products in cart</span>
                    </div>
                </div>
            );
        }

        return (
            <div className="ps-cart__content">
                <div className="ps-cart__items">
                    {cartProducts.map((item) => {
                        return (
                            <OnCartProduct product={item} key={item.id}>
                                <a
                                    className="ps-product__remove"
                                    onClick={(e) =>
                                        handleRemoveItem(e, item.product_id)
                                    }>
                                    <i className="icon-cross" />
                                </a>
                            </OnCartProduct>
                        );
                    })}
                </div>
                <div className="ps-cart__footer">
                    <h3>
                        Sub Total:
                        <strong>৳{cartAmount}</strong>
                    </h3>
                    <figure>
                        <Link
                            href={'/account/shopping-cart'}
                            className="ps-btn">
                            View Cart
                        </Link>
                        {
                            (userLoggedIn === true) ?
                            <Link href={'/account/checkout'} className="ps-btn">
                            Checkout
                        </Link> :

                    <Link href={`/account/login?redirect=/account/checkout`} className="ps-btn">
                    Checkout
                    </Link>

                        }
                    </figure>
                </div>
            </div>
        );
    }, [cartProducts]);

    return (
        <div className="ps-cart--mini">
            <a className="header__extra" href="#">
                <i className="icon-bag2" />
                <span>
                    <i>{carts.length}</i>
                </span>
            </a>
            {cartItemsContent}
        </div>
    );
};

export default MiniCart;
