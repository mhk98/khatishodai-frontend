import React, {
    Suspense,
    useCallback,
    useEffect,
    useMemo,
    useState,
} from 'react';
import { Pagination } from 'antd';
import Product from '~/components/elements/products/Product';
import WideProduct from '~/components/elements/products/WideProduct';
import ModuleShopSortBy from '~/components/partials/shop/modules/ModuleShopSortBy';
import { generateTempArray } from '~/utilities/common-helpers';
import SkeletonProduct from '~/components/elements/skeletons/SkeletonProduct';
import useGetProducts from '~/hooks/useGetProducts';
import { useRouter, useSearchParams } from 'next/navigation';
import { DEFAULT_QUERY_GET_PRODUCTS } from '~/services/queries/productStrapiQueries';
import { useGetAllProductQuery } from '~/react-redux/features/products/products';

const ShopItems = ({ columns = 4, pageSize = 12 }) => {
    // const Router = useRouter();
    // const searchParams = useSearchParams();
    // const pageIndex = searchParams.get('page');
    // const [currentPage, setCurrentPage] = useState(1);
    // const { query } = Router;
    // const [listView, setListView] = useState(true);
    // const [classes, setClasses] = useState(
    //     'col-xl-4 col-lg-4 col-md-3 col-sm-6 col-6'
    // );

    // // const { loading, products, meta, getStrapiProducts } = useGetProducts();

    // // const total = useMemo(() => (meta ? meta.pagination.total : 0), [meta]);

    // const { data, error, isLoading } = useGetAllProductQuery({
    //     page: currentPage,
    //     limit:pageSize,
    // });
    
    
    // const products = data?.data || [];

    //     const totalProducts = data?.meta?.total || 0;


    // function handleChangeViewMode(e) {
    //     e.preventDefault();
    //     setListView(!listView);
    // }

    //   // Handle pagination
    //   const handlePagination = (page) => {
    //     setCurrentPage(page); // Update current page
    // };

    // function handleSetColumns() {
    //     switch (columns) {
    //         case 2:
    //             setClasses('col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6');
    //             return 3;
    //             break;
    //         case 4:
    //             setClasses('col-xl-3 col-lg-4 col-md-6 col-sm-6 col-6');
    //             return 4;
    //             break;
    //         case 6:
    //             setClasses('col-xl-2 col-lg-4 col-md-6 col-sm-6 col-6');
    //             return 6;
    //             break;

    //         default:
    //             setClasses('col-xl-4 col-lg-4 col-md-3 col-sm-6 col-6');
    //     }
    // }

    // // const getProducts = useCallback(
    // //     (payload) => {
    // //         const query = payload
    // //             ? {
    // //                   ...DEFAULT_QUERY_GET_PRODUCTS,
    // //                   ...payload,
    // //               }
    // //             : {
    // //                   ...DEFAULT_QUERY_GET_PRODUCTS,
    // //               };
    // //         getStrapiProducts(query);
    // //     },
    // //     [getStrapiProducts]
    // // );

    // useEffect(() => {
    //     getProducts();
    //     handleSetColumns();
    // }, []);

    // useEffect(() => {
    //     let params;
    //     const page = pageIndex || 1;
    //     if (query) {
    //         if (page !== 1) {
    //             params = {
    //                 pagination: {
    //                     page: page,
    //                     pageSize: pageSize,
    //                 },
    //             };
    //         }
    //     } else {
    //         params = {
    //             pagination: {
    //                 page: 1,
    //                 pageSize: pageSize,
    //             },
    //         };
    //     }
    //     getProducts(params);
    //     handleSetColumns();
    // }, [query]);

    // const productsContent = useMemo(() => {
    //     if (!isLoading) {
    //         if (products && products.length > 0) {
    //             if (listView) {
    //                 const items = products.map((item) => (
    //                     <div className={classes} key={item.id}>
    //                         <Product product={item} />
    //                     </div>
    //                 ));
    //                 return (
    //                     <div className="ps-shop-items">
    //                         <div className="row">{items}</div>
    //                     </div>
    //                 );
    //             } else {
    //                 return products.map((item) => (
    //                     <WideProduct product={item} />
    //                 ));
    //             }
    //         } else {
    //             return <p>No product found.</p>;
    //         }
    //     } else {
    //         const skeletonItems = generateTempArray(12).map((item) => (
    //             <div className={classes} key={item}>
    //                 <SkeletonProduct />
    //             </div>
    //         ));
    //         return <div className="row">{skeletonItems}</div>;
    //     }
    // }, [isLoading, listView, products, classes]);

    const [isListView, setIsListView] = useState(true);
    const [classes, setClasses] = useState('col-xl-4 col-lg-4 col-md-3 col-sm-6 col-6');
    const router = useRouter();
    const searchParams = useSearchParams();
    const pageIndex = parseInt(searchParams.get('page'), 20) || 1;
    const [currentPage, setCurrentPage] = useState(1);
 
 

  // Fetch products using RTK Query
  const { data, error, isLoading } = useGetAllProductQuery({
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
        <Suspense>
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
        </Suspense>
    );
};

export default ShopItems;
