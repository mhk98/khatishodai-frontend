import React from 'react';
import WidgetSaleOnSite from '~/components/shared/widgets/WidgetSaleOnSite';
import WidgetShopAds from '~/components/shared/widgets/WidgetShopAds';

const ProductWidgets = () => {
    return (
        <section>
            {/* <WidgetProductFeatures /> */}
            <WidgetSaleOnSite />
            <WidgetShopAds />
            {/* <WidgetProductSameBrands collectionSlug="same-brand" /> */}
        </section>
    );
};

export default ProductWidgets;
