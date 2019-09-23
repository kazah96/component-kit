import {
  columnsMapper,
  validateColumnsDefinitions,
  validateColumnDefinition,
  getDefaultFilters
} from "./utils";

import FilterGenerator from './filter-generator';

describe("Filtrable methods", () => {
  describe("validateColumnsDefinitions", () => {
    test("Should throw error. must be an object", () => {
      const testValue = "Test value" as any;

      expect(() => validateColumnsDefinitions(testValue)).toThrowError();
    });

    test("Should throw error. must be an object", () => {
      const testValue = null as any;

      expect(() => validateColumnsDefinitions(testValue)).toThrowError();
    });

    test("Should throw error. object must not be empty", () => {
      const testValue = {};

      expect(() => validateColumnsDefinitions(testValue)).toThrowError();
    });

    test("Should not throw error.", () => {
      const testValue = { a: 1, b: 2 } as any;

      expect(() => validateColumnsDefinitions(testValue)).not.toThrowError();
    });
  });

  describe("validateColumnDefinition", () => {
    test("Should throw error. Not valid columnDefinition", () => {
      const invalidColumnDefinition = {} as any;

      expect(() =>
        validateColumnDefinition(invalidColumnDefinition)
      ).toThrowError();
    });

    test("Should throw error. Not valid columnDefinition", () => {
      const invalidColumnDefinition = { a: "123", b: "123", c: 123 } as any;

      expect(() =>
        validateColumnDefinition(invalidColumnDefinition)
      ).toThrowError();
    });

    test("Should not throw error. Valid columnDefinition", () => {
      const validColumnDefinition = {
        title: "Title",
        group: 1,
        enabled: false,
        filter: new FilterGenerator()
      } as any;

      expect(() =>
        validateColumnDefinition(validColumnDefinition)
      ).not.toThrowError();
    });

    test("Should not throw error. Valid columnDefinition", () => {
      const validColumnDefinition = {
        title: "Title",
        filter: new FilterGenerator()
      } as any;

      expect(() =>
        validateColumnDefinition(validColumnDefinition)
      ).not.toThrowError();
    });
  });

  describe("getDefaultFilters", () => {
    const columns = [{ name: "id" }] as any;

    const filter = new FilterGenerator();
    const columnsDefinitions = {
      id: {
        filter,
      }
    } as any;

    test("Should return value", () => {
      expect(getDefaultFilters(columns, columnsDefinitions)).toEqual({
        id: { filter }
      });
    });
  });

  describe("ColumnsMapper", () => {
    const filter = new FilterGenerator();

    test("Should throw error. Not valid columnDefinition", () => {
      const invalidColumnDefinition = {};
      const testValue = { id: invalidColumnDefinition } as any;

      expect(() => columnsMapper(testValue)).toThrowError();
    });

    test("Should throw error. Not valid columnDefinition", () => {
      const invalidColumnDefinition = { a: "123", b: "123", c: 123 };
      const testValue = { id: invalidColumnDefinition } as any;

      expect(() => columnsMapper(testValue)).toThrowError();
    });

    test("Not valid return value.", () => {
      const validColumnDefinition = { title: "ColumnTitle", filter };

      const testValue = { id: validColumnDefinition } as any;

      expect(columnsMapper(testValue)).not.toEqual([{}]);
    });

    test("Valid return value.", () => {
      const validColumnDefinition = {
        title: "ColumnTitle",
        filter,
        enabled: false
      };

      const testValue = { id: validColumnDefinition } as any;

      expect(columnsMapper(testValue)).toEqual([]);
    });

    test("Valid return value.", () => {
      const validColumnDefinition = {
        title: "ColumnTitle",
        enabled: true,
        filter
      };

      const testValue = { id: validColumnDefinition } as any;

      expect(columnsMapper(testValue)).toEqual([
        { name: "id", title: "ColumnTitle" }
      ]);
    });
  });
});
