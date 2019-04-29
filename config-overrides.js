/* eslint-disable import/no-extraneous-dependencies,no-unused-vars,no-param-reassign */
const { override, fixBabelImports, addLessLoader } = require('customize-cra');

module.exports = override(
      fixBabelImports('import', {
          libraryName: 'antd',
         libraryDirectory: 'es',
        style: 'true',
       }),
    addLessLoader({
        javascriptEnabled: true,
        modifyVars: {
            '@primary-color': '#F4A034',
            '@form-item-margin-bottom': '12px',
            '@input-height-lg': '26px',
            '@layout-header-background': '#F4A034',
            '@menu-dark-submenu-bg': '#666',
        },
    }),
    );
