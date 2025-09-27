// 'use client';
// import React from 'react';
// import WidgetShopCategories from '~/components/shared/widgets/WidgetShopCategories';
// import WidgetShopBrands from '~/components/shared/widgets/WidgetShopBrands';
// import WidgetShopFilterByPriceRange from '~/components/shared/widgets/WidgetShopFilterByPriceRange';
// import ShopItems from '~/components/partials/shop/ShopItems';
// import BreadCrumb from '~/components/elements/BreadCrumb';
// import FooterDefault from '~/components/shared/footers/FooterDefault';
// import Newletters from '~/components/partials/commons/Newletters';
// import PageContainer from '~/components/layouts/PageContainer';

// const ShopSidebarWithoutBannerPage = () => {
//     const breadCrumb = [
//         {
//             text: 'Home',
//             url: '/',
//         },
//         {
//             text: 'Shop Sidebar',
//         },
//     ];
//     return (
//         <PageContainer footer={<FooterDefault />} title="Shop Sidebar">
//             <BreadCrumb breacrumb={breadCrumb} />
//             <div className="ps-page--shop" id="shop-sidebar">
//                 <div className="container">
//                     <div className="ps-layout--shop">
//                         <div className="ps-layout__left">
//                             <WidgetShopCategories />
//                             <WidgetShopBrands />
//                             <WidgetShopFilterByPriceRange />
//                         </div>
//                         <div className="ps-layout__right">
//                             <div className="ps-page__header">
//                                 <h1>Shop Sidebar</h1>
//                             </div>
//                             <ShopItems columns={4} pageSize={12} />
//                         </div>
//                     </div>
//                 </div>
//             </div>
//             <Newletters layout="container" />
//         </PageContainer>
//     );
// };

// export default ShopSidebarWithoutBannerPage;


// pages/shop/shop-sidebar-without-banner/page.jsx (or similar)

'use client';
import React from 'react';
// 💡 Add dynamic import from Next.js
import dynamic from 'next/dynamic';

import WidgetShopCategories from '~/components/shared/widgets/WidgetShopCategories';
import WidgetShopBrands from '~/components/shared/widgets/WidgetShopBrands';
import WidgetShopFilterByPriceRange from '~/components/shared/widgets/WidgetShopFilterByPriceRange';
// 🛑 Remove static import for ShopItems
// import ShopItems from '~/components/partials/shop/ShopItems'; 
import BreadCrumb from '~/components/elements/BreadCrumb';
import FooterDefault from '~/components/shared/footers/FooterDefault';
import Newletters from '~/components/partials/commons/Newletters';
import PageContainer from '~/components/layouts/PageContainer';

// 🔑 THE CRITICAL FIX: Dynamically import ShopItems with SSR disabled.
// This prevents Next.js from attempting to execute client-side-only code
// inside ShopItems during the static export build process.
const DynamicShopItems = dynamic(
    () => import('~/components/partials/shop/ShopItems'),
    { ssr: false }
);

const ShopSidebarWithoutBannerPage = () => {
    const breadCrumb = [
        {
            text: 'Home',
            url: '/',
        },
        {
            text: 'Shop Sidebar',
        },
    ];
    return (
        <PageContainer footer={<FooterDefault />} title="Shop Sidebar">
            <BreadCrumb breadcrumb={breadCrumb} />
            <div className="ps-page--shop" id="shop-sidebar">
                <div className="container">
                    <div className="ps-layout--shop">
                        <div className="ps-layout__left">
                            <WidgetShopCategories />
                            <WidgetShopBrands />
                            <WidgetShopFilterByPriceRange />
                        </div>
                        <div className="ps-layout__right">
                            <div className="ps-page__header">
                                <h1>Shop Sidebar</h1>
                            </div>
                            {/* Use the dynamically imported, client-side only component */}
                            <DynamicShopItems columns={4} pageSize={12} />
                        </div>
                    </div>
                </div>
            </div>
            <Newletters layout="container" />
        </PageContainer>
    );
};

export default ShopSidebarWithoutBannerPage;