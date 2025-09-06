// import React from 'react';
// import { Rate } from 'antd';
// import Rating from '~/components/elements/Rating';

// const PartialReview = () => (
//     <div className="row">
//         <div className="col-xl-5 col-lg-5 col-md-12 col-sm-12 col-12">
//             <div className="ps-block--average-rating">
//                 <div className="ps-block__header">
//                     <h3>4.00</h3>
//                     <Rating />

//                     <span>1 Review</span>
//                 </div>
//                 <div className="ps-block__star">
//                     <span>5 Star</span>
//                     <div className="ps-progress" data-value="100">
//                         <span></span>
//                     </div>
//                     <span>100%</span>
//                 </div>
//                 <div className="ps-block__star">
//                     <span>4 Star</span>
//                     <div className="ps-progress" data-value="0">
//                         <span></span>
//                     </div>
//                     <span>0</span>
//                 </div>
//                 <div className="ps-block__star">
//                     <span>3 Star</span>
//                     <div className="ps-progress" data-value="0">
//                         <span></span>
//                     </div>
//                     <span>0</span>
//                 </div>
//                 <div className="ps-block__star">
//                     <span>2 Star</span>
//                     <div className="ps-progress" data-value="0">
//                         <span></span>
//                     </div>
//                     <span>0</span>
//                 </div>
//                 <div className="ps-block__star">
//                     <span>1 Star</span>
//                     <div className="ps-progress" data-value="0">
//                         <span></span>
//                     </div>
//                     <span>0</span>
//                 </div>
//             </div>
//         </div>
//         <div className="col-xl-7 col-lg-7 col-md-12 col-sm-12 col-12">
//             <form className="ps-form--review" action="/" method="get">
//                 <h4>Submit Your Review</h4>
//                 <p>
//                     Your email address will not be published. Required fields
//                     are marked
//                     <sup>*</sup>
//                 </p>
//                 <div className="form-group form-group__rating">
//                     <label>Your rating of this product</label>
//                     <Rate defaultValue={1} />
//                 </div>
//                 <div className="form-group">
//                     <textarea
//                         className="form-control"
//                         rows="6"
//                         placeholder="Write your review here"></textarea>
//                 </div>
//                 <div className="row">
//                     <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12  ">
//                         <div className="form-group">
//                             <input
//                                 className="form-control"
//                                 type="text"
//                                 placeholder="Your Name"
//                             />
//                         </div>
//                     </div>
//                     <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12  ">
//                         <div className="form-group">
//                             <input
//                                 className="form-control"
//                                 type="email"
//                                 placeholder="Your Email"
//                             />
//                         </div>
//                     </div>
//                 </div>
//                 <div className="form-group submit">
//                     <button className="ps-btn">Submit Review</button>
//                 </div>
//             </form>
//         </div>
//     </div>
// );

// export default PartialReview;


import React, { useState, useEffect } from 'react';
import { Rate, message } from 'antd';
import toast from 'react-hot-toast';
import Rating from '../../Rating';

const PartialReview = ({ product }) => {
    const [rating, setRating] = useState(1);
    const [content, setContent] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [reviews, setReviews] = useState([]);

    // Load existing reviews
    const fetchReviews = async () => {
        try {
            const res = await fetch(`http://localhost:5000/api/v1/review/${product.id}`);
            const data = await res.json();
            console.log("fetchReviews", data)
            if (data) {
                setReviews(data?.data || []);
            } else {
                console.error("Failed to load reviews");
            }
        } catch (err) {
            console.error("Error loading reviews:", err);
        }
    };

    useEffect(() => {
        if (product?.id) {
            fetchReviews();
        }
    }, [product?.id]);

    console.log("reviews", reviews);

    // Handle form submit
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!content || !name || !email) {
            message.error('Please fill all fields');
            return;
        }

        try {
            setLoading(true);
            const res = await fetch("http://localhost:5000/api/v1/review/create", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ content, name, email, rating, product_id: product.id }),
            });

            const response = await res.json();

            if (response.data.success === true) {
                toast.success('Review submitted successfully!');
                setContent('');
                setName('');
                setEmail('');
                setRating(1);
                fetchReviews(); // Reload reviews after submit
            } else {
                message.error('Something went wrong. Please try again.');
            }
        } catch (error) {
            console.error(error);
            message.error('Failed to submit review');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="row">

           <div className="col-xl-5 col-lg-5 col-md-12 col-sm-12 col-12">
                <div className="ps-block--average-rating">
                    <div className="ps-block__header">
                        <h3>4.00</h3>
                        <Rating />
                        <span>1 Review</span>
                    </div>
                    <div className="ps-block__star">
                        <span>5 Star</span>
                        <div className="ps-progress" data-value="100">
                            <span></span>
                        </div>
                        <span>100%</span>
                    </div>
                    <div className="ps-block__star">
                        <span>4 Star</span>
                        <div className="ps-progress" data-value="0">
                            <span></span>
                        </div>
                        <span>0</span>
                    </div>
                    <div className="ps-block__star">
                        <span>3 Star</span>
                        <div className="ps-progress" data-value="0">
                            <span></span>
                        </div>
                        <span>0</span>
                    </div>
                    <div className="ps-block__star">
                        <span>2 Star</span>
                        <div className="ps-progress" data-value="0">
                            <span></span>
                        </div>
                        <span>0</span>
                    </div>
                    <div className="ps-block__star">
                        <span>1 Star</span>
                        <div className="ps-progress" data-value="0">
                            <span></span>
                        </div>
                        <span>0</span>
                    </div>
                </div>
            </div>

            <div className="col-xl-7 col-lg-7 col-md-12 col-sm-12 col-12">
                <form className="ps-form--review" onSubmit={handleSubmit}>
                    <h4>Submit Your Review</h4>
                    <p>
                        Your email address will not be published. Required
                        fields are marked <sup>*</sup>
                    </p>
                    <div className="form-group form-group__rating">
                        <label>Your rating of this product</label>
                        <Rate value={rating} onChange={setRating} />
                    </div>
                    <div className="form-group">
                        <textarea
                            className="form-control"
                            rows="6"
                            placeholder="Write your review here"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                        ></textarea>
                    </div>
                    <div className="row">
                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                            <div className="form-group">
                                <input
                                    className="form-control"
                                    type="text"
                                    placeholder="Your Name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                            <div className="form-group">
                                <input
                                    className="form-control"
                                    type="email"
                                    placeholder="Your Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="form-group submit">
                        <button className="ps-btn" disabled={loading}>
                            {loading ? 'Submitting...' : 'Submit Review'}
                        </button>
                    </div>
                </form>

                {/* Show existing reviews here */}
                <div className="review-list" style={{ marginTop: '40px' }}>
                    <h4>Customer Reviews</h4>
                    {reviews.length === 0 ? (
                        <p>No reviews yet.</p>
                    ) : (
                        reviews.map((rev) => (
                            <div key={rev._id} className="review-item" style={{ marginBottom: '20px', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>
                                <div style={{ fontWeight: 'bold' }}>{rev.name}</div>
                                <Rate disabled defaultValue={rev.rating} />
                                <p style={{ marginTop: '5px' }}>{rev.content}</p>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default PartialReview;
