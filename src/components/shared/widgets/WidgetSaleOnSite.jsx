import React from 'react';
import Link from 'next/link';

const WidgetSaleOnSite = () => {
    return (
        <aside className="widget widget_sell-on-site">
            <p>
                <i className="icon-store" /> Sell on Khatishodai?
                <Link style={{marginLeft:"5px"}} href="/account/login">Register Now !</Link>
            </p>
        </aside>
    );
};

export default WidgetSaleOnSite;
