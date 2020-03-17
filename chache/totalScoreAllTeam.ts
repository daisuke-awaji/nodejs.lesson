// import totalScore from "./totalScore";
import totalScoreBatchHandler from "./totalScoreBatchHandlerRedis";

const main = () => {
  ["A", "B", "C"].forEach(team => {
    totalScoreBatchHandler(team, (err, sum) => {
      console.log(`バッチ処理が完了しました。`);
      console.log(`チーム${team}の合計点数は${sum}です。`);
    });
  });
};

const cron = require("node-cron");
cron.schedule("*/10 * * * * *", () => main());
