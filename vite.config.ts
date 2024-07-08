import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/deeper-details.ts'),
      name: 'DeeperDetails',
      fileName: 'deeper-details'
    },
  }
});