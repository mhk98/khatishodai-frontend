'use client';
import React, { useMemo } from 'react';
import BreadCrumb from '~/components/elements/BreadCrumb';
import WidgetShopCategories from '~/components/shared/widgets/WidgetShopCategories';
import WidgetShopBrands from '~/components/shared/widgets/WidgetShopBrands';
import WidgetShopFilterByPriceRange from '~/components/shared/widgets/WidgetShopFilterByPriceRange';
import { useParams } from 'next/navigation';
import ProductItems from '~/components/partials/product/ProductItems';
import PageContainer from '~/components/layouts/PageContainer';
import Newletters from '~/components/partials/commons/Newletters';
import FooterDefault from '~/components/shared/footers/FooterDefault';
import useProductBrand from '~/hooks/useProductBrand';
import { useGetAllProductQuery } from '~/react-redux/features/products/products';
import WidgetSubCategoryBrands from '~/components/shared/widgets/WidgetSubCategoryBrands';

export default function Page() {
    const { slug } = useParams();
    // const { loading, brandDetails } = useProductBrand(slug);

    const { data, error, isLoading } = useGetAllProductQuery({
        brand_id: slug,
    });
   

    // const products = data?.data || [];

 

    console.log('brandParams', slug)
    const products = useMemo(() => {
        if (!data) return [];
        return data?.data;
    }, [data]);

    console.log('products', products)
    //Views

    const productContent = useMemo(() => {
        if (isLoading) return <p>Loading...</p>;
        if (products) {
            return <ProductItems columns={4} products={products} />;
        }
    }, [isLoading, products]);


    const breadCrumb = [
        {
            text: 'Home',
            url: '/',
        },
        // {
        //     text: 'subCategory',
        //     url: `/subCategory/${slug}`,
        // },
        {
            text: products?.brand_title || 'Product brand',
        },
    ];

    return (
        <PageContainer
            footer={<FooterDefault />}
            title={products?.brand_title || 'Product brand'}
            >
            <div className="ps-page--shop">
                <BreadCrumb breacrumb={breadCrumb} />
                <div className="container">
                    <div className="ps-layout--shop ps-shop--category">
                        <div className="ps-layout__left">
                            {/* <WidgetShopCategories /> */}
                            <WidgetSubCategoryBrands />
                            <WidgetShopFilterByPriceRange />
                        </div>
                        <div className="ps-layout__right">
                            <h3 className="ps-shop__heading">
                                {/* {products?.brand_title || 'Product brand'} */}
                                Product brand
                            </h3>
                            {productContent}
                        </div>
                    </div>
                </div>
            </div>
            <Newletters layout="container" />
        </PageContainer>
    );
}
