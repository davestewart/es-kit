#  Helpers

> Reusable helper functions to help you build request parameters and parse response data

## Intro

### Approach

ES Kit works on the basis that Document and Search API calls **follow a similar lifecycle** so the helpers abstract each part:

**1. Build parameters:**

- build a [query](#query)
- create a [script](#script)
- [sort](#sort) the results

**2. Make the request:**

- build a [bulk query](#bulk)
- merge any [defaults](#defaults)

**3. Parse the response:**

- [extract](#extract) the results
- [paginate](#paginate) the results
- build individual [documents](#doc)
- remap [fields](#fields)

**4. Handle errors:**

- parse [errors](#error)
- [log](#log) errors

### Purpose and customisation

You can use the helpers directly or indirectly via the [Api](../api/README.md) class (which uses them [internally](../../src/modules/api.ts)).

You should know that the [code](../../src/modules/helpers.ts) for each of the helpers is simple and straightforward but also make decisions on how to convert arguments into request parameters or response data. However, the helpers are designed to be **atomic** which means you can [replace](#extending) them if you need to, which will update the functionality of both the individual helper and the Api method which uses them.

If you're not using the Api and you don't want to replace them, simply use your own code where you need to.

## Usage

You can import the helpers in several ways:

```js
// import as a single object (which will code-complete)
import { Helpers } from `@davestewart/es-kit`

// import and rename as something easier to type
import { Helpers as $ } from `@davestewart/es-kit`

// import individually
import { $painless, $query } from `@davestewart/es-kit`
```

Once imported, use the individual helpers to build query options or parse responses:

```js
// build options
const options = {
  index: 'contacts',
  sort: $.sort('name')
  query: $.query(res.params),
}

// call the api
const res = await client.search(options)

// parse results 
return $.paginate(res, options)
```

Each of the helpers is typed, so expect proper auto-completion and warnings as you use them.

Note that the easiest way to see what the code does it to [look at it](https://github.com/davestewart/es-kit/blob/main/src/modules/helpers.ts).

## Parameters helpers

The request helpers help you build configuration to pass to the Elasticsearch client's methods.

### Query

The [query](../../src/modules/helpers.ts#) helper is designed to convert a hash of values (such as `request.params`) into a sensible compound Elastic query.

```js
function $query (
  fields: Record<string, any>,
  options: { type: 'and' | 'or' = 'and', exact: boolean = false } = {}
): BooleanQuery | Query
```

It handles:

- and / or (must / should)
- phrase / exact (match / term)
- multimatch (pass `*` as field name)
- wildcards (pass `*` as field value)

### Request

The [request](../../src/modules/helpers.ts#) helper is built on top of the Queru helper to directly convert a URLRequest's `params` and `query` values into a sensible compound Elastic query.

```js
function $request (
  request: URLRequest
): BooleanQuery | Query
```

### Script

The [script()](../../src/modules/helpers.ts#) helper builds a `ScriptOption` configuration:

```ts
function $script (
  source: string | Function,
  params?: object
): ScriptOption
```

Pass a `function` or `string` and optional `params` object:

```js
const script = $.script(function (ctx, params) {
  if (ctx.value > 5) {
    ctx.value *= params.multiplier
  }
}, { multiplier: 10 })
```

```js
{
  lang: 'painless',
  source: 'if (ctx.value > 5) { ctx.value *= params.multiplier; }',
  params: {
    multiplier: 10
  }
}
```

Note that Painless-objects are expected to be **Java**, so whilst the code will compile, and *may* be testable, it may *not* be runnable in your JS environment.

### Painless

The [painless](../../src/modules/helpers.ts#) helper converts a JavaScript function into Painless string:

```ts
function $painless (source: Function | string): string
```

It works by:

- converting the function to a string
- punctuating with semicolons
- replacing common keywords
- optimising those keywords
- removing strict equality
- concatenating into a single line

### Sort

The [sort()](../../src/modules/helpers.ts#) helper builds a `SortOption` array:

```ts
function $sort (
  field: string | string[] | Record<string, string | boolean | number>,
  keyword?: boolean
): Record<string, SortOption>
```

Pass a string, array of strings, or object, with optional`keyword` flag:

```js
const sort = $.sort({ name: true, age: false }, true)
```

```js
[{ 'name.keyword': 'asc' }, { 'age.keyword': 'desc' }
```

## Request helpers

### Bulk

The [bulk](../../src/modules/helpers.ts#) helpers are designed to build queries for the Bulk APIs without having to resort to a `flatMap`.

```ts
function $bulk.search (
  index: string, 
  queries: Query[],
  options: SearchOptions = {}
): object[]
```

```ts
function $bulk.index (
  index: string, 
  queries: Query[],
  id?: string
): object[]
```

Rather than flattening an array which will (generally have the same `index`) you pass the `index` and the `queries` separately and the helper will interleve them for you:

```js
const values = ['foo', 'bar', 'baz']
const queries = values.map(value => _.match('name', text))
const bulk = $bulk.search('options', queries)
```

```
[
	{ index: { _index: 'options' } },
	{ query: { match: { value: 'foo' } } },
	{ index: { _index: 'options' } },
	{ query: { match: { value: 'bar' } } },
	{ index: { _index: 'options' } },
	{ query: { match: { value: 'baz' } } },
]
```

### Defaults

The [defaults](../../src/modules/helpers.ts#) helper is designed to create a top level options object using defaults you can override.

```ts
function $defaults (options: SearchOptions): SearchOptions
```

## Response helpers

The response helpers help you simplify the verbose and somewhat inconsistent response formats from the Search and Document APIs.

### Extract

The [extract](../../src/modules/helpers.ts#) helper...

### Results

The [results](../../src/modules/helpers.ts#) helper converts results from the Search or Document API to a consistent format.

```ts
function $results (
  res: any, 
  req: any,
  type?: string
): object | object[]
```

### Paginate

The [paginate](../../src/modules/helpers.ts#) helper paginates results in a consistent and intuitive format.

```ts
function $paginate (
  res: any,
  options: SearchOptions
): { meta: object, hits: object[] }
```

### Doc

The [doc](../../src/modules/helpers.ts#) helper extracts individual hits, results or responses to a consistent format.

```ts
function $doc (
  hit: any,
  source: any = {}
): object
```

### Fields

The [fields](../../src/modules/helpers.ts#) helper remaps document fields to alternate structures as required.

```ts
function $fields (
  doc: Record<string, any>, 
  fields: Record<string, string> | Function
): object
```

## Error helpers

### Error

The [error](../../src/modules/helpers.ts#L17) helper converts the various Elastic error responses to a simple, consistent format.

```ts
function $error (error: any): object
```

## Log

The [log](../../src/modules/helpers.ts#) helper outputs both request and response data as the Api makes its calls.

```ts
function $log (
  label: string,
  data: any = null
): void
```

## Extending

The pupose of ES Kit's helpers is to abstract the common API lifecycle functionality into reusable functions.

They aim to provide sensible defaults, but if they don't work for you, they can easily be replaced by your own functions, enabling you to change how request and response data is processed. This allows you to continue using the ES Kit [Api](../api/README.md) class without having to break out to vanilla JavaScript each time you want to make an API call.

To replace a helper, simply import the main `Helpers` object, and assign the replacement function:

```js
import { Helpers } from '@davestewart/es-kit'

Helpers.doc = function (hit, source) {
  return hit // return hits as-is
}
```

> Note that extending `Helpers` will not overwrite the individual exported `$` style helpers, as decribed above.

