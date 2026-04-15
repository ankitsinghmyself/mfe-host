const { ModuleFederationPlugin } = require("webpack").container;

module.exports = {
  webpack: {
    configure: (webpackConfig) => {
webpackConfig.plugins.push(
        new ModuleFederationPlugin({
          name: "host",
          remotes: {
            dashboard: "dashboard@https://mfe-remote-dashboard.vercel.app//remoteEntry.js",
            profile: "profile@https://mfe-remote-profile.vercel.app/remoteEntry.js",
          },
          shared: {
            react: { singleton: true, requiredVersion: false },
            "react-dom": { singleton: true, requiredVersion: false },
            "react-router-dom": { singleton: true, requiredVersion: false },
          },
        })
      );

webpackConfig.output.publicPath = "auto";
      webpackConfig.output.uniqueName = "host";
      webpackConfig.output.chunkLoadingGlobal = "hostChunkLoader";
      webpackConfig.optimization.runtimeChunk = false;

      return webpackConfig;
    },
  },
};