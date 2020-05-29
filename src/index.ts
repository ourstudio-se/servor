import path from "path";
import fs from "fs";
import url from "url";
import http from "http";
import zlib from "zlib";

import { usePort, networkIps } from "./utils/common";
import getMimeType from "./utils/mimeTypes";

interface Server {
  root: string;
  inject?: string;
  port?: number;
}

type Request = http.IncomingMessage;
type Response = http.ServerResponse;

const envPort = process.env.PORT ? parseInt(process.env.PORT) : undefined;

const Server = async ({ root: _root = ".", inject, port: _port }: Server) => {
  let port = _port || envPort || 8080;
  try {
    port = await usePort(port);
  } catch (e) {
    if (port || process.env.PORT) {
      console.log("[ERR] The port you have specified is already in use!");
      process.exit();
    }
  }

  // Configure globals

  const root = _root.startsWith("/") ? _root : path.join(process.cwd(), _root);

  // Server utility functions
  const isRouteRequest = (pathname: string) => {
    const a = pathname?.split("/").pop()?.indexOf(".");
    return a === undefined || a === -1;
  };
  const utf8 = (file: string) => Buffer.from(file, "binary").toString("utf8");

  const sendError = (res: Response, status: number) => {
    res.writeHead(status);
    res.write(`${status}`);
    res.end();
  };

  const sendFile = (
    res: Response,
    status: number,
    file: string,
    ext: string,
    encoding: BufferEncoding = "binary"
  ) => {
    let buffer: Buffer | undefined;
    if (["js", "css", "html", "json", "xml", "svg"].includes(ext)) {
      res.setHeader("content-encoding", "gzip");
      buffer = zlib.gzipSync(utf8(file));
      encoding = "utf8";
    }
    res.writeHead(status, { "content-type": getMimeType(ext) });
    res.write(buffer || file, encoding);
    res.end();
  };

  // Respond to requests with a file extension

  const serveStaticFile = (res: Response, pathname: string) => {
    const uri = path.join(root, pathname);
    const ext = uri.replace(/^.*[\.\/\\]/, "").toLowerCase();
    if (!fs.existsSync(uri)) return sendError(res, 404);
    fs.readFile(uri, "binary", (err, file) =>
      err ? sendError(res, 500) : sendFile(res, 200, file, ext)
    );
  };

  // Respond to requests without a file extension

  const serveRoute = (res: Response) => {
    const index = path.join(root, "index.html");

    fs.readFile(index, "binary", (err, file) => {
      if (err && inject) return sendFile(res, 200, inject, "html");
      if (err) return sendError(res, 500);
      file = inject ? file + inject : file;
      return sendFile(res, 200, file, "html");
    });
  };

  // Start the server and route requests

  http
    .createServer((req: Request, res: Response) => {
      const { pathname } = url.parse(req?.url || "");
      const decodedPathname = decodeURI(pathname || "");

      res.setHeader("access-control-allow-origin", "*");
      if (!isRouteRequest(decodedPathname))
        return serveStaticFile(res, decodedPathname);
      return serveRoute(res);
    })
    .listen(port);

  return { url: `http://localhost:${port}`, root, port, ips: networkIps };
};

export default Server;
