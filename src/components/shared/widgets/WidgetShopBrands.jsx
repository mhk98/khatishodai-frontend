import React, { useEffect, useMemo } from 'react';
import Link from 'next/link';
import { useGetAllBrandQuery } from '~/react-redux/features/brand/brand';

const WidgetShopBrands = ({id}) => {
    // const Router = useRouter();
    // const { slug } = useParams();
    // const { loading, brands, getBrands } = useProductBrand();

    // useEffect(() => {
    //     getBrands();
    // }, []);


    const { data, error, isLoading } = useGetAllBrandQuery({
        category_id: id,
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
                const title = item.title || '';
                return (
                    <li key={index}>
                        <Link href={`/brand/${item.id}`}>{item.title}</Link>
                    </li>
                );
            });

            return <ul className="ps-list--brands">{items}</ul>;
        } else {
            return [];
        }
    }, [brands, isLoading]);

    function handleSelectBrand(e) {
        Router.push(`/brand/${e.target.value}`);
    }

    // Views

    return (
        <aside className="widget widget_shop widget_shop--brand">
            <h4 className="widget-title">By Brands</h4>
            {brandsView}
        </aside>
    );
};

export default WidgetShopBrands;
