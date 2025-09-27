// 'use client';
// import React from 'react';
// import WidgetShopCategories from '~/components/shared/widgets/WidgetShopCategories';
// import WidgetShopBrands from '~/components/shared/widgets/WidgetShopBrands';
// import WidgetShopFilterByPriceRange from '~/components/shared/widgets/WidgetShopFilterByPriceRange';
// import ShopItems from '~/components/partials/shop/ShopItems';
// import ProductGroupByCarousel from '~/components/partials/product/ProductGroupByCarousel';
// import BreadCrumb from '~/components/elements/BreadCrumb';
// import ShopSidebarBanner from '~/components/partials/shop/ShopSidebarBanner';
// import PageContainer from '~/components/layouts/PageContainer';
// import FooterDefault from '~/components/shared/footers/FooterDefault';
// import Newletters from '~/components/partials/commons/Newletters';

// const Shops = () => {
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
//         <>
//             <PageContainer footer={<FooterDefault />} title="Shop Sidebar">
//                 <BreadCrumb breacrumb={breadCrumb} />
//                 <div className="ps-page--shop" id="shop-sidebar">
//                     <div className="container">
//                         <div className="ps-layout--shop">
//                             <div className="ps-layout__left">
//                                 {/* <WidgetShopCategories /> */}
//                                 <WidgetShopBrands />
//                                 <WidgetShopFilterByPriceRange />
//                             </div>
//                             <div className="ps-layout__right">
//                                 <div className="ps-page__header">
//                                     <h1>Shop Sidebar</h1>
//                                     <ShopSidebarBanner />
//                                 </div>
//                                 <ProductGroupByCarousel
//                                     collectionSlug="shop-best-seller-items"
//                                     title="Best Sale Items"
//                                 />
//                                 <ShopItems columns={4} pageSize={12} />
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//                 <Newletters layout="container" />
//             </PageContainer>
//         </>
//     );
// };

// export default Shops;



// 'use client';

// import { useEffect, useState } from 'react';
// import { Pagination } from 'antd';
// import { useRouter, useSearchParams } from 'next/navigation';

// import WidgetShopCategories from '~/components/shared/widgets/WidgetShopCategories';
// import PageContainer from '~/components/layouts/PageContainer';
// import Newletters from '~/components/partials/commons/Newletters';
// import Product from '~/components/elements/products/Product';
// import ModuleShopSortBy from '~/components/partials/shop/modules/ModuleShopSortBy';
// import SkeletonProduct from '~/components/elements/skeletons/SkeletonProduct';
// import BreadCrumb from '~/components/elements/BreadCrumb';
// import { useGetAllProductQuery } from '~/react-redux/features/products/products';

// const breadCrumb = [
//     { text: 'Home', url: '/' },
//     { text: 'Shop Default' },
// ];

// export default function Page({ params: { id }, columns = 4, pageSize = 10 }) {
//     const [isListView, setIsListView] = useState(true);
//     const [classes, setClasses] = useState('col-xl-4 col-lg-4 col-md-3 col-sm-6 col-6');
//     const router = useRouter();
//     const searchParams = useSearchParams();
//     const pageIndex = parseInt(searchParams.get('page'), 20) || 1;
//     const [currentPage, setCurrentPage] = useState(1);
 

//   // Fetch products using RTK Query
//   const { data, error, isLoading } = useGetAllProductQuery({
//     category_id: id,
//     page: currentPage,
//     limit:pageSize,
// });


// const products = data?.data || [];
// const totalProducts = data?.meta?.total || 0;

// const productsContent = isLoading ? (
//     <div className="row">
//         {Array.from({ length: columns * 3 }).map((_, index) => (
//             <div className={classes} key={index}>
//                 <SkeletonProduct />
//             </div>
//         ))}
//     </div>
// ) : products.length > 0 ? (
//     <div className="row">
//         {products.map((product) => (
//             <div className={classes} key={product.id}>
//                 <Product product={product} />
//             </div>
//         ))}
//     </div>
// ) : (
//     <p>No products found.</p>
// );


