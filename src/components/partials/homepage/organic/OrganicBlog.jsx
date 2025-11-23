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
                    'http://localhost:5000/api/v1/blog'
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


console.log("blogs", blogs)

    return (

        <div className="ps-section--default ps-home-blog mt-5">
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
            <div className="ps-section__content mt-4">
                <div className="row">
                   {
                    blogs.slice(0, 3).map((post) => (
                         <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
                        {/* <div className="ps-post">
                            <div className="ps-post__thumbnail">
                                <a
                                    className="ps-post__overlay"
                                    href={`/post/${blog.id}`}>
<img
                                    src={`http://localhost:5000/${blog.image}`}
                                    alt="Khatishodai"
                                />
                                    </a>
                                
                            </div>
                            <div className="ps-post__content">
                                <a className="ps-post__meta" href={`/post/${blog.id}`}>
                                   {blog.type}
                                </a>
                                <a className="ps-post__title" href={`/post/${blog.id}`}>
                                    {blog.title}
                                </a>
                                <p>
                                    {formatDate(blog.createdAt)} by
                                    <a href={`/post/${blog.id}`}> Khatishodai</a>
                                </p>
                            </div>
                        </div> */}

                        <article className="ps-post">
                                    <div className="ps-post__thumbnail">
                                        <Link
                                            href={'/post/[pid]'}
                                            as={`/post/${post.id}`}
                                            className="ps-post__overlay"
                                        />
                                         <img
                                                            src={`http://localhost:5000/${post.image}`}
                                                            alt="Khatishodai"
                                                        />
                                    </div>
                                    <div className="ps-post__content">
                                        <div className="ps-post__meta">{post.type}</div>
                                        <Link
                                            href={'/post/[pid]'}
                                            as={`/post/${post.id}`}
                                            className="ps-post__title">
                                            {post.title}
                                        </Link>
                                        <p>
                                            {formatDate(post.createdAt)} by
                                            <Link href={'/blog'}> Khatishodai</Link>
                                        </p>
                                    </div>
                                </article>
                    </div>
                    ))
                   }
                </div>
            </div>
        </div>
    </div>
        )}

export default OrganicBlog;
