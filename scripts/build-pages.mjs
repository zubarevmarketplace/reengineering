import { spawnSync } from "node:child_process";
import { writeFileSync } from "node:fs";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "/reengineering";
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://zubarevlab.ru/reengineering/";
const build = spawnSync(process.execPath, ["node_modules/next/dist/bin/next", "build"], { stdio: "inherit", env: { ...process.env, NEXT_PUBLIC_BASE_PATH: basePath, NEXT_PUBLIC_SITE_URL: siteUrl } });
if (build.status !== 0) process.exit(build.status ?? 1);
writeFileSync("out/.preview-config.json", JSON.stringify({ basePath }));
