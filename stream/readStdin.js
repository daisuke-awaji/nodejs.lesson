const stream = require("stream");
const sleep = msec => new Promise(resolve => setTimeout(resolve, msec));

process.stdin
  .on("readable", async () => {
    let chunk;
    while ((chunk = process.stdin.read()) !== null) {
      console.log(`Chunk recieved: ${chunk.toString()}`);
      await sleep(100);
    }
  })
  .on("end", () => {
    console.log("end");
  });
