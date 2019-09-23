import * as yup from "yup";

import FilterGenerator from './filter-generator';

export default {
  columnsDefinitions: yup
    .object()
    .test({
      name: "Keys count",
      test: value => {
        return Object.keys(value).length > 0;
      },
      message: "ColumnsDefinitions must have at least 1 column definition"
    })
    .required(),
    
  columnDefinition: yup.object().shape({
    title: yup.string().required(),
    group: yup.number().notRequired(),
    enabled: yup.bool().notRequired(),
    filter: yup.object().required().test({
      name: "Filter is instance of filtergenerator",
      test: (filter) => filter instanceof FilterGenerator,
      message: "Filter is instanceof FilterGenerator"
    })
  })
};
