'use client';
import React from 'react';
import ShopItems from '../partials/shop/ShopItems';


const ShopItemsWrapper = () => {
    // Use any client-side logic here
    return <ShopItems columns={4} pageSize={12} />;
};

export default ShopItemsWrapper;
