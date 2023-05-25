import { createServer } from "http";
import type { IncomingMessage, ServerResponse } from "http";
import { readFile } from "fs/promises";
import path from "path";

const PORT = 3000;
const HOST = "localhost";

const requestListener = async (_: IncomingMessage, res: ServerResponse) => {
  const html = await readFile(path.resolve() + "/index.html");
  res.setHeader("Content-Type", "text/html");
  res.writeHead(200);
  res.end(html);
};

const server = createServer(requestListener);

server.listen(PORT, HOST, () => {
  console.log(`Server is running on http://${HOST}:${PORT}`);
});
