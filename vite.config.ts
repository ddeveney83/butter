import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// @ts-expect-error Development middleware is a server-only ES module.
import { butterlearnDevelopment } from "./server/local.mjs";

import { marketingDevelopment } from "./server/marketing.mjs";

export default defineConfig({
  plugins: [react(), butterlearnDevelopment(), marketingDevelopment()],
});
