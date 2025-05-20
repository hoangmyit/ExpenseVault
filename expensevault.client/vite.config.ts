import { reactRouterDevTools } from 'react-router-devtools';

import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react-swc';
import child_process from 'child_process';
import fs from 'fs';
import { fileURLToPath, URL } from 'node:url';
import path from 'path';
import { env } from 'process';
import { visualizer } from 'rollup-plugin-visualizer';
import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';
import tsconfigPaths from 'vite-tsconfig-paths';

const baseFolder =
  env.APPDATA !== undefined && env.APPDATA !== ''
    ? `${env.APPDATA}/ASP.NET/https`
    : `${env.HOME}/.aspnet/https`;

const certificateName = 'expensevault.client';
const certFilePath = path.join(baseFolder, `${certificateName}.pem`);
const keyFilePath = path.join(baseFolder, `${certificateName}.key`);

if (!fs.existsSync(certFilePath) || !fs.existsSync(keyFilePath)) {
  if (
    0 !==
    child_process.spawnSync(
      'dotnet',
      [
        'dev-certs',
        'https',
        '--export-path',
        certFilePath,
        '--format',
        'Pem',
        '--no-password',
      ],
      { stdio: 'inherit' },
    ).status
  ) {
    throw new Error('Could not create certificate.');
  }
}

const target = env.ASPNETCORE_HTTPS_PORT
  ? `https://localhost:${env.ASPNETCORE_HTTPS_PORT}`
  : process.env.VITE_API_URL;

export default defineConfig(({ mode }) => {
  const isAnalyze = process.env.VITE_ANALYZE === 'true';
  return {
    plugins: [
      react({
        jsxImportSource: 'react',
      }),
      tsconfigPaths(),
      tailwindcss(),
      isAnalyze &&
        visualizer({
          open: true, // Automatically open the visualization in browser
          filename: 'dist/stats.html', // Output file
          gzipSize: true,
          brotliSize: true,
        }),
      mode !== 'production' && reactRouterDevTools(),
      svgr({
        svgrOptions: {
          icon: true,
          exportType: 'named',
          namedExport: 'ReactComponent',
        },
      }),
    ].filter(Boolean),
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    server: {
      proxy: {
        '^/api': {
          target,
          secure: mode === 'production',
        },
      },
      port: 5173,
      https: {
        key: fs.readFileSync(keyFilePath),
        cert: fs.readFileSync(certFilePath),
      },
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks: (id) => {
            // React and React DOM
            if (
              id.includes('node_modules/react') ||
              id.includes('node_modules/react-dom') ||
              id.includes('node_modules/scheduler') ||
              id.includes('node_modules/use-sync-external-store') ||
              id.includes('node_modules/prop-types')
            ) {
              return 'react-vendor';
            }

            // UI libraries
            if (id.includes('node_modules/@tailwindcss/')) {
              return 'ui-vendor';
            }

            // State management
            if (
              id.includes('node_modules/zustand/') ||
              id.includes('node_modules/jotai/') ||
              id.includes('node_modules/recoil/')
            ) {
              return 'state-vendor';
            }

            // Other major third-party libraries
            if (id.includes('node_modules/')) {
              return 'vendors';
            }
          },
        },
      },
      minify: mode === 'production',
    },
  };
});
