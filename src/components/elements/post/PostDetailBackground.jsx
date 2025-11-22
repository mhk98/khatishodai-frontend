// import React, { useEffect, useState } from 'react';

// const PostDetailBackground = ({id}) => {


//      const [post, setPost] = useState(null);
//         const [loading, setLoading] = useState(true);
//         const [error, setError] = useState(null);
    
//         useEffect(() => {
//             const fetchBlogs = async () => {
//                 try {
//                     const response = await fetch(
//                         `https://backend.eaconsultancy.info/api/v1/blog/${id}`
//                     );
//                     if (!response.ok) {
//                         throw new Error('Network response was not ok');
//                     }
//                     const data = await response.json();
//                     setPost(data?.data || []);
//                 } catch (err) {
//                     console.error('Error fetching products:', err);
//                     setError('Failed to fetch new arrivals.');
//                 } finally {
//                     setLoading(false);
//                 }
//             };
    
//             fetchBlogs();
//         }, []);


//         const formatDate = (dateString) => {
//   const date = new Date(dateString);
//   return date.toLocaleDateString("en-US", {
//     day: "2-digit",
//     month: "long",
//     year: "numeric",
//   });
// };

//     return (
//          <div className="ps-post--detail ps-post--parallax">
//         <div
//             className="ps-post__header bg--parallax"

//               style={{backgroundImage: `url(https://backend.eaconsultancy.info/${post?.image1})`}}>

        
//             <div className="container">
//                 <h4>{post?.type}</h4>
//                 <h1>
//                     {post?.title}
//                 </h1>
//                 <p>{formatDate(post?.createdAt)} By Khatishodai</p>
//             </div>
//         </div>
//         <div className="container">

//             <div className='ps-post__content'>
//             <div dangerouslySetInnerHTML={{ __html: post?.description }} />
//             </div>

//             </div>
//     </div>
//     )
// }

// export default PostDetailBackground;




import React, { useEffect, useState } from "react";

const PostDetailBackground = ({ id }) => {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await fetch(
          `https://backend.eaconsultancy.info/api/v1/blog/${id}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setPost(data?.data || null); // Ensure null if no data
      } catch (err) {
        console.error("Error fetching blog:", err);
        setError("Failed to fetch blog data.");
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!post) return <p>No post found.</p>;


  const cleanImagePath = post.image1 ? post.image1.replace(/\\/g, '/') : '';

  return (
    <div className="ps-post--detail ps-post--parallax">
      <div
  className="ps-post__header bg--parallax"
  style={{
    backgroundImage: `url(https://backend.eaconsultancy.info/${cleanImagePath})`,
  }}
>

        <div className="container">
                <h4>{post?.type}</h4>
                <h1>                     {post?.title}
                </h1>
               <p>{formatDate(post?.createdAt)} By Khatishodai</p>
            </div>
      </div>

      <div className="container mt-8">
        <div className="ps-post__content">
          <div dangerouslySetInnerHTML={{ __html: post?.description }} />
        </div>
      </div>
    </div>
  );
};

export default PostDetailBackground;
