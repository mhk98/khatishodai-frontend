'use client';
import BreadCrumb from '~/components/elements/BreadCrumb';
import Product from '~/components/elements/products/Product';
import PageContainer from '~/components/layouts/PageContainer';
import Newsletters from '~/components/partials/commons/Newletters';
import React, { Suspense, useMemo } from 'react';
import { useGetAllProductQuery } from '~/react-redux/features/products/products';


// import SearchContent from '~/components/partials/search/page';

const SearchPage = ({params: { slug }}) => {
    const breadcrumb = [
        {
            text: 'Home',
            url: '/',
        },
        {
            text: 'Search Result',
        },
    ];

    const { data, error, isLoading } = useGetAllProductQuery({
        searchTerm: slug, 
    });

const products = data?.data || [];

    const productContent = useMemo(() => {
        if (isLoading) return <p>No product found.</p>;
        if (products.length === 0) return <p>No product found.</p>;
        return (
            <div className="ps-product-items row">
                {products.map((item) => {
                    return (
                        <div className="col-md-3 col-sm-6 col-6" key={item.id}>
                            <Product product={item} />
                        </div>
                    );
                })}
            </div>
        );
    }, [products, isLoading]);

    return (
        <PageContainer title={`Search results`}>
            <div className="ps-page">
                <BreadCrumb breacrumb={breadcrumb} />
            </div>
            <div className="container">
            <Suspense>
            <div className="ps-shop ps-shop--search">
                <div className="container">
                    <div className="ps-shop__header">
                        <h1>
                            Search result for: "<strong>{slug}</strong>"
                        </h1>
                    </div>
                    <div className="ps-shop__content">
                        {products.length > 0 && (
                            <p>
                                <strong style={{ color: '#000' }}>
                                    {products.length}
                                </strong>{' '}
                                record(s) found.
                            </p>
                        )}
                        {productContent}
                    </div>
                </div>
            </div>
        </Suspense>
            </div>
            <Newsletters layout="container" />
        </PageContainer>
    );
};

export default SearchPage;
