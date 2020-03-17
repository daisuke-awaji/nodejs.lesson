import totalScore from "./totalScore";

const queues = {};
const cache = {};

export default async (team: string, callback) => {
  if (cache[team]) {
    console.log(`キャッシュ ${team}: ${cache[team]} にヒットしました。`);
    return process.nextTick(callback.bind(null, null, cache[team]));
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
  console.log(`キャッシュ ${team}: ${score} を保存します。`);
  cache[team] = score;

  // キャッシュの削除予約;
  scheduleRemoveCache(team);
};

function scheduleRemoveCache(team: string) {
  function delteCache(team) {
    console.log(`キャッシュ ${team}: ${cache[team]} を削除します`);
    delete cache[team];
  }
  setTimeout(() => delteCache(team), 30 * 1000);
}
