const Chance = require("chance");
const chance = new Chance();

const http = require("http");

const sleep = msec => new Promise(resolve => setTimeout(resolve, msec));

function main() {
  http
    .createServer(async (req, res) => {
      res.writeHead(200, { "Content-Type": "text/plain" });
      while (chance.bool({ likelihood: 99 })) {
        res.write(chance.string() + "\n");
        await sleep(50);
      }
      res.end("end");
      res.on("finish", () => {
        console.log("finish");
      });
    })
    .listen(8080, () => {
      console.log("listening on http://localhost:8080");
    });
}

main();
