import { defineConfig } from "@playwright/test";
export default defineConfig({
  testDir: "./tests",
  fullyParallel: false,
  workers: 1,
  reporter: [["list"], ["json", { outputFile: ".qa/test-report.json" }]],
  use: { baseURL: process.env.TEST_BASE_URL || "http://127.0.0.1:3000", browserName: "chromium", channel: process.env.CI ? undefined : "chrome", headless: true, reducedMotion: "reduce", permissions: ["clipboard-read", "clipboard-write"], screenshot: "only-on-failure" },
  webServer: process.env.TEST_BASE_URL ? undefined : { command: "node scripts/serve.mjs", url: "http://127.0.0.1:3000", reuseExistingServer: !process.env.CI },
});
