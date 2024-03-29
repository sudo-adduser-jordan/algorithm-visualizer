// Vercel Deploy Build Config

import * as esbuild from "esbuild";
import fs from "node:fs";

// build config
let result = await esbuild.build({
  entryPoints: ["./src/index.html", "./src/favicon.ico", "./src/index.tsx"],
  loader: {
    ".html": "copy",
    ".ico": "copy",
    ".png": "file",
    ".svg": "file",
  },
  bundle: true,
  sourcemap: false,
  minify: true,
  // target: ['chrome58', 'firefox57', 'safari11', 'edge16'],
  metafile: true,
  outdir: "./public",
  logLevel: "info",
});

// write meta file - this can be used at https://esbuild.github.io/analyze/
fs.writeFileSync("./public/meta.json", JSON.stringify(result.metafile));

/* print meta file results */

// console.log(result);

console.log(await esbuild.analyzeMetafile(result.metafile));

// console.log(
//   await esbuild.analyzeMetafile(result.metafile, {
//     verbose: true,
//   })
// );
