import React, { useMemo } from 'react';
import Link from 'next/link';


const PostGrid = ({ post }) => {
 

    const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
};

    return (
        <article className="ps-post">
            <div className="ps-post__thumbnail">
                <Link
                    href={'/post/[pid]'}
                    as={`/post/${post.id}`}
                    className="ps-post__overlay"
                />
                 <img
                                    src={`https://backend.eaconsultancy.info/${post.image}`}
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
    );
};

export default PostGrid;
