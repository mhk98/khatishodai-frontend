import React, { useEffect, useMemo } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import useProductBrand from '~/hooks/useProductBrand';
import { useGetAllBrandQuery } from '~/react-redux/features/brand/brand';

const WidgetSubCategoryBrands = ({id}) => {
    // const Router = useRouter();
    // const { slug } = useParams();
    // const { loading, brands, getBrands } = useProductBrand();

    // useEffect(() => {
    //     getBrands();
    // }, []);

    console.log('BrandParam', id)

    const { data, error, isLoading } = useGetAllBrandQuery({
        category_id: id,
        // subCategoryItem_id: id?.[1],
    });
    
    
    // useEffect(() => {
    //     fetchProducts();
    // }, [fetchProducts]);
    
    //     useEffect(() => {
    //         fetchProducts();
    //         handleSetColumns();
    //     }, [fetchProducts, pageIndex]);
    
    const brands = data?.data || [];
   

    const brandsView = useMemo(() => {
        if (isLoading) {
            return <p>Loading...</p>;
        }
        if (brands.length > 0) {
            const items = brands.map((item, index) => {
                // const slug = item.attributes.slug || '';
                // const title = item.attributes.title || '';
                return (
                    <li key={index}>
                        <Link href={`/subCategoryBrand/${item.id}`}>{item.title}</Link>
                    </li>
                );
            });

            return <ul className="ps-list--brands">{items}</ul>;
        } else {
            return [];
        }
    }, [brands, isLoading]);

    function handleSelectBrand(e) {
        Router.push(`/subCategoryBrand/${e.target.value}`);
    }

    // Views

    return (
        <aside className="widget widget_shop widget_shop--brand">
            <h4 className="widget-title">By Brands</h4>
            {brandsView}
        </aside>
    );
};

export default WidgetSubCategoryBrands;
