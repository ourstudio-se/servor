import net from "net";
import os from "os";

export const usePort = (port: number = 0) =>
  new Promise<number>((resolve, reject) => {
    const server = net.createServer();
    server.on("error", reject);
    server.listen(port, () => {
      const address = server.address() as net.AddressInfo;
      if (address?.port) {
        server.close(() => resolve(address.port));
      }
    });
  });

const ips: string[] = [];

export const networkIps = Object.values(os.networkInterfaces()).reduce(
  (prev, current) =>
    current
      ? [
          ...prev,
          ...current
            .filter((i) => i.family === "IPv4" && i.internal === false)
            .map((x) => x.address),
        ]
      : prev,
  ips
);
