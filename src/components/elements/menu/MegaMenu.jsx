import React from 'react';
import Link from 'next/link';

const splitArrayIntoColumns = (array, itemsPerColumn = 10) => {
    const result = [];
    for (let i = 0; i < array.length; i += itemsPerColumn) {
        result.push(array.slice(i, i + itemsPerColumn));
    }
    return result;
};

const MegaMenuColumn = ({ item }) => {
    // 10টি আইটেম অনুযায়ী অ্যারেটিকে কলামে ভাগ করা হলো
    const columns = splitArrayIntoColumns(item.megaItems, 7);

    return (
        // মূল কন্টেইনার। CSS এর মাধ্যমে এটি flex/grid ব্যবহার করে কলামগুলোকে পাশাপাশি দেখাবে।
        // এই div টিকে 'mega-menu__column' এর বাইরে রাখা হয়েছে যাতে এটি মূল মেনু কলামের
        // ভিতরের সব উপ-কলাম (sub-columns) ধরে রাখতে পারে।
        <div className="mega-menu__column" key={item.heading}>
            <h4>{item.heading}</h4>
            <div className="mega-menu__sub-columns-container"> 
                {columns.map((columnItems, columnIndex) => (
                    // প্রতিটি ভাগের জন্য একটি নতুন কলামের div
                    <div 
                        className="mega-menu__sub-column" 
                        key={`${item.heading}-col-${columnIndex}`}
                    >
                        <ul className="mega-menu__list">
                            {columnItems.map((subItem) => (
                                <li key={subItem.text}>
                                    <Link
                                        href={`/subCategory/${subItem.categoryId}/${subItem.subCategoryItemId}`}
                                    >
                                        {subItem.text}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
};


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