//     // Set column layout based on the provided column count
//     const handleSetColumns = () => {
//         switch (columns) {
//             case 2:
//                 setClasses('col-lg-6 col-md-6 col-sm-12');
//                 break;
//             case 4: // Default for lg and md
//                 setClasses('col-lg-3 col-md-3 col-sm-6 col-12');
//                 break;
//             case 6:
//                 setClasses('col-lg-2 col-md-4 col-sm-6 col-12');
//                 break;
//             default:
//                 setClasses('col-lg-3 col-md-3 col-sm-6 col-12'); // Fallback
//         }
//     };
    

//     useEffect(() => {
//         handleSetColumns();
//     }, [columns]);
    

//     // Handle pagination
//     const handlePagination = (page) => {
//         setCurrentPage(page); // Update current page
//     };

//     // Toggle between list view and grid view
//     const toggleViewMode = (e) => {
//         e.preventDefault();
//         setIsListView(!isListView);
//     };


//     return (
//         <PageContainer title="Shop">
//             <div className="ps-page--shop">
//                 <BreadCrumb breadcrumb={breadCrumb} layout="fullwidth" />
//                 <div className="ps-container">
//                     {/* <ShopBanner />
//                     <ShopBrands />
//                     <ShopCategories /> */}
//                     <div className="ps-layout--shop">
//                         <div className="ps-layout__left">
//                             <WidgetShopCategories id={id}/>
//                             {/* <WidgetShopBrands id={id} /> */}
//                             {/* <WidgetShopFilterByPriceRange /> */}
//                         </div>
//                         <div className="ps-shopping">
//                             <div className="ps-shopping__header">
//                                 <p>
//                                     <strong className="mr-2">{totalProducts}</strong> Products found
//                                 </p>
//                                 <div className="ps-shopping__actions">
//                                     <ModuleShopSortBy />
//                                     <div className="ps-shopping__view">
//                                         <p>View</p>
//                                         <ul className="ps-tab-list">
//                                             <li className={isListView ? 'active' : ''}>
//                                                 <a href="#" onClick={toggleViewMode}>
//                                                     <i className="icon-grid" />
//                                                 </a>
//                                             </li>
//                                             <li className={!isListView ? 'active' : ''}>
//                                                 <a href="#" onClick={toggleViewMode}>
//                                                     <i className="icon-list4" />
//                                                 </a>
//                                             </li>
//                                         </ul>
//                                     </div>
//                                 </div>
//                             </div>
//                             <div className="ps-shopping__content">{productsContent}</div>
//                             <div className="ps-shopping__footer">
//                             <Pagination
//                                         total={totalProducts}
//                                         pageSize={pageSize}
//                                         current={currentPage} // Bind currentPage state
//                                         onChange={handlePagination}
//                                         showSizeChanger={false}
//                                     />

//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//             <Newletters layout="container" />
//         </PageContainer>
//     );
// }



'use client';

import { useEffect, useState } from 'react';
import { Pagination } from 'antd';
import { useRouter, useSearchParams } from 'next/navigation';

import WidgetShopCategories from '~/components/shared/widgets/WidgetShopCategories';
import PageContainer from '~/components/layouts/PageContainer';
import Newletters from '~/components/partials/commons/Newletters';
import Product from '~/components/elements/products/Product';
import ModuleShopSortBy from '~/components/partials/shop/modules/ModuleShopSortBy';
import SkeletonProduct from '~/components/elements/skeletons/SkeletonProduct';
import BreadCrumb from '~/components/elements/BreadCrumb';
import { useGetAllProductQuery } from '~/react-redux/features/products/products';

const breadCrumb = [
    { text: 'Home', url: '/' },
    { text: 'Shop Default' },
];

