import { defineConfig } from "vitest/config";
import path from "path";

export default defineConfig({
  test: {
    // ...
    root: "./tests",
    alias: {
      "@src": path.resolve() + "/src",
    },
    silent: true,
  },
});
