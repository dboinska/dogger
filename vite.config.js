const { resolve } = require('path');

const PATHS = {
  src: resolve(__dirname, 'src'), // Source files
  dist: resolve(__dirname, 'dist'), // Production build files
  public: resolve(__dirname, 'public'), // Static files that get copied to build folder
};

module.exports = {
  root: PATHS.src,
  publicDir: PATHS.public,
  build: {
    outDir: PATHS.dist,
    rollupOptions: {
      input: {
        index: `${PATHS.src}/index.html`,
        //nested: resolve(__dirname, 'nested/index.html')
      },
    },
  },
};
