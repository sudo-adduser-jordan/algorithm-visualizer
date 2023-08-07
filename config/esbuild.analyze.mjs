import * as esbuild from "esbuild";
import fs from "node:fs";

// analyze config
let result = await esbuild.build({
  entryPoints: ["./src/index.html", "./src/favicon.ico", "./src/main.tsx"],
  loader: {
    ".html": "copy",
    ".ico": "copy",
    ".png": "file",
    ".svg": "file",
  },
  bundle: true,
  sourcemap: true,
  minify: true,
  target: ["chrome58", "firefox57", "safari11", "edge16"],
  outdir: "./toolchain/analyze/",
  metafile: true,
  // logLevel: "verbose"
  logLevel: "debug",
});

// write meta file - this can be used at https://esbuild.github.io/analyze/
fs.writeFileSync(
  "./toolchain/analyze/meta.json",
  JSON.stringify(result.metafile)
);

/* print meta file results */

console.log(
  await esbuild.analyzeMetafile(result.metafile, {
    verbose: true,
  })
);
