import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import AccountQuickLinksMobile from './AccountQuickLinksMobile';
import { getUserInfo, isLoggedIn } from '~/components/services/auth.service';
import { useGetCartDataByIdQuery } from '~/react-redux/features/cart/cart';

const MobileHeaderActions = ({ auth }) => {
    // const cartItems = useSelector(({ ecomerce }) => ecomerce?.cartItems);
    // const isLoggedIn = useSelector(({ user }) => user?.isLoggedIn);

            const userLoggedIn = isLoggedIn();

                const token = getUserInfo()
                    const id = token.userId
                
const [carts, setCarts] = useState([]);

    // =====================================================
    // LOAD CART DATA
    // =====================================================
    const loadCart = () => {
            const localCart = JSON.parse(localStorage.getItem("local_cart")) || [];
            setCarts(localCart);
    };

    useEffect(() => {
        loadCart();
    }, []);

      useEffect(() => {
            const updateCart = () => loadCart();
    
            window.addEventListener("local_cart_updated", updateCart);
            window.addEventListener("storage", updateCart);
    
            return () => {
                window.removeEventListener("local_cart_updated", updateCart);
                window.removeEventListener("storage", updateCart);
            };
        }, []);
    

    return (
        <div className="navigation__right">
            <Link href="/account/shopping-cart" className="header__extra">
                <i className="icon-bag2" />
                <span>
                    <i>{ carts.length}</i>
                </span>
            </Link>

            {userLoggedIn ? (
                <AccountQuickLinksMobile />
            ) : (
                <div className="header__extra">
                    <Link href="/account/login" legacyBehavior>
                        <i className="icon-user" />
                    </Link>
                </div>
            )}
        </div>
    );
};

export default MobileHeaderActions;
