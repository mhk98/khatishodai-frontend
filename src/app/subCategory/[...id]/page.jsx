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
import WidgetShopSubCategories from '~/components/shared/widgets/WidgetShopSubCategories';

const breadCrumb = [
    { text: 'Home', url: '/' },
    { text: 'Shop Default' },
];

export default function Page({ params: { id }, columns = 4, pageSize = 10 }) {
    const [isListView, setIsListView] = useState(true);
    const [classes, setClasses] = useState('col-xl-4 col-lg-4 col-md-3 col-sm-6 col-6');
    const router = useRouter();
    const searchParams = useSearchParams();
    const pageIndex = parseInt(searchParams.get('page'), 20) || 1;
    const [currentPage, setCurrentPage] = useState(1);
 
    const param1 = id?.[0]
    const param2 = id?.[1]

    console.log('bothParams', param1, param2)

  // Fetch products using RTK Query
  const { data, error, isLoading } = useGetAllProductQuery({
    category_id: param1,
    subCategoryItem_id: param2,
    page: currentPage,
    limit:pageSize,
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
                            <WidgetShopSubCategories category_id={param1} subCategoryItemId={param2}/>
                            {/* <WidgetSubCategoryBrands id={id}/>
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
