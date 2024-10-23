import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
  base: "/",
  resolve: {
    alias: {
      "@DrukFont": path.resolve(__dirname, "/font/druk-font.otf"),
    },
    extensions: [".js", ".ts", ".tsx", ".jsx"],
  },
});
