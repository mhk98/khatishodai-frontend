import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import PostGrid from '~/components/elements/post/PostGrid';
import CustomPagination from '~/components/elements/common/CustomPagination';

const categories = [
    {
        text: 'All',
        url: '/blog',
    },
    {
        text: 'Review Product',
        url: '/blog/review-product',
    },
    {
        text: 'News',
        url: '/blog/news',
    },
    {
        text: 'Promotions',
        url: '/blog/promotions',
    },
    {
        text: 'Tips & Tricks',
        url: '/blog/tips-tricks',
    },
    {
        text: 'Others',
        url: '/blog/others',
    },
];

const BlogItemsGridView = ({ collectionSlug, columns }) => {

    const [category, setCategory] = useState(categories[0]);

        const [posts, setPosts] = useState([]);
        const [loading, setLoading] = useState(true);
        const [error, setError] = useState(null);
    
        useEffect(() => {
            const fetchBlogs = async () => {
                try {
                    const response = await fetch(
                        'http://localhost:5000/api/v1/blog'
                    );
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    const data = await response.json();
                    setPosts(data?.data || []);
                } catch (err) {
                    console.error('Error fetching products:', err);
                    setError('Failed to fetch new arrivals.');
                } finally {
                    setLoading(false);
                }
            };
    
            fetchBlogs();
        }, []);

    const blogContent = useMemo(() => {
        if (loading) return <p>Loading...</p>;
        if (posts.length === 0) return <p>No posts found</p>;
        return posts.map((item) => {
            if (columns === 4) {
                return (
                    <div className=" col-md-4 col-sm-6" key={item.id}>
                        <PostGrid post={item} />
                    </div>
                );
            } else if (columns === 4) {
                return (
                    <div className="col-lg-3 col-md-4 col-sm-6" key={item.id}>
                        <PostGrid post={item} />
                    </div>
                );
            } else {
                return (
                    <div className="col-md-6" key={item.id}>
                        <PostGrid post={item} />
                    </div>
                );
            }
        });
    }, [loading, posts]);


    
    return (
        <div className="ps-blog">
            <div className="ps-blog__header">
                <ul className="ps-list--blog-links">
                    {categories.map((item) => (
                        <li
                            key={item.url}
                            className={
                                category.text === item.text ? 'active' : ''
                            }>
                            <Link href={item.url}>{item.text}</Link>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="ps-blog__content">
                <div className="row">{blogContent}</div>
                <CustomPagination />
            </div>
        </div>
    );
};

export default BlogItemsGridView;
