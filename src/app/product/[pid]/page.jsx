'use client';
import React, { useEffect, useMemo } from 'react';
import { useParams } from 'next/navigation';
import SkeletonProductDetail from '~/components/elements/skeletons/SkeletonProductDetail';
import BreadCrumb from '~/components/elements/BreadCrumb';
import ProductDetailFullwidth from '~/components/elements/detail/ProductDetailFullwidth';
import RelatedProduct from '~/components/partials/product/RelatedProduct';
import HeaderProduct from '~/components/shared/headers/HeaderProduct';
import HeaderDefault from '~/components/shared/headers/HeaderDefault';
import PageContainer from '~/components/layouts/PageContainer';
import Newletters from '~/components/partials/commons/Newletters';
import HeaderMobileProduct from '~/components/shared/header-mobile/HeaderMobileProduct';
import useGetProducts from '~/hooks/useGetProducts';
import ProductWidgets from '~/components/partials/product/ProductWidgets';
import { useGetDataByIdQuery } from '~/react-redux/features/products/products';

const ProductDefaultPage = () => {
    const params = useParams();
    const { pid } = params;
   

    const {data, error, isLoading} = useGetDataByIdQuery(pid)
        const product = data?.data || [];


    // useEffect(() => {
    //     getStrapiProduct(pid);
    // }, [pid]);

    const breadCrumb = [
        {
            text: 'Home',
            url: '/',
        },
        {
            text: 'Shop',
            url: '/shops',
        },
        {
            text: product?.title || 'Untitled Product',
        },
    ];

    const productDetails = useMemo(() => {
        if (isLoading) {
            return <SkeletonProductDetail />;
        }
        if (product) {
            return <ProductDetailFullwidth pid={pid} product={product} />
        }
    }, [isLoading, product]);

    const headerView = useMemo(() => {
        if (isLoading) {
            return (
                <>
                    <HeaderDefault />
                    <HeaderMobileProduct />
                </>
            );
        }
        if (product) {
            return (
                <>
                    <HeaderProduct product={product} />
                    <HeaderMobileProduct />
                </>
            );
        } else {
            return (
                <>
                    <HeaderDefault />
                    <HeaderMobileProduct />
                </>
            );
        }
    }, [isLoading, product]);

    return (
        <PageContainer
            header={headerView}
            title={product?.title || 'Untitled Product'}>
            <BreadCrumb breacrumb={breadCrumb} layout="fullwidth" />
            <div className="ps-page--product">
                <div className="ps-container">
                    <div className="ps-page__container">
                        <div className="ps-page__left">{productDetails}</div>
                        <div className="ps-page__right">
                            <ProductWidgets />
                        </div>
                    </div>
                    {/* <RelatedProduct /> */}
                </div>
            </div>
            <Newletters />
        </PageContainer>
    );
};

export default ProductDefaultPage;
