import path from "path";
import { init, emulator, executeScript } from "flow-js-testing";

test("test", async () => {
  const basePath = path.resolve(__dirname, "../cadence");

  // Init framework
  init(basePath, { re });
  // Start emulator
  await emulator.start();

  console.log(emulator.adminPort);

  // Define code and arguments we want to pass
  const code = `
    pub fun main(message: String): Int{
      log(message)

      return 42
    }
  `;
  const args = ["Hello, from Cadence"];

  const [result, e] = await executeScript({ code, args });
  expect(result).toBe(42);

  // Stop emulator instance
  await emulator.stop();
});
