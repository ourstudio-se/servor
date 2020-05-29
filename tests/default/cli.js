#!/usr/bin/env node
const fs = require("fs");
const path = require("path");
const servor = require("../../pkg/dist-node/index.js");

(async () => {
  const args = process.argv.slice(2);

  const { root, port, ips, url } = await servor.default({
    root: args[0],
    port: args[1],
  });

  // Output server details to the console
  console.log(`
  🗂  Serving:\t${root}\n
  🏡 Local:\t${url}
  ${ips.map((ip) => `📡 Network:\thttp://${ip}:${port}`).join("\n  ")}
  `);
})();
