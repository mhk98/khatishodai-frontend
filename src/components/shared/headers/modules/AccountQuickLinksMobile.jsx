import React from 'react';
import Link from 'next/link';
import { Dropdown, Menu } from 'antd';
import { useRouter } from 'next/navigation';
import { removeUserInfo } from '~/components/services/auth.service';


const accountLinks = [
     {
        text: 'Account',
        url: '/account/user-information',
    },
    {
        text: 'Your Orders',
        url: '/account/notifications',
    },
    {
        text: 'Order Tracking',
        url: '/account/order-tracking',
    },
    // {
    //     text: 'Invoices',
    //     url: '/account/invoices',
    // },
    // {
    //     text: 'Address',
    //     url: '/account/addresses',
    // },
    // {
    //     text: 'Recent Viewed Product',
    //     url: '/account/recent-viewed-product',
    // },
    // {
    //     text: 'Wishlist',
    //     url: '/account/wishlist',
    // },
];

export default function AccountQuickLinks() {
    // const dispatch = useDispatch();
    // const handleLogout = (e) => {
    //     dispatch(userChangeIsLoggedIn(false));
    // };


     const Router = useRouter()
    const handleLogout = () => {
        removeUserInfo('accessToken')
        Router.push('/account/login');

    };

    const menu = (
        <Menu>
            {accountLinks.map((link) => (
                <Menu.Item key={link.url}>
                    <Link href={link.url}>{link.text}</Link>
                </Menu.Item>
            ))}

            <Menu.Item>
                <a href="#" onClick={handleLogout}>
                    Logout
                </a>
            </Menu.Item>
        </Menu>
    );

    return (
        <Dropdown overlay={menu} placement="bottomLeft">
            <a href="#" className="header__extra ps-user--mobile">
                <i className="icon-user" />
            </a>
        </Dropdown>
    );
}
