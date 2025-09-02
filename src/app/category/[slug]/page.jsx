// 'use client';
// import React, { useMemo, useState } from 'react';
// import BreadCrumb from '~/components/elements/BreadCrumb';
// import WidgetShopCategories from '~/components/shared/widgets/WidgetShopCategories';
// import WidgetShopBrands from '~/components/shared/widgets/WidgetShopBrands';
// import WidgetShopFilterByPriceRange from '~/components/shared/widgets/WidgetShopFilterByPriceRange';
// import { useParams } from 'next/navigation';
// import ProductItems from '~/components/partials/product/ProductItems';
// import PageContainer from '~/components/layouts/PageContainer';
// import FooterDefault from '~/components/shared/footers/FooterDefault';
// import Newletters from '~/components/partials/commons/Newletters';
// import useProducCategory from '~/hooks/useProducCategory';

// export default function ProductScreen() {
//     const { slug } = useParams();
//     const [category, setCategory] = useState(null);
//     const { loading, categoryDetails } = useProducCategory(slug);

//     const breadCrumb = [
//         {
//             text: 'Home',
//             url: '/',
//         },
//         {
//             text: 'Shop',
//             url: '/',
//         },
//         {
//             text: category ? category.name : 'Product category',
//         },
//     ];

//     const products = useMemo(() => {
//         if (!categoryDetails) return [];
//         return categoryDetails.products.data;
//     }, [categoryDetails]);

//     const productContent = useMemo(() => {
//         if (loading) return <p>Loading...</p>;
//         if (categoryDetails) {
//             return <ProductItems columns={4} products={products} />;
//         }
//     }, [loading, categoryDetails, products]);

//     return (
//         <PageContainer
//             footer={<FooterDefault />}
//             title={categoryDetails ? categoryDetails.title : 'Category'}
//             boxed={true}>
//             <div className="ps-page--shop">
//                 <BreadCrumb breacrumb={breadCrumb} />
//                 <div className="container">
//                     <div className="ps-layout--shop ps-shop--category">
//                         <div className="ps-layout__left">
//                             <WidgetShopCategories />
//                             <WidgetShopBrands />
//                             <WidgetShopFilterByPriceRange />
//                         </div>
//                         <div className="ps-layout__right">
//                             <h3 className="ps-shop__heading">
//                                 {category && category.name}
//                             </h3>
//                             {productContent}
//                         </div>
//                     </div>
//                 </div>
//             </div>
//             <Newletters layout="container" />
//         </PageContainer>
//     );
// }






'use client';

import { useEffect, useState, useMemo, useCallback } from 'react';
import { Pagination } from 'antd';
import axios from 'axios';
import { useRouter, useSearchParams } from 'next/navigation';

import WidgetShopCategories from '~/components/shared/widgets/WidgetShopCategories';
import WidgetShopFilterByPriceRange from '~/components/shared/widgets/WidgetShopFilterByPriceRange';
import PageContainer from '~/components/layouts/PageContainer';
import Newletters from '~/components/partials/commons/Newletters';
import ShopBanner from '~/components/partials/shop/ShopBanner';
import ShopBrands from '~/components/partials/shop/ShopBrands';
import ShopCategories from '~/components/partials/shop/ShopCategories';
import Product from '~/components/elements/products/Product';
import WideProduct from '~/components/elements/products/WideProduct';
import ModuleShopSortBy from '~/components/partials/shop/modules/ModuleShopSortBy';
import SkeletonProduct from '~/components/elements/skeletons/SkeletonProduct';
import BreadCrumb from '~/components/elements/BreadCrumb';
import { useGetAllProductQuery } from '~/react-redux/features/products/products';
import WidgetSubCategoryBrands from '~/components/shared/widgets/WidgetSubCategoryBrands';

const breadCrumb = [
    { text: 'Home', url: '/' },
    { text: 'Shop Default' },
];

export default function Page({ params: { slug }, columns = 4, pageSize = 10 }) {
    const [isListView, setIsListView] = useState(true);
    const [classes, setClasses] = useState('col-xl-4 col-lg-4 col-md-3 col-sm-6 col-6');
    const router = useRouter();
    const searchParams = useSearchParams();
    const pageIndex = parseInt(searchParams.get('page'), 20) || 1;
    const [currentPage, setCurrentPage] = useState(1);

   
  console.log('category--------------', slug)
  // Fetch products using RTK Query
  const { data, error, isLoading } = useGetAllProductQuery({
    category_id: slug,
    page: currentPage,
    limit:pageSize,
});


// useEffect(() => {
//     fetchProducts();
// }, [fetchProducts]);

//     useEffect(() => {
//         fetchProducts();
//         handleSetColumns();
//     }, [fetchProducts, pageIndex]);

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
            case 4: // Default for lg and md
                setClasses('col-lg-3 col-md-3 col-sm-6 col-12');
                break;
            case 6:
                setClasses('col-lg-2 col-md-4 col-sm-6 col-12');
                break;
            default:
                setClasses('col-lg-3 col-md-3 col-sm-6 col-12'); // Fallback
        }
    };
    

    useEffect(() => {
        handleSetColumns();
    }, [columns]);
    

    // Handle pagination
    const handlePagination = (page) => {
        setCurrentPage(page); // Update current page
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
                    {/* <ShopBanner />
                    <ShopBrands />
                    <ShopCategories /> */}
                    <div className="ps-layout--shop">
                        <div className="ps-layout__left">
                            <WidgetShopCategories id={slug} />
                            {/* <WidgetSubCategoryBrands id={slug}/>
                            <WidgetShopFilterByPriceRange  /> */}
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
                                        current={currentPage} // Bind currentPage state
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
