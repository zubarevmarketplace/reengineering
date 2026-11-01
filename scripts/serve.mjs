// Local preview of the exact static production output, no external server dependency.
import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { resolve, extname, sep } from "node:path";
import { gzipSync } from "node:zlib";
const root = resolve("out");
const port = Number(process.env.PORT || 3000);
let basePath = "";
try { basePath = JSON.parse(await readFile(resolve(root, ".preview-config.json"), "utf8")).basePath || ""; } catch { /* Root-hosted export. */ }
const types = { ".html": "text/html; charset=utf-8", ".css": "text/css; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".json": "application/json", ".svg": "image/svg+xml", ".webp": "image/webp", ".jpg": "image/jpeg", ".png": "image/png", ".pdf": "application/pdf", ".woff2": "font/woff2", ".woff": "font/woff", ".xml": "application/xml", ".txt": "text/plain; charset=utf-8" };
try { await stat(resolve(root, "index.html")); } catch { console.error("Production export missing. Run npm run build first."); process.exit(1); }
const server = createServer(async (req, res) => {
  try {
    const url = new URL(req.url || "/", `http://127.0.0.1:${port}`);
    if (basePath && url.pathname === "/") { res.writeHead(302, { Location: `${basePath}/` }).end(); return; }
    const pathname = basePath && url.pathname.startsWith(basePath + "/") ? url.pathname.slice(basePath.length) : url.pathname;
    let file = resolve(root, "." + decodeURIComponent(pathname));
    if (file !== root && !file.startsWith(root + sep)) { res.writeHead(403).end(); return; }
    if (req.method !== "GET" && req.method !== "HEAD") { res.writeHead(405).end(); return; }
    try { if ((await stat(file)).isDirectory()) file = resolve(file, "index.html"); }
    catch { if (!extname(file)) file += ".html"; }
    let body;
    try { body = await readFile(file); }
    catch { file = resolve(root, "404.html"); body = await readFile(file); res.statusCode = 404; }
    res.setHeader("Content-Type", types[extname(file)] || "application/octet-stream");
    res.setHeader("X-Content-Type-Options", "nosniff");
    res.setHeader("Cache-Control", file.includes(`${sep}_next${sep}static${sep}`) ? "public, max-age=31536000, immutable" : "no-cache");
    if (/\.(html|js|css|json|svg|xml|txt)$/.test(file) && req.headers["accept-encoding"]?.includes("gzip")) { body = gzipSync(body); res.setHeader("Content-Encoding", "gzip"); res.setHeader("Vary", "Accept-Encoding"); }
    res.setHeader("Content-Length", body.length);
    res.end(req.method === "HEAD" ? undefined : body);
  } catch { res.writeHead(400).end("Bad request"); }
});
server.listen(port, "127.0.0.1", () => console.log(`Local: http://127.0.0.1:${port}`));
