import React from 'react';
import Link from 'next/link';

const Links = {
    consumerElectric: [
        {
            text: 'Air Conditioners',
            url: '/shops',
        },
        {
            text: 'Audios & Theaters',
            url: '/shops',
        },
        {
            text: 'Car Electronics',
            url: '/shops',
        },
        {
            text: 'Office Electronics',
            url: '/shops',
        },
        {
            text: 'TV Televisions',
            url: '/shops',
        },
        {
            text: 'Washing Machines',
            url: '/shops',
        },
    ],
    clothingAndApparel: [
        {
            text: 'Printers',
            url: '/shops',
        },
        {
            text: 'Projectors',
            url: '/shops',
        },
        {
            text: 'Scanners',
            url: '/shops',
        },
        {
            text: 'Store & Business',
            url: '/shops',
        },
        {
            text: '4K Ultra HD TVs',
            url: '/shops',
        },
        {
            text: 'LED TVs',
            url: '/shops',
        },
        {
            text: 'OLED TVs',
            url: '/shops',
        },
    ],
    gardenAndKitchen: [
        {
            text: 'Cookware',
            url: '/shops',
        },
        {
            text: 'Decoration',
            url: '/shops',
        },
        {
            text: 'Furniture',
            url: '/shops',
        },
        {
            text: 'Garden Tools',
            url: '/shops',
        },
        {
            text: 'Garden Equipments',
            url: '/shops',
        },
        {
            text: 'Powers And Hand Tools',
            url: '/shops',
        },
        {
            text: 'Utensil & Gadget',
            url: '/shops',
        },
    ],
    healthAndBeauty: [
        {
            text: 'Hair Care',
            url: '/shops',
        },
        {
            text: 'Decoration',
            url: '/shops',
        },
        {
            text: 'Makeup',
            url: '/shops',
        },
        {
            text: 'Body Shower',
            url: '/shops',
        },
        {
            text: 'Skin Care',
            url: '/shops',
        },
        {
            text: 'Cologine',
            url: '/shops',
        },
        {
            text: 'Perfume',
            url: '/shops',
        },
    ],
    jewelryAndWatch: [
        {
            text: 'Necklace',
            url: '/shops',
        },
        {
            text: 'Pendant',
            url: '/shops',
        },
        {
            text: 'Diamond Ring',
            url: '/shops',
        },
        {
            text: 'Sliver Earing',
            url: '/shops',
        },
        {
            text: 'Leather Watcher',
            url: '/shops',
        },
        {
            text: 'Gucci',
            url: '/shops',
        },
    ],
    computerAndTechnology: [
        {
            text: 'Desktop PC',
            url: '/shops',
        },
        {
            text: 'Laptop',
            url: '/shops',
        },
        {
            text: 'Smartphones',
            url: '/shops',
        },
        {
            text: 'Tablet',
            url: '/shops',
        },
        {
            text: 'Game Controller',
            url: '/shops',
        },
        {
            text: 'Audio & Video',
            url: '/shops',
        },
        {
            text: 'Wireless Speaker',
            url: '/shops',
        },
    ],
};

const FooterLinks = () => (
    <div className="ps-footer__links">
        <p>
            <strong>Consumer Electric:</strong>
            {Links.consumerElectric.map((item) => (
                <Link href={item.url} key={item.text}>
                    {item.text}
                </Link>
            ))}
        </p>
        <p>
            <strong>Clothing &amp; Apparel:</strong>
            {Links.clothingAndApparel.map((item) => (
                <Link href={item.url} key={item.text}>
                    {item.text}
                </Link>
            ))}
        </p>
        <p>
            <strong>Home, Garden &amp; Kitchen:</strong>
            {Links.gardenAndKitchen.map((item) => (
                <Link href={item.url} key={item.text}>
                    {item.text}
                </Link>
            ))}
        </p>
        <p>
            <strong>Health &amp; Beauty:</strong>
            {Links.healthAndBeauty.map((item) => (
                <Link href={item.url} key={item.text}>
                    {item.text}
                </Link>
            ))}
        </p>
        <p>
            <strong>Jewelry &amp; Watches:</strong>
            {Links.jewelryAndWatch.map((item) => (
                <Link href={item.url} key={item.text}>
                    {item.text}
                </Link>
            ))}
        </p>
        <p>
            <strong>Computer &amp; Technologies:</strong>
            {Links.computerAndTechnology.map((item) => (
                <Link href={item.url} key={item.text}>
                    {item.text}
                </Link>
            ))}
        </p>
    </div>
);

export default FooterLinks;
