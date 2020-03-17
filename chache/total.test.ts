import * as redis from "redis";
import { promisify } from "util";
const client = redis.createClient();
const getAsync = promisify(client.get).bind(client);
const setAsync = promisify(client.set).bind(client);

test("chache", async done => {
  const key = "hoo";
  const value = "bar";
  await setAsync(key, value);
  expect(await getAsync(key)).toBe(value);
  done();
});
