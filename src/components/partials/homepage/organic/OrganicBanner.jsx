// import React, { Component } from 'react';
// import Slider from 'react-slick';

// class OrganicBanner extends Component {
//     constructor(props) {
//         super(props);
//     }

//     render() {
//         // const carouselSettings = {
//         //     dots: false,
//         //     arrows: false,
//         //     infinite: true,
//         //     speed: 1000,
//         //     slidesToShow: 1,
//         //     slidesToScroll: 1,
//         // };


//         const carouselSettings = {
//             dots: false,
//             arrows: false,
//             infinite: true,
//             speed: 1000,
//             slidesToShow: 1,
//             slidesToScroll: 1,
//             autoplay: true,          // 🔥 Enable auto sliding
//             autoplaySpeed: 3000,     // ⏱️ 3 seconds per slide
//             pauseOnHover: false,     // 🚫 Don’t stop when hovering
//         };
//         return (
//             <section className="ps-home-banner">
//                 <Slider {...carouselSettings}>
//                     <div
//                         className="ps-banner--organic"
//                         style={{
//                             backgroundImage: `url(/static/img/slider/home-9/8.png)`,
//                         }}>
//                         <img
//                             src="/static/img/slider/home-9/8.png"
//                             alt="martfury"
//                         />
//                         {/* <div className="ps-banner__content">
//                             <h4>Weekend Promotions</h4>
//                             <h3>
//                                 Happy Summer <br /> combo super discount <br />{' '}
//                                 up to
//                                 <strong>40% Off</strong>
//                             </h3>
//                             <a className="ps-btn" href="#">
//                                 Shop Now
//                             </a>
//                         </div> */}
//                     </div>
//                     <div
//                         className="ps-banner--organic"
//                         style={{
//                             backgroundImage: `url(/static/img/slider/home-9/3.png)`,
//                         }}>
//                         <img
//                             src="/static/img/slider/home-9/3.png"
//                             alt="khatishodai"
//                         />
//                         {/* <div className="ps-banner__content">
//                             <h4>Weekend Promotions</h4>
//                             <h3>
//                                 Fresh vegetables & <br /> fruits basket <br />{' '}
//                                 up to
//                                 <strong>40% Off</strong>
//                             </h3>
//                             <a className="ps-btn" href="#">
//                                 Shop Now
//                             </a>
//                         </div> */}
//                     </div>

//                     <div
//                         className="ps-banner--organic"
//                         style={{
//                             backgroundImage: `url(/static/img/slider/home-9/5.png)`,
//                         }}>
//                         <img
//                             src="/static/img/slider/home-9/5.png"
//                             alt="khatishodai"
//                         />
//                         {/* <div className="ps-banner__content">
//                             <h4>Weekend Promotions</h4>
//                             <h3>
//                                 Fresh vegetables & <br /> fruits basket <br />{' '}
//                                 up to
//                                 <strong>40% Off</strong>
//                             </h3>
//                             <a className="ps-btn" href="#">
//                                 Shop Now
//                             </a>
//                         </div> */}
//                     </div>
//                 </Slider>
//             </section>
//         );
//     }
// }

// export default OrganicBanner;



import React, { Component } from 'react';
import Slider from 'react-slick';

class OrganicBanner extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const carouselSettings = {
            dots: false,
            arrows: false,
            infinite: true,
            speed: 1000,
            slidesToShow: 1,
            slidesToScroll: 1,
        };

        return (
            <section className="ps-home-banner">
                <Slider {...carouselSettings}>
                    <div
                        className="ps-banner--organic"
                        style={{
                            backgroundImage: `url(/static/img/slider/home-9/4.png)`,
                        }}>
                        <img
                            src="/static/img/slider/home-9/4.png"
                            alt="martfury"
                        />
                        <div className="ps-banner__content">
                            <h4 className='text-center'>Weekend Promotions</h4>
                            <h3 className='text-center'>
                              "খাটি সদাই সর্বদাই" <br /> ভাল খান, ভাল থাকুন <br />
                            </h3>
                            <h3 className='text-center'>
                                up to <br />
                                <strong>10% Off</strong>

                            </h3>
                            <a className="ps-btn" href="/shops">
                                Shop Now
                            </a>
                        </div>
                    </div>
                    <div
                        className="ps-banner--organic"
                        style={{
                            backgroundImage: `url(/static/img/slider/home-9/7.png)`,
                        }}>
                        <img
                            src="/static/img/slider/home-9/7.png"
                            alt="martfury"
                        />
                        <div className="ps-banner__content">
                            <h4 className='text-center'>Weekend Promotions</h4>
                            <h3 className='text-center'>
                                Fresh & Care  <br /> For Every Home <br />{' '}                           
                            </h3>
                            <h3 className='text-center'>
                                up to <br />
                                <strong>10% Off</strong>

                            </h3>
                            <a className="ps-btn" href="/shops">
                                Shop Now
                            </a>
                        </div>
                    </div>
                    <div
                        className="ps-banner--organic"
                        style={{
                            backgroundImage: `url(/static/img/slider/home-9/10.png)`,
                        }}>
                        <img
                            src="/static/img/slider/home-9/10.png"
                            alt="martfury"
                        />
                        <div className="ps-banner__content">
                            <h4 className='text-center'>Weekend Promotions</h4>
                            <h3 className='text-center'>
                                Fresh & Healthy <br /> Choices for the Family <br />{' '}                     
                            </h3>
                            <h3 className='text-center'>
                                up to <br />
                                <strong>10% Off</strong>

                            </h3>
                            <a className="ps-btn" href="/shops">
                                Shop Now
                            </a>
                        </div>
                    </div>
                </Slider>
            </section>
        );
    }
}

export default OrganicBanner;
