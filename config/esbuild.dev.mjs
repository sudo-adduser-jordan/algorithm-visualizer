import esBuild from "esbuild";

// bundle react app
const ctx = await esBuild.context({
  entryPoints: ["./src/index.html", "./src/favicon.ico", "./src/index.tsx"],
  loader: {
    ".html": "copy",
    ".ico": "copy",
    ".png": "file",
    ".svg": "file",
  },
  bundle: true,
  minify: false,
  sourcemap: true,
  // target: ["chrome58", "firefox57", "safari11", "edge16"],
  outdir: "./toolchain/dev/",
  banner: {
    js: "(() => { (new EventSource(\"/esbuild\")).addEventListener('change', () => location.reload()); })();",
  },
  logLevel: "info",
});

// serve app to port @ localhost
await ctx
  .serve({
    servedir: "./toolchain/dev/",
    port: 3000,
  })
  .then(console.log("Server running... \n \n http://localhost:3000"))
  .catch("Server error.");

// watch src dir for changes
await ctx.watch();
