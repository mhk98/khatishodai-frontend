import React from 'react';
import Link from 'next/link';

const Logo = ({ type }) => {
    let data;
    if (type === 'autopart') {
        data = {
            url: '/home/autopart',
            img: 'img/logo-autopart.png',
        };
    } else if (type === 'technology') {
        data = {
            url: '/home/technology',
            img: 'static/img/logo-technology.png',
        };
    } else if (type === 'technology') {
        data = {
            url: '/home/technology',
            img: 'static/img/logo-technology.png',
        };
    } else if (type === 'electronic') {
        data = {
            url: '/home/electronic',
            img: 'static/img/logo-electronic.png',
        };
    } else if (type === 'furniture') {
        data = {
            url: '/home/furniture',
            img: 'static/img/logo-furniture.png',
        };
    } else if (type === 'organic') {
        data = {
            url: '/home/organic',
            img: 'static/img/logo-organic.png',
        };
    } else {
        data = {
            url: '/',
            img: '/static/img/logo_light.png',
        };
    }
    return (
        <Link href="/" className="ps-logo">
            <img
                src="/static/img/logo.png"
                width={156}
                height={32}
                alt="martfury"
            />
        </Link>
    );
};

export default Logo;
