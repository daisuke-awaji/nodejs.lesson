const stream = require("stream");
const Chance = require("chance");
const chance = new Chance();

class RandomStream extends stream.Readable {
  constructor(options) {
    super(options);
  }
  _read(size) {
    const chunk = chance.string();
    console.log(`Pushing chunk of size: ${chunk.length}`);
    this.push(chunk, "utf-8");
    if (chance.bool({ likelihood: 5 })) {
      this.push(null);
    }
  }
}

// module.exports = RandomStream;

const randomStream = new RandomStream();
randomStream.on("readable", () => {
  let chunk;
  while ((chunk = randomStream.read()) !== null) {
    console.log(`Chunk recieved: ${chunk.toString()}`);
  }
});
