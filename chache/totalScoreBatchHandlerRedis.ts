import totalScore from "./totalScore";
import * as redis from "redis";
import { promisify } from "util";
const client = redis.createClient();
const getAsync = promisify(client.get).bind(client);
const setAsync = promisify(client.set).bind(client);
const delAsync = promisify(client.del).bind(client);

const queues = {};

export default async (team: string, callback) => {
  const cache = await getAsync(team);

  if (cache) {
    console.log(`キャッシュ ${team}: ${cache} にヒットしました。`);
    return process.nextTick(callback.bind(null, null, cache));
  }

  // 他のリクエストによってすでにキューに入っている場合は、自身のリクエストも同じキューに入れるだけ
  if (queues[team]) return queues[team].push(callback);

  queues[team] = [callback];
  const score = await totalScore(team);

  // キューに入っている全ての callback 関数に計算結果を渡す
  queues[team].forEach(cb => cb(null, score));

  // キューのクリア
  queues[team] = null;

  // キャッシュの保存;
  setAsync(team, score);

  // キャッシュの削除予約;
  scheduleRemoveCache(team);
};

async function scheduleRemoveCache(team: string) {
  function delteCache(team) {
    console.log(`キャッシュ ${team} を削除します`);
    delAsync(team);
  }
  setTimeout(async () => delteCache(team), 30 * 1000);
}
