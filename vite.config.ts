import { resolve } from 'path'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/deeper-details.ts'),
      name: 'DeeperDetails',
      fileName: (format) => `deeper-details.${format}.js`
    },
    outDir: 'dist',
  },
  plugins: [dts()],
});