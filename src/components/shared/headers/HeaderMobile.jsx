import React, { Component } from 'react';
import CurrencyDropdown from './modules/CurrencyDropdown';
import Link from 'next/link';
import LanguageSwicher from './modules/LanguageSwicher';
import MobileHeaderActions from './modules/MobileHeaderActions';
import PanelSearch from '../panel/PanelSearch';

class HeaderMobile extends Component {
    render() {
        return (
            <header className="header header--mobile">
                <div className="header__top">
                    <div className="header__left">
                        <p>Welcome to Khatishodai Online Shopping Store !</p>
                    </div>
                    <div className="header__right">
                        <ul className="navigation__extra">
                            <li>
                                <Link href="/vendor/become-a-vendor">
                                    Sell on Khatishodai
                                </Link>
                            </li>
                            <li>
                                <Link href="/account/order-tracking">
                                    Tract your order
                                </Link>
                            </li>
                            <li>
                                <CurrencyDropdown />
                            </li>
                            <li>
                                <LanguageSwicher />
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="navigation--mobile">
                    <div className="navigation__left">
                        <Link href="/" className="ps-logo">
                            <img
                            src="/static/img/logo.png"
                            width={156}
                            height={32}
                            alt="martfury"
                        />
      

                        </Link>
                    </div>
                    <MobileHeaderActions />
                </div>
                <div className="ps-search--mobile">
                    {/* <form
                        className="ps-form--search-mobile"
                        action="/"
                        method="get">
                        <div className="form-group--nest">
                            <input
                                className="form-control"
                                type="text"
                                placeholder="Search something..."
                            />
                            <button>
                                <i className="icon-magnifier" />
                            </button>
                        </div>
                    </form> */}

                    <PanelSearch/>
                </div>
            </header>
        );
    }
}

export default HeaderMobile;
