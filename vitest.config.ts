import angular from '@analogjs/vite-plugin-angular';
import path from 'path';
import viteTsConfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [viteTsConfigPaths(), angular()],
  resolve: {
    alias: [
      {
        find: '@spartan-ng/helm/utils',
        replacement: path.resolve(__dirname, 'libs/ui/utils/src/index.ts'),
      },
      {
        find: '@spartan-ng/helm/card',
        replacement: path.resolve(__dirname, 'libs/ui/card/src/index.ts'),
      },
      {
        find: '@spartan-ng/helm/button',
        replacement: path.resolve(__dirname, 'libs/ui/button/src/index.ts'),
      },
      {
        find: '@spartan-ng/helm/form-field',
        replacement: path.resolve(__dirname, 'libs/ui/form-field/src/index.ts'),
      },
      {
        find: '@spartan-ng/helm/input',
        replacement: path.resolve(__dirname, 'libs/ui/input/src/index.ts'),
      },
      {
        find: '@spartan-ng/helm/field',
        replacement: path.resolve(__dirname, 'libs/ui/field/src/index.ts'),
      },
      {
        find: '@spartan-ng/helm/label',
        replacement: path.resolve(__dirname, 'libs/ui/label/src/index.ts'),
      },
      {
        find: '@spartan-ng/helm/separator',
        replacement: path.resolve(__dirname, 'libs/ui/separator/src/index.ts'),
      },
      {
        find: '@spartan-ng/helm/alert',
        replacement: path.resolve(__dirname, 'libs/ui/alert/src/index.ts'),
      },
      {
        find: '@spartan-ng/helm/icon',
        replacement: path.resolve(__dirname, 'libs/ui/icon/src/index.ts'),
      },
      {
        find: '@spartan-ng/helm/toast',
        replacement: path.resolve(__dirname, 'libs/ui/toast/src/index.ts'),
      },
    ],
  },

  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['src/vitest.setup.ts'],
    include: ['src/**/*.spec.ts'],
    reporters: ['default'],
    coverage: {
      provider: 'v8',
      exclude: ['lib/**', '**/*.d.ts', '**/node_modules/**', 'window.helper.ts'],
    },
  },
});
