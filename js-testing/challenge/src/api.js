const http = require("http");

const routes = {
  default: (req, res) => {
    res.write("cars list");
    return res.end();
  },
};

const handler = (req, res) => {
  res.writeHead(200, {
    "Content-Type": "text/html",
  });

  return routes.default(req, res);
};

const app = http
  .createServer(handler)
  .listen(3000, () => console.log("app running at", 3000));

module.exports = app;
