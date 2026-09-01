import { resolve } from "node:path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

// Library build: emits ESM + CJS bundles and a single stylesheet (dist/easel.css)
// alongside generated .d.ts types. The `dev/` playground is the default `vite`
// (serve) entry and is excluded from the library output.
export default defineConfig(({ command }) => ({
  plugins: [
    react(),
    command === "build" &&
      dts({
        include: ["src"],
        exclude: ["src/**/*.stories.*", "dev"],
        rollupTypes: true,
        tsconfigPath: "./tsconfig.lib.json",
      }),
  ].filter(Boolean),
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "Easel",
      formats: ["es", "umd"],
      fileName: (format) => (format === "es" ? "easel.js" : "easel.umd.cjs"),
    },
    rollupOptions: {
      external: ["react", "react-dom", "react/jsx-runtime"],
      output: {
        assetFileNames: (asset) =>
          asset.names?.some((n) => n.endsWith(".css")) ? "easel.css" : "[name][extname]",
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          "react/jsx-runtime": "jsxRuntime",
        },
      },
    },
    sourcemap: true,
    cssCodeSplit: false,
  },
}));
