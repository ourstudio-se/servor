#!/usr/bin/env node
const fs = require("fs");
const path = require("path");
const servor = require("./pkg/dist-node/index.js");

(async () => {
  const args = process.argv.slice(2);

  const inject = fs.readFileSync(path.join(__dirname, "tests/inject.html"), "binary");

  // Parse arguments from the command line
  const { root, port, ips, url } = await servor.default({
    root: args[0],
    fallback: args[1],
    port: args[2],
    inject,
  });

  // Output server details to the console
  console.log(`
  🗂  Serving:\t${root}\n
  🏡 Local:\t${url}
  ${ips.map((ip) => `📡 Network:\thttp://${ip}:${port}`).join("\n  ")}
  `);
})();
