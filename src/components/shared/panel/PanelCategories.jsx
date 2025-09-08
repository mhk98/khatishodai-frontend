// import React, { Component } from 'react';
// import { Menu } from 'antd';
// import categories from '~/public/static/data/static-categories.json';

// const { SubMenu } = Menu;

// class PanelCategories extends Component {
//     constructor(props) {
//         super(props);
//     }

//     rootSubmenuKeys = ['sub1', 'sub2', 'sub4'];

//     state = {
//         openKeys: ['sub1'],
//     };

//     onOpenChange = (openKeys) => {
//         const latestOpenKey = openKeys.find(
//             (key) => this.state.openKeys.indexOf(key) === -1
//         );
//         if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
//             this.setState({ openKeys });
//         } else {
//             this.setState({
//                 openKeys: latestOpenKey ? [latestOpenKey] : [],
//             });
//         }
//     };

//     render() {
//         return (
//             <Menu
//                 mode="inline"
//                 openKeys={this.state.openKeys}
//                 onOpenChange={this.onOpenChange}>
//                 {categories.map((category) => (
//                     <Menu.Item key={category.id}>
//                         <a href={`/shop?category=${category.slug}`}>
//                             {category.name}
//                         </a>
//                     </Menu.Item>
//                 ))}
//             </Menu>
//         );
//     }
// }

// export default PanelCategories;



import React, { Component } from 'react';
import { Menu, Spin, Alert } from 'antd';

const { SubMenu } = Menu;

class PanelCategories extends Component {
  state = {
    categories: null,
    loading: true,
    error: null,
    openKeys: [],
  };

  rootSubmenuKeys = []; // updated dynamically after data loads

  componentDidMount() {
    fetch('https://backend.eaconsultancy.info/api/v1/category')
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((json) => {
        this.setState({ categories: json.data, loading: false }, () => {
          this.rootSubmenuKeys = this.state.categories.map((cat) =>
            String(cat.categoryId)
          );
          this.setState({ openKeys: [String(this.state.categories[0]?.categoryId)] });
        });
      })
      .catch((err) => {
        this.setState({ error: err.message, loading: false });
      });
  }

  onOpenChange = (openKeys) => {
    const latestOpenKey = openKeys.find((key) => !this.state.openKeys.includes(key));
    if (!this.rootSubmenuKeys.includes(latestOpenKey)) {
      this.setState({ openKeys });
    } else {
      this.setState({ openKeys: latestOpenKey ? [latestOpenKey] : [] });
    }
  };

  render() {
    const { categories, loading, error, openKeys } = this.state;

    if (loading) return <Spin />;
    if (error) return <Alert type="error" message={error} />;

    return (
      <Menu
  mode="inline"
  openKeys={openKeys}
  onOpenChange={this.onOpenChange}
>
  {categories.map((category) => (
    <SubMenu
      key={String(category.categoryId)}
      title={
        <a href={`/category/${category.categoryId}`}>
          {category.text}
        </a>
      }
      className={category.extraClass}
    >
      {category.megaContent.map((subCat) => (
        <SubMenu
          key={`sub-${category.categoryId}-${subCat.subCategoryId}`}
          title={subCat.heading}
        >
          {subCat.megaItems.map((item) => (
            <Menu.Item key={`item-${item.subCategoryItemId}`}>
              <a href={`/subCategory/${item.categoryId}/${item.subCategoryItemId}`}>
                {item.text}
              </a>
            </Menu.Item>
          ))}
        </SubMenu>
      ))}
    </SubMenu>
  ))}
</Menu>

    );
  }
}

export default PanelCategories;
