import React from 'react';

const ContactInfo = () => (
    <div className="ps-contact-info">
        <div className="container">
            <div className="ps-section__header">
                <h3>Contact Us For Any Questions</h3>
            </div>
            <div className="ps-section__content">
                <div className="row">
                    <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-12">
                        <div className="ps-block--contact-info">
                            <h4>Contact Directly</h4>
                            <p>
                                <a href="mailto:contact@martfury.com">
                                    contact@khatishodai.com
                                </a>
                                <span>+880 1643363229</span>
                            </p>
                        </div>
                    </div>
                    <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-12">
                        <div className="ps-block--contact-info">
                            <h4>Head Office</h4>
                            <p>
                                <span>
                                    Police plaza Concord ( level -5, Tower- 2),Community Bank, Corporate Branch,Plot- 2,Road -144,Gulshan-1,Dhaka-1212
                                </span>
                            </p>
                        </div>
                    </div>
                    <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-12">
                        <div className="ps-block--contact-info">
                            <h4>Work With Us</h4>
                            <p>
                                <span>Send your CV to our email:</span>
                                <a href="#">career@khatishodai.com</a>
                            </p>
                        </div>
                    </div>
                    <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-12">
                        <div className="ps-block--contact-info">
                            <h4>Customer Service</h4>
                            <p>
                                <a href="#">customercare@khatishodai.com</a>
                                <span>+880 1643363229</span>
                            </p>
                        </div>
                    </div>
                    <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-12">
                        <div className="ps-block--contact-info">
                            <h4>Media Relations</h4>
                            <p>
                                <a href="#">media@khatishodai.com</a>
                                <span>+880 1643363229</span>
                            </p>
                        </div>
                    </div>
                    {/* <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-12">
                        <div className="ps-block--contact-info">
                            <h4>Vendor Support</h4>
                            <p>
                                <a href="#">vendorsupport@khatishodai.com</a>
                                <span>(801) 947-3100</span>
                            </p>
                        </div>
                    </div> */}
                </div>
            </div>
        </div>
    </div>
);

export default ContactInfo;
