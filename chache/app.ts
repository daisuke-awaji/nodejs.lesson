import * as http from "http";
import * as url from "url";
// import totalScore from "./totalScore";
// import totalScoreBatchHandler from "./totalScoreBatchHandler";
import totalScoreBatchHandler from "./totalScoreBatchHandlerRedis";

http
  .createServer(async (req, res) => {
    const query = url.parse(req.url, true).query;
    totalScoreBatchHandler(query.team as string, (err, sum) => {
      res.writeHead(200);
      res.end(`チーム${query.team}の合計点数は${sum}です。\n`);
    });
    // const sum = await totalScore(query.team as string);
    // res.writeHead(200);
    // res.end(`チーム${query.team}の合計点数は${sum}です。\n`);
  })
  .listen(8080, () => {
    console.log("server is now listening htttp://localhost:8080");
  });
