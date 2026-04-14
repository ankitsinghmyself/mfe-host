const { ModuleFederationPlugin } = require("webpack").container;

module.exports = {
  webpack: {
    configure: (webpackConfig) => {
webpackConfig.plugins.push(
        new ModuleFederationPlugin({
          name: "host",
          remotes: {
            dashboard: "dashboard@http://localhost:3001/remoteEntry.js",
            profile: "profile@http://localhost:3002/remoteEntry.js",
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