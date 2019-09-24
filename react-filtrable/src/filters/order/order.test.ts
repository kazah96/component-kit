import OrderFilter from "./index";
import { ORDER_TYPES } from "./order-types";

describe("Order filter test", () => {
  const initialState = OrderFilter.getInitialState();

  test("Initial state", () => {
    expect(initialState).toEqual({ active: false, order: ORDER_TYPES.DESC });
  });

  test("SecondState", () => {
    const nextState = OrderFilter.getNextState({
      active: false,
      order: ORDER_TYPES.DESC
    });

    expect(nextState).toEqual({ active: true, order: ORDER_TYPES.ASC });
  });

  test("Undefined state transition", () => {
    const nextState = OrderFilter.getNextState({
      f: 123124
    });

    // expecting inital state
    expect(nextState).toEqual({ active: false, order: ORDER_TYPES.DESC });
  });
});
