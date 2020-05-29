#!/usr/bin/env node
const ourHttpServer = required('./dist-node/index').default;

(async () => {
  const args = process.argv.slice(2);

  const { root, port, ips, url } = await ourHttpServer({
    root: args[0],
    port: args[1] ? parseInt(args[1]) : undefined,
  });

  // Output server details to the console
  console.log(`
  🗂  Serving:\t${root}\n
  🏡 Local:\t${url}
  ${ips.map((ip) => `📡 Network:\thttp://${ip}:${port}`).join("\n  ")}
  `);
})();
