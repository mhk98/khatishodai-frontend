import React from 'react';
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
                
                    const { data, isLoading, isError, error } = useGetCartDataByIdQuery(id);
            
                    const carts = data?.data || [];
    

    return (
        <div className="navigation__right">
            <Link href="/account/shopping-cart" className="header__extra">
                <i className="icon-bag2" />
                <span>
                    <i>{carts ? carts.length : 0}</i>
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
