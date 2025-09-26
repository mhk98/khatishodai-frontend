import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const OrganicBlog = () => {

    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await fetch(
                    'https://backend.eaconsultancy.info/api/v1/blog'
                );
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setBlogs(data?.data || []);
            } catch (err) {
                console.error('Error fetching products:', err);
                setError('Failed to fetch new arrivals.');
            } finally {
                setLoading(false);
            }
        };

        fetchBlogs();
    }, []);



const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
};

    return (

        <div className="ps-section--default ps-home-blog">
        <div className="container">
            <div className="ps-section__header">
                <h3>News</h3>
                <ul className="ps-section__links">
                    
                        {
                            blogs.map((blog) => (
                                <li key={blog.id}>

                                <Link href={`/blog`}>{blog.type}</Link>

                                </li>
                            ))
                        }
                   
                    
                </ul>
            </div>
            <div className="ps-section__content">
                <div className="row">
                   {
                    blogs.slice(0, 3).map((blog) => (
                         <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
                        <div className="ps-post">
                            <div className="ps-post__thumbnail">
                                <a
                                    className="ps-post__overlay"
                                    href="blog-detail.html"></a>
                                <img
                                    src={`https://backend.eaconsultancy.info/${blog.image}`}
                                    alt="Khatishodai"
                                />
                            </div>
                            <div className="ps-post__content">
                                <a className="ps-post__meta" href="#">
                                   {blog.type}
                                </a>
                                <a className="ps-post__title" href="#">
                                    {blog.title}
                                </a>
                                <p>
                                    {formatDate(blog.createdAt)} by
                                    <a href="#"> Khatishodai</a>
                                </p>
                            </div>
                        </div>
                    </div>
                    ))
                   }
                </div>
            </div>
        </div>
    </div>
        )}

export default OrganicBlog;
