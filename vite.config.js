import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import fs from 'fs/promises';
import svgr from '@svgr/rollup';

export default defineConfig(({ mode }) => {
  // Load environment variables from .env files
  const env = loadEnv(mode, process.cwd(), 'VITE_');

  return {
    base: env.VITE_BASE_PATH || '/', // / for dev, /admin/ for prod
    resolve: {
      alias: {
        src: resolve(__dirname, 'src'),
      },
    },
    esbuild: {
      loader: 'jsx',
      include: /src\/.*\.jsx?$/,
      exclude: [],
    },
    optimizeDeps: {
      esbuildOptions: {
        plugins: [
          {
            name: 'load-js-files-as-jsx',
            setup(build) {
              build.onLoad(
                { filter: /src\\.*\.js$/ },
                async (args) => ({
                  loader: 'jsx',
                  contents: await fs.readFile(args.path, 'utf8'),
                })
              );
            },
          },
        ],
      },
    },
    plugins: [
      svgr(), // SVGR for SVG imports
      react(), // React plugin
    ],
    envPrefix: 'VITE_', // Correct for VITE_ variables
    build: {
      outDir: 'dist', // Output directory
      assetsDir: 'assets', // Directory for JS, CSS, images
      sourcemap: true, // Optional: for debugging
    },
  };
});