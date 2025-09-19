import React from 'react';
import Link from 'next/link';

const MegaMenuColumn = ({ item }) => (
    <div className="mega-menu__column" key={item.heading}>
        <h4>{item.heading}</h4>
        <ul className="mega-menu__list">
            {item.megaItems.map((subItem) => (
                <li key={subItem.text}>
                    <Link
                        href={`/subCategory/${subItem.categoryId}/${subItem.subCategoryItemId}`}>
                        {subItem.text}
                    </Link>
                </li>
            ))}
        </ul>
    </div>
);

const MegaMenu = ({ source }) => {
    if (!source || !source.megaContent || source.megaContent.length === 0) {
        return null; // Optional: Replace with <span>No items available</span> for better UX
    }

    return (
        <li className="menu-item-has-children has-mega-menu">
            <Link href={`/category/${source.categoryId}`}>
                {/* {source.icon && <i className={source.icon} />} */}

                {source.icon && (
                    <img
                        src={`http://localhost:5000/${source.icon}`} // Dynamically constructing image URL
                        alt={source.text} // Alt text for accessibility
                        width={23}
                    />
                )}
                <span className="ml-3">{source.text}</span>
            </Link>
            <div className="mega-menu">
                {source.megaContent.map((item) => (
                    <MegaMenuColumn item={item} key={item.heading} />
                ))}
            </div>
        </li>
    );
};

export default MegaMenu;
