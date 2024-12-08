import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';
import path from 'path';
import checker from 'vite-plugin-checker';

export default defineConfig({
    plugins: [
        laravel({
            input: 'resources/js/app.tsx',
            refresh: true,
        }),
        checker({
            typescript: false,
        }),
        react(),
    ],
    resolve: {
        alias: {
          "@": path.resolve(__dirname, "./resources/js"), 
        },
      },
    
});
