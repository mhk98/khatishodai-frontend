import React from 'react';
import Link from 'next/link';

const WidgetShopAds = () => {
    return (
        <aside className="widget widget_ads">
            <Link href={'/shops'}>
                <img src="/static/img/ads/product-ads2.png" alt="Khatishodai" />
            </Link>
        </aside>
    );
};

export default WidgetShopAds;
