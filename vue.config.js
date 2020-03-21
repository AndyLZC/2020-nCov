module.exports = {
  configureWebpack: {
    devServer: {
      proxy: {
        '/txapi': {
          target: 'http://api.tianapi.com',
          open: true,
          changeOrigin: true,
        },
      },
    },
  },
  css: {
    loaderOptions: {
      sass: {
        prependData: `
          @import "~@/style/mixin.scss";
        `,
      },
    },
  },
};
