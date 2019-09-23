export default function (items) {
  const boolFilters = items.reduce((acc, item) => ({ ...acc, [item.name]: item.state.bool }), {});

  return {
    ...boolFilters
  }
}