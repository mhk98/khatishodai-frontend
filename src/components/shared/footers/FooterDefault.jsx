import React from 'react';
import FooterWidgets from './modules/FooterWidgets';
import FooterLinks from './modules/FooterLinks';
import FooterCopyright from './modules/FooterCopyright';
import FooterSecond from './FooterSecond';

const FooterDefault = () => (
    <footer className="ps-footer">
        <div className="container">
            {/* <FooterWidgets /> */}
            <FooterSecond/>
            {/* <FooterLinks /> */}
            {/* <FooterCopyright /> */}
        </div>
    </footer>
);

export default FooterDefault;
