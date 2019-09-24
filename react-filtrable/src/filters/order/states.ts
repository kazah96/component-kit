import { ORDER_TYPES } from './order-types';

export default {
  initial: {
    active: false,
    order: ORDER_TYPES.DESC
  },
  transitions: [
    {
      from: { active: true, order: ORDER_TYPES.ASC },
      to: { active: true, order: ORDER_TYPES.DESC }
    },
    {
      from: { active: true, order: ORDER_TYPES.DESC },
      to: { active: false, order: ORDER_TYPES.DESC }
    },
    {
      from: { active: false, order: ORDER_TYPES.DESC },
      to: { active: true, order: ORDER_TYPES.ASC }
    },
  ]
}
