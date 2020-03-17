import { data } from "./data";

const sleep = msec => new Promise(resolve => setTimeout(resolve, msec));

const total = (team: string) => {
  let sum = 0;
  for (const item of data) {
    if (item.team === team) sum += item.point;
  }
  return sum;
};

export default (team: string): Promise<number> => {
  return new Promise(async (resolve, reject) => {
    console.log(`チーム: ${team} の集計処理を開始します。`);
    const sum = total(team);
    // 無理やり時間がかかる処理に偽装する
    await sleep(5000);
    console.log(`チーム: ${team} の集計処理が完了しました。`);
    resolve(sum);
  });
};
