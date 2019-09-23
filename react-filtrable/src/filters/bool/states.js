export default {
  initial: {
    active: false,
    bool: false
  },
  transitions: [
    {
      from: { active: false, bool: false },
      to: { active: true, bool: false }
    },
    {
      from: { active: true, bool: false },
      to: { active: true, bool: true }
    },
    {
      from: { active: true, bool: true },
      to: { active: false, bool: false }
    },
  ]
}
