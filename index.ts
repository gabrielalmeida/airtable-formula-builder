import * as R from "ramda";

const isNotEmpty = R.complement(R.isEmpty);

const f = {
  AND: (query: ReadonlyArray<string>) =>
    (isNotEmpty(query) && `AND(${f._str(query)})`) || "",
  OR: (query: ReadonlyArray<string>) =>
    (isNotEmpty(query) && `OR(${f._str(query)})`) || "",
  EQUALS: (column: string, value: string): string =>
    R.cond([
      [R.none(R.isNil), R.always(`{${column}} = ${value}`)],
      [R.T, R.always("")]
    ])([column, value]),
  FIND: (query: string, column: string, operator: string, value: any) =>
    `FIND("${query}", {${column}}) ${operator} ${value}`,
  CONTAINS: (query: string, column: string) => f.FIND(query, column, ">", 0),
  _str: (arr: ReadonlyArray<string>): string =>
    R.join(", ", R.reject(R.isEmpty, arr))
};

export default f;
