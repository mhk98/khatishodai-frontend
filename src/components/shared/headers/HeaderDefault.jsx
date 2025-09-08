import React, { useEffect } from 'react';
// import Logo from '~/components/elements/common/Logo';
import SearchHeader from '~/components/shared/headers/modules/SearchHeader';
import DesktopNavigation from '~/components/shared/navigation/DesktopNavigation';
import HeaderActions from '~/components/shared/headers/modules/HeaderActions';
import { stickyHeader } from '~/utilities/common-helpers';
import MenuCategoriesDropdown from '~/components/shared/menus/MenuCategoriesDropdown';
import Link from 'next/link';

const HeaderDefault = () => {
    useEffect(() => {
        if (process.browser) {
            window.addEventListener('scroll', stickyHeader);
        }
    }, []);

    return (
        <header
            className="header header--organic"
            data-sticky="true"
            id="headerSticky">
            <div className="header__top">
                <div className="ps-container">
                    <div className="header__left">
                        {/* <Logo /> */}
                    <h3><Link href="/">
                    Khatishodais
                    </Link></h3>

                        <MenuCategoriesDropdown />
                    </div>
                    <div className="header__center">
                        <SearchHeader />
                    </div>
                    <div className="header__right">
                        <HeaderActions />
                    </div>
                </div>
            </div>
            <DesktopNavigation />
        </header>
    );
};

export default HeaderDefault;
