# airtable-formula-builder [![Build Status](https://travis-ci.org/gabrielalmeida/airtable-formula-builder.svg?branch=master)](https://travis-ci.org/gabrielalmeida/airtable-formula-builder)

> Helper utility to create [Airtable's Formula](https://support.airtable.com/hc/en-us/articles/203255215-Formula-field-reference) strings.

## Install 

```bash
npm install airtable-formula-builder
```

## Usage 

Use a helper library to generate the formulas, like [lodash](http://lodash.com) or [Ramda](http://ramdajs.com/):
Can be used with Airtable's API field `filterByFormula`.

```js
    import f from "airtable-formula-builder";
    import R from "ramda";

    const idsFormula = R.compose(
      R.flatten,
      R.map(id => [
        f.CONTAINS(id, COLUMN.AIRTABLE_PLAY_URL),
        f.CONTAINS(id, COLUMN.RECORD_ID)
      ])
    )(ids);
```


TypeScript advanced sample:
```ts
    const containsReducer = (value: ConstantCollection, field: string) => (
      acc: string[],
      cur: string
    ): string[] => R.append(f.CONTAINS(R.prop(cur, value), field), acc);

    const normalizedCategories = R.map(
      paramCaseAndRmAccents,
      R.defaultTo([], categories as string[])
    );

    const categoriesReducer = containsReducer(CATEGORY, COLUMN.CATEGORIES);
    const categoriesFormula = R.compose(f._str, R.reduce(categoriesReducer, []))(
      normalizedCategories
    );

    const normalizedModifiers = R.map(
      paramCaseAndRmAccents,
      R.defaultTo([], modifiers as string[])
    );
    const modifiersReducer = containsReducer(MODIFIER, COLUMN.MODIFIERS);
    const modifiersFormula = R.compose(f._str, R.reduce(modifiersReducer, []))(
      normalizedModifiers
    );

    const normalizedType: string = paramCaseAndRmAccents(type);
    const curType: string = R.prop(normalizedType, TYPE);
    const typeFormula: string = f.EQUALS(COLUMN.TYPE, curType);

    const formula: string = f.AND([
      typeFormula,
      f.OR([categoriesFormula, modifiersFormula])
    ]);
```

## API

```ts
    AND: (query: ReadonlyArray<string>) => string;
    OR: (query: ReadonlyArray<string>) => string;
    EQUALS: (column: string, value: string) => any;
    FIND: (query: string, column: string, operator: string, value: any) => string;
    CONTAINS: (query: string, column: string) => string;
    _str: (arr: ReadonlyArray<string>) => string;
```

## License

MIT © [Gabriel Almeida](https://gabrielalmeida.me)
