import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Product from '~/components/elements/products/Product';
import SkeletonProduct from '~/components/elements/skeletons/SkeletonProduct';
import axios from 'axios';

const links = [
    { value: '/shop', text: 'Milks & Creams' },
    { value: '/shop', text: 'Fruits' },
    { value: '/shop', text: 'Vegetables' },
    { value: '/shop', text: 'Ocean Foods' },
    { value: '/shop', text: 'Fresh Meats' },
    { value: '/shop', text: 'View All' },
];

const OrganicNewArrivals = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get("http://localhost:5000/api/v1/product/arrival");
                setProducts(res.data?.data || []); // Assuming `res.data.data` contains the products.
                setLoading(false);
            } catch (err) {
                console.error("Error fetching products:", err);
                setError("Failed to fetch new arrivals.");
                setLoading(false);
            }
        };

        fetchData();
    }, []);


    const [categories, setCategories] = useState([])
    console.log("categories", categories)
   
       useEffect(() => {
         const fetchData = async () => {
           try {
             const res = await axios.get("http://localhost:5000/api/v1/category/");
             setCategories(res.data.data);
           } catch (err) {
             console.error(err);
           } 
         };
       
         fetchData();
       }, []);

    return (
        <div className="ps-product-list ps-product-list--2">
            <div className="container">
                <div className="ps-section__header">
                    <h3>New Arrivals</h3>
                    <ul className="ps-section__links">
                        {categories.map((category) => (
                            <li key={category.id}>
                                <Link href={`/category/${category.categoryId}`}>{category.text}</Link>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="ps-section__content">
                    <div className="row">
                        {loading ? (
                            Array(6)
                                .fill()
                                .map((_, index) => (
                                    <div
                                        className="col-xl-2 col-lg-3 col-sm-3 col-6"
                                        key={index}>
                                        <SkeletonProduct />
                                    </div>
                                ))
                        ) : error ? (
                            <p className="error-message">{error}</p>
                        ) : products.length === 0 ? (
                            <p>No product found.</p>
                        ) : (
                            products.map((product) => (
                                <div
                                    className="col-xl-3 col-lg-4 col-md-4 col-sm-6 col-12"
                                    key={product.id}>
                                    <Product product={product} />
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrganicNewArrivals;
