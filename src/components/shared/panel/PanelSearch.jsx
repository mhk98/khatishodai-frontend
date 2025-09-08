// import React, { useState } from 'react';
// import Router from 'next/router';

// const PanelSearch = () => {
//     const [keyword, setKeyword] = useState('');

//     function handleSubmit(e) {
//         e.preventDefault();
//         if (keyword !== '') {
//             Router.push(`/search?keyword=${keyword}`);
//         }
//     }

//     return (
//         <div className="ps-panel__search-results">
//             <form
//                 className="ps-form--search-mobile"
//                 action="/"
//                 method="get"
//                 onSubmit={(e) => handleSubmit(e)}>
//                 <div className="form-group--nest">
//                     <input
//                         className="form-control"
//                         type="text"
//                         placeholder="Search something..."
//                         onChange={(e) => setKeyword(e.target.value)}
//                     />
//                     <button>
//                         <i className="icon-magnifier" />
//                     </button>
//                 </div>
//             </form>
//         </div>
//     );
// };

// export default PanelSearch;



import React, { useRef, useState, useMemo } from 'react';
import { Spin } from 'antd';
import { useDebounce } from 'ahooks';
import { useRouter } from 'next/navigation';
import { useGetAllProductQuery } from '~/react-redux/features/products/products';
import SearchResultProduct from '~/components/elements/products/SearchResultProduct';
import Link from 'next/link';
import cx from 'classnames';

const SearchMobile = () => {
    const inputEl = useRef(null);
    const [keyword, setKeyword] = useState('');
    const keywordDebounce = useDebounce(keyword, { wait: 800 });
    const router = useRouter();

    const { data, isLoading } = useGetAllProductQuery({
        searchTerm: keywordDebounce,
    });

    const products = data?.data || [];

    function handleClearKeyword() {
        setKeyword('');
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (!keyword.trim()) return;
        router.push(`/search/${encodeURIComponent(keyword)}`);
    }

    const resultProducts = useMemo(() => {
        if (isLoading || !keywordDebounce.trim()) return [];
        return products;
    }, [products, isLoading, keywordDebounce]);

    return (
        <div className="ps-panel__search-results ps-panel--mobile">
            <form
                className="ps-form--search-mobile"
                onSubmit={handleSubmit}
            >
                <div className="form-group--nest">
                    <input
                        ref={inputEl}
                        className="form-control"
                        type="text"
                        placeholder="Search something..."
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                    />
                    {keyword && (
                        <span
                            className="ps-form__action"
                            onClick={handleClearKeyword}
                        >
                            <i className="icon-cross2" />
                        </span>
                    )}
                    <button type="submit">
                        <i className="icon-magnifier" />
                    </button>
                    {isLoading && (
                        <span className="ps-form__action">
                            <Spin size="small" />
                        </span>
                    )}
                </div>
            </form>

            {/* Search Results Dropdown */}
            {resultProducts.length > 0 && (
                <div
                    className={cx(
                        'ps-panel__dropdown',
                        resultProducts.length > 0 && 'active'
                    )}
                >
                    <div className="ps-panel__content">
                        {resultProducts.map((product) => (
                            <SearchResultProduct
                                key={product.id}
                                product={product}
                            />
                        ))}
                    </div>
                    {resultProducts.length > 5 && (
                        <div className="ps-panel__footer text-center">
                            <Link href={`/search/${keyword}`}>
                                See all results
                            </Link>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default SearchMobile;
