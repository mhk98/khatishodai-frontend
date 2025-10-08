import React, { useMemo } from 'react';
import Link from 'next/link';

const ModuleProductDetailSpecification = ({ product }) => {
    const { category_id } = product;

    const productCategories = useMemo(() => {
        if (category_id?.length !== 0) return <p>No category found.</p>;
        else {
            return category_id.map((category) => (
                <Link href={`/category/${category.slug}`} key={category.id}>
                    {category.title}
                </Link>
            ));
        }
    }, [category_id]);

    return (
        <div className="ps-product__specification">
            {/* <Link href={'/page/blank'} className="report">
                Report Abuse
            </Link>
            <p>
                <strong>SKU: {product.sku}</strong>
            </p>
            <p className="categories">
                <strong>Categories:</strong>
                {productCategories}
            </p>
            <p className="tags">
                <strong>Tags:</strong>
                <Link href={'/shops'}>{product.tag}</Link>
               
            </p> */}
        </div>
    );
};

export default ModuleProductDetailSpecification;
