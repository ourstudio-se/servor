#!/usr/bin/env node
const fs = require("fs");
const path = require("path");
const ourHttpServer = require("../../pkg/dist-node/index.js");

(async () => {
  const args = process.argv.slice(2);

  const inject = fs.readFileSync(path.join(__dirname, "inject.html"), "binary");

  const { root, port, ips, url } = await ourHttpServer.default({
    root: args[0],
    port: args[1],
    inject
  });

  // Output server details to the console
  console.log(`
  🗂  Serving:\t${root}\n
  🏡 Local:\t${url}
  ${ips.map((ip) => `📡 Network:\thttp://${ip}:${port}`).join("\n  ")}
  `);
})();