export default function ShopCategoryPage({ params: { id }, columns = 4, pageSize = 10 }) {
    const [isListView, setIsListView] = useState(true);
    const [classes, setClasses] = useState('col-xl-4 col-lg-4 col-md-3 col-sm-6 col-6');
    const router = useRouter();
    const searchParams = useSearchParams();

    // 1. Correctly derive the current page from the URL query (base 10)
    const currentPageFromUrl = parseInt(searchParams.get('page'), 10) || 1;
    
    // Use the URL's page number directly for fetching.
    // We'll update the URL and the component will re-render and pick up the new value.
    const [currentPage, setCurrentPage] = useState(currentPageFromUrl);

    // Sync internal state with URL change on initial load or URL change
    useEffect(() => {
        if (currentPageFromUrl !== currentPage) {
            setCurrentPage(currentPageFromUrl);
        }
    }, [currentPageFromUrl]);


    // Fetch products using RTK Query
    const { data, error, isLoading } = useGetAllProductQuery({
        category_id: id,
        page: currentPage, // Use the state derived from the URL
        limit: pageSize,
    });


    const products = data?.data || [];
    const totalProducts = data?.meta?.total || 0;

    const productsContent = isLoading ? (
        <div className="row">
            {Array.from({ length: columns * 3 }).map((_, index) => (
                <div className={classes} key={index}>
                    <SkeletonProduct />
                </div>
            ))}
        </div>
    ) : products.length > 0 ? (
        <div className="row">
            {products.map((product) => (
                <div className={classes} key={product.id}>
                    <Product product={product} />
                </div>
            ))}
        </div>
    ) : (
        <p>No products found.</p>
    );


    // Set column layout based on the provided column count
    const handleSetColumns = () => {
        switch (columns) {
            case 2:
                setClasses('col-lg-6 col-md-6 col-sm-12');
                break;
            case 4:
                setClasses('col-lg-3 col-md-3 col-sm-6 col-12'); 
                break;
            case 6:
                setClasses('col-lg-2 col-md-4 col-sm-6 col-12');
                break;
            default:
                setClasses('col-lg-3 col-md-3 col-sm-6 col-12');
        }
    };
    

    useEffect(() => {
        handleSetColumns();
    }, [columns]);
    

    // Handle pagination: Update URL query parameter
    const handlePagination = (page) => {
        // Build the new search parameters
        const newSearchParams = new URLSearchParams(searchParams.toString());
        newSearchParams.set('page', page.toString());
        
        // Push the new URL without a full page reload
        router.push(`?${newSearchParams.toString()}`);
        
        // Update the internal state to trigger RTK re-fetch instantly
        setCurrentPage(page);
    };

    // Toggle between list view and grid view
    const toggleViewMode = (e) => {
        e.preventDefault();
        setIsListView(!isListView);
    };


    return (
        <PageContainer title="Shop">
            <div className="ps-page--shop">
                <BreadCrumb breadcrumb={breadCrumb} layout="fullwidth" />
                <div className="ps-container">
                    <div className="ps-layout--shop">
                        <div className="ps-layout__left">
                            <WidgetShopCategories id={id}/>
                        </div>
                        <div className="ps-shopping">
                            <div className="ps-shopping__header">
                                <p>
                                    <strong className="mr-2">{totalProducts}</strong> Products found
                                </p>
                                <div className="ps-shopping__actions">
                                    <ModuleShopSortBy />
                                    <div className="ps-shopping__view">
                                        <p>View</p>
                                        <ul className="ps-tab-list">
                                            <li className={isListView ? 'active' : ''}>
                                                <a href="#" onClick={toggleViewMode}>
                                                    <i className="icon-grid" />
                                                </a>
                                            </li>
                                            <li className={!isListView ? 'active' : ''}>
                                                <a href="#" onClick={toggleViewMode}>
                                                    <i className="icon-list4" />
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="ps-shopping__content">{productsContent}</div>
                            <div className="ps-shopping__footer">
                            <Pagination
                                    total={totalProducts}
                                    pageSize={pageSize}
                                    current={currentPage} 
                                    onChange={handlePagination}
                                    showSizeChanger={false}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Newletters layout="container" />
        </PageContainer>
    );
}