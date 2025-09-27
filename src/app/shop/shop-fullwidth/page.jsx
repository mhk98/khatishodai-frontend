// 'use client';
// import React from 'react';
// import ShopBanner from '~/components/partials/shop/ShopBanner';
// import ShopBrands from '~/components/partials/shop/ShopBrands';
// import ShopCategories from '~/components/partials/shop/ShopCategories';
// import BreadCrumb from '~/components/elements/BreadCrumb';
// import ShopItems from '~/components/partials/shop/ShopItems';
// import ProductGroupByCarousel from '~/components/partials/product/ProductGroupByCarousel';
// import PageContainer from '~/components/layouts/PageContainer';
// import Newletters from '~/components/partials/commons/Newletters';

// const ShopFullwidthPage = () => {
//     const breadCrumb = [
//         {
//             text: 'Home',
//             url: '/',
//         },
//         {
//             text: 'Shop layout fullwidth',
//         },
//     ];
//     return (
//         <PageContainer title="Shop layout fullwidth">
//             <div className="ps-page--shop">
//                 <BreadCrumb breacrumb={breadCrumb} layout="fullwidth" />
//                 <div className="ps-container">
//                     <ShopBanner />
//                     <ShopBrands />
//                     <ShopCategories />
//                     <ProductGroupByCarousel
//                         layout="fullwidth"
//                         collectionSlug="hot-new-arrivals"
//                         title="Best Sale Items"
//                     />
//                     <ProductGroupByCarousel
//                         layout="fullwidth"
//                         collectionSlug="hot-new-arrivals"
//                         title="Recommended Items"
//                     />
//                     <ShopItems columns={6} pageSize={18} />
//                 </div>
//             </div>
//             <Newletters />
//         </PageContainer>
//     );
// };
// export default ShopFullwidthPage;



// pages/shop/shop-fullwidth/page.jsx (or similar)

'use client';
import React from 'react';
// 💡 Add dynamic import from Next.js
import dynamic from 'next/dynamic'; 

import ShopBanner from '~/components/partials/shop/ShopBanner';
import ShopBrands from '~/components/partials/shop/ShopBrands';
import ShopCategories from '~/components/partials/shop/ShopCategories';
import BreadCrumb from '~/components/elements/BreadCrumb';
// 🛑 Remove static import for ShopItems
// import ShopItems from '~/components/partials/shop/ShopItems'; 
import ProductGroupByCarousel from '~/components/partials/product/ProductGroupByCarousel';
import PageContainer from '~/components/layouts/PageContainer';
import Newletters from '~/components/partials/commons/Newletters';

// 🔑 THE CRITICAL FIX: Dynamically import ShopItems with SSR disabled.
// This prevents Next.js from trying to execute dynamic/client-side code inside ShopItems
// during the static export process.
const DynamicShopItems = dynamic(
    () => import('~/components/partials/shop/ShopItems'),
    { ssr: false }
);

const ShopFullwidthPage = () => {
    const breadCrumb = [
        {
            text: 'Home',
            url: '/',
        },
        {
            text: 'Shop layout fullwidth',
        },
    ];
    return (
        <PageContainer title="Shop layout fullwidth">
            <div className="ps-page--shop">
                <BreadCrumb breadcrumb={breadCrumb} layout="fullwidth" />
                <div className="ps-container">
                    <ShopBanner />
                    <ShopBrands />
                    <ShopCategories />
                    {/* Assuming this component also contains client-side logic, 
                        you might need to dynamic import it as well if the error persists. */}
                    <ProductGroupByCarousel
                        layout="fullwidth"
                        collectionSlug="hot-new-arrivals"
                        title="Best Sale Items"
                    />
                    <ProductGroupByCarousel
                        layout="fullwidth"
                        collectionSlug="hot-new-arrivals"
                        title="Recommended Items"
                    />
                    
                    {/* Use the dynamically imported component */}
                    <DynamicShopItems columns={6} pageSize={18} />
                </div>
            </div>
            <Newletters />
        </PageContainer>
    );
};
export default ShopFullwidthPage;