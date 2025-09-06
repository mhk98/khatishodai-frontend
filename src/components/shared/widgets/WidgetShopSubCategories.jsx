import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import useProducCategory from '~/hooks/useProducCategory';
import { useGetAllCategoryQuery } from '~/react-redux/features/category/category';
import axios from 'axios';
import { useGetAllSubCategoryItemQuery } from '~/react-redux/features/subCategoryItem/subCategoryItem';

const WidgetShopSubCategories = ({category_id, subCategoryItemId}) => {
    // const { loading, categories, getCategories } = useProducCategory();
    // const [test, setSet] = useState(0);

    // useEffect(() => {
    //     getCategories();
    // }, []);


    //   const { data, error, isLoading } = useGetAllCategoryQuery({
    //         category_id: id,
    //     });
          
    //     const categories = data?.data || [];

    //     console.log('categories', categories)
        
        // useEffect(() => {
        //     fetchProducts();
        // }, [fetchProducts]);
        
        //     useEffect(() => {
        //         fetchProducts();
        //         handleSetColumns();
        //     }, [fetchProducts, pageIndex]);
      


//         const [categories, setCategories] = useState([])
//  console.log("categories", categories)

//     useEffect(() => {
//       const fetchData = async () => {
//         try {
//           const res = await axios.get("http://localhost:5000/api/v1/category/");
//           setCategories(res.data);
//         } catch (err) {
//           console.error(err);
//         } 
//       };
    
//       fetchData();
//     }, []);


// const [subCategoriesItem, setSubCategoriesItem] = useState([]);

// useEffect(() => {
//   const fetchData = async () => {
//     try {
//       const res = await axios.get("http://localhost:5000/api/v1/subCategoryItem", {
//         params: {
//           category_id: category_id, // Replace `category_id` with the actual variable or state holding the value.
//           subCategoryItemId: subCategoryItemId, // Replace `subCategoryItemId` with the actual variable or state.
//         },
//       });
//       setSubCategoriesItem(res.data);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   fetchData();
// }, [category_id, subCategoryItemId]); // Use relevant dependencies, such as `category_id` and `subCategoryItemId`.





 const { data, error, isLoading } = useGetAllSubCategoryItemQuery({
        category_id: category_id,
        subCategoryItemId: subCategoryItemId,
    });


    const subCategoriesItem = data?.data || []

    console.log("subCategoriesItemData", subCategoriesItem)

    const categoriesView = useMemo(() => {
        if (!subCategoriesItem) {
            return <p>Loading...</p>;
        }
        if (subCategoriesItem.length > 0) {
            const items = subCategoriesItem.map((item, index) => {
                const category_id = item.category_id || '';
                const subCategoryItemId = item.subCategoryItemId || '';
                const title = item.subCategoryItemTitle || '';
                return (
                    <li key={index}>
                        <Link href={`/subCategory/${category_id}/${subCategoryItemId}`}>{title}</Link>
                    </li>
                );
            });
            return <ul className="ps-list--categories">{items}</ul>;
        } else {
            return [];
        }
    }, [subCategoriesItem]);

    return (
        <aside className="widget widget_shop">
            <h4 className="widget-title">Sub Categories</h4>
            {categoriesView}
        </aside>
    );
};

export default WidgetShopSubCategories;
