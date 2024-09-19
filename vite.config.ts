import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
// import tsconfigPaths from 'vite-tsconfig-paths';
import path from 'path';
// import compression from 'vite-plugin-compression';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        // compression({
        //     algorithm: 'brotliCompress', // 알고리즘 선택
        //     ext: '.br', // 압축 선택
        //     threshold: 10240, // 10kb 이상만 압축
        // }),
        // tsconfigPaths(),
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
});
