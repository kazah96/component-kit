import OrderFilter from "./index";

describe("Bool filter test", () => {
  const initialState = OrderFilter.getInitialState();

  test("Initial state", () => {
    expect(initialState).toEqual({ active: false, bool: false });
  });

  test("Next state", () => {
    const nextState = OrderFilter.getNextState({ active: false, bool: false });
    expect(nextState).toEqual({ active: true, bool: false });
  });
});
