import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useGetAllCategoryQuery } from '~/react-redux/features/category/category';

const OrganicTopCategories = () => {
    const [categories, setCategories] = useState([]);
    console.log('categories', categories);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(
                    'http://localhost:5000/api/v1/category/'
                );
                setCategories(res.data.data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="ps-top-categories">
            <div className="container">
                <h3>Top categories of the month</h3>
                <div className="row">
                    {categories.map((category) => (
                        <div
                            key={category.id}
                            className="col-xl-2 col-lg-3 col-md-4 col-sm-6 col-12">
                            <Link href={`/category/${category.categoryId}`}>
                                <div className="ps-block--category">
                                    <div className="ps-block__thumbnail">
                                        <img
                                            src={`http://localhost:5000/${category.icon}`}
                                            alt="martfury"
                                        />
                                    </div>
                                    <div className="ps-block__content">
                                        <p>{category.text}</p>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                    {/* <div className="col-xl-2 col-lg-3 col-md-4 col-sm-6 col-12">
                    <div className="ps-block--category">
                        <div className="ps-block__thumbnail">
                            <img
                                src="/static/img/categories/organic/2.jpg"
                                alt="martfury"
                            />
                        </div>
                        <div className="ps-block__content">
                            <p>Fruits</p>
                        </div>
                    </div>
                </div>
                <div className="col-xl-2 col-lg-3 col-md-4 col-sm-6 col-12">
                    <div className="ps-block--category">
                        <div className="ps-block__thumbnail">
                            <img
                                src="/static/img/categories/organic/3.jpg"
                                alt="martfury"
                            />
                        </div>
                        <div className="ps-block__content">
                            <p>Vegetables</p>
                        </div>
                    </div>
                </div>
                <div className="col-xl-2 col-lg-3 col-md-4 col-sm-6 col-12">
                    <div className="ps-block--category">
                        <div className="ps-block__thumbnail">
                            <img
                                src="/static/img/categories/organic/4.jpg"
                                alt="martfury"
                            />
                        </div>
                        <div className="ps-block__content">
                            <p>Ocean Foods</p>
                        </div>
                    </div>
                </div>
                <div className="col-xl-2 col-lg-3 col-md-4 col-sm-6 col-12">
                    <div className="ps-block--category">
                        <div className="ps-block__thumbnail">
                            <img
                                src="/static/img/categories/organic/5.jpg"
                                alt="martfury"
                            />
                        </div>
                        <div className="ps-block__content">
                            <p>Butters &amp; Eggs</p>
                        </div>
                    </div>
                </div>
                <div className="col-xl-2 col-lg-3 col-md-4 col-sm-6 col-12">
                    <div className="ps-block--category">
                        <div className="ps-block__thumbnail">
                            <img
                                src="/static/img/categories/organic/6.jpg"
                                alt="martfury"
                            />
                        </div>
                        <div className="ps-block__content">
                            <p>Fresh Meats</p>
                        </div>
                    </div>
                </div> */}
                </div>
            </div>
        </div>
    );
};

export default OrganicTopCategories;
