import { Greeter } from "./index";

describe("index test", () => {
  test("Greeter", () => {
    expect(Greeter("po")).toBe("Hello po");
  });
});
