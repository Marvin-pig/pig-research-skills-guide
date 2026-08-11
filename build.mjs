import { copyFile, mkdir, rm } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(fileURLToPath(import.meta.url));
const dist = join(root, "dist");

await rm(dist, { recursive: true, force: true });
await mkdir(join(dist, "client"), { recursive: true });
await mkdir(join(dist, "server"), { recursive: true });

for (const file of ["index.html", "styles.css", "app.js", "og.png"]) {
  await copyFile(join(root, file), join(dist, "client", file));
}

await copyFile(join(root, "server", "index.js"), join(dist, "server", "index.js"));
console.log("Built PIG Research Skills tutorial site.");
