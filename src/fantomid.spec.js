import { test, mock, before, it } from "node:test";
import assert from "assert/strict";

test("fantomid", () => {
  let randomMock = mock.fn();
  let fantomid;

  before(async () => {
    mock.module("@lukeed/csprng", { namedExports: { random: randomMock } });
    ({ fantomid } = await import("./fantomid.js"));
  });

  it("should generate an id", () => {
    randomMock.mock.mockImplementationOnce(() =>
      Buffer.from([0xa2, 0xd2, 0xff]),
    );
    console.log(Buffer.from([0xa2, 0xd2, 0xff, 0x04, 0xc5]));
    mock.timers.enable({ now: new Date("2025-11-24T19:13:45.994Z") });
    const id = fantomid();
    assert.equal(id, 8209108814378532);
  });
});
