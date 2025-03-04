import { defineConfig } from 'vite';

export default defineConfig({
  base: './', // Ensures relative paths for assets when deployed
  server: {
    port: 3000, // Change this if you want a different dev server port
    open: true, // Automatically opens the browser
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets', // Output directory for production build
  },
  assetsInclude: ['**/*.glb', '**/*.gltf'], // Ensure 3D models are correctly processed
});